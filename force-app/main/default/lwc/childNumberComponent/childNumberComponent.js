import { LightningElement } from 'lwc';

export default class ChildNumberComponent extends LightningElement {

    handleIncrement(){
        const evt = new CustomEvent('increment');
        this.dispatchEvent(evt);
    }
    handleDecrement(){
        const evt = new CustomEvent('decrement');
        this.dispatchEvent(evt);
    }
}