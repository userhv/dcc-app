import React, { useEffect, useRef, useState} from 'react';
import {Animated, SafeAreaView, ScrollView, View} from 'react-native';
import {Chip, Divider} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {noticiasListRNStyle} from './style/noticiasListRNStyle';
import {CardNoticias} from '../components/CardNoticias';
import {theme} from '../../../paper/theme';
import {EnumMediator} from '../../../mediator/EnumMediator';
import {mediator} from '../../../mediator/mediator';
import {Loading} from '../../../components/Loading/Loading';
import * as rssParser from 'react-native-rss-parser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AnimatedHeader } from '../../../components/AnimatedHeader/AnimatedHeader';

interface INoticiasList {
  navigation?: NativeStackNavigationProp<any>;
}

export const NoticiasList = (props: INoticiasList) => {
  const {navigation} = props;

  const [noticias, setNoticias] = useState<rssParser.FeedItem[]>([]);
  const [isNoticias, setIsNoticias] = useState<boolean>(true);
  const [isEventos, setIsEventos] = useState<boolean>(false);
  const [isPalestras, setIsPalestras] = useState<boolean>(false);

  const offset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const _rsssNoticias = async () => await renderizaNoticias();;
    _rsssNoticias();
  },[])

  const renderizaNoticias = async () => {
    const data: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.NOTICIAS);
    data && setNoticias(data);
    setIsNoticias(true);
    setIsEventos(false);
    setIsPalestras(false);

  }

  const renderizaEventos = async () => {
    const data: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.EVENTOS);
    data && setNoticias(data);
    setIsNoticias(false);
    setIsEventos(true);
    setIsPalestras(false);
  }

  const renderizaPalestras = async () => {
    const data: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.PALESTRAS);
    data && setNoticias(data);
    setIsNoticias(false);
    setIsEventos(false);
    setIsPalestras(true);
  }

  return (
    <SafeAreaView style={noticiasListRNStyle.container}>
      <AnimatedHeader animatedValue={offset} navigation={navigation} mensagemTitulo={"Notícias do DCC"} disableIcon/>
        <View style={noticiasListRNStyle.boxLinhaChip}>
          <ScrollView horizontal style={{margin: 5}} showsHorizontalScrollIndicator={false}>
            <Chip onPress={async() => await renderizaNoticias()} 
                    icon={() => null}
                    selected
                    style={{...noticiasListRNStyle.chipStyle, 
                        backgroundColor: isNoticias ? theme.colors.azul : theme.colors.azulOpacoSelecionado}} 
                    selectedColor={isNoticias ? theme.colors.branco : theme.colors.azul}> 
                    Últimas notícias
              </Chip>
              <Chip onPress={async() => await renderizaEventos()} 
                    icon={() => null}
                    selected
                    style={{...noticiasListRNStyle.chipStyle, 
                      backgroundColor: isEventos ? theme.colors.azul : theme.colors.azulOpacoSelecionado}} 
                  selectedColor={isEventos ? theme.colors.branco : theme.colors.azul}> 
                  Eventos
                </Chip>
              <Chip onPress={async() => await renderizaPalestras()} 
                  icon={() => null}
                  style={{...noticiasListRNStyle.chipStyle, 
                      backgroundColor: isPalestras ? theme.colors.azul : theme.colors.azulOpacoSelecionado}} 
                  selectedColor={isPalestras ? theme.colors.branco : theme.colors.azul}> 
                  Palestras
              </Chip>
              <View style={noticiasListRNStyle.divisor}/>
              <Icon
                  accessible={true}
                  accessibilityLabel='Suas notícias salvas'
                  accessibilityRole='button'
                  name="bookmark-multiple"
                  size={30}
                  style={noticiasListRNStyle.icone}
                  color={theme.colors.azul}
                  onPress={() => 	navigation?.navigate('noticiasRoute', {
                    screen: 'NoticiasSalvas',})}/>
          </ScrollView>
        </View>
        <ScrollView style={{ flex: 1}} 
                   onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                  )} scrollEventThrottle={16}>
      {noticias.length > 0 ? (
          noticias.map((noticia, i) => (
            <CardNoticias
              key={i}
              noticia={noticia}
              navigation={navigation}
              url={noticia.links[0].url}
            />
          ))
      ) :
      <View style={noticiasListRNStyle.loading}>
        <Loading />
      </View>
      }
    </ScrollView>
    </SafeAreaView>
  );
};