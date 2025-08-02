public with sharing class OpportunityLineItemController {
    

    @AuraEnabled(Cacheable=true)
    public static List<OpportunityLineItem> getRelatedOppLineItem(String Id,Integer istrigger){
        return [SELECT Id, OpportunityId, Product2.Name, Quantity, UnitPrice FROM OpportunityLineItem Where OpportunityId=:Id];
    }
}