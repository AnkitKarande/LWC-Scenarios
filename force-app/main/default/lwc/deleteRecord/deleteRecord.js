import { LightningElement, wire } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class DeleteRecord extends LightningElement {

    recordId
    changeHandler(event){
        this.recordId = event.target.value;
    }
    hadleDeleteRecord(){
        deleteRecord(this.recordId).then(()=>{
            this.showToast('success','Record Deleted','success')
        }).catch(error=>{
            this.showToast('error',error,'error')
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