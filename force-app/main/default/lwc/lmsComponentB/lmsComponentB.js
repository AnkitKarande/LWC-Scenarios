import { LightningElement, wire } from 'lwc';
import SAMPLEMC from '@salesforce/messageChannel/singleMessageChannel__c';
import {MessageContext, subscribe} from 'lightning/messageService';

export default class LmsComponentB extends LightningElement {

    messageReceived
    
    @wire(MessageContext)
    context

    connectedCallback(){
        subscribe(this.context,SAMPLEMC,(data)=>{this.messageReceived = data.LMSCommunicationData})
    }



}