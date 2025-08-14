@isTest
public class AccountTriggerTestForDeoitteSc1 {
    
    @isTest
    private static void accountShareTest(){
        User platformUser1 = createUser('Custom Platform');
        User platformUser2 = createUser('Custom Platform');

        List<Account> insertAccountList = new List<Account>();
        for(Integer i=1; i<=5; i++){
            Account accountRecord = new Account();
            accountRecord.Name = 'Test '+i;
            accountRecord.Secondary_Owner__c = platformUser1.Id;
            insertAccountList.add(accountRecord);
        }

        Test.startTest();
            
            insert insertAccountList;

            List<AccountShare> insertAccountShareRecordList = [SELECT Id,AccountId,UserOrGroupId,UserOrGroup.Name from AccountShare];
            System.AssertEquals(5,insertAccountShareRecordList.size(),'Account Share record not created');
            System.AssertEquals(platformUser1.Id,insertAccountShareRecordList[0].UserOrGroupId,'Account Not Shared Properly');
            
            List<Account> updateAccountList = new List<Account>();
            for(Account currentAccount : insertAccountList){
                currentAccount.Secondary_Owner__c = platformUser2.Id;
                updateAccountList.add(currentAccount);
            }
            update updateAccountList;

            List<AccountShare> updateAccountShareRecordList = [SELECT Id,AccountId,UserOrGroupId,UserOrGroup.Name from AccountShare];

            System.AssertEquals(5,updateAccountShareRecordList.size(),'Account Share record not created');
            System.AssertEquals(platformUser2.Id,updateAccountShareRecordList[0].UserOrGroupId,'Account Not Shared Properly');
        Test.stopTest();


    }

    private static User createUser(String profileName) {
        Profile p = [SELECT Id FROM Profile WHERE Name = :profileName LIMIT 1];
        User u = new User(
            FirstName = 'Test',
            LastName = profileName.replace(' ', '') + 'User',
            Email = profileName.replace(' ', '').toLowerCase() + '@test.com',
            Username = System.currentTimeMillis() + profileName.replace(' ', '') + '@test.com',
            Alias = 'tst' + String.valueOf(Math.abs(Crypto.getRandomInteger())).substring(0,2),
            TimeZoneSidKey = 'Asia/Kolkata',
            LocaleSidKey = 'en_US',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            ProfileId = p.Id
        );
        insert u;
        return u;
    }

}