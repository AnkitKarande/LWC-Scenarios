import { LightningElement, wire } from 'lwc';
import SAMPLEMC from '@salesforce/messageChannel/singleMessageChannel__c';
import { MessageContext, publish} from 'lightning/messageService';

export default class LmsComponentA extends LightningElement {
    inputValue

    @wire(MessageContext)
    context

    inputValueChangeHandler(event){
        this.inputValue = event.target.value;
    }

    sendButtonClickHandler(){
        publish(this.context,SAMPLEMC,{
            LMSCommunicationData:this.inputValue
        })
    }
}