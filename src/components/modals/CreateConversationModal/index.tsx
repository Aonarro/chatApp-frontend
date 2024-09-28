import React, { FC } from 'react';
import { ModalContainerStyle, ModalContentBodyStyle, ModalHeaderStyle } from '../../styles';

export const ModalHeader: FC<React.PropsWithChildren> = ({children}) => {
	return (
		<ModalHeaderStyle>{children}</ModalHeaderStyle>
	)
}
export const ModalContainer: FC<React.PropsWithChildren> = ({children}) => {
	return (
		<ModalContainerStyle>{children}</ModalContainerStyle>
	)
}
export const ModalContentBody: FC<React.PropsWithChildren> = ({children}) => {
	return (
		<ModalContentBodyStyle>{children}</ModalContentBodyStyle>
	)
}

