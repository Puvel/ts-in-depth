var Utility;
(function (Utility) {
    var Fees;
    (function (Fees) {
        function calculateLateFee(daysLate) {
            return daysLate * 0.25;
        }
        Fees.calculateLateFee = calculateLateFee;
    })(Fees = Utility.Fees || (Utility.Fees = {}));
    function maxBooksAllowed(age) {
        return age < 12 ? 3 : 10;
    }
    Utility.maxBooksAllowed = maxBooksAllowed;
    function privateFunc() {
        console.log('This is a private function');
    }
})(Utility || (Utility = {}));
/// <reference path='utility-functions.ts'/>>
var res1 = Utility.maxBooksAllowed(20);
console.log(res1);
var util = Utility.Fees;
var res2 = util.calculateLateFee(10);
console.log(res2);
