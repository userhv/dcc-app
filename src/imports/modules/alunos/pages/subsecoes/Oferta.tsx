import { FlatList, Platform, View} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HeaderBar } from '../../../../components/HeaderBar/HeaderBar';
import { FAB, Searchbar } from 'react-native-paper';
import { theme } from '../../../../paper/theme';
import { useContext, useEffect, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { styleIOS } from '../../../../paper/stylesIOS';
import { ITabelaDisciplinas } from '../../../../mediator/mediator';
import WebView from 'react-native-webview';
import { CardDisciplina } from '../../components/CardDisciplina';
import { Loading } from '../../../../components/Loading/Loading';
import { ofertaStyles } from '../style/OfertaStyles';
import { disciplinasUnicas } from '../../api/utils';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../../components/GeneralComponents/GeneralComponents';

interface IDisciplinas {
    ofertas: ITabelaDisciplinas[];
    titulo:string;
    navigation: NativeStackNavigationProp<any>;
  }

export const Oferta = (props: IDisciplinas) => {

    const { navigation, ofertas, titulo } = props;

    const [disciplinas, setDisciplinas] = useState<ITabelaDisciplinas[]>([]);
    const [disciplinasUnicasOrdenadas, setDisciplinasUnicasOrdenadas] = useState<string[]>([]);
    const [queryDisciplinas, setQueryDisciplinas] = useState<string>('');

    const listRef = useRef<any>(null);
    const [conteudoVerticalOffset, setConteudoVerticalOffset] = useState(0);
    const LIMITE_MAXIMO_SCROLL = 1000;

    const { showModal } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;
    
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
      const disciplinasPesquisa = ofertas.filter((d)=> d.disciplina.toLowerCase().includes(queryDisciplinas.toLowerCase()));
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
  const style = Platform.OS === 'ios' ? styleIOS : null;

  return (
    <View style={{...ofertaStyles.container, ...style}}>
      <HeaderBar navigation={navigation} titulo={titulo ?? " - "}/>
        <Searchbar
          placeholder="Pesquise pelo nome"
          onChangeText={onChangeSearch}
          value={queryDisciplinas}
          style={ofertaStyles.barraPesquisa}
          iconColor={theme.colors.azul}
          onIconPress={() => encontraDisciplina()}
          onClearIconPress={(e) => retornaOfertasIniciais()}
          inputStyle={{textDecorationLine: 'none', overflow: 'hidden', color: theme.colors.preto}}
          selectionColor={theme.colors.preto}
          />
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
                          disciplinas={disciplinas.filter((disciplina) => disciplina.disciplina.toLowerCase() === item.toLowerCase())}
                          navigation={navigation} 
                          nomeDisciplina={item} 
                          />}
                  keyExtractor={(item) => item}
                  removeClippedSubviews
                  initialNumToRender={8}
                  />
            </GestureHandlerRootView>
            {conteudoVerticalOffset > LIMITE_MAXIMO_SCROLL && (
              <FAB 
                icon='arrow-up'
                size='small'
                mode='flat'
                color={theme.colors.branco}
                style={ofertaStyles.fabRetornaTop} 
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