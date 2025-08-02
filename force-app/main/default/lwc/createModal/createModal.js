import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class CreateModal extends LightningModal {
    @api objectType;
    @api accountId;
    @api title;

    handleSuccess(){
        this.close('Success');
    }
    handleCancel(){
        this.close('Cancel');
    }
    handleError(){
        this.close('Error');
    }
    handleSubmit(event){
        event.preventDefault();

        const fields = event.detail.fields;
        fields.AccountId = this.accountId;

        this.template.querySelector('lightning-record-form').submit(fields);
    }
}