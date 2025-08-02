import { LightningElement } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BaseLightningComponent extends LightningElement {

    fields = [FIRST_NAME,LAST_NAME];
    objectName = CONTACT_OBJECT;
    recordId = '003WU00000TPygDYAT';

    successHandler(){
        const evt = new ShowToastEvent({
            title:'Success',
            message:'Transaction Success',
            variant:'success'
        })
        this.dispatchEvent(evt);
    }

}