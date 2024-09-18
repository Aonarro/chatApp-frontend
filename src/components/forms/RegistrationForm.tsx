import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button, InputContainer, InputField, InputLabel } from '../styles'
import s from './Forms.module.scss'
import { CreateUserParams } from '../../utils/types.ts'
import { postRegisterUser } from '../../axios/requests.ts'

const RegistrationForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateUserParams>()
	const navigate = useNavigate();

	const onSubmit = async (data: CreateUserParams) => {
		try {
			console.log(data)
			await postRegisterUser(data)
			navigate('/conversations')
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<InputContainer>
				<InputLabel htmlFor="email">Email</InputLabel>
				<InputField
					type="email"
					id="email"
					{...register('email', {
						required: 'Email is required',
					})}
				/>
			</InputContainer>
			<div className={s.nameFieldRow}>
				<InputContainer>
					<InputLabel htmlFor="firstName">First Name</InputLabel>
					<InputField
						type="text"
						id="firstName"
						{...register('firstName', {
							required: 'First name is required',
						})}
					/>
				</InputContainer>
				<InputContainer>
					<InputLabel htmlFor="lastName">Last Name</InputLabel>
					<InputField
						type="text"
						id="lastName"
						{...register('lastName', {
							required: 'Last name is required',
						})}
					/>
				</InputContainer>
			</div>
			<InputContainer>
				<InputLabel htmlFor="password">Password</InputLabel>
				<InputField
					type="password"
					id="password"
					{...register('password', {
						required: 'Password is required',
					})}
				/>
			</InputContainer>
			<Button className={s.button}>Create a new account</Button>
			<div className={s.formFooter}>
				<span>Already have an account?</span>
				<Link to="/login">
					<span>Login</span>
				</Link>
			</div>
		</form>
	)
}

export default RegistrationForm
