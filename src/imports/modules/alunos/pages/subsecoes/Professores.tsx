import { FlatList, Platform, View, useColorScheme} from 'react-native';
import { FAB, IconButton, Searchbar, Text, useTheme} from 'react-native-paper';
import { useContext, useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as rssParser from 'react-native-rss-parser';
import { mediator } from '../../../../mediator/mediator';
import { EnumMediator } from '../../../../mediator/EnumMediator';
import { Loading } from '../../../../components/Loading/Loading';
import { subSecoesStyle } from '../style/SubSecoesStyle';
import { HeaderBar } from '../../../../components/HeaderBar/HeaderBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../../components/GeneralComponents/GeneralComponents';
import { ModalAreas } from '../../components/ModalAreas';
import { styleIOS } from '../../../../paper/stylesIOS';
import CardProfessores from '../../components/CardProfessores';
import { cardProfessoresStyle } from '../../components/style/CardProfessoresStyle';
import { Divisor } from '../../../../components/Divisor/Divisor';

interface IProfessores {
    navigation: NativeStackNavigationProp<any>;
}

export const Professores = (props: IProfessores) => {
    
    const { navigation} = props;
    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = subSecoesStyle(colors);
    const stylesProfessores = cardProfessoresStyle(colors);
    const colorScheme = useColorScheme();

    const [professores, setProfessores] = useState<rssParser.FeedItem[]>([]);
    const [professoresFoto, setProfessoresFoto] = useState<{[key:string]: string}>({});
    const [todosProfessores, setTodosProfessores] = useState<rssParser.FeedItem[]>([]);
    const [queryProfessores, setQueryProfessores] = useState<string>('');
    const [areas, setAreas] = useState<string[]>([]);
    const [area, setArea] = useState<string>("a");
    const [exibirBusca, setExibirBusca] = useState<boolean>(false);

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

    const organizaFotosProfessores = (professores: rssParser.FeedItem[]) => {
      const objetoProfessoresFoto = professores.reduce((obj, item) => ({...obj, [item.title]: item.media[0].url}) ,{});
      setProfessoresFoto(objetoProfessoresFoto);
    }

    const retornaTodosProfessores = async () => {
      let data: rssParser.FeedItem[] | undefined = [];
      let fotos: rssParser.FeedItem[] = [];
      let professoresFoto: rssParser.FeedItem[] | undefined = [];
      
      let arrayProfessores: rssParser.FeedItem[] | undefined = [];
      for(let i = 1; ;i++){
        data = await mediator.selecionaRequisicao(EnumMediator.PROFESSORES, i) as rssParser.FeedItem[];
        fotos = await mediator.selecionaRequisicao(EnumMediator.PROFESSORES_FOTO, i) as rssParser.FeedItem[];
        if(fotos) professoresFoto.push(...fotos);
        if(data?.length === 0 && fotos.length === 0) break;
        else if(data) arrayProfessores.push(...data)
      }
      organizaFotosProfessores(professoresFoto);
      return arrayProfessores;
    }

    const encontraProfessor = () => {
      const professoresPesquisa = todosProfessores.filter((professor)=> professor.title.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(queryProfessores.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")));
      setProfessores(professoresPesquisa);
    }
    const retornaProfessores = () => {
      setProfessores(todosProfessores);
    }

  const style = Platform.OS === 'ios' ? {...styleIOS, paddingBottom: 0} : null;
  
  return (    
    <View style={{...styles.container, ...style}}>
      <HeaderBar navigation={navigation} titulo='Professores' ativarBusca onPressBusca={() => setExibirBusca(!exibirBusca)}/>
      {exibirBusca ? (
        <Searchbar
          placeholder="Pesquise o nome do professor"
          onChangeText={onChangeSearch}
          value={queryProfessores}
          style={{...styles.barraPesquisa, backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.quaseBranco}}
          iconColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
          onIconPress={() => encontraProfessor()}
          onClearIconPress={(e) => retornaProfessores()}
          inputStyle={{textDecorationLine: 'none', overflow: 'hidden', color: colorScheme === 'dark' ? colors.branco : colors.preto}}
          selectionColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
          traileringIcon={() => areas.length > 0 ? <Icon name="filter-outline" size={25} 
          color={colorScheme === 'dark' ? colors.cinza95 : colors.preto}/> : null}
          onTraileringIconPress={(e) => abreWModalAreas()}
          traileringIconColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
          />
      ): null}
        {area !== "" ? (
          <>
            <View style={{...stylesProfessores.boxArea, ...stylesProfessores.boxFiltro}}>
              <View style={stylesProfessores.filtro}>
                <Text variant='labelMedium'> Filtrado por:</Text>
                <View style={{...stylesProfessores.chipArea, flexDirection: 'row', alignItems: 'center', backgroundColor: colorScheme === 'dark' ? colors.accentOpacoDark : colors.accent}}>
                      <Text style={{...stylesProfessores.textoChip, color: colors.branco}} variant='bodyMedium' onPress={() => setArea("")}> {area} </Text>
                </View>
              </View>
                <IconButton icon='filter-remove-outline' onPress={()=> setArea("")} style={{marginRight: 10}} size={28} iconColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}/>
            </View>
            <Divisor style={{marginBottom: 5}} />
          </>
        ): null}

      {professores.length > 0 ? (
        <>
        <FlatList 
          ref={listRef}
          data={professores}
          renderItem={({item}) => <CardProfessores key={item.title} professor={item} navigation={navigation} foto={professoresFoto[item.title]}/>}
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
              color={colors.branco}
              style={stylesProfessores.fabRetornaTop} 
              onPress={() => {
                listRef.current &&  listRef.current.scrollToOffset({ offset: 0, animated: true });
              }}/> 
          )}
        </>
      ): (
        <Loading />
      )}
    </View>
  );
};