import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { useCallback, useContext, useEffect, useState } from "react";
import { View, Image, Platform, ScrollView, useColorScheme } from "react-native"
import { Button, useTheme,Text, TextInput } from "react-native-paper"
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
import { IAnexo } from "../../../anexos/IAnexo";
import { anexoOff } from "../../../anexos/anexoOff";
import { EnumAnexo } from "../../../anexos/EnumAnexo";
import { useFocusEffect } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import { nanoid } from "nanoid";
import { ModalAutenticacao } from "../../../../components/Autenticacao/Autenticacao";
import { getUser } from "../../../../libs/getUser";

export const Login = (props: any) => {
	GoogleSignin.configure({
    webClientId: '604420909114-sp4m7gl21f6q0lsa97m2ihs2tmjrt6sq.apps.googleusercontent.com'
  });

  const {navigation, route} = props;
	const theme = useTheme<{[key:string]: any}>();
	const { colors } = theme;
	const styles = loginStyle(colors);
  const [user, setUser] = useState<IAsyncStorageUser | undefined>(route.params.user);
  const [rolagem, setRolagem] = useState<boolean>(true);
  const { showSnackBar, showModal, showDialog } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;
  const [nomeCurriculo, setNomeCurriculo] = useState<string | undefined>(undefined);
	const [nomeHistorico, setNomeHistorico] = useState<string | undefined>(undefined);
  const colorScheme = useColorScheme();
 

  useFocusEffect(
    useCallback(() => {
      const retornaArquivos = async() => {
        if(user){
          const curriculo = await anexoOff.retornaAnexo(user.email, EnumAnexo.CURRICULO) as IAnexo[];
          const historico = await anexoOff.retornaAnexo(user.email, EnumAnexo.HISTORICO) as IAnexo[];
          setNomeCurriculo(curriculo.length > 0 ? curriculo[0].nome : undefined);
          setNomeHistorico(historico.length > 0 ? historico[0].nome : undefined);
        }
      }
      retornaArquivos();
    }, []),
  );


	const modalAutenticacao = () => {
		showModal({
		   renderedComponent: (_props: any) => (
			 <ModalAutenticacao
				 navigation={navigation}
			   handleCancela={_props.onDismiss}
         handleLogin={async() => await login()}
         setUser={setUser}
				 {...{ showSnackBar, showDialog }}/>
		   )
		   });
   }


	const login = async () => {
		try {
      auth()
      .signInAnonymously()
      .then(() => {
       
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }
    
        console.error(error);
      });

      
		} catch (error: any) {
			console.log(error)
		  if (error.code === statusCodes.SIGN_IN_CANCELLED) {
			showSnackBar({ texto: "Login cancelado"});
		  } else if (error.code === statusCodes.IN_PROGRESS) {
			showSnackBar({ texto: "Autenticando usuário..."});
		  } 
		}
	};

	const confirmacaoExcluirDados = () => {
		showModal({
			renderedComponent: (_props: any) => (
			  <ModalConfirmacao
          navigation={navigation}
          handleCancela={_props.onDismiss}
          handleConfirma={async() => await excluirDados()}
          texto='Remover seus dados implica em revogar a autenticação com sua conta. Será necessário autenticar novamente caso queira se cadastrar em alguma oportunidade.'
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
      await auth().signOut();
		} catch (error) {
		  	console.error(error);
		}
	};

 

  const style = Platform.OS === 'ios' ? styleIOS : null;

  return(
      <View style={{...styles.container, ...style}}>
      <HeaderBar navigation={navigation} titulo={user ? 'Minha conta' : 'Autenticar conta'}/>
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
                  onPress={() => 	navigation?.navigate('MenuTab', {screen: 'Perfil', 
                      params:{ 
                        user: user, 
                        nomeHistorico: nomeHistorico, 
                        nomeCurriculo: nomeCurriculo
                      }
                      })}  
                  rolagem={rolagem}
              />
              


            <View style={styles.boxRemoverConta}>
              <Button mode='contained' 
                  style={{backgroundColor: colorScheme === 'dark' ? colors.accent: colors.accent}}
                  icon='account-remove-outline'
                  onPress={() => confirmacaoExcluirDados()}> 
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
                  icon={() => <Image source={require( '../../../../../img/DCC-ICONE.png')}  style={{width: 30, height: 30}} />}
                  buttonColor={colors.branco}
                  textColor={colors.cinza30}
                  style={{borderRadius: 6, marginBottom: 10}}
                  onPress={modalAutenticacao}>
                  Login com DCC
              </Button> 
              
              {/* <View style={{marginTop: 10}}>
                <Button 
                    mode='elevated'
                    icon={() => <Image source={require( '../../../../../img/minhaufmg.png')}  style={{width: 25, height: 25}} />}
                    buttonColor={colors.branco}
                    textColor={colors.cinza30}
                    style={{borderRadius: 6, backgroundColor: colors.cinza20}}
                    onPress={() => showSnackBar({texto: 'Suporte ao login com minhaUFMG estará disponível em breve.'})}>
                      <Text style={{color: colors.cinza60}}>
                          Login com minhaUFMG
                      </Text>
                </Button> 
              </View> */}
            </View>
          </View>
      )}
      </View>
  )
}