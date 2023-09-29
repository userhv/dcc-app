import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { useContext, useState } from "react";
import { View, Image, Platform, ScrollView, useColorScheme } from "react-native"
import { Button, useTheme,Text } from "react-native-paper"
import { IAsyncStorageUser } from "../../../../context/UserContext";
import { GeneralComponentsContext, IGeneralComponentsContext } from "../../../../components/GeneralComponents/GeneralComponents";
import { USER_ASYNC_COLLECTION } from "../../../../config/storageConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeaderBar } from "../../../../components/HeaderBar/HeaderBar";
import { styleIOS } from "../../../../paper/stylesIOS";
import { CardSecao } from "../../../../components/Secao/SecaoExterna/CardSecao";
import { UsuarioAutenticado } from "../../../usuario/pages/UsuarioAutenticado/UsuarioAutenticado";
import { Divisor } from "../../../../components/Divisor/Divisor";
import { cadastroOff } from "../../../usuario/api/cadastroOff";
import { loginStyle } from "../style/LoginStyle";
import { ModalConfirmacao } from "../../../../components/ModalConfirmacao/ModalConfirmacao";

export const Login = (props: any) => {
	GoogleSignin.configure();

  const {navigation, route} = props;
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = loginStyle(colors);

  const [user, setUser] = useState<IAsyncStorageUser | undefined>(route.params.user);
  const [rolagem, setRolagem] = useState<boolean>(true);
  const { showSnackBar, showModal, showDialog } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;
  const colorScheme = useColorScheme();

	const configuraUsuarioAsyncStorage = async (user: IAsyncStorageUser) => {
		try {
			const userJsonString = JSON.stringify(user);
			await AsyncStorage.clear();
			await AsyncStorage.setItem(USER_ASYNC_COLLECTION, userJsonString);
		} catch (e: any) {
			showSnackBar({ texto: `Erro ao definir dados do usuário: ${e.message}`, duration: 2000 });
		}
	};


	const login = async () => {
		try {
		  await GoogleSignin.hasPlayServices();
		  const userInfo = await GoogleSignin.signIn();
		  const {name, email} = userInfo.user;
		  setUser(name ? {name, email} : {email});
      configuraUsuarioAsyncStorage(name ? {name, email} : {email});
      cadastroOff.insert({nome: name ?? undefined, email: email});
		} catch (error: any) {
			console.log(error)
		  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
			showSnackBar({ texto: "Login cancelado"});
		  } else if (error.code === statusCodes.IN_PROGRESS) {
			showSnackBar({ texto: "Autenticando usuário..."});
		  } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			showSnackBar({ texto: "Não é possível autenticar, play services indisponível."});
		  }
		}
	};

	const confirmacaoExcluirDados = async () => {
		showModal({
			renderedComponent: (_props: any) => (
			  <ModalConfirmacao
				handleCancela={_props.onDismiss}
				handleConfirma={async() => await excluirDados()}
				texto='Remover seus dados implica em revogar a autenticação com sua conta Google. Será necessário autenticar novamente caso queira se cadastrar em alguma oportunidade.'
				titulo='Remover seus dados?'
				labelConfirmar='Remover dados'
			  	{...{ showSnackBar, showDialog }}/>
			)
			});
	}
	
	const excluirDados = async () => {
		try {
      await cadastroOff.removeCadastro();
			await AsyncStorage.clear();
			setUser(undefined);
			await GoogleSignin.revokeAccess();
		} catch (error) {
		  	console.error(error);
		}
	};

  const style = Platform.OS === 'ios' ? styleIOS : null;

  return(
      <View style={{...styles.container, ...style}}>
      <HeaderBar navigation={navigation} titulo={user? 'Minha conta' : 'Autenticar conta'}/>
      {user ? (
        <ScrollView style={{flex: 1}}  
            onMomentumScrollBegin={() => setRolagem(false)}
            onMomentumScrollEnd={() => setRolagem(true)}>
            <UsuarioAutenticado 
                user={user}
                navigation={navigation}/>

          <Divisor style={{marginTop: 10, marginBottom: 10}}/>

          <Text style={{padding: 10}} variant="titleLarge"> Mais opções</Text>

          <CardSecao titulo="Documentos" descricao='Veja e edite seus documentos utilizados para se cadastrar nas oportunidades.' 
                  icone='file-outline'   
                  onPress={() => 	navigation?.navigate('MenuTab', {screen: 'Perfil', params:{ user: user}})}  
                  rolagem={rolagem}
              />
              
            <View style={styles.boxRemoverConta}>
              <Button mode='contained' 
                  style={{backgroundColor: colorScheme === 'dark' ? colors.accent: colors.accent}}
                  icon='account-remove-outline'
                  onPress={async() => await confirmacaoExcluirDados()}> 
                  <Text style={{color: colors.branco}}>
                      Remover meus dados
                  </Text>
              </Button>
            </View>
          </ScrollView>
      ): (
          <View style={styles.boxCentral}>
            <View>
              <Button 
                  mode='elevated'
                  icon={() => <Image source={require( '../../../../../img/icon_google.png')}  style={{width: 25, height: 25}} />}
                  buttonColor={colors.branco}
                  textColor={colors.cinza30}
                  style={{borderRadius: 6, marginBottom: 10}}
                  onPress={login}>
                  Login com Google
              </Button> 
              <Button 
                  mode='elevated'
                  icon={() => <Image source={require( '../../../../../img/minhaufmg.png')}  style={{width: 25, height: 25}} />}
                  buttonColor={colors.branco}
                  disabled={true}
                  textColor={colors.cinza30}
                  style={{borderRadius: 6, backgroundColor: colors.cinza20}}
                  onPress={() => null}>
                    <Text style={{color: colors.cinza60}}>
                        Login com minhaUFMG
                    </Text>
              </Button> 
            </View>
        </View> 
      )}
      </View>
  )
}