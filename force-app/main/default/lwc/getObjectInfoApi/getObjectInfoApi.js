import { LightningElement, wire } from 'lwc';
import {getObjectInfo} from 'lightning/uiObjectInfoApi';
import {getObjectInfos} from 'lightning/uiObjectInfoApi';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import {getPicklistValuesByRecordType} from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
export default class GetObjectInfoApi extends LightningElement {

    getObjectInfoData
    getObjectInfosData
    getPicklistValuesData
    accountsRecordTypeId
    getPicklistValuesForObject
    
    @wire(getObjectInfo,{objectApiName:ACCOUNT_OBJECT})
    fetchObjectInfo({data,error}){
        if(data){
            this.getObjectInfoData = data;
            this.accountsRecordTypeId = data.defaultRecordTypeId;
        }else if(error){
            this.getObjectInfoData = JSON.stringify(error);
        }
    }

    @wire(getObjectInfos,{objectApiNames:[ACCOUNT_OBJECT,CONTACT_OBJECT]})
    fetchObjectInfos({data,error}){
        if(data){
            this.getObjectInfosData = data.results;
        }else if(error){
            console.log(error);
        }
    }

    @wire(getPicklistValues,{recordTypeId:'$accountsRecordTypeId',fieldApiName:RATING_FIELD})
    fetchPicklistValues({data,error}){
        if(data){
            this.getPicklistValuesData = data.values;
        }
        if(error){
            console.error(error);
        }
    }

    @wire(getPicklistValuesByRecordType,{objectApiName:ACCOUNT_OBJECT,recordTypeId:'$accountsRecordTypeId'})
    fetchPicklistValuesForObject({data,error}){
        if(data){
            this.getPicklistValuesForObject = data.picklistFieldValues.AccountSource.values;
        }
        if(error){
            console.log(error);
        }
    }

}