import React, { useRef} from 'react';
import {Animated, SafeAreaView, ScrollView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { AnimatedHeader } from '../../../components/AnimatedHeader/AnimatedHeader';
import { menuListRNStyle } from './style/menuListRNStyle';
import { CardSecao } from '../components/CardSecao';

interface IMenuList {
  navigation?: NativeStackNavigationProp<any>;
}

export const MenuList = (props: IMenuList) => {
  const {navigation} = props;

  const offset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={menuListRNStyle.container}>
    <AnimatedHeader animatedValue={offset} navigation={navigation} mensagemTitulo={'Mais opções'} disableIcon/>
    <ScrollView style={{ flex: 1}} 
                   onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                  )} scrollEventThrottle={16}>

    <CardSecao titulo="Professores do DCC" descricao='Veja os professores ativos no departamento.' 
              icone='account-group-outline'      
              onPress={() => 	navigation?.navigate('menuRoute', {
                screen: 'professores',})}/>
    <CardSecao titulo='Sobre o aplicativo' descricao="Versão do do app, termos de uso e política de privacidade." icone='information-outline'
      onPress={() => 	navigation?.navigate('menuRoute', {
        screen: 'sobre',})}/>
    
    </ScrollView>
  </SafeAreaView>
  )
};