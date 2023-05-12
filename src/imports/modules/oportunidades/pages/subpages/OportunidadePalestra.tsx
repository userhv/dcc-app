import {Animated, SafeAreaView, ScrollView} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as rssParser from 'react-native-rss-parser';
import { CardOportunidades } from '../../components/CardOportunidades';
import { Loading } from '../../../../components/Loading/Loading';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { mediator } from '../../../../mediator/mediator';
import { EnumMediator } from '../../../../mediator/EnumMediator';
import { AnimatedHeader } from '../../../../components/AnimatedHeader/AnimatedHeader';

interface IOportunidadePalestra {
    screenState: string;
    navigation?: NativeStackNavigationProp<any>;
}

export const OportunidadePalestra = (props: IOportunidadePalestra) => {
    const [palestras, setPalestras] = useState<rssParser.FeedItem[]>([]);
    const {screenState, navigation} = props;
    const mensagemTitulo = "Palestras";
    

    const offset = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const _retornaPalestras = async () => retornaPalestras();
        _retornaPalestras();
    },[])

    const retornaPalestras = async () => {
        const dataPalestra: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.PALESTRAS);
        if(dataPalestra){
            dataPalestra.shift();
            setPalestras(dataPalestra);
        }
    }

    
  return (
    <SafeAreaView style={{flex: 1}}>
      <AnimatedHeader animatedValue={offset} navigation={navigation} mensagemTitulo={mensagemTitulo}/>
      {palestras.length > 0 ? (
          <ScrollView style={{flex: 1}}          
           onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false }
          )} scrollEventThrottle={16}>
          {palestras &&
            palestras.map((palestra, i) => (
              <CardOportunidades
                key={i}
                oportunidade={palestra}
                navigation={navigation}
                url={palestra.links[0].url}
              />
            ))}
        </ScrollView>
      ) : (
          <Loading />
      )}
    </SafeAreaView>
  );
};
