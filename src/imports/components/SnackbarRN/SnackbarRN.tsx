import { StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';

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

	return (
		<View style={styles.container}>
			<Snackbar
				visible={visible!}
				duration={duration ?? 2000}
				onDismiss={onDismiss}
				action={{
					label: actionLabel ?? '',
					onPress: onPress
				}}>
				{texto}
			</Snackbar>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		zIndex: 999,
		justifyContent: 'space-between',
		height: 0
	}
});
