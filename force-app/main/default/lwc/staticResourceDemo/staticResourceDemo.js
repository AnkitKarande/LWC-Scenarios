import { LightningElement } from 'lwc';
import singleImage from '@salesforce/resourceUrl/singleImage';
import MOMENT from '@salesforce/resourceUrl/moment';
import ANIMATE from '@salesforce/resourceUrl/animate';
import CONTENT from '@salesforce/contentAssetUrl/screenshot';
import USER from '@salesforce/user/Id';
import isGuest from '@salesforce/user/isGuest';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';

export default class StaticResourceDemo extends LightningElement {

    isRendered = false
    imgUrl = singleImage
    Date
    file = CONTENT;
    user = USER;
    isGuest = isGuest;

    renderedCallback(){
        if(this.isRendered)
            return
        else{
            Promise.all([
                loadScript(this,MOMENT+'/moment/moment.min.js'),
                loadStyle(this,ANIMATE+'/animate/animate.min.css')
            ]).then(()=>{
                console.log('loaded successfully');
                this.setDate();
            }).catch(error=>{
                console.error(error);
            })
        }
    
        this.isRendered = true
    }

    setDate(){
        this.Date = moment().startOf('day').fromNow();
    }
    
}