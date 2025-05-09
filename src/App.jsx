import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRefresh } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import "./App.css";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import NotFoundPage from "./routes/NotFoundPage/NotFoundPage";
import Loader from "./components/Loader/Loader";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";

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
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(userRefresh());
  }, [dispatch]);

  return isRefreshing ? null : (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<SharedLayout />}>
          <Route index element={<WelcomePage />} />
          <Route
            path="register"
            element={<RestrictedRoute component={<RegisterPage />} />}
          />
          <Route
            path="login"
            element={<RestrictedRoute component={<LoginPage />} />}
          />
          <Route
            path="transactions/:transactionType"
            element={
              <PrivateRoute>
                <MainTransactionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="transactions/history/:transactionsType"
            element={
              <PrivateRoute>
                <TransactionHistoryPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
