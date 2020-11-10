import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import ListAllTransactionService from '../services/ListAllTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/transactions', (request, response) => {
  try {
    const transactionsList = new ListAllTransactionService(transactionsRepository);

    return response.status(200).json(transactionsList.execute());
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/transactions', (request, response) => {
  try {
   const transaction = request.body;

   const createTransaction = new CreateTransactionService(transactionsRepository)

   return response.status(201).json(createTransaction.execute(transaction));
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.get('/', (req, res) =>  {
  return res.status(200).send("testeee");
});

export default transactionRouter;
