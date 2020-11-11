import TransactionsRepository from '../repositories/TransactionsRepository';

/**
 * Created by erivelto on 10/11/20
 */
class CalculeBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute() {
    return this.transactionsRepository.getBalance();
  }
}

export default CalculeBalanceService;
