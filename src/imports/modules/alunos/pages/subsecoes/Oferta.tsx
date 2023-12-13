import { FlatList, Platform, View, useColorScheme} from 'react-native';
import { HeaderBar } from '../../../../components/HeaderBar/HeaderBar';
import { FAB, Searchbar, useTheme } from 'react-native-paper';
import {useEffect, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { styleIOS } from '../../../../paper/stylesIOS';
import { ITabelaDisciplinas } from '../../../../mediator/mediator';
import { CardDisciplina } from '../../components/CardDisciplina';
import { Loading } from '../../../../components/Loading/Loading';
import { ofertaStyles } from '../style/OfertaStyles';
import { disciplinasUnicas } from '../../api/utils';

export const Oferta = (props: any) => {

    const { navigation, route} = props;

    const {ofertas, titulo} = route.params;

    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = ofertaStyles(colors);

    const colorScheme = useColorScheme();

    const [disciplinas, setDisciplinas] = useState<ITabelaDisciplinas[]>([]);
    const [disciplinasUnicasOrdenadas, setDisciplinasUnicasOrdenadas] = useState<string[]>([]);
    const [queryDisciplinas, setQueryDisciplinas] = useState<string>('');
    const [exibirBusca, setExibirBusca] = useState<boolean>(false);

    const listRef = useRef<any>(null);
    const [conteudoVerticalOffset, setConteudoVerticalOffset] = useState(0);
    const LIMITE_MAXIMO_SCROLL = 1000;
    
    useEffect(() => {
        const _renderizaTodosDados = () => {
            ofertas && setDisciplinas(ofertas);
            const arrayDisciplinasUnicas = disciplinasUnicas(ofertas);
            setDisciplinasUnicasOrdenadas(arrayDisciplinasUnicas);
          }
          _renderizaTodosDados();
    },[])

    useEffect(() => {
      encontraDisciplina();
    }, [queryDisciplinas])

    const encontraDisciplina = () => {
      const disciplinasPesquisa = ofertas.filter((d: ITabelaDisciplinas)=> 
          d.disciplina?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
          .includes(queryDisciplinas.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")));
      defineOfertasParaConsulta(disciplinasPesquisa);
    }

    const onChangeSearch = (query: string) => {
      setQueryDisciplinas(query)
    }

    const defineOfertasParaConsulta = (disciplinasParaConsulta: ITabelaDisciplinas[]) => {
      const arrayDisciplinasUnicas = disciplinasUnicas(disciplinasParaConsulta);
      setDisciplinasUnicasOrdenadas(arrayDisciplinasUnicas);
    }

    const retornaOfertasIniciais = () => {
      defineOfertasParaConsulta(ofertas);
    }

    const encontraCodigoDisciplina = (item:string) => {
      const codigoDisciplina = ofertas.filter((d: ITabelaDisciplinas)=> d.disciplina?.toLowerCase() === item.toLowerCase());
      return codigoDisciplina[0].codigo ?? codigoDisciplina[0].cod;
    }  

    const style = Platform.OS === 'ios' ? styleIOS : null;

  return (
    <View style={{...styles.container, ...style}}>
      <HeaderBar navigation={navigation} titulo={titulo ?? " - "} ativarBusca onPressBusca={() => setExibirBusca(!exibirBusca)}/>
        {exibirBusca ? (
          <>
            <Searchbar
              placeholder="Pesquise pela disciplina"
              placeholderTextColor={colorScheme === 'dark' ? colors.branco : null}
              onChangeText={onChangeSearch}
              value={queryDisciplinas}
              style={{...styles.barraPesquisa, backgroundColor: colorScheme === 'dark' ? colors.quasePreto : colors.cinza98}}
              iconColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
              onIconPress={() => encontraDisciplina()}
              onClearIconPress={(e) => retornaOfertasIniciais()}
              inputStyle={{textDecorationLine: 'none', overflow: 'hidden', color: colorScheme === 'dark' ? colors.cinza95 : colors.preto}}
              selectionColor={colorScheme === 'dark' ? colors.cinza95 : colors.preto}
              />     
          </>
        ): null}
        {disciplinasUnicasOrdenadas.length > 0 ? (
          <>
              <GestureHandlerRootView style={{flex: 1}}>
                <FlatList 
                  ref={listRef}
                  onScroll={event => {
                    setConteudoVerticalOffset(event.nativeEvent.contentOffset.y);
                  }}
                  data={disciplinasUnicasOrdenadas}
                  renderItem={({item}) =>
                      <CardDisciplina
                          disciplinas={disciplinas.filter((disciplina) => disciplina.disciplina?.toLowerCase() === item.toLowerCase())}
                          navigation={navigation} 
                          nomeDisciplina={item} 
                          codigoDisciplina={encontraCodigoDisciplina(item)}
                          />}
                  keyExtractor={(item, index) => 'key'+index}
                  removeClippedSubviews
                  initialNumToRender={8}
                  />
            </GestureHandlerRootView>
            {conteudoVerticalOffset > LIMITE_MAXIMO_SCROLL && (
              <FAB 
                icon='arrow-up'
                size='small'
                mode='flat'
                color={colors.branco}
                style={styles.fabRetornaTop} 
                onPress={() => {
                  listRef.current &&  listRef.current.scrollToOffset({ offset: 0, animated: true });
                }}/> 
            )}
            </>
        ) :
          <Loading />
        }
    </View>
  );
};