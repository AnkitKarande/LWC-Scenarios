public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static Opportunity getMaxOppFromAccount(String accountId){
        List<Opportunity> oppList =  [SELECT Id,Name,Amount,StageName from Opportunity where AccountId= :accountId Order By Amount DESC LIMIT 1];
        return oppList.isEmpty()?null:oppList.get(0);
    }

    @AuraEnabled
    public static List<Account> getAccounts(String searchKey){
        String key = '%'+searchKey+'%';
        return [SELECT ID,Industry,Type,Name,AnnualRevenue from Account Where Name LIKE :key];
    }

}