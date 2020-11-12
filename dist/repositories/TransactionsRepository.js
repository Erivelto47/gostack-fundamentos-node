"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4_1 = require("uuidv4");
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        return this.transactions;
    };
    TransactionsRepository.prototype.getBalance = function () {
        var incomeCalc = this.getIncomeCalc();
        var outcomeCalc = this.getOutcomeCalc();
        return { income: incomeCalc, outcome: outcomeCalc, total: (incomeCalc - outcomeCalc) };
    };
    TransactionsRepository.prototype.create = function (transaction) {
        this.existsTransaction(transaction);
        transaction.id = uuidv4_1.uuid();
        this.transactions.push(transaction);
        var index = this.transactions.indexOf(transaction);
        return this.transactions[index];
    };
    TransactionsRepository.prototype.getIncomeCalc = function () {
        var incomeTransactions = this.transactions
            .filter(function (incomeTrs) { return incomeTrs.type === 'income'; });
        return incomeTransactions.length > 0
            ? incomeTransactions
                .map(function (trs) { return trs.value; })
                .filter(function (value) { return value !== null; })
                .reduce(function (accum, curr) { return accum + curr; })
            : 0;
    };
    TransactionsRepository.prototype.getOutcomeCalc = function () {
        var outcomeTransactions = this.transactions
            .filter(function (incomeTrs) { return incomeTrs.type === 'outcome'; });
        return outcomeTransactions.length > 0
            ? outcomeTransactions
                .map(function (trs) { return trs.value; })
                .filter(function (value) { return value !== null; })
                .reduce(function (accum, curr) { return accum + curr; })
            : 0;
    };
    TransactionsRepository.prototype.existsTransaction = function (newTransaction) {
        if (this.transactions
            .find(function (transactionE) { return transactionE.value === newTransaction.value && transactionE.type === newTransaction.type; })) {
            throw new Error("Exists transaction.");
        }
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
