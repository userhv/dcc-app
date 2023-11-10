import React, {useEffect, useRef, useState} from 'react';
import {Animated, SafeAreaView, ScrollView, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { AnimatedHeader } from '../../../components/AnimatedHeader/AnimatedHeader';
import { menuListStyle } from './style/menuListStyle';
import { CardSecao } from '../../../components/Secao/SecaoExterna/CardSecao';
import { useTheme, Text } from 'react-native-paper';
import { Divisor } from '../../../components/Divisor/Divisor';
import { IAsyncStorageUser } from '../../../context/UserContext';
import { getUser } from '../../../libs/getUser';

interface IMenuList {
  navigation: NativeStackNavigationProp<any>;
}

export const MenuList = (props: IMenuList) => {
  const {navigation } = props;

  const [rolagem, setRolagem] = useState<boolean>(true);

  const theme = useTheme<{[key:string]: any}>();
  const { colors } = theme;
  const styles = menuListStyle(colors);


  const [user, setUser] = useState<IAsyncStorageUser | undefined>(undefined);

	useEffect(() => {
		const user = async () => {
		  const userLogado = await getUser();
		  setUser(userLogado);
		}
		user();
	  }, []);

    
  
  const offset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
    <AnimatedHeader animatedValue={offset} navigation={navigation} mensagemTitulo={'Meus dados'} disableIcon/>
    <ScrollView style={{ flex: 1}} 
                   onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                  )} scrollEventThrottle={16}
                  onMomentumScrollBegin={() => setRolagem(false)}
                  onMomentumScrollEnd={() => setRolagem(true)}>

    <CardSecao titulo="Minha conta" descricao='Veja e edite seus documentos, remova seus dados.' 
              icone='account-circle-outline'   
              onPress={() => 	navigation?.navigate('MenuTab', {screen: 'Login', params: {user: user}})}  
              rolagem={rolagem}/>

    <Divisor />

    <Text style={{padding: 10}} variant='titleLarge'> Mais opções </Text>

    <CardSecao titulo="Contatos" descricao='Contato do departamento, colegiados, pós-graduação, especialização ou graduação.' 
              icone='contacts-outline'     
              onPress={() => 	navigation?.navigate('Root',{screen: 'WebView', 
                    params:{
                      url: 'https://dcc.ufmg.br/contatos/'
                    }})}  
              rolagem={rolagem}/>   

    {/* <CardSecao titulo="Feedback" descricao='Envie o seu feedback, com sugestões, críticas ou elogios sobre o aplicativo.' 
              icone='alert-circle-outline'      
              onPress={() => 	
                user ? (
                  navigation?.navigate('MenuTab', {screen: 'Feedback'})
                ) : (
                  navigation?.navigate('MenuTab', {screen: 'Login', params: {user: user}})
                )}
                rolagem={rolagem}/>   */}

    <CardSecao titulo="Perguntas frequentes" descricao='Documentos, quero estudar no DCC, cursos, divulgação de bolsas, estágio, emprego.' 
              icone='help-circle-outline'   
              onPress={() => 	navigation?.navigate('Root', {screen: 'WebView', 
                    params:{
                      url: 'https://dcc.ufmg.br/perguntas-frequentes/'
                    }})}  
              rolagem={rolagem}/> 

    <CardSecao titulo='Sobre o aplicativo' descricao="Versão do app, notas da versão e política de privacidade." icone='information-outline'
            onPress={() => 	navigation?.navigate('MenuTab', {
              screen: 'Sobre'})}
              rolagem={rolagem}/>

        <View style={styles.infosDCC}>
              <Text variant='labelSmall' style={{textAlign: 'center'}}>
                  © {new Date().getFullYear()} DCC/UFMG {"\n"}
                  Sistemas de Informação e Comunicação
              </Text>
          </View>
    
    </ScrollView>
  </SafeAreaView>
  )
};