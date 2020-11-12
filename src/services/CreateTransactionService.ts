import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: Transaction): Transaction {

    this.isValidTransaction(transaction);
    return this.transactionsRepository.create(transaction);
  }

  private isValidTransaction(transaction: Transaction) {

    if (transaction.type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (balance.total < transaction.value) {
        throw new Error("No credits available.");
      }
    }
  }


}

export default CreateTransactionService;
