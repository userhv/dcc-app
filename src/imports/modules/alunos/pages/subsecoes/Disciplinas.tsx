import {Platform, View} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { subSecoesStyle } from '../style/SubSecoesStyle';
import { HeaderBar } from '../../../../components/HeaderBar/HeaderBar';
import { useCallback, useState } from 'react';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { styleIOS } from '../../../../paper/stylesIOS';
import { useFocusEffect } from '@react-navigation/native';
import * as rssParser from 'react-native-rss-parser';
import { ISemestres, mediator } from '../../../../mediator/mediator';
import { EnumMediator } from '../../../../mediator/EnumMediator';
import { Loading } from '../../../../components/Loading/Loading';
import { ViewOfertasDisciplinas } from '../../components/ViewOfertasDisciplinas';
import { nanoid } from 'nanoid';

interface IDisciplinas {
    navigation: NativeStackNavigationProp<any>;
  }

export const Disciplinas = (props: IDisciplinas) => {

    const { navigation } = props;
    const [primeiroSemestre, setPrimeiroSemestre] = useState<rssParser.FeedItem[] | undefined>(undefined);
    const [segundoSemestre, setSegundoSemestre] = useState<rssParser.FeedItem[] | undefined>(undefined);
    
    useFocusEffect(
      useCallback(() => {
        const _renderizaTodosDados = async () => {
          const {primeiroSemestre, segundoSemestre} = await mediator.selecionaRequisicao(EnumMediator.DISCIPLINAS) as ISemestres;
          setPrimeiroSemestre(primeiroSemestre);
          setSegundoSemestre(segundoSemestre);
        }
        _renderizaTodosDados();
      }, []),
    );


  const style = Platform.OS === 'ios' ? styleIOS : null;

  return (
    <View style={{...subSecoesStyle.container, ...style}}>
      <HeaderBar navigation={navigation} titulo='Ofertas de disciplinas'/>

      {primeiroSemestre || segundoSemestre ? (
          <GestureHandlerRootView style={{flex: 1}}>
            <ScrollView>
              {segundoSemestre ? (
                segundoSemestre.length > 0 || segundoSemestre.length > 0 ? (
                <ViewOfertasDisciplinas
                  key={nanoid()}
                  titulo={segundoSemestre[0].title ?? segundoSemestre[0].title}
                  ofertas={segundoSemestre}
                  navigation={navigation}
                />
                ) : null
              ) : null}
              {primeiroSemestre ? (
                primeiroSemestre.length > 0 || primeiroSemestre.length > 0 ? (
                <ViewOfertasDisciplinas
                  key={nanoid()}
                  titulo={primeiroSemestre[0].title ?? primeiroSemestre[0].title}
                  ofertas={primeiroSemestre}
                  navigation={navigation}
                />
                ) : null
              ) : null}
          </ScrollView>
        </GestureHandlerRootView>
      ): 
        <Loading/>
      }
    </View>
  );
};