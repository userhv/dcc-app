import { Button, ButtonProps, Text } from 'react-native-paper';
import { theme } from '../../theme';

interface IPrimaryButton extends ButtonProps {
	posicaoIcone?: 'direita' | 'esquerda';
	size?: 'medium' | 'small';
}

export const PrimaryButton = (props: IPrimaryButton) => {
	const { children, posicaoIcone, contentStyle, style, size = 'medium', disabled } = props;

	const isSmnall = size === 'small';

	const defaultStyle = {
		...(typeof style === 'object' ? style : {}),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: disabled ? theme.colors.cinza90 : theme.colors.verdeVale,
		borderRadius: 8,
		borderColor: disabled ? theme.colors.cinza90 : theme.colors.verdeVale,
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
							paddingVertical: 2,
							height: 46
					  }
					: {
							...defaultStyle,
							paddingHorizontal: 14,
							paddingVertical: 7,
							height: 54
					  }
			}
			contentStyle={{
				...(typeof contentStyle === 'object' ? contentStyle : {}),
				flexDirection: posicaoIcone && posicaoIcone === 'esquerda' ? 'row' : 'row-reverse'
			}}
			labelStyle={{ color: disabled ? theme.colors.cinza50 : theme.colors.onPrimary }}>
			<Text variant="labelLarge" style={{ color: disabled ? theme.colors.cinza50 : theme.colors.onPrimary }}>
				{children}
			</Text>
		</Button>
	);
};
