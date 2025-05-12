import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store.js'
import { ModalProvider } from './utils/Modal/ModalProvider.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={<div>Loading...</div>} persistor={persistor}>
				<ModalProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ModalProvider>
			</PersistGate>
		</Provider>
	</StrictMode>
)
