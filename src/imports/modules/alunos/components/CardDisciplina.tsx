import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Pressable, View, useColorScheme} from 'react-native';
import { IconButton, Text, useTheme} from 'react-native-paper';
import { useContext, useState } from 'react';
import { cardDisciplinaStyle } from './style/CardDisciplinaStyle';
import React from 'react';
import { ITabelaDisciplinas } from '../../../mediator/mediator';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../components/GeneralComponents/GeneralComponents';
import { WebViewRN } from '../../../components/WebViewRN/WebViewRN';
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

  const { showModal } = useContext(GeneralComponentsContext) as IGeneralComponentsContext;

  const abreWebViewSalas = () => {
    showModal({
      isFullScreen: true,
      renderedComponent: (_props: any) => (
        <WebViewRN url={'https://www.icex.ufmg.br/icex_novo/minha-salas/'} handleClose={_props.onDismiss} navigation={navigation}/>
      )
      });
    }

  return (
      <>
      <Pressable  onPress={() => setAbrirDetalhes(!abrirDetalhes)}
            style={({ pressed }) => [pressed ? { opacity: 0.95, backgroundColor: colors.accent } : {},]} >
        <View style={styles.container}>
          <View style={styles.boxPrincipal}>
              <View style={styles.boxTopo}>
                <View style={styles.boxTitulo}>
                  <Text variant='titleSmall' numberOfLines={3} style={{color: colorScheme === 'dark' ? colors.cinza95: null}}> {nomeDisciplina.toUpperCase()} </Text>
                  <Text style={{...styles.textoCodigo, color: colorScheme === 'dark' ? colors.cinza80: null}} variant='bodyMedium' > {codigoDisciplina ?? '-'} </Text>
                </View>
                  <IconButton icon={abrirDetalhes? 'chevron-up' : 'chevron-down'}
                    size={28} iconColor={colorScheme === 'dark' ? colors.branco : colors.preto} onPress={() => setAbrirDetalhes(!abrirDetalhes)}/>
              </View>
              <View style={styles.boxDetalhes}>
                {abrirDetalhes? (
                  <>
                  <Alerta  detalhes={
                      <Text onPress={abreWebViewSalas} variant='labelLarge' style={{color: colors.vermelhoVivo}}>
                        A sala pode não estar atualizada. Consulte aqui a versão mais recente.</Text> 
                  }
                  icone='launch'
                  />
                  {disciplinas.map((disciplina, i) => (
                      <View style={{...styles.detalhes, backgroundColor: colorScheme === 'dark' ? colors.accentOpacoDark : colors.accentOpaco}} key={i}> 
                          <Text variant='bodyMedium' style={{...styles.textoDetalhes, color: colorScheme === 'dark' ? colors.branco : null}}> Turma: {disciplina.turma ?? '-'} </Text>
                          <Text variant='bodyMedium' style={{...styles.textoDetalhes, color: colorScheme === 'dark' ? colors.branco : null}}> Professor (a): {professor(disciplina)} </Text>
                          <Text variant='bodyMedium' style={{...styles.textoDetalhes, color: colorScheme === 'dark' ? colors.branco : null}}> Horário: {disciplina.horario ?? '-'} </Text>
                          <Text variant='bodyMedium' style={{...styles.textoDetalhes, color: colorScheme === 'dark' ? colors.branco : null}}> Sala: {disciplina.sala ?? '-'} </Text>
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

