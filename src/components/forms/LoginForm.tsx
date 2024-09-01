import { Link } from 'react-router-dom'
import { Button, InputContainer, InputField, InputLabel } from '../styles'
import s from './index.module.scss'

const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	event.preventDefault()
}

const LoginForm = () => {
	return (
		<form className={s.form} onSubmit={onSubmit}>
			<InputContainer>
				<InputLabel htmlFor='email'>Email</InputLabel>
				<InputField type='email' id='email' />
			</InputContainer>

			<InputContainer className={s.loginFormPasswordInput}>
				<InputLabel htmlFor='password'>Password</InputLabel>
				<InputField type='password' id='password' />
			</InputContainer>
			<Button className={s.button}>Login</Button>
			<div className={s.formFooter}>
				<span>Already have an account?</span>
				<Link to='/register'>
					<span>Sign Up</span>
				</Link>
			</div>
		</form>
	)
}

export default LoginForm
