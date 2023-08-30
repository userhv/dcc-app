import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Pressable, View, useColorScheme} from 'react-native';
import { IconButton, Text, useTheme} from 'react-native-paper';
import { useState } from 'react';
import { cardDisciplinaStyle } from './style/CardDisciplinaStyle';
import React from 'react';
import { ITabelaDisciplinas } from '../../../mediator/mediator';
import { Alerta } from '../../../components/Alerta/Alerta';
import { Divisor } from '../../../components/Divisor/Divisor';

interface ICardDisciplina {
    disciplinas: ITabelaDisciplinas[];
    nomeDisciplina: string;
    codigoDisciplina: string | undefined;
    navigation: NativeStackNavigationProp<any>;
}

export const CardDisciplina = (props: ICardDisciplina) => {

  const { navigation, disciplinas, nomeDisciplina, codigoDisciplina } = props;
  const [abrirDetalhes, setAbrirDetalhes] = useState<boolean>(false);

  const theme = useTheme<{[key:string]: any}>();
  const { colors } = theme;
  const styles = cardDisciplinaStyle(colors);

  const colorScheme = useColorScheme();

  const professor = (disciplina: ITabelaDisciplinas) => {
    if(disciplina.professor)
      return disciplina.professor;
    else if(disciplina.docente)
      return disciplina.docente;
    else if(disciplina.prof)
      return disciplina.prof
    else
      return '-'
  }

  return (
      <>
      <Pressable  onPress={() => setAbrirDetalhes(!abrirDetalhes)}
            style={({ pressed }) => [pressed ? { opacity: 0.95, backgroundColor: colors.accent } : {},]} >
        <View style={styles.container}>
          <View style={styles.boxPrincipal}>
              <View style={styles.boxTopo}>
                <View style={styles.boxTitulo}>
                  <Text variant='titleSmall' numberOfLines={3}> {nomeDisciplina.toUpperCase()} </Text>
                  <Text style={styles.textoCodigo} variant='bodyMedium' > {codigoDisciplina ?? '-'} </Text>
                </View>
                  <IconButton icon={abrirDetalhes? 'chevron-up' : 'chevron-down'}
                    size={28} iconColor={colorScheme === 'dark' ? colors.branco : colors.preto} onPress={() => setAbrirDetalhes(!abrirDetalhes)}/>
              </View>
              <View style={styles.boxDetalhes}>
                {abrirDetalhes? (
                  <>
                  <Alerta  detalhes={
                      <Text onPress={() => navigation?.navigate('Root',
                      {screen: 'WebView', params:{
                        url: 'https://www.icex.ufmg.br/icex_novo/minha-salas/'
                        }})} 
                        variant='labelLarge' style={{color: colorScheme === 'dark' ? colors.vermelhoVivoForte : colors.vermelhoVivo}}>
                        A sala pode não estar atualizada. Consulte aqui a versão mais recente.</Text> 
                  }
                  icone='launch'
                  />
                  {disciplinas.map((disciplina, i) => (
                      <View style={{...styles.detalhes, backgroundColor:  colorScheme === 'dark'  ? colors.quasePreto : colors.chipDesativado}} key={i}> 
                          <Text variant='bodyMedium' style={{...styles.textoDetalhes}}> Turma: {disciplina.turma ?? '-'} </Text>
                          <Text variant='bodyMedium' style={{...styles.textoDetalhes}}> Professor (a): {professor(disciplina)} </Text>
                          <Text variant='bodyMedium' style={{...styles.textoDetalhes}}> Horário: {disciplina.horario ?? '-'} </Text>
                          <Text variant='bodyMedium' style={{...styles.textoDetalhes}}> Sala: {disciplina.sala ?? '-'} </Text>
                      </View>
                    ))}
                    </>
              ) : null}
              </View>
          </View>
      </View>
      <Divisor />
      </Pressable>
    </> 
    );
};

