import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Platform, View, useColorScheme  } from 'react-native';
import {  oportunidadesCadastroStyle } from './style/oportunidadesCadastroStyle';
import { theme } from '../../../paper/theme';
import * as rssParser from 'react-native-rss-parser';
import { HeaderBar } from '../../../components/HeaderBar/HeaderBar';
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
  } from '@react-native-google-signin/google-signin';
import { styleIOS } from '../../../paper/stylesIOS';
import { Button, useTheme, Text, TextInput, IconButton } from 'react-native-paper';
import { Alerta } from '../../../components/Alerta/Alerta';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';


interface IOportunidadesCadastro {
	user?: any;
	screenState?: string;
	id?: string;
	navigation: NativeStackNavigationProp<any>;
}

export const OportunidadesCadastro = (props: any) => {
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = oportunidadesCadastroStyle(colors);
	const colorScheme = useColorScheme();

	const {navigation} = props;
	const [loggedIn, setloggedIn] = useState(false);
	const [estadoProgresso, setEstadoProgresso] = useState(false);
	const [userInfo, setuserInfo] = useState({});

	GoogleSignin.configure();
	
	const login = async () => {
		try {
		  await GoogleSignin.hasPlayServices();
		  const userInfo = await GoogleSignin.signIn();
		  setuserInfo({ userInfo });
		} catch (error: any) {
		  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
			// usuário cancelou o fluxo de login
		  } else if (error.code === statusCodes.IN_PROGRESS) {
			// operação (por exemplo, o login) já está em andamento
			setEstadoProgresso(true)
		  } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			// serviços de execução não disponível ou desatualizado
		  } else {
			// algum outro erro ocorreu
		  }
		}
	  };

	  const signOut = async () => {
		try {
		  await GoogleSignin.signOut();
		  setuserInfo({ user: null }); // Remember to remove the user from your app's state as well
		} catch (error) {
		  console.error(error);
		}
	  };

	  const style = Platform.OS === 'ios' ? styleIOS : null;

	  const [text, setText] = React.useState("OI");

	return (
		<View style={{...styles.container, ...style}}>
		<HeaderBar navigation={navigation} titulo='Meu perfil'/>
		<GestureHandlerRootView style={{flex: 1}}>
			<ScrollView>
				<Alerta detalhes={
					<Text variant='labelLarge' 
						style={{color: colorScheme === 'dark' ? colors.vermelhoVivoForte : colors.vermelhoVivo}} numberOfLines={4}> 
					Todos os seus dados são salvos apenas localmente. </Text>
				} />

				<View style={{flexDirection: 'column'}}>			
					<View style={{margin: 10}}>
						<View style={styles.boxInputDados}>
							<Text variant='labelSmall'> Nome</Text>
							<View style={{...styles.inputDados, backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco}}>
								<Text variant='bodyLarge' numberOfLines={2}> Nome Completo F. dos Santos</Text>
							</View>
						</View>
						<View style={styles.boxInputDados}>
							<Text variant='labelSmall'> Email</Text>
							<View style={{...styles.inputDados, backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco}}>
								<Text variant='bodyLarge' numberOfLines={2}> teste@email.com</Text>
							</View>
						</View>
					</View>

					<View  style={styles.areaUpload}>
						<Text variant='labelSmall'> Histórico escolar</Text>
						<View style={{ ...styles.boxUpload, backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.branco}}>
							<Text variant='bodyLarge' numberOfLines={2}>  Curriculo.pdf </Text>
							<IconButton icon={'trash-can-outline'} 
										iconColor={colorScheme === 'dark' ? colors.branco : colors.preto} 
										onPress={() => null}/>
						</View>

						<View style={styles.boxBotoesUpload}>
							<Button mode='contained' 
									buttonColor={colors.accent}
									icon='file-upload-outline'
									onPress={() => null}> 
										Upload do curriculo
							</Button>
							</View>
					</View>




				</View>



		{/* <View style={styles.boxCentral}>




			 <Button 
				mode='elevated'
				icon={() => <Image source={require( '../../../../img/icon_google.png')}  style={{width: 25, height: 25}} />}
				buttonColor={colors.branco}
				textColor={colors.cinza30}
				style={{borderRadius: 6}}
				onPress={login}
				disabled={estadoProgresso}>
				Login com Google
			</Button> 


		</View> */}
</ScrollView>
		</GestureHandlerRootView>
	  	</View>
	);
};
