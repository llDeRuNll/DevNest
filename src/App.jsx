import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout, userRefresh } from './redux/auth/operations'
import { selectIsRefreshing } from './redux/auth/selectors'
import './App.css'
import SharedLayout from './components/SharedLayout/SharedLayout'
import NotFoundPage from './routes/NotFoundPage/NotFoundPage'
import { ToastContainer } from 'react-toastify'
import Loader from './components/Loader/Loader'

import PrivateRoute from './routes/PrivateRoute/PrivateRoute'
import RestrictedRoute from './routes/RestrictedRoute/RestrictedRoute'
import { selectError } from './redux/transactions/selectors'
import ToasterError from './components/ToasterError/ToasterError'
import { useUserContext } from './utils/UserContext/useUserContext'

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
	const dispatch = useDispatch()
	const isRefreshing = useSelector(selectIsRefreshing)
	const errorMessage = useSelector(selectError)
	const { userSelect } = useUserContext()

	useEffect(() => {
		dispatch(userRefresh())
	}, [dispatch])

	useEffect(() => {
		if (errorMessage === 'Invalid session') {
			dispatch(userLogout())
			ToasterError()
		}
	}, [errorMessage, dispatch])

	useEffect(() => {
		document.body.setAttribute('data-theme', userSelect)
	}, [userSelect])

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
						element={<TransactionHistoryPage />}
					/>
				</Route>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<ToastContainer />
		</Suspense>
	)
}

export default App
