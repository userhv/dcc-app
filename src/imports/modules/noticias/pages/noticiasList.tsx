import React, { useCallback, useEffect, useRef, useState} from 'react';
import {Animated, SafeAreaView, ScrollView, View} from 'react-native';
import {Chip} from 'react-native-paper';
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
import { useFocusEffect } from '@react-navigation/native';

interface INoticiasList {
  navigation?: NativeStackNavigationProp<any>;
}

export const NoticiasList = (props: INoticiasList) => {
  const {navigation} = props;

  const [dados, setDados] = useState<rssParser.FeedItem[]>([]);
  const [noticias, setNoticias] = useState<rssParser.FeedItem[]>([]);
  const [eventos, setEventos] = useState<rssParser.FeedItem[]>([]);
  const [palestras, setPalestras] = useState<rssParser.FeedItem[]>([]);
  const [isNoticias, setIsNoticias] = useState<boolean>(true);
  const [isEventos, setIsEventos] = useState<boolean>(false);
  const [isPalestras, setIsPalestras] = useState<boolean>(false);
  const [rolagem, setRolagem] = useState<boolean>(true);

  const offset = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      const _renderizaTodosDados = async () => {
        const dataNoticias: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.NOTICIAS);
        dataNoticias && setNoticias(dataNoticias);
        const dataEventos: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.EVENTOS);
        dataEventos && setEventos(dataEventos);
        const dataPalestras: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.PALESTRAS);
        dataPalestras && setPalestras(dataPalestras);
      }
      _renderizaTodosDados();
    }, []),
  );

  useEffect(() => {
    const _rsssNoticias = async () => await renderizaNoticias();
    _rsssNoticias();
  },[noticias])

  const renderizaNoticias = async () => {
    setDados(noticias);
    setIsNoticias(true);
    setIsEventos(false);
    setIsPalestras(false);

  }

  const renderizaEventos = async () => {
    setDados(eventos);
    setIsNoticias(false);
    setIsEventos(true);
    setIsPalestras(false);
  }

  const renderizaPalestras = async () => {
    setDados(palestras)
    setIsNoticias(false);
    setIsEventos(false);
    setIsPalestras(true);
  }

  return (
    <SafeAreaView style={noticiasListRNStyle.container}>
      <AnimatedHeader animatedValue={offset} navigation={navigation} mensagemTitulo={"Notícias do DCC"} disableIcon/>
        <View style={noticiasListRNStyle.boxLinhaChip}>
          <ScrollView horizontal style={{marginBottom: 5, marginTop:5}} showsHorizontalScrollIndicator={false}>
            <View style={noticiasListRNStyle.boxIcone}>
              <Icon
                  name="bookmark-multiple-outline"          
                  size={25}
                  style={noticiasListRNStyle.icone}
                  color={theme.colors.azul}
                  onPress={() => 	navigation?.navigate('noticiasRoute', {
                    screen: 'NoticiasSalvas',})}/>
            </View>
              <View style={noticiasListRNStyle.divisor}/>
            <Chip onPress={async() => await renderizaNoticias()} 
                    icon={() => null}
                    selected
                    style={{...noticiasListRNStyle.chipStyle, 
                        backgroundColor: isNoticias ? theme.colors.azul : theme.colors.azulOpacoMenuOportunidades}} 
                    selectedColor={isNoticias ? theme.colors.branco : theme.colors.azul}> 
                    Últimas notícias
              </Chip>
              <Chip onPress={async() => await renderizaEventos()} 
                    icon={() => null}
                    selected
                    style={{...noticiasListRNStyle.chipStyle, 
                      backgroundColor: isEventos ? theme.colors.azul : theme.colors.azulOpacoMenuOportunidades}} 
                  selectedColor={isEventos ? theme.colors.branco : theme.colors.azul}> 
                  Eventos
                </Chip>
              <Chip onPress={async() => await renderizaPalestras()} 
                  icon={() => null}
                  style={{...noticiasListRNStyle.chipStyle, 
                      backgroundColor: isPalestras ? theme.colors.azul : theme.colors.azulOpacoMenuOportunidades}} 
                  selectedColor={isPalestras ? theme.colors.branco : theme.colors.azul}> 
                  Palestras
              </Chip>
              <View style={{marginLeft: 10}}/>
          </ScrollView>
        </View>
        <ScrollView style={{ flex: 1}} 
                   onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: offset } } }],
                    { useNativeDriver: false }
                  )} scrollEventThrottle={16}
                  onMomentumScrollBegin={() => setRolagem(false)}
                  onMomentumScrollEnd={() => setRolagem(true)}>
      {dados.length > 0 ? (
          dados.map((noticia, i) => (
            <CardNoticias
              key={i}
              noticia={noticia}
              navigation={navigation}
              rolagem={rolagem}
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