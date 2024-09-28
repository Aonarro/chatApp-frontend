import { Button, InputContainer, InputField, InputLabel, TextArea } from '../styles';
import s from './index.module.scss';

const CreateConversationModalForm = () => {
	return (


		<form className={s.createConversationForm}>
			<section>
				<InputContainer $backgroundColor="#161616">
					<InputLabel htmlFor="recipients">Recipients</InputLabel>
					<InputField id="recipients" />
				</InputContainer>
			</section>
			<section className={s.messageField}>
				<InputContainer $backgroundColor="#161616">
					<InputLabel htmlFor="recipients">Message (optional)</InputLabel>
					<TextArea id="recipients" />
				</InputContainer>
			</section>
			<Button onClick={(e) => {
				e.preventDefault();
			}}>Create</Button>
		</form>
	);
};

export default CreateConversationModalForm;