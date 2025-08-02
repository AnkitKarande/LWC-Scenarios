import { LightningElement, api } from 'lwc';

export default class ChildComp1 extends LightningElement {

    @api parentmessage

    @api changeValue(){
        alert('Child Method Invoke');
    }
}