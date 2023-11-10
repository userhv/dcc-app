import { View, useColorScheme } from 'react-native';
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import { dialogRNStyles } from './DialogRNStyle';

export interface IDialogRN {
	visible: boolean;
	textoHeader?: string;
	textoCorpo: string;
	labelConfirmar?: string;
    labelCancelar?: string;
	onDismiss: () => void;
	onConfirm?: () => void;
}

export const DialogRN = (props: IDialogRN) => {
	const { visible, onDismiss, textoHeader, textoCorpo, onConfirm, labelConfirmar, labelCancelar } = props;

	const { Title, Content, Actions } = Dialog;

	const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = dialogRNStyles(colors);
    const colorScheme = useColorScheme();

	return (
		<View>
			<Portal>
				<Dialog visible={visible} onDismiss={onDismiss} style={{...styles.container, backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco}}>
					<Title style={{ textAlign: 'center' }}>{textoHeader ?? ''}</Title>
					<Content>
						<Text variant="bodyLarge" style={{ textAlign: 'center' }}>
							{textoCorpo}
						</Text>
					</Content>
					<Actions style={styles.boxBotoes}>
						<Button onPress={onDismiss}  textColor={colors.accentClaro} mode='text'>
							{labelCancelar ?? 'Cancelar'}
						</Button>
						<Button onPress={onConfirm}  textColor={colors.accentClaro} mode='text'>
							{labelConfirmar ?? 'Salvar'}
						</Button>
					</Actions>
				</Dialog>
			</Portal>
		</View>
	);
};
