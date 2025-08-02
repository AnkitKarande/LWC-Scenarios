public with sharing class OpportunityController {
    
    @AuraEnabled
    public static List<Opportunity> getOpportunties(String searchKey){
        String key = '%'+searchKey+'%';
        return [SELECT Id,Name,Amount,StageName,CloseDate from Opportunity Where Name LIKE :key];
    }

    @AuraEnabled(Cacheable=true)
    public static List<Opportunity> getOpps(){
        return [SELECT ID,Name,StageName,CloseDate from Opportunity];
    }
}