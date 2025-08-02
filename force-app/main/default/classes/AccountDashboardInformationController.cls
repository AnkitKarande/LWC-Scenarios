public with sharing class AccountDashboardInformationController {
    
    @AuraEnabled(cacheable=true)
    public static List<AccountWrapper> getAccountWithRelatedInformation(){
        List<AccountWrapper> accountWrapperList = new List<AccountWrapper>();
        List<Account> accountList = [SELECT Id,Name,Industry,Rating,
                                    (SELECT Id from Contacts),
                                    (SELECT Id from Cases),
                                    (SELECT Id from Opportunities)
                                    from Account Order By Name];
        for(Account currentAccount : accountList){
            AccountWrapper wrapper = new AccountWrapper();
                wrapper.accountId = currentAccount.Id;
                wrapper.accountName = currentAccount.Name;
                wrapper.accountIndustry = currentAccount.Industry;
                wrapper.accountRating = currentAccount.Rating;
                wrapper.accountLink = '/'+currentAccount.Id;
                wrapper.contactCount = currentAccount.Contacts.size();
                wrapper.caseCount = currentAccount.Cases.size();
                wrapper.opportunityCount = currentAccount.Opportunities.size();
            accountWrapperList.add(wrapper);
        }
        return accountWrapperList;
    }

    public class AccountWrapper{
        @AuraEnabled public Id accountId;
        @AuraEnabled public String accountName;
        @AuraEnabled public String accountIndustry;
        @AuraEnabled public String accountRating;
        @AuraEnabled public String accountLink;
        @AuraEnabled public Integer contactCount;
        @AuraEnabled public Integer caseCount;
        @AuraEnabled public Integer opportunityCount;     
    } 

}