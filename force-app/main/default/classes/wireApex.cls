public with sharing class wireApex {
    

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpp(String Name){
        String key = '%'+Name+'%';
        return [SELECT Id,Name from Opportunity Where Name LIKE :key];
    }

    @AuraEnabled
    public static List<Account> getAccount(String key){
        String search = '%'+key+'%';
        return [SELECT Id,Name from Account Where Name LIKE :search];
    }
}