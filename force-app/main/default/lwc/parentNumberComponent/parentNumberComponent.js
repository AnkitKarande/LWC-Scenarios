import { LightningElement } from 'lwc';

export default class ParentNumberComponent extends LightningElement {

    Value = 0;

    handleIncrement(event){
        this.Value++;
    }
    handleDecrement(event){
        this.Value--;
    }

}