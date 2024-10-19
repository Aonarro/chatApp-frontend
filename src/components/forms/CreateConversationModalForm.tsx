import { Dispatch, FC, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/typedReduxHooks';
import { postNewConversationThunk } from '../../store/conversations/conversationsThunk';
import { CreateConversationParams } from '../../utils/types';
import { Button, InputContainer, InputField, InputLabel, TextArea } from '../styles';
import s from './index.module.scss';

type Props = {
	onClose: Dispatch<SetStateAction<boolean>>;
};

const CreateConversationModalForm: FC<Props> = ({ onClose }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateConversationParams>({});

	const onSubmit = (data: CreateConversationParams) => {
		dispatch(postNewConversationThunk(data))
			.unwrap()
			.then((data) => {
				console.log(data);

				onClose(false);
				navigate(`/conversations/${data.id}`);
			})
			.catch((err) => console.log(err));
	};

	return (
		<form className={s.createConversationForm} onSubmit={handleSubmit(onSubmit)}>
			<section>
				<InputContainer $backgroundColor="#161616">
					<InputLabel htmlFor="recipients">Recipients</InputLabel>
					<InputField id="recipients" {...register('email', { required: 'Email is required' })} />
				</InputContainer>
			</section>
			<section className={s.messageField}>
				<InputContainer $backgroundColor="#161616">
					<InputLabel htmlFor="recipients">Message (optional)</InputLabel>
					<TextArea id="recipients" {...register('message', { required: 'Message is required' })} />
				</InputContainer>
			</section>
			<Button>Create</Button>
		</form>
	);
};

export default CreateConversationModalForm;
