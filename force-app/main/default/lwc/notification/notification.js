import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class Notification extends LightningElement {

    successNotificationHandler(){
        this.sendNotification('Success','This is Success Notification','Success');
    }
    warningNotificationHandler(){
        this.sendNotification('Warning','This is Warning Notification','Warning');
    }
    informationNotificationHandler(){
        this.sendNotification('Information','This is Information Notification','Information');
    }
    errorNotificationHandler(){
        this.sendNotification('Error','This is Error Notification','Error');
    }

    sendNotification(title,message,variant){
        const evt = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(evt);
    }
}