import { Route, Routes } from 'react-router-dom'
import ConversationChannelPage from './pages/ConversationChannelPage'
import ConversationPage from './pages/ConversationPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import { AuthenticatedRoute } from './components/AuthenticatedRoute/AuthenticatedRoute.tsx'
import { AuthContext } from './utils/context/AuthContext.tsx'
import { useState } from 'react'
import { User } from './utils/types.ts'
import { socket, SocketContext } from './utils/context/SocketContext.tsx';

function App() {
	const [user, setUser] = useState<User | undefined>()


	return (
		<AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
			<SocketContext.Provider value={socket}>
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
			</SocketContext.Provider>
		</AuthContext.Provider>
	)
}

export default App
