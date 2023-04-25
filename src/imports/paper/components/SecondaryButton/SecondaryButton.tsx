import { Button, ButtonProps, Text } from 'react-native-paper';
import { theme } from '../../theme';

interface ISecondaryButton extends ButtonProps {
	posicaoIcone?: 'direita' | 'esquerda';
	size?: 'medium' | 'small';
}

export const SecondaryButton = (props: ISecondaryButton) => {
	const { children, posicaoIcone, contentStyle, style, size = 'medium', disabled } = props;

	const isSmnall = size === 'small';

	const defaultStyle = {
		...(typeof style === 'object' ? style : {}),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,

		backgroundColor: theme.colors.onPrimary,

		borderColor: disabled ? theme.colors.cinzaMedio : theme.colors.primary,
		borderWidth: 1
	};

	return (
		<Button
			{...props}
			mode="contained"
			//@ts-ignore
			style={
				isSmnall
					? {
							...defaultStyle,
							paddingHorizontal: 4,
							paddingVertical: 2
					  }
					: {
							...defaultStyle,
							paddingHorizontal: 14,
							paddingVertical: 7
					  }
			}
			contentStyle={{
				...(typeof contentStyle === 'object' ? contentStyle : {}),
				flexDirection: posicaoIcone && posicaoIcone === 'esquerda' ? 'row' : 'row-reverse'
			}}
			labelStyle={{ color: disabled ? theme.colors.cinza50 : theme.colors.primary }}>
			<Text variant="labelLarge" style={{ color: disabled ? theme.colors.cinza50 : theme.colors.primary }}>
				{children}
			</Text>
		</Button>
	);
};
