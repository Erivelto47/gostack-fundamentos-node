"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateTransactionService = /** @class */ (function () {
    function CreateTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    CreateTransactionService.prototype.execute = function (transaction) {
        this.isValidTransaction(transaction);
        return this.transactionsRepository.create(transaction);
    };
    CreateTransactionService.prototype.isValidTransaction = function (transaction) {
        if (transaction.type === 'outcome') {
            var balance = this.transactionsRepository.getBalance();
            if (balance.total < transaction.value) {
                throw new Error("No credits available.");
            }
        }
    };
    return CreateTransactionService;
}());
exports.default = CreateTransactionService;
