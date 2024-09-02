import { Route, Routes } from 'react-router-dom'
import ConversationChannelPage from './pages/ConversationChannelPage'
import ConversationPage from './pages/ConversationPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'

function App() {
	return (
		<>
			<Routes>
				<Route path='/register' element={<RegistrationPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='conversation' element={<ConversationPage />}>
					<Route path=':id' element={<ConversationChannelPage />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
