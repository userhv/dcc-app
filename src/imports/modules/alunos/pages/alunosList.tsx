import React, {useEffect, useRef, useState} from 'react';
import {Animated, SafeAreaView, ScrollView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { AnimatedHeader } from '../../../components/AnimatedHeader/AnimatedHeader';
import { alunosListStyle } from './style/alunoListStyle';
import { CardSecao } from '../../../components/Secao/SecaoExterna/CardSecao';
import { useTheme } from 'react-native-paper';
import { IAsyncStorageUser } from '../../../context/UserContext';
import { getUser } from '../../../libs/getUser';

interface IAlunosList {
  navigation: NativeStackNavigationProp<any>;
}

export const AlunosList = (props: IAlunosList) => {
  const {navigation } = props;

  const theme = useTheme<{[key:string]: any}>();
  const { colors } = theme;
  const styles = alunosListStyle(colors);

  const [user, setUser] = useState<IAsyncStorageUser | undefined>(undefined);

	useEffect(() => {
		const user = async () => {
		  const userLogado = await getUser();
		  setUser(userLogado);
		}
		user();
	  }, []);
  
  const [rolagem, setRolagem] = useState<boolean>(true);
  const offset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
    <AnimatedHeader animatedValue={offset} navigation={navigation} mensagemTitulo={'Para você'} disableIcon/>
    <ScrollView style={{ flex: 1}} 
                   onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                  )} scrollEventThrottle={16}
                  onMomentumScrollBegin={() => setRolagem(false)}
                  onMomentumScrollEnd={() => setRolagem(true)}>

    <CardSecao titulo="Laboratórios" descricao='Explore os laboratórios ativos.' 
                      icone='book-search-outline'      
                      onPress={() => 	navigation?.navigate('Root',{
                        screen: 'WebView',
                        params:{
                          url: 'https://dcc.ufmg.br/nossos-laboratorios/'
                        }
                      })}
                      rolagem={rolagem}/>    
    
    <CardSecao titulo="Ofertas de disciplinas" descricao='Veja as informações das disciplinas ofertadas nos semestres.' 
              icone='cast-education'      
              onPress={() => 	navigation?.navigate('AlunosTab', {
                screen: 'OfertasDisciplinas'})}
                rolagem={rolagem}/>
    
    <CardSecao titulo="Oportunidades" descricao='Encontre bolsas de ICs, estágios e empregos disponível.' 
              icone='briefcase-search-outline'      
              onPress={() => 	navigation?.navigate('AlunosTab', {
                screen: 'Oportunidades', params: {user: user}})}
                rolagem={rolagem}/>

    <CardSecao titulo="Professores" descricao='Professores ativos e voluntários do departamento.' 
              icone='account-group-outline'      
              onPress={() => 	navigation?.navigate('AlunosTab', {
                screen: 'Professores'})}
                rolagem={rolagem}/>
    
    </ScrollView>
  </SafeAreaView>
  )
};