import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

export default class CreateRecordComp extends LightningElement {


    formFields = {}

    changeHandler(event){
        const {name,value} = event.target;
        this.formFields[name] = value;
    }


    createContact(){
        const recordInput = {apiName:CONTACT_OBJECT.objectApiName, fields:this.formFields}
        createRecord(recordInput).then(result=>{
            this.showToast('success',`Record Id : ${result.id}`,'success');
        }).catch(error=>{
            console.error(error);
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
}