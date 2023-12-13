import {Platform, View, useColorScheme} from 'react-native';
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
import { Divisor } from '../../../../components/Divisor/Divisor';
import { useTheme } from 'react-native-paper';

export const OfertasDisciplinas = (props: any) => {
    const { navigation, route } = props;

    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const stylesSubSecoes = subSecoesStyle(colors);
    const colorScheme = useColorScheme();


    const [anoAtual, setAnoAtual] = useState<rssParser.FeedItem[] | undefined>(undefined);
    const [anoAnterior, setAnoAnterior] = useState<rssParser.FeedItem[] | undefined>(undefined);
    
    useFocusEffect(
      useCallback(() => {
        const _renderizaTodosDados = async () => {
          const {anoAtual, anoAnterior} = await mediator.selecionaRequisicao(EnumMediator.DISCIPLINAS) as ISemestres;
          setAnoAtual(anoAtual);
          setAnoAnterior(anoAnterior);
        }
        _renderizaTodosDados();
      }, []),
    );


  const style = Platform.OS === 'ios' ? {...styleIOS, paddingBottom: 0} : null;

  return (

    <View style={{ ...stylesSubSecoes.container, ...style}}>
    <HeaderBar navigation={navigation} titulo='Ofertas de disciplinas'/>

      {anoAtual || anoAnterior ? (
          <GestureHandlerRootView style={{flex: 1}}>
            <ScrollView>
              {anoAtual && anoAtual.length > 0 ? (
                  anoAtual.map((disciplinaAtual, i) => (
                    <ViewOfertasDisciplinas
                      key={i}
                      titulo={disciplinaAtual.title}
                      oferta={disciplinaAtual}
                      navigation={navigation}
                    />
                  ))
              ) : null}
              <Divisor style={{marginBottom: 10, marginTop: 10, backgroundColor: colorScheme === 'dark' ? colors.branco : colors.cinza10, height: 0.5}}/>
              {anoAnterior && anoAnterior.length > 0  ? (
                  anoAnterior.map((disciplinaAnoAnterior, i) => (
                    <ViewOfertasDisciplinas
                      key={i}
                      titulo={disciplinaAnoAnterior.title}
                      oferta={disciplinaAnoAnterior}
                      navigation={navigation}
                    />

                  ))
              ) : null}
          </ScrollView>
        </GestureHandlerRootView>
      ): 
        <Loading/>
      }
    </View>
  );
};