import LoginForm from '../components/forms/LoginForm'
import { PageWrapper } from '../components/styles'

const LoginPage = () => {
	return (
		<PageWrapper display='flex' justifyContent='center' alignItems='center'>
			<LoginForm />
		</PageWrapper>
	)
}

export default LoginPage
