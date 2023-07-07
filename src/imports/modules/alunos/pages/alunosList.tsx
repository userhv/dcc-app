import React, {useContext, useRef, useState} from 'react';
import {Animated, SafeAreaView, ScrollView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { AnimatedHeader } from '../../../components/AnimatedHeader/AnimatedHeader';
import { menuListStyle } from './style/menuListStyle';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../components/GeneralComponents/GeneralComponents';
import { WebViewRN } from '../../../components/WebViewRN/WebViewRN';
import { CardSecao } from '../../../components/Secao/SecaoExterna/CardSecao';

interface IAlunosList {
  navigation: NativeStackNavigationProp<any>;
}

export const AlunosList = (props: IAlunosList) => {
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
    <AnimatedHeader animatedValue={offset} navigation={navigation} mensagemTitulo={'Espaço do aluno'} disableIcon/>
    <ScrollView style={{ flex: 1}} 
                   onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                  )} scrollEventThrottle={16}
                  onMomentumScrollBegin={() => setRolagem(false)}
                  onMomentumScrollEnd={() => setRolagem(true)}>
    
    <CardSecao titulo="Ofertas de disciplinas" descricao='Veja todas as informações das disciplinas ofertadas no semestre.' 
              icone='cast-education'      
              onPress={() => 	navigation?.navigate('alunosRoute', {
                screen: 'disciplinas'})}
                rolagem={rolagem}/>

    <CardSecao titulo="Professores" descricao='Professores ativos e voluntários do departamento.' 
              icone='account-group-outline'      
              onPress={() => 	navigation?.navigate('alunosRoute', {
                screen: 'professores'})}
                rolagem={rolagem}/>

    <CardSecao titulo="Laboratórios" descricao='Explore todos os laboratórios ativos.' 
                      icone='book-search-outline'      
                      onPress={() => 	abrirWebView('https://dcc.ufmg.br/nossos-laboratorios/')}
                      rolagem={rolagem}/>        
    </ScrollView>
  </SafeAreaView>
  )
};