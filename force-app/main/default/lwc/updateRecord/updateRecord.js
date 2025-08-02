import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

export default class UpdateRecord extends LightningElement {

    wiredData
    contactData = []
    draftValues = []
    contactFields = [
        {label:"Contact ID",fieldName:'Id'},
        {label:"Contact Name",fieldName:'Name'},
        {label:"Contact Title",fieldName:'Title'},
        {label:"Contact Phone",fieldName:'Phone',editable:true},
        {label:"Contact Email",fieldName:'Email',type:'email',editable:true},
    ]

    @wire(getListUi,{objectApiName:CONTACT_OBJECT.objectApiName, listViewApiName:'AllContacts' })
    fetchContactRecord(result){
        this.wiredData = result
        const {data,error} = result
        if(data){
            this.contactData = data.records.records.map(item=>{
                return {
                    "Id" : item.fields.Id.value,
                    "Name": item.fields.Name.value,
                    "Title" : item.fields.Title.value,
                    "Phone": item.fields.Phone.value,
                    "Email" : item.fields.Email.value,
                }
            })
            console.log(this.contactData);
        }
        if(error){
            console.error(error);
        }
    }

    handleSave(event){
        console.log(JSON.stringify(event.detail.draftValues));
        const recordInputs = event.detail.draftValues.map(draft=>{
            const fields = {...draft}
            return {fields:fields}
        });
        const promises = recordInputs.map(recordInput=>updateRecord(recordInput))
        Promise.all(promises).then(()=>{
            this.showToast('Success','Records updated','success');
            this.draftValues = []
            return refreshApex(this.wiredData)
        }).catch(error=>{
            this.showToast('Error',error,'error');
        })
    }

    showToast(title,message,variant){
        const evt = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(evt);
    }

    refreshTable(){
        return refreshApex(this.wiredData)
    }
}