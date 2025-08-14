public class AccountTriggerHandlerForDeloitteSc1 {
    
    public static void onAfterInsert(List<Account> accountList){
        List<AccountShare> accountShareList = new List<AccountShare>();
        for(Account currentAccount : accountList){
            if(currentAccount.Secondary_Owner__c != null){
                AccountShare shareRecord = createAccountShareRecord(currentAccount.Id,currentAccount.Secondary_Owner__c);
                accountShareList.add(shareRecord);
            }
        }
        if(!accountShareList.isEmpty()){
            insert accountShareList;
        }
    }
    public static void onAfterUpdate(List<Account> accountList, Map<Id,Account> accountOldMap){
        List<AccountShare> addAccountShareList = new List<AccountShare>();
        List<AccountShare> deleteAccountShareList = new List<AccountShare>();
        Map<Id,Id> accountSecOwnerMap = new Map<Id,Id>();
        
        for(Account currentAccount : accountList){
            Id newOwnerId = currentAccount.Secondary_Owner__c;
            Id oldOwnerId = accountOldMap.get(currentAccount.Id).Secondary_Owner__c;

            if(newOwnerId != oldOwnerId){
                if(newOwnerId != null){
                    AccountShare shareRecord = createAccountShareRecord(currentAccount.Id,newOwnerId);
                    addAccountShareList.add(shareRecord);
                }
                if(oldOwnerId != null){
                    accountSecOwnerMap.put(currentAccount.Id,oldOwnerId);
                }
            }
        }

        if(!accountSecOwnerMap.isEmpty()){
            for(AccountShare currentAccountshare : [SELECT Id,AccountId, UserOrGroupId from AccountShare 
                                                    Where AccountId IN :accountSecOwnerMap.keySet()]){
            
                if(currentAccountshare.UserOrGroupId == accountSecOwnerMap.get(currentAccountshare.AccountId)){
                    deleteAccountShareList.add(currentAccountshare);
                }
            }
        }
        if(!addAccountShareList.isEmpty()){
            insert addAccountShareList;
        }
        if(!deleteAccountShareList.isEmpty()){
            delete deleteAccountShareList;
        }
    }

    private static AccountShare createAccountShareRecord(Id accountId, Id userId){
        AccountShare shareRecord = new AccountShare();
        shareRecord.AccountId = accountId;
        shareRecord.UserOrGroupId = userId;
        shareRecord.AccountAccessLevel = 'Edit';
        shareRecord.OpportunityAccessLevel  = 'Read';
        shareRecord.CaseAccessLevel = 'Read';
        shareRecord.RowCause = 'Manual'; 
        return shareRecord;
    }

}