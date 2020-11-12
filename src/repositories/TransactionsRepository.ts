import Transaction from '../models/Transaction';
import { uuid } from 'uuidv4';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Category {
  title: string;
  created_at: Date;
  updated_at: Date;
}

class TransactionsRepository {
  private readonly transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeCalc = this.getIncomeCalc();

    const outcomeCalc = this.getOutcomeCalc();

    return  { income: incomeCalc, outcome: outcomeCalc, total: (incomeCalc - outcomeCalc)};
  }

  public create(transaction: Transaction): Transaction {
    this.existsTransaction(transaction);
    transaction.id = uuid();
    this.transactions.push(transaction);
    const index = this.transactions.indexOf(transaction);
    return this.transactions[index];
  }

  private getIncomeCalc() {
    const incomeTransactions = this.transactions
      .filter(incomeTrs => incomeTrs.type === 'income')

    return incomeTransactions.length > 0
      ? incomeTransactions
        .map(trs => trs.value)
        .filter(value => value !== null)
        .reduce((accum, curr) => accum + curr)
      : 0;
  }

  private getOutcomeCalc() {
    const outcomeTransactions = this.transactions
      .filter(incomeTrs => incomeTrs.type === 'outcome');

    return outcomeTransactions.length > 0
      ? outcomeTransactions
        .map(trs => trs.value)
        .filter(value => value !== null)
        .reduce((accum, curr) => accum + curr)
      : 0;
  }

  private existsTransaction(newTransaction: Transaction): void {
    if (this.transactions
      .find(transactionE => transactionE.value === newTransaction.value && transactionE.type === newTransaction.type)) {
      throw new Error("Exists transaction.");
    }
  }
}

export default TransactionsRepository;
