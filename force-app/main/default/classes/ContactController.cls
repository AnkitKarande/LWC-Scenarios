public with sharing class ContactController {
    @AuraEnabled
    public static List<Contact> getContacts(String searchKey){
        String key = '%'+searchKey+'%';
        return [SELECT Id,FirstName,LastName,Email,LeadSource from Contact Where Name LIKE :key];
    }
}