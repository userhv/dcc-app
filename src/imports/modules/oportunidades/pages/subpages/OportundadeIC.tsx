import {Animated, SafeAreaView, ScrollView, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import * as rssParser from 'react-native-rss-parser';
import {CardOportunidades} from '../../components/CardOportunidades';
import {Loading} from '../../../../components/Loading/Loading';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {mediator} from '../../../../mediator/mediator';
import {EnumMediator} from '../../../../mediator/EnumMediator';
import {AnimatedHeader} from '../../../../components/AnimatedHeader/AnimatedHeader';
import {oportunidadesListRNStyle} from '../style/oportunidadesListStyle';
import {Chip, Text} from 'react-native-paper';
import {theme} from '../../../../paper/theme';

interface IOportunidadeIC {
  screenState: string;
  navigation?: NativeStackNavigationProp<any>;
}

export const OportunidadeIC = (props: IOportunidadeIC) => {
  const [icsAtivas, setIcsAtivas] = useState<rssParser.FeedItem[]>([]);
  const [ics, setIcs] = useState<rssParser.FeedItem[]>([]);
  const [icsConcluidas, setIcsConcluidas] = useState<rssParser.FeedItem[]>([]);
  const {screenState, navigation} = props;
  const mensagemTitulo = 'Iniciações Científicas';
  const [isIcsAtivas, setIsIcsAtivas] = useState<boolean>(true);
  const [isIcsConcluidas, setIsIcsConcluidas] = useState<boolean>(false);

  const offset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const _retornaIcs = async () => await retornaIcs();
    _retornaIcs();
  }, []);

  useEffect(() => {
    const _retornaIcs = async () => {
      await retornaIcsConcluidas();
      await retornaIcsAtivas();
    };
    _retornaIcs();
  }, [ics]);

  const renderizaIcsAtivas = async () => {
    setIsIcsAtivas(true);
    setIsIcsConcluidas(false);
    // if(noticias.length == 0) await rssNoticias();
  };

  const renderizaIcsConcluidas = async () => {
    setIsIcsAtivas(false);
    setIsIcsConcluidas(true);
  };

  const retornaIcsConcluidas = async () => {
    const icsConcluidas = ics?.filter(ic =>
      ic.categories.find(o => o?.name === 'Concluído'),
    );
    icsConcluidas && setIcsConcluidas(icsConcluidas);
  };

  const retornaIcsAtivas = async () => {
    const icsAtivas = ics?.filter(ic =>
      ic.categories.find(o => o?.name === 'Ativo'),
    );
    icsAtivas && setIcsAtivas(icsAtivas);
  };

  const retornaIcs = async () => {
    const dataICs: rssParser.FeedItem[] | undefined =
      await mediator.selecionaRequisicao(EnumMediator.IC);
    dataICs && setIcs(dataICs);
  };

  return (
    <SafeAreaView style={oportunidadesListRNStyle.container}>
      <AnimatedHeader
        animatedValue={offset}
        navigation={navigation}
        mensagemTitulo={mensagemTitulo}
      />
      <View style={oportunidadesListRNStyle.boxChip}>
        <Chip
          onPress={async () => await renderizaIcsAtivas()}
          icon={() => null}
          selected={isIcsAtivas}
          style={{
            ...oportunidadesListRNStyle.chipStyle,
            backgroundColor: isIcsAtivas
              ? theme.colors.azul
              : theme.colors.azulOpacoSelecionado,
            borderColor: isIcsAtivas
              ? theme.colors.azulEscuro
              : theme.colors.azul,
          }}
          selectedColor={isIcsAtivas ? theme.colors.branco : theme.colors.azul}>
          Ativas
        </Chip>
        <Chip
          onPress={async () => await renderizaIcsConcluidas()}
          icon={() => null}
          selected={isIcsConcluidas}
          style={{
            ...oportunidadesListRNStyle.chipStyle,
            backgroundColor: isIcsConcluidas
              ? theme.colors.azul
              : theme.colors.azulOpacoSelecionado,
            borderColor: isIcsConcluidas
              ? theme.colors.azulEscuro
              : theme.colors.azul,
          }}
          selectedColor={
            isIcsConcluidas ? theme.colors.branco : theme.colors.azul
          }>
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
        {icsAtivas.length > 0 && isIcsAtivas ? (
          icsAtivas.map((ic, i) => (
            <CardOportunidades
              key={i}
              oportunidade={ic}
              navigation={navigation}
              url={ic.links[0].url}
            />
          ))
        ) : isIcsConcluidas ? (
          icsConcluidas.map((ic, i) => (
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
