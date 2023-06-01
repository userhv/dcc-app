import {FlatList, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as rssParser from 'react-native-rss-parser';
import { theme } from '../../../../paper/theme';
import { mediator } from '../../../../mediator/mediator';
import { EnumMediator } from '../../../../mediator/EnumMediator';
import CardProfessores  from '../../components/CardProfessores';
import { nanoid } from 'nanoid';
import { Loading } from '../../../../components/Loading/Loading';
import { subSecoesStyle } from '../style/SubSecoesStyle';
import { HeaderBar } from '../../../../components/HeaderBar/HeaderBar';
import { ScrollView } from 'react-native-gesture-handler';

interface IProfessores {
    navigation: NativeStackNavigationProp<any>;
}

export const Professores = (props: IProfessores) => {
    
    const { navigation} = props;

    const [professores, setProfessores] = useState<rssParser.FeedItem[]>([]);
    const [todosProfessores, setTodosProfessores] = useState<rssParser.FeedItem[]>([]);
    const [queryProfessores, setQueryProfessores] = useState<string>('');

    useEffect(() => {
      const _retornaTodosProfessores = async () => {
        const _todosProfessores = await retornaTodosProfessores();
        ordenaProfessores(_todosProfessores);
        setTodosProfessores(_todosProfessores);
        setProfessores(_todosProfessores);
      }

      _retornaTodosProfessores();
    }, [])

    useEffect(() => {
      encontraProfessor()
    }, [queryProfessores])

    const onChangeSearch = (query: string) => {
      setQueryProfessores(query)
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
      setProfessores(professoresPesquisa)
    }
    const retornaProfessores = () => {
      setProfessores(todosProfessores);
    }

  return (    
    <View style={subSecoesStyle.container}>
      <HeaderBar navigation={navigation} titulo='Professores'/>
      <Searchbar
        placeholder="Pesquise pelo nome..."
        onChangeText={onChangeSearch}
        value={queryProfessores}
        style={subSecoesStyle.barraPesquisa}
        iconColor={theme.colors.azul}
        onIconPress={encontraProfessor}
        onClearIconPress={(e) => retornaProfessores()}
        inputStyle={{textDecorationLine: 'none', overflow: 'hidden'}}
        selectionColor={theme.colors.preto}
        />
      {professores.length > 0 ? (
        <FlatList 
          data={professores}
          renderItem={({item}) => <CardProfessores  key={item.title} professor={item} />}
          keyExtractor={(item) => item.title}
          initialNumToRender={8}
          removeClippedSubviews
        />
      ): (
        <View style={subSecoesStyle.loading}>
          <Loading />
        </View>
      )}
    </View>
  );
};