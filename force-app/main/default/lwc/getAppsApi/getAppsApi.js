import { LightningElement, wire } from 'lwc';
import {getNavItems} from 'lightning/uiAppsApi';

export default class GetAppsApi extends LightningElement {

    data 

    @wire(getNavItems,{navItemNames:['standard-Account'],pageSize:30})
    fetchNavItems({data,error}){
        if(data){
            this.data = data.navItems[0];
            console.log(this.data.objectApiName)
        }
    }
}