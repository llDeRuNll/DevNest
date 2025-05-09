export const selectTransactionsIncomes = (state) => state.transactions.incomes;
export const selectTransactionsExpenses = (state) =>
  state.transactions.expenses;
export const selectTransactionsTotal = (state) =>
  state.transactions.transactionsTotal;
export const selectError = (state) => state.transactions.error;
export const selectIsLoading = (state) => state.transactions.isLoading;
