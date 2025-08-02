import { LightningElement, api, wire } from 'lwc';
import getMaxOppFromAccount from '@salesforce/apex/AccountController.getMaxOppFromAccount';

export default class GetMaxOpportunity extends LightningElement {

    @api recordId;
    OpportunityData;
    @wire(getMaxOppFromAccount,{accountId:'$recordId'})
    getData({data,error}){
        if(data){
            this.OpportunityData = {...this.OpportunityData,
                                        'Name':data.Name,
                                        'Id':data.Id,
                                        'StageName':data.StageName,
                                        'Amount':data.Amount};
        }else if(error){
            console.error(error);
        }
    }

}