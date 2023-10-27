import React, {useCallback,  useContext,  useEffect, useState} from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Chip, useTheme} from 'react-native-paper';
import {EnumMediator} from '../../../mediator/EnumMediator';
import * as rssParser from 'react-native-rss-parser';
import {oportunidadesListStyle} from './style/oportunidadesListStyle';
import { useFocusEffect } from '@react-navigation/native';
import { mediator } from '../../../mediator/mediator';
import { nanoid } from 'nanoid';
import { HeaderBar } from '../../../components/HeaderBar/HeaderBar';
import { Loading } from '../../../components/Loading/Loading';
import { IUserContext, UserContext } from '../../../context/UserContext';
import { CardOportunidades } from '../components/CardOportunidades/CardOportunidades';
import { IAnexo } from '../../anexos/IAnexo';
import { anexoOff } from '../../anexos/anexoOff';
import { EnumAnexo } from '../../anexos/EnumAnexo';

export const OportunidadesList = (props: any) => {
  const {navigation, route} = props;
  const theme = useTheme<{[key:string]: any}>();
  const { colors } = theme;
  const styles = oportunidadesListStyle(colors);

  const [dados, setDados] = useState<rssParser.FeedItem[]>([]);
  const [oportunidades, setOportunidades] = useState<rssParser.FeedItem[]>([]);
  const [estagios, setEstagios] = useState<rssParser.FeedItem[]>([]);
  const [ics, setIcs] = useState<rssParser.FeedItem[]>([]);
  const [isOportunidades, setIsOportunidades] = useState<boolean>(true);
  const [isEstagio, setIsEstagio] = useState<boolean>(false);
  const [isIc, setIsIC] = useState<boolean>(false);
  const [curriculo, setCurriculo] = useState<IAnexo | undefined>( undefined);
  const [historico, setHistorico] = useState<IAnexo | undefined>(undefined);
  const user = route.params.user;

  useFocusEffect(
    useCallback(() => {
      const _rsssNoticias = async () => rssOportunidades();
      _rsssNoticias();
    }, []),
  );

	useEffect(() => {
		const retornaArquivos = async() => {
			const curriculo = await anexoOff.retornaAnexo(user?.email!, EnumAnexo.CURRICULO) as IAnexo[];
			const historico = await anexoOff.retornaAnexo(user?.email!, EnumAnexo.HISTORICO) as IAnexo[];
			setCurriculo(curriculo.length > 0 ? curriculo[0] : undefined);
			setHistorico(historico.length > 0 ? historico[0] : undefined);
		}
		retornaArquivos();
	},[])

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
  };

  const renderizaOportunidades = async () => {
    setDados(oportunidades);
    setIsOportunidades(true);
    setIsEstagio(false);
    setIsIC(false);

  }

  const renderizaEstagios = async () => {
    setDados(estagios);
    setIsOportunidades(false);
    setIsEstagio(true);
    setIsIC(false);
  }

  const renderizaIc = async () => {
    setDados(ics)
    setIsOportunidades(false);
    setIsEstagio(false);
    setIsIC(true);
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
                    Ver tudo
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
              <View style={{marginLeft: 10}}/>
          </ScrollView>
        </View>
        <ScrollView style={{ flex: 1}}>
          {dados.length > 0 ? (
              dados.map((oportunidade, i) => (
                <CardOportunidades
                  curriculo={curriculo}
                  historico={historico}
                  key={nanoid()}
                  oportunidade={oportunidade}
                  navigation={navigation}
                  url={oportunidade.links[0].url}
                  user={user}
                  />
              ))
          ) :
            <Loading style={{paddingTop: 150}}/>
          }
        </ScrollView>       
    </SafeAreaView>
  );
};
