import { LightningElement, wire, api, track } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import getRelatedOppLineItem from '@salesforce/apex/OpportunityLineItemController.getRelatedOppLineItem';

const columns = [
    {label:'Name',fieldName:'Name'},
    {label:'Quantity',fieldName:'Quantity',editable:true},
    {label:'UnitPrice',fieldName:'UnitPrice'}
]
export default class OppLineItemEditInline extends LightningElement {

    @api recordId;
    oppListItemData
    columns = columns
    draftValues = []
    change = 0
    @wire(getRelatedOppLineItem,{Id:'$recordId',istrigger:'$change'})
    fetchdata({data,error}){
        if(data){
            this.storeWire = data
            console.log(data);
            this.oppListItemData = data.map(item=>{
                return {...item,'Name':item.Product2.Name}
            })
        }
        if(error){
            console.error(error);
        }
    }

    saveHandler(event){
        console.log(event.detail.draftValues)

        const recordInputs = event.detail.draftValues.map(item=>{
            const fields = {...item}
            return {fields:fields}
        })
        const Promises =recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(Promises).then(()=>{
            console.log('updated sucessfully');
            this.draftValues = []
            this.change = Math.floor(Math.random() * 101);
        }).catch(error=>{
            console.error(error);
        })        
    }
}