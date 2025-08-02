import { LightningElement, wire} from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

export default class ContactPagination extends LightningElement {

    contactData
    currentData
    pageSize = 5
    pageNumber = 1
    rowOffSet = 0;

    get totalPages(){
        return Math.ceil(this.contactData.length/this.pageSize)
    }

    contactFields = [
        {label:'Contact Id',fieldName:'Id'},
        {label:'Contact Name',fieldName:'Name'},
        {label:'Contact Title',fieldName:'Title'},
        {label:'Contact Email',fieldName:'Email'},
        {label:'Contact Phone',fieldName:'Phone'},
    ]

    @wire(getListUi,{objectApiName:CONTACT_OBJECT.objectApiName,listViewApiName:'AllContacts'})
    fetchContacts({data,error}){
        if(data){
            console.log(data.records.records);
            this.contactData = data.records.records.map(item=>{
                return {
                    "Id": item.fields.Id.value,
                    "Name": item.fields.Name.value,
                    "Title": item.fields.Title.value,
                    "Email": item.fields.Email.value,
                    "Phone": item.fields.Phone.value,
                }
            })
            this.updateContactRecord();
        }
        if(error){
            console.error(error);
        }
    }
    updateContactRecord(){
        const start = (this.pageNumber - 1)*this.pageSize;
        const end = start + this.pageSize;
        this.currentData = this.contactData.slice(start,end);
    }

    previousPage(){
        if(this.pageNumber!=1){
            this.pageNumber--;
            this.updateContactRecord();
            this.rowOffSet -= this.pageSize;
        }
    }
    nextPage(){
        if(this.pageNumber < this.totalPages){
            this.pageNumber++;
            this.updateContactRecord();
            this.rowOffSet += this.pageSize;
        }
    }
}