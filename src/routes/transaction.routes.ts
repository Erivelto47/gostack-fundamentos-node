import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import ListAllTransactionService from '../services/ListAllTransactionService';
import CalculeBalanceService from '../services/CalculeBalanceService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactionsList = new ListAllTransactionService(transactionsRepository);
    const balance = new CalculeBalanceService(transactionsRepository);

    return response.status(200).json({
      transactions: transactionsList.execute(),
      balance: balance.execute()
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
   const transaction = request.body;

   const createTransaction = new CreateTransactionService(transactionsRepository)

   return response.status(201).json(createTransaction.execute(transaction));
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});


export default transactionRouter;
