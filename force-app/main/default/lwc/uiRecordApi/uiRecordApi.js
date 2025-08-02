import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import {createRecord} from 'lightning/uiRecordApi';
import{deleteRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Lead.Name';
import TITLE_FIELD from '@salesforce/schema/Lead.Title';
import COMPANY_FIELD from '@salesforce/schema/Lead.Company';


const field = [NAME_FIELD,TITLE_FIELD,COMPANY_FIELD]
export default class UiRecordApi extends LightningElement {

    recordId = '00QWU00000JvrMP2AZ'
    getRecordResult
    deleteRecordId

    createRecordFields = {}

    @wire(getRecord,{recordId:'$recordId',fields:field})
    fetchRecord({data,error}){
        if(data){
            this.getRecordResult = data
        }
        if(error){
            console.error(error);
        }
    }

    changeHandler(event){
        const {name,value} = event.target;
        this.createRecordFields[name] = value;
    }

    createAccount(){
        const recordInput = {apiName: ACCOUNT_OBJECT.objectApiName, fields:this.createRecordFields}
        createRecord(recordInput).then(result=>{
            const evt = new ShowToastEvent({
                title : 'Success',
                message : `record Id ${result.id}`,
                variant : 'success'
            });
            this.dispatchEvent(evt);
            }).catch(error=>{
                console.error(error)
            })
    }

    deleteChangeHandler(event){
        this.deleteRecordId = event.target.value
    }

    deleteRecord(){
        deleteRecord(this.deleteRecordId).then(result=>{
            const evt = new ShowToastEvent({
                title : 'Deleted',
                message : 'Record Deleted',
                variant : 'error'
            });
            this.dispatchEvent(evt);
        }).catch(error=>{
            console.error(error)
        })
    }
}