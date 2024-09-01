import { Button, InputContainer, InputField, InputLabel } from '../styles'
import s from './index.module.scss'

const RegistrationForm = () => {
	return (
		<form className={s.form}>
			<InputContainer>
				<InputLabel htmlFor='email'>Email</InputLabel>
				<InputField type='email' id='email' />
			</InputContainer>
			<div className={s.nameFieldRow}>
				<InputContainer>
					<InputLabel htmlFor='firstName'>First Name</InputLabel>
					<InputField type='text' id='firstName' />
				</InputContainer>
				<InputContainer>
					<InputLabel htmlFor='lastName'>Last Name</InputLabel>
					<InputField type='text' id='lastName' />
				</InputContainer>
			</div>
			<InputContainer>
				<InputLabel htmlFor='password'>Password</InputLabel>
				<InputField type='password' id='password' />
			</InputContainer>
			<Button className={s.button}>Create a new account</Button>
		</form>
	)
}

export default RegistrationForm
