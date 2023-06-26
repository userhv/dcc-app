import React, {useRef, useState} from 'react';
import {Animated, SafeAreaView, ScrollView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { AnimatedHeader } from '../../../components/AnimatedHeader/AnimatedHeader';
import { menuListStyle } from './style/menuListStyle';
import { CardSecao } from '../components/CardSecao';

interface IMenuList {
  navigation?: NativeStackNavigationProp<any>;
}

export const MenuList = (props: IMenuList) => {
  const {navigation } = props;

  const [rolagem, setRolagem] = useState<boolean>(true);

  const offset = useRef(new Animated.Value(0)).current;

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

    <CardSecao titulo="Professores" descricao='Professores ativos e voluntários do departamento.' 
              icone='account-group-outline'      
              onPress={() => 	navigation?.navigate('menuRoute', {
                screen: 'professores'})}
                rolagem={rolagem}/>

    <CardSecao titulo="Laboratórios" descricao='Explore todos os laboratórios ativos.' 
                  icone='book-search-outline'      
                  onPress={() => 	navigation?.navigate('menuRoute', {
                    screen: 'WebViewMenu',
                    params: {url: 'https://dcc.ufmg.br/nossos-laboratorios/'}})}
                  rolagem={rolagem}/>

    <CardSecao titulo="Perguntas frequentes" descricao='Documentos, quero estudar no DCC, cursos, divulgação de bolsas, estágio, emprego.' 
              icone='account-question-outline'   
              onPress={() => 	navigation?.navigate('menuRoute', {
                screen: 'WebViewMenu',
                params: {url: 'https://dcc.ufmg.br/perguntas-frequentes/'}})}   
              rolagem={rolagem}/>

    <CardSecao titulo="Fale conosco" descricao='Contato do departamento, colegiados, pós-graduação, especialização ou graduação.' 
                      icone='contacts-outline'     
                      onPress={() => 	navigation?.navigate('menuRoute', {
                        screen: 'WebViewMenu',
                        params: {url: 'https://dcc.ufmg.br/contatos/'}})}   
                        rolagem={rolagem}/>    

    <CardSecao titulo="Feedback" descricao='Envie o seu feedback, com sugestões, críticas ou elogios sobre o aplicativo.' 
              icone='message-question-outline'      
              onPress={() => 	navigation?.navigate('menuRoute', {
                screen: 'contatos'})}
                rolagem={rolagem}/>       

    <CardSecao titulo='Sobre o aplicativo' descricao="Versão do app e política de privacidade." icone='information-outline'
      onPress={() => 	navigation?.navigate('menuRoute', {
        screen: 'sobre'})}
        rolagem={rolagem}/>
    
    </ScrollView>
  </SafeAreaView>
  )
};