trigger AccountTriggerForDeloitteSc1 on Account (after insert, after update) {
    if(Trigger.isAfter){
        if(Trigger.isInsert){
            AccountTriggerHandlerForDeloitteSc1.onAfterInsert(Trigger.new);
        }
        else if(Trigger.isUpdate){
            AccountTriggerHandlerForDeloitteSc1.onAfterUpdate(Trigger.new,Trigger.oldMap);
        }
    }
}