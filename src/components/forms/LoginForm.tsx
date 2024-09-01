import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button, InputContainer, InputField, InputLabel } from '../styles'
import s from './index.module.scss'

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	console.log(errors)

	const onSubmit = data => {
		console.log(data)
	}
	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<InputContainer>
				<InputLabel htmlFor='email'>Email</InputLabel>
				<InputField
					type='email'
					id='email'
					{...register('email', {
						required: 'Email is required',
					})}
				/>
			</InputContainer>

			<InputContainer className={s.loginFormPasswordInput}>
				<InputLabel htmlFor='password'>Password</InputLabel>
				<InputField
					type='password'
					id='password'
					{...register('password', {
						required: 'Password is required',
					})}
				/>
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
