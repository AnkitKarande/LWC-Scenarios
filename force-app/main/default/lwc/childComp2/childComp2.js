import { LightningElement } from 'lwc';

export default class ChildComp2 extends LightningElement {
    inputValue

    inputChangeHandler(event){
        this.inputValue = event.target.value
    }

    sendMessage(){
        const evt = new CustomEvent("childmessage",{
            detail:{
                name:this.inputValue
            },
            bubbles:true
        });
        this.dispatchEvent(evt);
    }
}