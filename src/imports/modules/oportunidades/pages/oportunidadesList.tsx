import React, {useCallback,  useRef, useState} from 'react';
import {Animated, SafeAreaView, ScrollView, useColorScheme } from 'react-native';
import { useTheme} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {EnumMediator} from '../../../mediator/EnumMediator';
import * as rssParser from 'react-native-rss-parser';
import {oportunidadesListStyle} from './style/oportunidadesListStyle';
import { useFocusEffect } from '@react-navigation/native';
import { mediator } from '../../../mediator/mediator';
import { CardOportunidades } from '../components/CardOportunidades';
import { nanoid } from 'nanoid';
import { HeaderBar } from '../../../components/HeaderBar/HeaderBar';

interface IOportunidadesList {
  navigation: NativeStackNavigationProp<any>;
}

export const OportunidadesList = (props: IOportunidadesList) => {
  const {navigation} = props;

  const offset = useRef(new Animated.Value(0)).current;
  const theme = useTheme<{[key:string]: any}>();
  const { colors } = theme;
  const styles = oportunidadesListStyle(colors);

  const [estagios, setEstagios] = useState<rssParser.FeedItem[]>([]);
  const [ics, setIcs] = useState<rssParser.FeedItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      const _rsssNoticias = async () => rssOportunidades();
      _rsssNoticias();
    }, []),
  );

  const rssOportunidades = async () => {
    const dataEstagios: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.ESTAGIOS) as rssParser.FeedItem[];
    const dataIcs: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.IC) as rssParser.FeedItem[];
    dataEstagios && setEstagios(dataEstagios);
    dataIcs && setIcs(dataIcs);
  };

  return (
    <SafeAreaView style={styles.container}>
     <HeaderBar navigation={navigation} titulo='Painel de Oportunidades'/>
        <ScrollView style={{flex: 1}} 
                   onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                  )} scrollEventThrottle={16}>
          {estagios.length > 0 ? (
            <CardOportunidades
              key={nanoid()}
              oportunidade={estagios[0]}
              oportunidades={estagios}
              navigation={navigation}
              url={estagios[0].links[0].url}
              cor={colors.corCardOportunidadeEstagio}
              // onPress={() => {
              //   navigation?.navigate('oportunidadesRoute', {
              //     screen: 'OportunidadesEstagios',
              //     params: { screenState: 'view', type: EnumMediator.ESTAGIOS }})
              // }}
              texto='Oportunidades de estágio'
              />
          ): null}
          {ics.length > 0 ? (
            <CardOportunidades
              key={nanoid()}
              oportunidade={ics[0]}
              oportunidades={ics}
              navigation={navigation}
              url={ics[0].links[0].url}
              cor={colors.corCardOportunidadeIC}
              // onPress={() => {
              //   navigation?.navigate('oportunidadesRoute', {
              //     screen: 'OportunidadesIcs',
              //     params: { screenState: 'view', type: EnumMediator.IC }})
              // }}
              texto='Iniciações Científicas'
              />
          ): null}
        </ScrollView>
    </SafeAreaView>
  );
};
