import { createRef, Dispatch, FC, SetStateAction, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MdClose } from 'react-icons/md';
import CreateConversationModalForm from '../../forms/CreateConversationModalForm.tsx';
import { ModalOverlay } from '../../styles';
import { ModalContainer, ModalContentBody, ModalHeader } from './index.tsx';

type ModalProps = {
	isOpen: boolean;
	onClose: Dispatch<SetStateAction<boolean>>;
};

const CreateConversationModal: FC<ModalProps> = ({ isOpen, onClose }) => {
	const ref = createRef<HTMLDivElement>();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			return e.key === 'Escape' && onClose(false);
		};

		window.addEventListener('keydown', handleKeyDown);
	}, []);

	const handleClickOnOverlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (ref.current === e.target) {
			onClose(false);
		}
	};

	if (!isOpen) return null;
	return ReactDOM.createPortal(
		<ModalOverlay ref={ref} onClick={(e) => handleClickOnOverlay(e)}>
			<ModalContainer>
				<ModalHeader>
					<h2>Create a new conversation!</h2>
					<MdClose size={32} onClick={() => onClose(false)} />
				</ModalHeader>
				<ModalContentBody>
					<CreateConversationModalForm onClose={onClose} />
				</ModalContentBody>
			</ModalContainer>
		</ModalOverlay>,
		document.body
	);
};

export default CreateConversationModal;
