import { LightningElement } from 'lwc';

export default class ParentComp2 extends LightningElement {

    childMessage

    childMessageHandler(event){
        this.childMessage = event.detail.name;
    }
}