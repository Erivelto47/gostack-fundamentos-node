"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by erivelto on 10/11/20
 */
var CalculeBalanceService = /** @class */ (function () {
    function CalculeBalanceService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    CalculeBalanceService.prototype.execute = function () {
        return this.transactionsRepository.getBalance();
    };
    return CalculeBalanceService;
}());
exports.default = CalculeBalanceService;
