// selectTransactions видає транзакції, які були отримані під час останього виклику transactionsGetByType
// Тому одночасно можна отримати тільки транзакції одного типу, всі одразу - неможливо
export const selectTransactions = (state) => state.transactions.items;

export const selectTransactionsTotal = (state) =>
  state.transactions.transactionsTotal;
export const selectError = (state) => state.transactions.error;
export const selectIsLoading = (state) => state.transactions.isLoading;
