import { useColorScheme } from 'react-native';
import { Snackbar, Text, useTheme } from 'react-native-paper';

export interface ISnackBarRN {
	texto: string;
	visible: boolean;
	onDismiss: () => void;
	duration?: number;
	onPress?: () => void;
	actionLabel?: string;
}

export const SnackBarRN = (props: ISnackBarRN) => {
	const { visible, onDismiss, duration, texto, actionLabel, onPress } = props;
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const colorScheme = useColorScheme();

	return (
		<Snackbar
			visible={visible!}
			duration={duration ?? 2000}
			onDismiss={onDismiss}
			style={{backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco}}
			action={{
				label: actionLabel ?? '',
				textColor: colorScheme === 'dark' ? colors.vermelhoVivoForte : colors.vermelhoVivo,
				onPress: onPress,
			}}>
			<Text style={{color: colorScheme === 'dark' ? colors.branco : colors.preto}}>
				{texto}
			</Text>
			
		</Snackbar>
	);
};

