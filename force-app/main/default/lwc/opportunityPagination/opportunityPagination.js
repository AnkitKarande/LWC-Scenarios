import { LightningElement, wire } from 'lwc';
import getOpps from '@salesforce/apex/OpportunityController.getOpps';

export default class OpportunityPagination extends LightningElement {

    oppData 
    oppColumn = [
        {label:"Opp Id",fieldName:"Id"},
        {label:"Opp Name",fieldName:"Name"},
        {label:"Opp Stage",fieldName:"StageName"},
        {label:"Opp Close Date",fieldName:"CloseDate"},
    ]
    pageNumber = 1
    pageSize = 7
    currentData
    offSet = 0

    get TotalPages(){
        return Math.ceil(this.oppData.length/this.pageSize);
    }
    get prevDisabled(){
        return this.pageNumber <= 1;
    }

    get nextDisabled(){
        return this.pageNumber >= this.TotalPages;
    }

    @wire(getOpps)
    fetchData({data,error}){
        if(data){
            this.oppData = data;
            this.updateRecords();
        }
        if(error){
            console.error(error);
        }
    }

    updateRecords(){
        const start = (this.pageNumber-1)*this.pageSize;
        const end = start+this.pageSize;
        this.currentData = this.oppData.slice(start,end);
    }

    handlePrevious(){
        if(this.pageNumber > 1){
            this.offSet-=this.pageSize;
            this.pageNumber--;
            this.updateRecords();
        }
    }

    handleNext(){
        if(this.pageNumber<this.TotalPages){
            this.offSet+=this.pageSize;
            this.pageNumber++;
            this.updateRecords();
        }
    }

}