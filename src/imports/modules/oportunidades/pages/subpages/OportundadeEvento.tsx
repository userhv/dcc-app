import {Animated, SafeAreaView, ScrollView} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as rssParser from 'react-native-rss-parser';
import { CardOportunidades } from '../../components/CardOportunidades';
import { Loading } from '../../../../components/Loading/Loading';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { mediator } from '../../../../mediator/mediator';
import { EnumMediator } from '../../../../mediator/EnumMediator';
import { AnimatedHeader } from '../../../../components/AnimatedHeader/AnimatedHeader';
import { oportunidadesListRNStyle } from '../style/oportunidadesListRNStyle';

interface IOportunidadeEvento {
    screenState: string;
    navigation?: NativeStackNavigationProp<any>;
}

export const OportunidadeEvento = (props: IOportunidadeEvento) => {
    const [eventos, setEventos] = useState<rssParser.FeedItem[]>([]);
    const {screenState, navigation} = props;
    const mensagemTitulo = "Eventos para você";
    

    const offset = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const _retornaEventos= async () => retornaEventos();
        _retornaEventos();
    },[])

    const retornaEventos = async () => {
        const dataEventos: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.EVENTOS);
        if(dataEventos){
            dataEventos.shift();
            setEventos(dataEventos);
        }
    }

    
  return (
    <SafeAreaView style={oportunidadesListRNStyle.container}>
      <AnimatedHeader animatedValue={offset} navigation={navigation} mensagemTitulo={mensagemTitulo}/>
      {eventos.length > 0 ? (
          <ScrollView style={{flex: 1}}          
           onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false }
          )} scrollEventThrottle={16}>
          {eventos &&
            eventos.map((evento, i) => (
              <CardOportunidades
                key={i}
                oportunidade={evento}
                navigation={navigation}
                url={evento.links[0].url}
              />
            ))}
        </ScrollView>
      ) : (
          <Loading />
      )}
    </SafeAreaView>
  );
};
