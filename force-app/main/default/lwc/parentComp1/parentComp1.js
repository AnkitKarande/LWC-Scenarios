import { LightningElement } from 'lwc';

export default class ParentComp1 extends LightningElement {

    inputValue
    inputValueChangeHandler(event){
        this.inputValue = event.target.value;
    }
    messageToSent = {
        name:''
    }

    sendButtonHandler(){
        this.messageToSent = {...this.messageToSent,name:this.inputValue}
    }

    callChildMethod(){
        const element = this.template.querySelector('c-child-comp1');
        element.changeValue();
    }
}