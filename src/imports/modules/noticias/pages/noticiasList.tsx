import React, {useCallback, useRef, useState} from 'react';
import {Animated, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {Chip, IconButton, Menu, Text} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {noticiasListRNStyle} from './style/noticiasListRNStyle';
import {CardNoticias} from '../components/CardNoticias';
import {theme} from '../../../paper/theme';
import {EnumMediator} from '../../../mediator/EnumMediator';
import {mediator} from '../../../mediator/mediator';
import {Loading} from '../../../components/Loading/Loading';
import {useFocusEffect} from '@react-navigation/native';
import * as rssParser from 'react-native-rss-parser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AnimatedHeader } from '../../../components/AnimatedHeader/AnimatedHeader';
import { noticiasOff } from '../api/noticiasOff';
import { INoticias } from '../sch/noticiasSch';
import { SelectInputSF } from '../../../components/SimpleFormRN/components/SelectInputSF/SelectInputSF';
import SelectDropdown from 'react-native-select-dropdown';

interface INoticiasList {
  navigation?: NativeStackNavigationProp<any>;
}

export const NoticiasList = (props: INoticiasList) => {
  const {navigation} = props;

  const [noticias, setNoticias] = useState<rssParser.FeedItem[]>([]);
  const [noticiasSalvas, setNoticiasSalvas] = useState<INoticias[]>([]);
  const [mensagem, setMensagem] = useState<string>("Últimas notícias do DCC");
  const [isUltimasNoticias, setIsUltimasNoticias] = useState<boolean>(true);
  const [isNoticiaSalva, setIsNoticiasSalva] = useState<boolean>(false);
  const offset = useRef(new Animated.Value(0)).current;


  const rssNoticias = async () => {
    const data: rssParser.FeedItem[] | undefined =
      await mediator.selecionaRequisicao(EnumMediator.NOTICIAS);
    data && setNoticias(data);
    setNoticiasSalvas([])
  };

  const feedNoticiasSalvas = async () => {
    const data = await noticiasOff.retornaNoticiasSalvas();
    data && setNoticiasSalvas(data as INoticias[]);
    // setNoticias([]);
  }

  const arrayFiltrosUnicos = (value: string, index: number, array: string[]) => {
    return array.indexOf(value) === index;
  }

  useFocusEffect(
    useCallback(() => {
      const _rsssNoticias = async () => {
        await renderizaUltimasNoticias();
      }
      _rsssNoticias();
    }, []),
  );



  const renderizaUltimasNoticias = async () => {
    setIsUltimasNoticias(true);
    setIsNoticiasSalva(false);
    setMensagem("Últimas notícias do DCC");
    await rssNoticias();
  }

  const renderizaNoticiasSalvas = async () => {
    setIsUltimasNoticias(false);
    setIsNoticiasSalva(true);
    setMensagem("Suas notícias salvas");
    await feedNoticiasSalvas();
  }

  return (
    <SafeAreaView style={noticiasListRNStyle.container}>
      <AnimatedHeader animatedValue={offset} navigation={navigation} mensagemTitulo={mensagem} disableIcon/>
      <View style={noticiasListRNStyle.boxChip}>
      <Chip  onPress={async () => await renderizaUltimasNoticias()} 
              icon={() => null}
              selected={isUltimasNoticias}
              style={{...noticiasListRNStyle.chipStyle, 
                  backgroundColor: isUltimasNoticias ? theme.colors.azul : theme.colors.azulOpacoSelecionado,
                  borderColor: isUltimasNoticias ? theme.colors.azulEscuro : theme.colors.azul}} 
              selectedColor={isUltimasNoticias ? theme.colors.branco : theme.colors.azul}> 
              Últimas notícias 
        </Chip>
        <Chip  onPress={async () => await renderizaNoticiasSalvas()} 
              icon={() => null}
              selected={isNoticiaSalva}
              style={{...noticiasListRNStyle.chipStyle, 
                backgroundColor: isNoticiaSalva ? theme.colors.azul : theme.colors.azulOpacoSelecionado,
                borderColor: isNoticiaSalva ? theme.colors.azulEscuro : theme.colors.azul}} 
            selectedColor={isNoticiaSalva ? theme.colors.branco : theme.colors.azul}> 
            Notícias salvas
          </Chip>
      </View>
        <ScrollView style={{ flex: 1}} 
                   onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                  )} scrollEventThrottle={16}>
      {noticias.length > 0 && isUltimasNoticias ? (
          noticias.map((noticia, i) => (
            <CardNoticias
              key={i}
              noticia={noticia}
              navigation={navigation}
              url={noticia.links[0].url}
            />
          ))
      ): isNoticiaSalva ? (
        noticiasSalvas.length > 0 ? (
          noticiasSalvas.map((noticia, i) => (
            <CardNoticias
              key={i}
              noticia={noticia as unknown as rssParser.FeedItem}
              navigation={navigation}
              url={noticia.url}
            />
            ))
        ) : (
          <View style={noticiasListRNStyle.boxIconeVazio} accessible={true}> 
          <Icon 
              name='bookmark-off-outline'
              size={150}
              color={theme.colors.vermelhoVivo}
          />
          <Text style={noticiasListRNStyle.texto} variant='headlineSmall'> 
                  Você não tem nenhuma notícia salva.
          </Text>
      </View>
        )
      ):
      <View style={noticiasListRNStyle.loading}>
        <Loading />
      </View>
      }
    </ScrollView>
    </SafeAreaView>
  );
};