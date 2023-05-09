import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {Button, Chip, Divider, IconButton, Text} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {theme} from '../../../paper/theme';
import {EnumMediator} from '../../../mediator/EnumMediator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as rssParser from 'react-native-rss-parser';
import {oportunidadesListRNStyle} from './style/oportunidadesListRNStyle';
import { useFocusEffect } from '@react-navigation/native';
import { mediator } from '../../../mediator/mediator';
import { Loading } from '../../../components/Loading/Loading';
import { CardOportunidades } from '../components/CardOportunidades';
import { nanoid } from 'nanoid';

interface IOportunidadesList {
  navigation?: NativeStackNavigationProp<any>;
}

export const OportunidadesList = (props: IOportunidadesList) => {
  const {navigation} = props;


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
    <View style={oportunidadesListRNStyle.container}>
      <StatusBar
        backgroundColor={theme.colors.branco}
        barStyle={'dark-content'}
      />
      <View style={oportunidadesListRNStyle.containerTop}>
        <View style={oportunidadesListRNStyle.descricao}>
          <Text variant="headlineSmall"> Painel de oportunidades </Text>
        </View>
      </View>
        <ScrollView style={{flex: 1}}>
          {eventos.length > 0 ? (
            <CardOportunidades
              key={nanoid()}
              oportunidade={eventos[0]}
              navigation={navigation}
              url={eventos[0].links[0].url}
              cor={theme.colors.vermelhoVivo}
              texto='Os próximos eventos'
              />
          ): null}
          {estagios.length > 0 ? (
            <CardOportunidades
              key={nanoid()}
              oportunidade={estagios[0]}
              navigation={navigation}
              url={estagios[0].links[0].url}
              cor={theme.colors.azulClaro}
              texto='Oportunidades de estágio'
              />
          ): null}
          {ics.length > 0 ? (
            <CardOportunidades
              key={nanoid()}
              oportunidade={ics[0]}
              navigation={navigation}
              url={ics[0].links[0].url}
              cor={theme.colors.marrom}
              texto='Iniciações Científicas'
              />
          ): null}
          {palestras.length > 0 ? (
            <CardOportunidades
              key={nanoid()}
              oportunidade={palestras[0]}
              navigation={navigation}
              url={palestras[0].links[0].url}
              cor={theme.colors.verdeClaro}
              texto='Próximas palestras'
              />           
          ): null}
        </ScrollView>
    </View>
  );
};
