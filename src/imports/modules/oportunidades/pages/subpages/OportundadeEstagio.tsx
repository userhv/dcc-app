import {Animated, SafeAreaView, ScrollView, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import * as rssParser from 'react-native-rss-parser';
import {CardOportunidades} from '../../components/CardOportunidades';
import {Loading} from '../../../../components/Loading/Loading';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {mediator} from '../../../../mediator/mediator';
import {EnumMediator} from '../../../../mediator/EnumMediator';
import {AnimatedHeader} from '../../../../components/AnimatedHeader/AnimatedHeader';
import {oportunidadesListRNStyle} from '../style/oportunidadesListRNStyle';
import {Chip, Text} from 'react-native-paper';
import {theme} from '../../../../paper/theme';

interface IOportunidadeEstagio{
  screenState: string;
  navigation?: NativeStackNavigationProp<any>;
}

export const OportunidadeEstagio = (props: IOportunidadeEstagio) => {
  const [estagiosAtivos, setEstagiosAtivos] = useState<rssParser.FeedItem[]>([]);
  const [estagios, setEstagios] = useState<rssParser.FeedItem[]>([]);
  const [estagiosConcluidos, setEstagiosConcluidos] = useState<rssParser.FeedItem[]>([]);
  const {screenState, navigation} = props;
  const mensagemTitulo = 'Estágios';

  const [isEstagioAtivo, setIsEstagioAtivo] = useState<boolean>(true);
  const [isEstagiosConcluidos, setIsEstagioConcluidos] = useState<boolean>(false);

  const offset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const _retornaEstagios = async () => await retornaEstagios();
    _retornaEstagios();
  }, []);

  useEffect(() => {
    const _retornaEstagios = async () => {
      await retornaEstagiosConcluidos();
      await retornaEstagiosAtivos();
    };
    _retornaEstagios();
  }, [estagios]);

  const renderizaEstagiosAtivos = async () => {
    setIsEstagioAtivo(true);
    setIsEstagioConcluidos(false);
    // if(noticias.length == 0) await rssNoticias();
  };

  const renderizaEstagiosConcluidas = async () => {
    setIsEstagioAtivo(false);
    setIsEstagioConcluidos(true);
  };

  const retornaEstagiosConcluidos = async () => {
    const estagiosConcluidos = estagios?.filter(estagio =>
      estagio.categories.find(o => o?.name === 'Concluído'),
    );
    estagiosConcluidos && setEstagiosConcluidos(estagiosConcluidos);
  };

  const retornaEstagiosAtivos = async () => {
    const estagiosAtivos = estagios?.filter(ic =>
      ic.categories.find(o => o?.name === 'Ativo'),
    );
    estagiosAtivos && setEstagiosAtivos(estagiosAtivos);
  };

  const retornaEstagios = async () => {
    const dataEstagios: rssParser.FeedItem[] | undefined =
      await mediator.selecionaRequisicao(EnumMediator.ESTAGIOS);
      dataEstagios && setEstagios(dataEstagios);
  };

  return (
    <SafeAreaView style={oportunidadesListRNStyle.container}>
      <AnimatedHeader
        animatedValue={offset}
        navigation={navigation}
        mensagemTitulo={mensagemTitulo}
      />
      <View style={{...oportunidadesListRNStyle.boxChip, justifyContent: 'flex-start'}}>
        <Chip
          onPress={async () => await renderizaEstagiosAtivos()}
          icon={() => null}
          selected={isEstagioAtivo}
          style={{
            ...oportunidadesListRNStyle.chipStyle,
            backgroundColor: isEstagioAtivo
              ? theme.colors.azul
              : theme.colors.azulOpacoSelecionado,
            borderColor: isEstagioAtivo
              ? theme.colors.azulEscuro
              : theme.colors.azul,
          }}
          selectedColor={isEstagioAtivo ? theme.colors.branco : theme.colors.azul}>
          {' '}
          Ativas{' '}
        </Chip>
        <Chip
          onPress={async () => await renderizaEstagiosConcluidas()}
          icon={() => null}
          selected={isEstagiosConcluidos}
          style={{
            ...oportunidadesListRNStyle.chipStyle,
            backgroundColor: isEstagiosConcluidos
              ? theme.colors.azul
              : theme.colors.azulOpacoSelecionado,
            borderColor: isEstagiosConcluidos
              ? theme.colors.azulEscuro
              : theme.colors.azul,
          }}
          selectedColor={
            isEstagiosConcluidos ? theme.colors.branco : theme.colors.azul
          }>
          {' '}
          Concluídas
        </Chip>
      </View>
      <ScrollView
        style={{flex: 1}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: offset}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        {estagiosAtivos.length > 0 && estagiosAtivos ? (
          estagiosAtivos.map((ic, i) => (
            <CardOportunidades
              key={i}
              oportunidade={ic}
              navigation={navigation}
              url={ic.links[0].url}
            />
          ))
        ) : estagiosConcluidos ? (
          estagiosConcluidos.map((ic, i) => (
            <CardOportunidades
              key={i}
              oportunidade={ic}
              navigation={navigation}
              url={ic.links[0].url}
            />
          ))
        ) : (
          <View style={oportunidadesListRNStyle.loading}>
            <Loading />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
