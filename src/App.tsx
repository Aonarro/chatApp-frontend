import { Route, Routes } from 'react-router-dom'
import ConversationChannelPage from './pages/ConversationChannelPage'
import ConversationPage from './pages/ConversationPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import { AuthenticatedRoute } from './components/AuthenticatedRoute/AuthenticatedRoute.tsx'
import { AuthContext } from './utils/context/AuthContext.tsx'
import { useState } from 'react'
import { User } from './utils/types.ts'

function App() {
	const [user, setUser] = useState<User | undefined>()

	console.log(user)

	return (
		<AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
			<Routes>
				<Route path="/register" element={<RegistrationPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="conversations"
							 element={<AuthenticatedRoute>
								 <ConversationPage />
							 					</AuthenticatedRoute>}>
					<Route path=":id" element={<ConversationChannelPage />} />
				</Route>
			</Routes>
		</AuthContext.Provider>
	)
}

export default App
