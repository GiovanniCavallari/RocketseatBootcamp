import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import { CreateTransaction } from '../interfaces/CreateTransaction.interface';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransaction): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > total) {
      throw Error('Insufficient balance');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
