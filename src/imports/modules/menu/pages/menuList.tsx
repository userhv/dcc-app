import React, { useContext, useRef, useState} from 'react';
import {Animated, SafeAreaView, ScrollView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { AnimatedHeader } from '../../../components/AnimatedHeader/AnimatedHeader';
import { menuListStyle } from './style/menuListStyle';
import { CardSecao } from '../components/CardSecao';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../components/GeneralComponents/GeneralComponents';
import { WebViewRN } from '../../../components/WebViewRN/WebViewRN';

interface IMenuList {
  navigation?: NativeStackNavigationProp<any>;
}

export const MenuList = (props: IMenuList) => {
  const {navigation } = props;

  const [rolagem, setRolagem] = useState<boolean>(true);

  const offset = useRef(new Animated.Value(0)).current;

  const { showModal } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;

  const abreWebViewFaq = () => {
		showModal({
      isFullScreen: true,
			renderedComponent: (_props: any) => (
				<WebViewRN url={'https://dcc.ufmg.br/perguntas-frequentes/'} handleClose={_props.onDismiss}/>
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

    <CardSecao titulo="Professores" descricao='Veja os professores ativos e voluntários do departamento.' 
              icone='account-group-outline'      
              onPress={() => 	navigation?.navigate('menuRoute', {
                screen: 'professores'})}
                rolagem={rolagem}/>

    <CardSecao titulo="Perguntas frequentes" descricao='Documentos, quero estudar no DCC, cursos, divulgação de bolsas, estágio, emprego.' 
              icone='account-question-outline'      
              onPress={() => 	abreWebViewFaq()}
              rolagem={rolagem}/>

    <CardSecao titulo="Fale conosco" descricao='Envie o seu feedback, com sugestões, críticas ou elogios sobre o aplicativo.' 
              icone='message-question-outline'      
              onPress={() => 	navigation?.navigate('menuRoute', {
                screen: 'contatos'})}
                rolagem={rolagem}/>              

    <CardSecao titulo='Sobre o aplicativo' descricao="Versão do app, termos de uso e política de privacidade." icone='information-outline'
      onPress={() => 	navigation?.navigate('menuRoute', {
        screen: 'sobre'})}
        rolagem={rolagem}/>
    
    </ScrollView>
  </SafeAreaView>
  )
};