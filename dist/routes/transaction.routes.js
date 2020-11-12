"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TransactionsRepository_1 = __importDefault(require("../repositories/TransactionsRepository"));
var CreateTransactionService_1 = __importDefault(require("../services/CreateTransactionService"));
var ListAllTransactionService_1 = __importDefault(require("../services/ListAllTransactionService"));
var CalculeBalanceService_1 = __importDefault(require("../services/CalculeBalanceService"));
var transactionRouter = express_1.Router();
var transactionsRepository = new TransactionsRepository_1.default();
transactionRouter.get('/', function (request, response) {
    try {
        var transactionsList = new ListAllTransactionService_1.default(transactionsRepository);
        var balance = new CalculeBalanceService_1.default(transactionsRepository);
        return response.status(200).json({
            transactions: transactionsList.execute(),
            balance: balance.execute()
        });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
transactionRouter.post('/', function (request, response) {
    try {
        var transaction = request.body;
        var createTransaction = new CreateTransactionService_1.default(transactionsRepository);
        return response.status(201).json(createTransaction.execute(transaction));
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = transactionRouter;
