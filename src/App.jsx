import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SharedLayout from "./components/SharedLayout/SharedLayout";
const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const MainTransactionPage = lazy(() =>
  import("./pages/MainTransactionsPage/MainTransactionPage")
);
const TransactionHistoryPage = lazy(() =>
  import("./pages/TransactionsHistoryPage/TransactionHistoryPage")
);

function App() {
  return (
    <Suspense>
      <Routes>
        <Route element={<SharedLayout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/transactions" element={<MainTransactionPage />} />
          <Route
            path="/transactions/history"
            element={<TransactionHistoryPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
