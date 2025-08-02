import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub';
export default class ComponentB extends LightningElement {

    message

    connectedCallback(){
        pubsub.subscribe('messageCommunication',(recievedMessage)=>this.handleMessage(recievedMessage));    }

    handleMessage(recievedMessage){
        this.message = recievedMessage;
    }
}