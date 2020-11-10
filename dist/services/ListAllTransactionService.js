"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListAllTransactionService = /** @class */ (function () {
    function ListAllTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    ListAllTransactionService.prototype.execute = function () {
        return this.transactionsRepository.all();
    };
    return ListAllTransactionService;
}());
exports.default = ListAllTransactionService;
