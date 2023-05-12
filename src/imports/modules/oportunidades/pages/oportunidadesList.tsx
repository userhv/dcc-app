import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Animated, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {Text} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {theme} from '../../../paper/theme';
import {EnumMediator} from '../../../mediator/EnumMediator';
import * as rssParser from 'react-native-rss-parser';
import {oportunidadesListRNStyle} from './style/oportunidadesListRNStyle';
import { useFocusEffect } from '@react-navigation/native';
import { mediator } from '../../../mediator/mediator';
import { Loading } from '../../../components/Loading/Loading';
import { CardOportunidades } from '../components/CardOportunidades';
import { nanoid } from 'nanoid';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../components/GeneralComponents/GeneralComponents';
import { OportunidadeEvento } from './subpages/OportundadeEvento';
import { AnimatedHeader } from '../../../components/AnimatedHeader/AnimatedHeader';

interface IOportunidadesList {
  navigation?: NativeStackNavigationProp<any>;
}

export const OportunidadesList = (props: IOportunidadesList) => {
  const {navigation} = props;

  const offset = useRef(new Animated.Value(0)).current;

  const [eventos, setEventos] = useState<rssParser.FeedItem[]>([]);
  const [estagios, setEstagios] = useState<rssParser.FeedItem[]>([]);
  const [ics, setIcs] = useState<rssParser.FeedItem[]>([]);
  const [palestras, setPalestras] = useState<rssParser.FeedItem[]>([]);


  useFocusEffect(
    useCallback(() => {
      const _rsssNoticias = async () => rssOportunidades();
      _rsssNoticias();
    }, []),
  );

  const rssOportunidades = async () => {
    const dataEstagios: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.OPORTUNIDADES);
    const dataIcs: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.OPORTUNIDADES);
    const dataEventos: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.EVENTOS);
    const dataPalestras: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.PALESTRAS);
    dataEstagios && setEstagios(dataEstagios);
    dataIcs && setIcs(dataIcs);
    dataEventos && setEventos(dataEventos);
    dataPalestras && setPalestras(dataPalestras);
  };


  return (
    <SafeAreaView style={{flex: 1}}>
      <AnimatedHeader animatedValue={offset} navigation={navigation} mensagemTitulo={"Painel de Oportunidades"} disableIcon/>
        <ScrollView style={{flex: 1}} 
                   onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                  )} scrollEventThrottle={16}>
          {eventos.length > 0 ? (
            <CardOportunidades
              key={nanoid()}
              oportunidade={eventos[0]}
              oportunidades={eventos}
              navigation={navigation}
              url={eventos[0].links[0].url}
              cor={theme.colors.laranja}
              onPress={() => {
                navigation?.navigate('oportunidadesRoute', {
                  screen: 'OportunidadesEventos',
                  params: { screenState: 'view', type: EnumMediator.EVENTOS }})
              }}
              texto='Eventos do seu interesse'
              />
          ): null}
          {estagios.length > 0 ? (
            <CardOportunidades
              key={nanoid()}
              oportunidade={estagios[0]}
              oportunidades={estagios}
              navigation={navigation}
              url={estagios[0].links[0].url}
              cor={theme.colors.roxo}
              onPress={() => {}}
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
              cor={theme.colors.marrom}
              onPress={() => {}}
              texto='Iniciações Científicas'
              />
          ): null}
          {palestras.length > 0 ? (
            <CardOportunidades
              key={nanoid()}
              oportunidade={palestras[0]}
              oportunidades={palestras}
              navigation={navigation}
              url={palestras[0].links[0].url}
              cor={theme.colors.verde}
              onPress={() => {
                navigation?.navigate('oportunidadesRoute', {
                  screen: 'OportunidadesPalestras',
                  params: { screenState: 'view', type: EnumMediator.PALESTRAS }})
              }}
              texto='Palestras'
              />           
          ): null}
        </ScrollView>
    </SafeAreaView>
  );
};
