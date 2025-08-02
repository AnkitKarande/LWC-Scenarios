import { LightningElement, wire } from 'lwc';
import {encodeDefaultFieldValues} from 'lightning/pageReferenceUtils';
import {NavigationMixin} from 'lightning/navigation';
import {CurrentPageReference} from 'lightning/navigation';

export default class Navigation extends NavigationMixin(LightningElement) {

    @wire(CurrentPageReference)
    pageRef

    get pageReference(){
        return this.pageRef?JSON.stringify(this.pageRef):' NO ';
    }

    navigateToHomePage(){
        this[NavigationMixin.Navigate]({
            type:'standard__namedPage',
            attributes:{
                pageName : 'home'
            }
        })
    }

    navigateToChatterPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__namedPage',
            attributes:{
                pageName : 'chatter'
            }
        })
    }

    navigateToNewContactRecordPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Contact',
                actionName:'new'
            }
        })
    }

    navigateToNewAccountRecordPage(){
        const defaultValue = encodeDefaultFieldValues({
            Name : 'Test Account',
            Rating : 'Hot'
        })

        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'Account',
                actionName:'new'
            },
            state : {
                defaultFieldValues : defaultValue
            }
        })
    }
    navigateToCaseListView(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'case',
                actionName:'list'
            },
            state:{
                filterName:'AllOpenCases'
            }
        })
    }

    navigateToFiles(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName:'ContentDocument',
                actionName:'home'
            }
        })
    }
    navigateToOpportunityRecord(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:'006WU00000D1m8LYAR',
                objectApiName:'Opportunity',
                actionName:'view'
            }
        })
    }
    navigateToEditPeopleRecord(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                recordId:'005WU00000jf1KvYAI',
                objectApiName:'User',
                actionName:'edit'
            }
        })
    }
    navigateToSearchTab(){
        this[NavigationMixin.Navigate]({
            "type":"standard__navItemPage",
            "attributes":{
                "apiName":"Search"
            },
            "state":{}
        })
    }
    navigateToRelatedRecords(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordRelationshipPage',
            attributes:{
                recordId:'006WU00000D1m8LYAR',
                objectApiName:'Opportunity',
                relationshipApiName:'OpportunityLineItems',
                actionName:'view'
            }
        })
    }
    navigateToGoogle(){
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'https://www.google.com'
            }
        })
    }
    definition = {
        componentDef:'c:parentComp1',
        attributes:{

        }
    }
    navigateToLWC(){
        this[NavigationMixin.Navigate]({
            type:'standard__webPage',
            attributes:{
                url:'/one/one.app#'+btoa(JSON.stringify(this.definition))
            }
        })
    }
}