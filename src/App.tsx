import { Outlet, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'

function App() {
	return (
		<>
			<Routes>
				<Route path='/register' element={<RegistrationPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route
					path='conversations'
					element={
						<div>
							<div>Conversations</div>
							<Outlet />
						</div>
					}
				>
					<Route path=':id' element={<div>Conversation Id Page</div>} />
				</Route>
			</Routes>
		</>
	)
}

export default App
