import { useState } from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthenticatedRoute } from './components/authenticated-route/AuthenticatedRoute.tsx';
import ConversationChannelPage from './pages/ConversationChannelPage';
import ConversationPage from './pages/ConversationPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { store } from './store';
import { AuthContext } from './utils/context/AuthContext.tsx';
import { socket, SocketContext } from './utils/context/SocketContext.tsx';
import { User } from './utils/types.ts';

function App() {
	const [user, setUser] = useState<User | undefined>();

	return (
		<Provider store={store}>
			<AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
				<SocketContext.Provider value={socket}>
					<Routes>
						<Route path="/" element={<Navigate to="/conversations" replace />} />
						<Route path="/register" element={<RegistrationPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route
							path="/conversations"
							element={
								<AuthenticatedRoute>
									<ConversationPage />
								</AuthenticatedRoute>
							}
						>
							<Route path=":id" element={<ConversationChannelPage />} />
						</Route>
					</Routes>
				</SocketContext.Provider>
			</AuthContext.Provider>
		</Provider>
	);
}

export default App;
