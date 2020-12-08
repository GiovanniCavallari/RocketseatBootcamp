import Transaction from '../models/Transaction';
import { CreateTransaction } from '../interfaces/CreateTransaction.interface';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter((transaction: Transaction) => transaction.type === 'income')
      .map(transaction => transaction.value)
      .reduce((total, value) => total + value, 0);

    const outcome = this.transactions
      .filter((transaction: Transaction) => transaction.type === 'outcome')
      .map(transaction => transaction.value)
      .reduce((total, value) => total + value, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
