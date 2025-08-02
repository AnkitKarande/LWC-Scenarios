import { LightningElement, wire } from 'lwc';
import {getListUi} from 'lightning/uiListApi';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';

export default class UiListApi extends LightningElement {

    columns
    data

    @wire(getListUi,{objectApiName:OPPORTUNITY_OBJECT,listViewApiName:'AllOpportunities'})
    fetchGetListUi({data,error}){
        if(data){
            this.columns = data.info.displayColumns;
            this.data = data.records.records
        }
    }
}