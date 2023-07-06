import React, {useContext, useRef, useState} from 'react';
import {Animated, SafeAreaView, ScrollView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { AnimatedHeader } from '../../../components/AnimatedHeader/AnimatedHeader';
import { menuListStyle } from './style/menuListStyle';
import { CardSecao } from '../../../components/Secao/SecaoExterna/CardSecao';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../components/GeneralComponents/GeneralComponents';
import { WebViewRN } from '../../../components/WebViewRN/WebViewRN';

interface IMenuList {
  navigation: NativeStackNavigationProp<any>;
}

export const MenuList = (props: IMenuList) => {
  const {navigation } = props;

  const [rolagem, setRolagem] = useState<boolean>(true);

  const offset = useRef(new Animated.Value(0)).current;

  const { showModal } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;

  const abrirWebView = (url: string) => {
		showModal({
      isFullScreen: true,
			renderedComponent: (_props: any) => (
				<WebViewRN url={url} handleClose={_props.onDismiss} navigation={navigation}/>
			)
		});
  }

  return (
    <SafeAreaView style={menuListStyle.container}>
    <AnimatedHeader animatedValue={offset} navigation={navigation} mensagemTitulo={'Mais opções'} disableIcon/>
    <ScrollView style={{ flex: 1}} 
                   onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                  )} scrollEventThrottle={16}
                  onMomentumScrollBegin={() => setRolagem(false)}
                  onMomentumScrollEnd={() => setRolagem(true)}>

    <CardSecao titulo="Perguntas frequentes" descricao='Documentos, quero estudar no DCC, cursos, divulgação de bolsas, estágio, emprego.' 
              icone='account-question-outline'   
              onPress={() => 	abrirWebView('https://dcc.ufmg.br/perguntas-frequentes/')}  
              rolagem={rolagem}/>

    <CardSecao titulo="Fale conosco" descricao='Contato do departamento, colegiados, pós-graduação, especialização ou graduação.' 
                      icone='contacts-outline'     
                      onPress={() => 	abrirWebView('https://dcc.ufmg.br/contatos/')}  
                        rolagem={rolagem}/>    

    <CardSecao titulo="Feedback" descricao='Envie o seu feedback, com sugestões, críticas ou elogios sobre o aplicativo.' 
              icone='message-question-outline'      
              onPress={() => 	navigation?.navigate('menuRoute', {
                screen: 'feedback'})}
                rolagem={rolagem}/>       

    <CardSecao titulo='Sobre o aplicativo' descricao="Versão do app, notas da versão e política de privacidade." icone='information-outline'
      onPress={() => 	navigation?.navigate('menuRoute', {
        screen: 'sobre'})}
        rolagem={rolagem}/>
    
    </ScrollView>
  </SafeAreaView>
  )
};