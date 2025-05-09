<<<<<<< HEAD
import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userRefresh } from './redux/auth/operations'
import { selectIsRefreshing } from './redux/auth/selectors'
import './App.css'
import SharedLayout from './components/SharedLayout/SharedLayout'
import NotFoundPage from './routes/NotFoundPage/NotFoundPage'
import { ToastContainer } from 'react-toastify'
import Loader from './components/Loader/Loader'

import PrivateRoute from './routes/PrivateRoute/PrivateRoute'
import RestrictedRoute from './routes/RestrictedRoute/RestrictedRoute'

=======
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import SharedLayout from './components/SharedLayout/SharedLayout'
import NotFoundPage from './routes/NotFoundPage/NotFoundPage'
>>>>>>> 4e9ea20416a868658c947df04bacdd7210cb9351
const WelcomePage = lazy(() => import('./pages/WelcomePage/WelcomePage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'))
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'))
const MainTransactionPage = lazy(() =>
	import('./pages/MainTransactionsPage/MainTransactionPage')
)
const TransactionHistoryPage = lazy(() =>
	import('./pages/TransactionsHistoryPage/TransactionHistoryPage')
)

function App() {
<<<<<<< HEAD
	const dispatch = useDispatch()
	const isRefreshing = useSelector(selectIsRefreshing)

	useEffect(() => {
		dispatch(userRefresh())
	}, [dispatch])

	return isRefreshing ? null : (
		<Suspense fallback={<Loader />}>
			<Routes>
				<Route element={<SharedLayout />}>
					<Route index element={<WelcomePage />} />
					<Route
						path='register'
						element={
							<RestrictedRoute>
								<RegisterPage />
							</RestrictedRoute>
						}
					/>
					<Route
						path='login'
						element={
							<RestrictedRoute>
								<LoginPage />
							</RestrictedRoute>
						}
					/>
					<Route
						path='transactions/:transactionType'
						element={
							<PrivateRoute>
								<MainTransactionPage />
							</PrivateRoute>
						}
					/>
					<Route
						path='transactions/history/:transactionsType'
						element={
							<PrivateRoute>
								<TransactionHistoryPage />
							</PrivateRoute>
						}
=======
	return (
		<Suspense>
			<Routes>
				<Route element={<SharedLayout />}>
					<Route index element={<WelcomePage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route
						path='/transactions/:transactionType'
						element={<MainTransactionPage />}
					/>
					<Route
						path='/transactions/history/:transactionsType'
						element={<TransactionHistoryPage />}
>>>>>>> 4e9ea20416a868658c947df04bacdd7210cb9351
					/>
				</Route>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
<<<<<<< HEAD
			<ToastContainer />
=======
>>>>>>> 4e9ea20416a868658c947df04bacdd7210cb9351
		</Suspense>
	)
}

export default App
