import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import getOpportunties from '@salesforce/apex/OpportunityController.getOpportunties';
import getContacts from '@salesforce/apex/ContactController.getContacts';

const actions = [
    {label:'View',name:'View'},
    {label:'Delete',name:'Delete'}
]

export default class SearchObjectRecord extends NavigationMixin(LightningElement) {
    
    searchObjectVal = 'Account';
    inputSearchKeyword
    accountData = null;
    opportunityData = null;
    contactData = null;


    accountColumns = [
        {label:'Account Id',fieldName:'Id'},
        {label:'Account Name',fieldName:'Name'},
        {label:'Account Annual Revenue',fieldName:'AnnualRevenue'},
        {label:'Account Type',fieldName:'Type'},
        {label:'Account Industry',fieldName:'Industry'},
        {type:'action',typeAttributes:{rowActions:actions}}
    ]

    opportunityColumns = [
        {label:'Opportunity Id',fieldName:'Id'},
        {label:'Opportunity Name',fieldName:'Name'},
        {label:'Amount',fieldName:'Amount'},
        {label:'Stage',fieldName:'StageName'},
        {label:'Close Date',fieldName:'CloseDate'},
        {type:'action',typeAttributes:{rowActions:actions}}
    ]

    contactColumns = [
        {label:'Contact Id',fieldName:'Id'},
        {label:'FirstName',fieldName:'FirstName'},
        {label:'LastName',fieldName:'LastName'},
        {label:'Email',fieldName:'Email'},
        {label:'Lead Source',fieldName:'LeadSource'},
        {type:'action',typeAttributes:{rowActions:actions}}
    ]

    get searchObjectOptions(){
        return [
            {label:'Account',value:'Account'},
            {label:'Opportunity',value:'Opportunity'},
            {label:'Contact',value:'Contact'},
        ]
    }
    
    
    searchOnchageHandler(event){
        this.searchObjectVal = event.target.value
    }

    inputOnChangeHanlder(event){
        this.inputSearchKeyword = event.target.value;
    }

    searchOnClickHandler(){
        if(this.searchObjectVal == 'Account'){
            this.getAccountDetails();
            this.opportunityData = null;
            this.contactData = null;
        } 
        if(this.searchObjectVal == 'Opportunity') {
            this.getOpportunityDetails();
            this.accountData= null;
            this.contactData = null;
        }
        if(this.searchObjectVal == 'Contact') {
            this.getContactDetails();
            this.accountData= null;
            this.opportunityData = null;
        }
    }

    getAccountDetails(){
        getAccounts({searchKey:this.inputSearchKeyword}).then(result=>{
            this.accountData = result.map(account=>{
                const formatttedData =  {
                    AnnualRevenue:this.getValue(account,'AnnualRevenue'),
                    Id:this.getValue(account,'Id'), 
                    Name:this.getValue(account,'Name'),
                    Type:this.getValue(account,'Type'),
                    Industry:this.getValue(account,'Industry')
                }
                return formatttedData;
            })
            
        }).catch(error=>{
            console.error(error);
        })
    }

    getOpportunityDetails(){
        getOpportunties({searchKey:this.inputSearchKeyword}).then(result=>{
            this.opportunityData = result.map(data=>{
                const formatttedData =  {
                    Id:this.getValue(data,'Id'),
                    Name:this.getValue(data,'Name'),
                    Amount:this.getValue(data,'Amount'),
                    StageName:this.getValue(data,'StageName'),
                    CloseDate:this.getValue(data,'CloseDate')
                }
                return formatttedData;
            })
        }).catch(error=>{
            console.error(error);
        })
    }

    getContactDetails(){
        getContacts({searchKey:this.inputSearchKeyword}).then(result=>{
            this.contactData = result.map(data=>{
                const formattedData = {
                    Id:this.getValue(data,'Id'),
                    FirstName:this.getValue(data,'FirstName'),
                    LastName:this.getValue(data,'LastName'),
                    Email:this.getValue(data,'Email'),
                    LeadSource:this.getValue(data,'LeadSource')
                }
                return formattedData;
            })
            
        }).catch(error=>{
            console.error(error);
        })
    }

    performRowActions(event){
        const actionName = event.detail.action.name;
        if(actionName === 'View') this.viewRecord(event.detail.row)
        if(actionName === 'Delete') this.deleteRecord(event.detail.row)
    }

    getValue(obj,field){
        return obj[field] == null? '':obj[field];
    }

    viewRecord(row){
        this[NavigationMixin.Navigate]({
            type : 'standard__recordPage',
            attributes:{
                recordId : row.Id,
                objectApiName : this.searchObjectVal,
                actionName : 'view'
            }
        });
    }

    deleteRecord(row){
        deleteRecord(row.Id).then(()=>{
            this.showToastNotification('Success','Record Deleted Sucessfully','success');
            this.searchOnClickHandler();
        }).catch(error=>{
            this.showToastNotification('Error',error.body.message,'error')
        })
    }

    showToastNotification(title,message,variant){
        const evt = new ShowToastEvent({
                title,
                message, 
                variant
            })
            this.dispatchEvent(evt);
    }
}