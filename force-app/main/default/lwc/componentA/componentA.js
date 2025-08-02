import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub';

export default class ComponentA extends LightningElement {

    inputValue
    inputValueChangeHandler(event){
        this.inputValue = event.target.value;
    }

    sendButtonClickHandler(){
        pubsub.publish('messageCommunication',this.inputValue)
    }
}