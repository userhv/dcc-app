import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import { useState } from 'react';
import { cardDisciplinaStyle } from './style/CardDisciplinaStyle';
import React from 'react';
import { ITabelaDisciplinas } from '../../../mediator/mediator';

interface ICardDisciplina {
    disciplinas: ITabelaDisciplinas[];
    nomeDisciplina: string;
    navigation: NativeStackNavigationProp<any>;
}

export const CardDisciplina = (props: ICardDisciplina) => {

  const { navigation, disciplinas, nomeDisciplina } = props;
  const [abrirDetalhes, setAbrirDetalhes] = useState<boolean>(false);

    return (
      <View style={{marginBottom: 5, elevation: 2}}>
        <View style={cardDisciplinaStyle.container}>
          <View style={cardDisciplinaStyle.boxPrincipal}>
              <View style={cardDisciplinaStyle.boxTexto}>
                  <Text variant='titleSmall' numberOfLines={3}> {nomeDisciplina.toUpperCase()} </Text>
              </View>
              <View style={cardDisciplinaStyle.boxDetalhes}>
                  <Text style={cardDisciplinaStyle.texto} 
                  numberOfLines={2}  variant='labelLarge' onPress={() => setAbrirDetalhes(!abrirDetalhes)}> 
                  {abrirDetalhes ? " Ocultar turmas" : "Mostrar turmas"} </Text>  
                {abrirDetalhes? (
                  disciplinas.map((disciplina, i) => (
                      <View style={cardDisciplinaStyle.detalhes} key={i}> 
                          <Text variant='bodyMedium' style={cardDisciplinaStyle.textoDetalhes}> Turma: {disciplina.turma ?? '-'} </Text>
                          <Text variant='bodyMedium' style={cardDisciplinaStyle.textoDetalhes}> Professor (a): {disciplina.professor ?? '-'} </Text>
                          <Text variant='bodyMedium' style={cardDisciplinaStyle.textoDetalhes}> Horário: {disciplina.horario ?? '-'} </Text>
                          <Text variant='bodyMedium' style={cardDisciplinaStyle.textoDetalhes}> Sala: {disciplina.sala ?? '-'} </Text>
                      </View>
                    ))
              ) : null}
              </View>
          </View>
      </View>
      <Divider style={cardDisciplinaStyle.divisor} />
    </View>
    );
};

