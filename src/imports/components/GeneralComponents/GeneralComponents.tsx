import React, { createContext, ReactElement, useState } from 'react';
import { Dimensions } from 'react-native';
import { DialogRN, IDialogRN } from '../DialogRN/DialogRN';
import { ISnackBarRN, SnackBarRN } from '../SnackbarRN/SnackbarRN';
import { IModalRN, ModalRN } from '../ModalRN/ModalRN';

interface IGeneralComponents {
	children: ReactElement | ReactElement[];
}

interface IGeneralComponentsState {
	snackBarOptions: ISnackBarOptions | null;
	dialogOptions: IDialogOptions | null;
	modalOptions: IModalOptions | null;
}

export interface IGeneralComponentsContext {
	showSnackBar: (options: ISnackBarOptions) => void;
	showDialog: (options: IDialogOptions) => void;
	showModal: (options: IModalOptions) => void;
	getDimensions: () => number[];
}

export interface ISnackBarOptions {
	texto: string;
	visible?: boolean;
	onDismiss?: () => void;
	duration?: number;
}

interface IDialogOptions {
	textoHeader?: string;
	textoCorpo: string;
	visible?: boolean;
	onDismiss?: () => void;
	onConfirm?: () => void;
}

export type RenderableComponent = React.ReactElement | React.ElementType | React.ReactNode | Element;

interface IModalOptions {
	renderedComponent: RenderableComponent | ((props: { [key: string]: any }) => RenderableComponent);
	visible?: boolean;
	isFullScreen?: boolean;
	onDismiss?: () => void;
}

export const GeneralComponentsContext = createContext<IGeneralComponentsContext | null>(null);

export const GeneralComponents = (props: IGeneralComponents) => {
	const [state, setState] = useState<IGeneralComponentsState>({
		snackBarOptions: null,
		dialogOptions: null,
		modalOptions: null
	});

	const [updateDimension, setUpdateDimension] = useState<Date | null>(null);

	const deviceDimensions = React.useRef([0, 0]);

	const updateWidthHeight = () => {
		const { width, height } = Dimensions.get('window');
		deviceDimensions.current = [width, height];
		setUpdateDimension(new Date());
	};

	React.useEffect(() => {
		// Event Listener for orientation changes
		updateWidthHeight();
		Dimensions.addEventListener('change', updateWidthHeight);
	}, []);

	const { snackBarOptions, dialogOptions, modalOptions } = state;

	const { Provider } = GeneralComponentsContext;

	const showSnackBar = (options: ISnackBarOptions) => {
		setState({ ...state, snackBarOptions: { ...options, visible: true, onDismiss: dismissSnackbar } });
	};

	const dismissSnackbar = () => {
		setState({ ...state, snackBarOptions: null });
	};

	const showDialog = (options: IDialogOptions) => {
		setState({ ...state, dialogOptions: { ...options, visible: true, onDismiss: dismissDialog } });
	};

	const dismissDialog = () => {
		setState({ ...state, dialogOptions: null });
	};

	const showModal = (options: IModalOptions) => {
		setState({ ...state, modalOptions: { ...options, visible: true, onDismiss: dismissModal } });
	};

	const dismissModal = () => {
		setState({ ...state, modalOptions: null });
	};

	const getDimensions = () => {
		return deviceDimensions.current;
	};

	return (
		<Provider value={{ showSnackBar, showDialog, showModal, getDimensions }}>
			{props.children}
			{dialogOptions && <DialogRN {...(dialogOptions as IDialogRN)} />}
			{snackBarOptions && <SnackBarRN {...(snackBarOptions as ISnackBarRN)} />}
			{modalOptions && <ModalRN {...(modalOptions as IModalRN)} deviceDimensions={deviceDimensions.current} />}
		</Provider>
	);
};
