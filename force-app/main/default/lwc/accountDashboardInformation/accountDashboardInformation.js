import { LightningElement, wire } from 'lwc';
import getAccountWithRelatedInformation from '@salesforce/apex/AccountDashboardInformationController.getAccountWithRelatedInformation';
import CreateModal from 'c/createModal';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';


const actions = [
    {label:'Create Contact',name:'createContact'},
    {label:'Create Opportunity',name:'createOpportunity'},
    {label:'Create Case',name:'createCase'}
]

const columns = [
    {label:'Account Name',fieldName:'accountLink',type:'url',sortable:true,
        typeAttributes:{
            label:{fieldName:'accountName'},
            target:'_blank'
        }},
    {label:'Account Industry',fieldName:'accountIndustry',sortable:true,type:'text'},
    {label:'Account Rating',fieldName:'accountRating',sortable:true,type:'text'},
    {label:'Contact Count',fieldName:'contactCount',sortable:true,type:'number'},
    {label:'Opportunity Count',fieldName:'opportunityCount',sortable:true,type:'number'},
    {label:'Case Count',fieldName:'caseCount',sortable:true,type:'number'},
    {type:'action',typeAttributes:{rowActions:actions}}
]

export default class AccountDashboardInformation extends LightningElement {

    columns = columns
    @wire(getAccountWithRelatedInformation)
    accounts

    handleRowActions(event){
        let actionName = event.detail.action.name;
        let accountId = event.detail.row.accountId;

        switch (actionName) {
            case 'createContact':
                this.openCreateModal('Contact',accountId,'Create Contact')
                break;
            case 'createOpportunity':
                this.openCreateModal('Opportunity',accountId,'Create Opportunity')
                break;
            case 'createCase':
                this.openCreateModal('Case',accountId,'Create Case')
                break;
            default :
                console.log('Unhandled action');
        }
    }

    async openCreateModal(objectType,accountId,title){
        const result = await CreateModal.open({
            size: 'small',
            objectType:objectType,
            accountId:accountId,
            title:title
        });

        if(result == 'Success'){
            this.ShowToast('Success','Record Created Successfully','success');
            refreshApex(this.accounts);
        }
        else if(result == 'Error'){
            this.ShowToast('Error','Record Creation Failed','error');
        }
    }
    ShowToast(title,message,variant){
        const evt = new ShowToastEvent({
            title,
            message,
            variant
        })
        this.dispatchEvent(evt);
    }
}