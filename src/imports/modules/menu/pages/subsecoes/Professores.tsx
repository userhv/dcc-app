import {FlatList, ScrollView, StatusBar, View} from 'react-native';
import {List, Searchbar, Text} from 'react-native-paper';

import { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as rssParser from 'react-native-rss-parser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { subSecoesStyle } from './SubSecoesStyle';
import { theme } from '../../../../paper/theme';
import { CardSecaoInterno } from '../../components/CardSecaoInterno';
import { getVersion } from 'react-native-device-info';
import { mediator } from '../../../../mediator/mediator';
import { EnumMediator } from '../../../../mediator/EnumMediator';
import CardProfessores  from '../../components/CardProfessores';
import { nanoid } from 'nanoid';


interface IProfessores {
    navigation?: NativeStackNavigationProp<any>;
}

export const Professores = (props: IProfessores) => {
    
    const { navigation } = props;

    const [professores, setProfessores] = useState<rssParser.FeedItem[]>([]);

    const [queryProfessores, setQueryProfessores] = useState<string>('');

    const onChangeSearch = (query: string) => {
      setQueryProfessores(query)
    }

    const retornaProfessores = async () => {
      let data: rssParser.FeedItem[] | undefined = [];
      let arrayProfessores: rssParser.FeedItem[] | undefined = [];
      for(let i = 1; ;i++){
        data = await mediator.selecionaRequisicao(EnumMediator.PROFESSORES, i);
        if(data?.length === 0) break;
        else if(data) arrayProfessores.push(...data)
      }
      arrayProfessores.sort((a,b) => { 
        const primeiro_prof = a.title.normalize("NFD").replace(/\p{Diacritic}/gu, "");
        const segundo_prof = b.title.normalize("NFD").replace(/\p{Diacritic}/gu, "");
        return primeiro_prof < segundo_prof ? -1 : primeiro_prof > segundo_prof ? 1 : 0;
      })
      setProfessores(arrayProfessores);
    }

    const encontraProfessor = () => {
      const professoresPesquisa = professores.filter((professor)=> professor.title.includes(queryProfessores));
      setProfessores(professoresPesquisa)
    }

    useEffect(() => {
      const _retornaProfessores = async () => await retornaProfessores()
      _retornaProfessores()
    }, [])

  return (
    
    <View style={subSecoesStyle.container}>
      <StatusBar backgroundColor={theme.colors.branco} barStyle={'dark-content'}/>
      <View style={subSecoesStyle.containerTop}>
      <Icon
          name="arrow-left"
          size={25}
          color={theme.colors.azul}
          onPress={() => navigation?.goBack()}
        />
        <View style={subSecoesStyle.descricao} accessible={true}>
          <Text variant="headlineSmall"> Professores</Text>
        </View>
      </View>
      <Searchbar
        placeholder="Busque pelo professor"
        onChangeText={onChangeSearch}
        value={queryProfessores}
        style={subSecoesStyle.barraPesquisa}
        iconColor={theme.colors.azul}
        onIconPress={encontraProfessor}
        onClearIconPress={async(e) => await retornaProfessores()}
        inputStyle={{textDecorationLine: 'none'}}
        selectionColor={theme.colors.azul}
        />
      {professores && 
      <FlatList 
        data={professores}
        renderItem={({item}) => <CardProfessores  key={nanoid()} professor={item} />}
        keyExtractor={(item) => item.title}
        initialNumToRender={5}
        removeClippedSubviews
        maxToRenderPerBatch={20}
        updateCellsBatchingPeriod={25}
      />
      }
    </View>
  );
};