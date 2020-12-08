export interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
