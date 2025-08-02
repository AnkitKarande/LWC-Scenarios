import { LightningElement, wire } from 'lwc';
import getOpp from '@salesforce/apex/wireApex.getOpp';
import getAccount from '@salesforce/apex/wireApex.getAccount';
export default class ApexDemo extends LightningElement {

    data
    data1
    connectedCallback(){

        Promise.all([
            getOpp({Name:'Opp'}),
            getAccount({key : 'Test'})
        ]).then(([oppResult,AccResult])=>{
            this.data = oppResult;
            this.data1 = AccResult;
        }).catch(error=>{
            console.error(error);
        })

        
    }

    
}