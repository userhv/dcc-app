import { View } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
import { SimpleLabel } from '../SimpleLabel/SimpleLabel';
import { theme } from '../../theme';

interface ITextFieldRN extends TextInputProps {
	label?: string;
}

export const TextFieldRN = (props: ITextFieldRN) => {
	const { label, underlineColor, placeholder, disabled, multiline, ...rest } = props;

	const defaulValuestStyle = {
		...(multiline ? {} : { height: 52 }),
		width: '100%',
		backgroundColor: theme.colors.branco,
		color: theme.colors.cinza60,
		borderRadius: 8
	};

	const defaultStyle = {
		...defaulValuestStyle
	};

	const disabledStyle = {
		...defaulValuestStyle,
		backgroundColor: theme.colors.cinza90
	};

	return (
		<View>
			{label && <SimpleLabel>{label}</SimpleLabel>}
			<TextInput
				{...rest}
				mode="outlined"
				multiline={multiline}
				style={disabled ? disabledStyle : defaultStyle}
				disabled={disabled}
				cursorColor={theme.colors.onBackground}
				underlineColor="transparent"
				placeholder={placeholder ?? ''}
				placeholderTextColor={disabled ? theme.colors.cinza60 : theme.colors.cinza60}
				textColor={disabled ? theme.colors.cinza60 : theme.colors.onBackground}
				activeOutlineColor={disabled ? theme.colors.cinza90 : theme.colors.primary}
				outlineStyle={{ borderWidth: 1, borderRadius: 8, ...(disabled ? { borderColor: theme.colors.cinza90 } : {}) }}
			/>
		</View>
	);
};
