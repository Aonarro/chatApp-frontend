import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button, InputContainer, InputField, InputLabel } from '../styles';
import s from './Forms.module.scss';
import { postLoginUser } from '../../axios/requests.ts';
import { UserCredentialsParams } from '../../utils/types.ts';

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserCredentialsParams>();

	const navigate = useNavigate();


	const onSubmit = async (data: UserCredentialsParams) => {
		try {
			const res = await postLoginUser(data);
			navigate('/conversations');
		} catch (err) {
			console.log(err);
		}
	};
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

			<InputContainer className={s.loginFormPasswordInput}>
				<InputLabel htmlFor="password">Password</InputLabel>
				<InputField
					type="password"
					id="password"
					{...register('password', {
						required: 'Password is required',
					})}
				/>
			</InputContainer>
			<Button className={s.button}>Login</Button>
			<div className={s.formFooter}>
				<span>Already have an account?</span>
				<Link to="/register">
					<span>Sign Up</span>
				</Link>
			</div>
		</form>
	);
};

export default LoginForm;
