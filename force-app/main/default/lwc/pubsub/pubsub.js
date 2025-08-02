const store = {};

const subscribe = (event,callback)=>{
    if(!store[event]){
        store[event] = new Set();
    }
    store[event].add(callback);
}

const unsubscribe = (event,callback)=>{
    if(store[event]){
        store[event].delete(callback);
    }
}

const publish = (event,payload)=>{
    if(store[event]){
        store[event].forEach(callback=>{
            try{
                callback(payload);    
        
            }catch(error){
                console.log(error);
            }
        });
        
    }
}


export default {
    subscribe,
    unsubscribe,
    publish
}