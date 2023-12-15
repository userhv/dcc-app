import React, {useCallback,  useEffect, useState} from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Chip, useTheme, Text} from 'react-native-paper';
import {EnumMediator} from '../../../mediator/EnumMediator';
import * as rssParser from 'react-native-rss-parser';
import {oportunidadesListStyle} from './style/oportunidadesListStyle';
import { useFocusEffect } from '@react-navigation/native';
import { mediator } from '../../../mediator/mediator';
import { HeaderBar } from '../../../components/HeaderBar/HeaderBar';
import { Loading } from '../../../components/Loading/Loading';
import { CardOportunidades } from '../components/CardOportunidades/CardOportunidades';
import { IAnexo } from '../../anexos/IAnexo';
import { anexoOff } from '../../anexos/anexoOff';
import { EnumAnexo } from '../../anexos/EnumAnexo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const OportunidadesList = (props: any) => {
  const {navigation, route} = props;
  const theme = useTheme<{[key:string]: any}>();
  const { colors } = theme;
  const styles = oportunidadesListStyle(colors);

  const [dados, setDados] = useState<rssParser.FeedItem[]>([]);
  const [oportunidades, setOportunidades] = useState<rssParser.FeedItem[]>([]);
  const [estagios, setEstagios] = useState<rssParser.FeedItem[]>([]);
  const [ics, setIcs] = useState<rssParser.FeedItem[]>([]);
  const [emprego, setEmprego] = useState<rssParser.FeedItem[]>([]);
  const [bolsaOutros, setBolsaOutros] = useState<rssParser.FeedItem[]>([]);
  const [isOportunidades, setIsOportunidades] = useState<boolean>(true);
  const [isEstagio, setIsEstagio] = useState<boolean>(false);
  const [isIc, setIsIC] = useState<boolean>(false);
  const [isEmprego, setIsEmprego] = useState<boolean>(false);
  const [isBolsaOutros, setIsBolsaOutros] = useState<boolean>(false);
  const [curriculo, setCurriculo] = useState<IAnexo | undefined>( undefined);
  const [historico, setHistorico] = useState<IAnexo | undefined>(undefined);
  const [oportunidadeVazia, setOportunidadeVazia] = useState<boolean>(false);
  const user = route.params.user;

  useFocusEffect(
    useCallback(() => {
      const _rsssNoticias = async () => rssOportunidades();
      const retornaArquivos = async() => {
        const curriculo = await anexoOff.retornaAnexo(user?.email!, EnumAnexo.CURRICULO) as IAnexo[];
        const historico = await anexoOff.retornaAnexo(user?.email!, EnumAnexo.HISTORICO) as IAnexo[];
        setCurriculo(curriculo.length > 0 ? curriculo[0] : undefined);
        setHistorico(historico.length > 0 ? historico[0] : undefined);
      }
      _rsssNoticias();
      retornaArquivos();
    }, []),
  );

  useEffect(() => {
    const _rsssNoticias = async () => await renderizaOportunidades();
    _rsssNoticias();
  },[oportunidades])

  const rssOportunidades = async () => {
    const dataOportunidades: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.OPORTUNIDADES) as rssParser.FeedItem[];
    dataOportunidades && setOportunidades(dataOportunidades);
    const dataEstagios: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.ESTAGIOS) as rssParser.FeedItem[];
    dataEstagios && setEstagios(dataEstagios);
    const dataIcs: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.IC) as rssParser.FeedItem[];
    dataIcs && setIcs(dataIcs);
    const dataEmprego: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.EMPREGO) as rssParser.FeedItem[];
    dataEmprego && setEmprego(dataEmprego);
    const dataOutros: rssParser.FeedItem[] | undefined = await mediator.selecionaRequisicao(EnumMediator.BOLSA_OUTROS) as rssParser.FeedItem[];
    dataOutros && setBolsaOutros(dataOutros);
  };

  const verificaSemOportunidades = (dados: rssParser.FeedItem[]) => {
    setOportunidadeVazia(dados.length === 0)

  }

  const renderizaOportunidades = async () => {
    setDados(oportunidades);
    setIsOportunidades(true);
    setIsEstagio(false);
    setIsIC(false);
    setIsEmprego(false);
    setIsBolsaOutros(false);
  }

  const renderizaEstagios = async () => {
    verificaSemOportunidades(estagios);
    setDados(estagios);
    setIsOportunidades(false);
    setIsEstagio(true);
    setIsIC(false);
    setIsEmprego(false);
    setIsBolsaOutros(false);
  }

  const renderizaIc = async () => {
    verificaSemOportunidades(ics);
    setDados(ics)
    setIsOportunidades(false);
    setIsEstagio(false);
    setIsIC(true);
    setIsEmprego(false);
    setIsBolsaOutros(false);
  }
  const renderizaEmprego = async () => {
    verificaSemOportunidades(emprego);
    setDados(emprego)
    setIsOportunidades(false);
    setIsEstagio(false);
    setIsIC(false);
    setIsEmprego(true);
    setIsBolsaOutros(false);
  }
  const renderizaOutros = async () => {
    verificaSemOportunidades(bolsaOutros);
    setDados(bolsaOutros)
    setIsOportunidades(false);
    setIsEstagio(false);
    setIsIC(false);
    setIsEmprego(false);
    setIsBolsaOutros(true);
  }
  return (
    <SafeAreaView style={styles.container}>
     <HeaderBar navigation={navigation} titulo='Painel de Oportunidades'/>
     <View style={styles.boxLinhaChip}>
          <ScrollView horizontal style={{marginBottom: 5, flex: 1}} showsHorizontalScrollIndicator={false}>
            <Chip onPress={async() => await renderizaOportunidades()} 
                    icon={() => null}
                    selected
                    style={{...styles.chipStyle, 
                        backgroundColor: isOportunidades ? colors.chipAtivado : colors.chipDesativado}} 
                    selectedColor={isOportunidades ? colors.corTextoChipAtivado : colors.corTextoChipDesativado}> 
                    Tudo
              </Chip>
              <Chip onPress={async() => await renderizaEstagios()} 
                    icon={() => null}
                    selected
                    style={{...styles.chipStyle, 
                      backgroundColor: isEstagio ? colors.chipAtivado : colors.chipDesativado}} 
                    selectedColor={isEstagio ? colors.corTextoChipAtivado : colors.corTextoChipDesativado}> 
                  Estágios
                </Chip>
              <Chip onPress={async() => await renderizaIc()} 
                  icon={() => null}
                  style={{...styles.chipStyle, 
                      backgroundColor: isIc ? colors.chipAtivado : colors.chipDesativado}} 
                      selectedColor={isIc ? colors.corTextoChipAtivado : colors.corTextoChipDesativado}> 
                  Iniciação Científica
              </Chip>
              <Chip onPress={async() => await renderizaEmprego()} 
                  icon={() => null}
                  style={{...styles.chipStyle, 
                      backgroundColor: isEmprego ? colors.chipAtivado : colors.chipDesativado}} 
                      selectedColor={isEmprego ? colors.corTextoChipAtivado : colors.corTextoChipDesativado}> 
                  Emprego
              </Chip>
              <Chip onPress={async() => await renderizaOutros()} 
                  icon={() => null}
                  style={{...styles.chipStyle, 
                      backgroundColor: isBolsaOutros ? colors.chipAtivado : colors.chipDesativado}} 
                      selectedColor={isBolsaOutros ? colors.corTextoChipAtivado : colors.corTextoChipDesativado}> 
                  Outras
              </Chip>
              <View style={{marginLeft: 10}}/>
          </ScrollView>
        </View>
        <ScrollView style={{ flex: 1}}>
          {dados.length > 0 ? (
              dados.map((oportunidade, i) => (
                <CardOportunidades
                  curriculo={curriculo}
                  historico={historico}
                  key={i}
                  oportunidade={oportunidade}
                  navigation={navigation}
                  url={oportunidade.links[0].url}
                  user={user}
                  />
              ))
          ) :(
            oportunidadeVazia ? (
              <View style={styles.boxIconeVazio} accessible={true}> 
                <Icon 
                    name='briefcase-off-outline'
                    size={150}
                    color={colors.vermelhoVivo}
                />
                <Text style={styles.texto} variant='headlineSmall'> 
                        Não há oportunidade para essa categoria.
                </Text>
              </View>
            ) : (
              <Loading style={{marginTop: 150}}/>
            )
          )}
        </ScrollView>       
    </SafeAreaView>
  );
};
