"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        return this.transactions;
    };
    TransactionsRepository.prototype.getBalance = function () {
        var incomeCalc = this.transactions
            .filter(function (incomeTrs) { return incomeTrs.type === 'income'; })
            .map(function (trs) { return trs.value; })
            .reduce(function (accum, curr) { return accum + curr; });
        var outcomeCalc = this.transactions
            .filter(function (incomeTrs) { return incomeTrs.type === 'outcome'; })
            .map(function (trs) { return trs.value; })
            .reduce(function (accum, curr) { return accum + curr; });
        return { income: incomeCalc, outcome: outcomeCalc, total: (incomeCalc - outcomeCalc) };
    };
    TransactionsRepository.prototype.create = function (transaction) {
        this.transactions.push(transaction);
        var index = this.transactions.indexOf(transaction);
        return this.transactions[index];
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
