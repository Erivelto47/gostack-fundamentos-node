import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    const incomeCalc = this.transactions
      .filter(incomeTrs => incomeTrs.type === 'income')
      .map(trs => trs.value)
      .reduce( (accum, curr) => accum + curr );

    const outcomeCalc = this.transactions
      .filter(incomeTrs => incomeTrs.type === 'outcome')
      .map(trs => trs.value)
      .reduce( (accum, curr) => accum + curr );

    return  { income: incomeCalc, outcome: outcomeCalc, total: (incomeCalc - outcomeCalc)};
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    const index = this.transactions.indexOf(transaction);
    return this.transactions[index];
  }
}

export default TransactionsRepository;
