import { createRef, FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalOverlay } from '../../styles';
import CreateConversationModalForm from '../../forms/CreateConversationModalForm.tsx';
import { ModalContainer, ModalContentBody, ModalHeader } from './index.tsx';
import { MdClose } from 'react-icons/md';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const CreateConversationModal: FC<ModalProps> = ({ isOpen, onClose }) => {
	const ref = createRef<HTMLDivElement>();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			return e.key === 'Escape' && onClose();
		};


		window.addEventListener('keydown', handleKeyDown);
	}, []);

	const handleClickOnOverlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (ref.current === e.target) {
			onClose();
		}
	};


	if (!isOpen) return null;
	return ReactDOM.createPortal(
		<ModalOverlay ref={ref} onClick={(e) => handleClickOnOverlay(e)}>
			<ModalContainer>
				<ModalHeader>
					<h2>Create a new conversation!</h2>
					<MdClose size={32} onClick={() => onClose()} />
				</ModalHeader>
				<ModalContentBody>
					<CreateConversationModalForm />
				</ModalContentBody>
			</ModalContainer>
		</ModalOverlay>,
		document.body,
	);
};

export default CreateConversationModal;