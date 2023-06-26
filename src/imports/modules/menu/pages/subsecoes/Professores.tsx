import {Button, FlatList, Modal, View} from 'react-native';
import {Divider, FAB, IconButton, PaperProvider, Portal, Searchbar, Text} from 'react-native-paper';
import { useContext, useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as rssParser from 'react-native-rss-parser';
import { theme } from '../../../../paper/theme';
import { mediator } from '../../../../mediator/mediator';
import { EnumMediator } from '../../../../mediator/EnumMediator';
import CardProfessores  from '../../components/CardProfessores';
import { Loading } from '../../../../components/Loading/Loading';
import { subSecoesStyle } from '../style/SubSecoesStyle';
import { HeaderBar } from '../../../../components/HeaderBar/HeaderBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../../components/GeneralComponents/GeneralComponents';
import { ModalAreas } from '../../components/ModalAreas';
import SelectDropdown from 'react-native-select-dropdown';
import { cardProfessoresStyle } from '../../components/style/CardProfessoresStyle';

interface IProfessores {
    navigation: NativeStackNavigationProp<any>;
}

export const Professores = (props: IProfessores) => {
    
    const { navigation} = props;

    const [professores, setProfessores] = useState<rssParser.FeedItem[]>([]);
    const [todosProfessores, setTodosProfessores] = useState<rssParser.FeedItem[]>([]);
    const [queryProfessores, setQueryProfessores] = useState<string>('');
    const [areas, setAreas] = useState<string[]>([]);
    const [area, setArea] = useState<string>("");

    const listRef = useRef<any>(null);
    const [conteudoVerticalOffset, setConteudoVerticalOffset] = useState(0);
    const LIMITE_MAXIMO_SCROLL = 1000;
    
    const { showModal } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;
    

    useEffect(() => {
      const _retornaTodosProfessores = async () => {
        const _todosProfessores = await retornaTodosProfessores();
        ordenaProfessores(_todosProfessores);
        retornaAreasUnicas(_todosProfessores);
        setTodosProfessores(_todosProfessores);
        setProfessores(_todosProfessores);
      }

      _retornaTodosProfessores();
    }, [])

    useEffect(() => {
      setArea("");
      encontraProfessor();
    }, [queryProfessores])

    const onChangeSearch = (query: string) => {
      setQueryProfessores(query)
    }

    const retornaAreasUnicas = (professoresArray: rssParser.FeedItem[]) => {
      let areasEncontradas: any = new Set();
      professoresArray.forEach((professor) => {
        professor.categories.forEach((area, i) => {
          if (area && area?.name !== 'Ativo')
            areasEncontradas.add(area.name);
          })
      })
      const arrayAreas: string[] = Array.from(areasEncontradas);
      ordenaAreas(arrayAreas);
      setAreas(arrayAreas);
    }

    useEffect(() => {
      if(area !== ""){
        const professorPesquisa = todosProfessores.filter((professor)=> {
          const areasProfessor = professor.categories.map((area) => area?.name);
          return areasProfessor.indexOf(area) > -1;
        });
        setProfessores(professorPesquisa);
      }else
        retornaProfessores();
    }, [area])

    const ordenaAreas = (areas: string[]) => {
      areas.sort((a,b) => {
        const area_a = a.normalize("NFD").replace(/\p{Diacritic}/gu, "");
        const area_b = b.normalize("NFD").replace(/\p{Diacritic}/gu, "");
        return area_a < area_b ? -1: area_a > area_b ? 1 : 0;
      })
    }
    const abreWModalAreas = () => {
      showModal({
        // isFullScreen: true,
        renderedComponent: (_props: any) => (
          <ModalAreas handleClose={_props.onDismiss} areas={areas} setArea={setArea}/>
        )
        });
      }

    const ordenaProfessores = (professoresArray: rssParser.FeedItem[]) => {
      professoresArray.sort((a,b) => { 
        const primeiro_prof = a.title.normalize("NFD").replace(/\p{Diacritic}/gu, "");
        const segundo_prof = b.title.normalize("NFD").replace(/\p{Diacritic}/gu, "");
        return primeiro_prof < segundo_prof ? -1 : primeiro_prof > segundo_prof ? 1 : 0;
      })
    }

    const retornaTodosProfessores = async () => {
      let data: rssParser.FeedItem[] | undefined = [];
      let arrayProfessores: rssParser.FeedItem[] | undefined = [];
      for(let i = 1; ;i++){
        data = await mediator.selecionaRequisicao(EnumMediator.PROFESSORES, i);
        if(data?.length === 0) break;
        else if(data) arrayProfessores.push(...data)
      }
      return arrayProfessores;
    }

    const encontraProfessor = () => {
      const professoresPesquisa = todosProfessores.filter((professor)=> professor.title.toLowerCase().includes(queryProfessores.toLowerCase()));
      setProfessores(professoresPesquisa);
    }
    const retornaProfessores = () => {
      setProfessores(todosProfessores);
    }

  return (    
    <View style={subSecoesStyle.container}>
      <HeaderBar navigation={navigation} titulo='Professores'/>
      <Searchbar
        placeholder="Pesquise pelo nome"
        onChangeText={onChangeSearch}
        value={queryProfessores}
        style={subSecoesStyle.barraPesquisa}
        iconColor={theme.colors.azul}
        onIconPress={() => encontraProfessor()}
        onClearIconPress={(e) => retornaProfessores()}
        inputStyle={{textDecorationLine: 'none', overflow: 'hidden'}}
        selectionColor={theme.colors.preto}
        traileringIcon={() => areas.length > 0 ? <Icon name="filter-outline" size={25} color={theme.colors.azul}/> : null}
        onTraileringIconPress={(e) => abreWModalAreas()}
        traileringIconColor={theme.colors.azul}
        />
        {area !== "" ? (
          <>
            <View style={{...cardProfessoresStyle.boxArea, paddingLeft: 10, alignItems: 'center', marginTop: 5, marginBottom: 5}}>
                <Text variant='labelMedium'> Filtrado por:</Text>
                <View style={{...cardProfessoresStyle.chipArea, flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={cardProfessoresStyle.textoChip} variant='bodyMedium' onPress={() => setArea("")}> {area} </Text>
                      <Icon name='close' size={15} onPress={()=> setArea("")} color={theme.colors.azul}/>
                </View>
            </View>
            <Divider style={{...subSecoesStyle.divisor, marginBottom: 5}}/>
              </>
        ): null}

      {professores.length > 0 ? (
        <>
        <FlatList 
          ref={listRef}
          data={professores}
          renderItem={({item}) => <CardProfessores key={item.title} professor={item} navigation={navigation}/>}
          keyExtractor={(item) => item.title}
          removeClippedSubviews
          initialNumToRender={8}
          onScroll={event => {
            setConteudoVerticalOffset(event.nativeEvent.contentOffset.y);
          }}
        />
         {conteudoVerticalOffset > LIMITE_MAXIMO_SCROLL && (
            <FAB 
              icon='arrow-up'
              size='small'
              mode='flat'
              color={theme.colors.branco}
              style={cardProfessoresStyle.fabRetornaTop} 
              onPress={() => {
                listRef.current &&  listRef.current.scrollToOffset({ offset: 0, animated: true });
              }}/> 
          )}
        </>
      ): (
        <View style={subSecoesStyle.loading}>
          <Loading />
        </View>
      )}
    </View>
  );
};