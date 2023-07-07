import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Pressable, View} from 'react-native';
import {Divider, IconButton, Text} from 'react-native-paper';
import { useContext, useState } from 'react';
import { cardDisciplinaStyle } from './style/CardDisciplinaStyle';
import React from 'react';
import { ITabelaDisciplinas } from '../../../mediator/mediator';
import { theme } from '../../../paper/theme';
import { GeneralComponentsContext, IGeneralComponentsContext } from '../../../components/GeneralComponents/GeneralComponents';
import { WebViewRN } from '../../../components/WebViewRN/WebViewRN';
import { Alerta } from '../../../components/Alerta/Alerta';

interface ICardDisciplina {
    disciplinas: ITabelaDisciplinas[];
    nomeDisciplina: string;
    codigoDisciplina: string | undefined;
    navigation: NativeStackNavigationProp<any>;
}

export const CardDisciplina = (props: ICardDisciplina) => {

  const { navigation, disciplinas, nomeDisciplina, codigoDisciplina } = props;
  const [abrirDetalhes, setAbrirDetalhes] = useState<boolean>(false);

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
            style={({ pressed }) => [pressed ? { opacity: 0.95, backgroundColor: theme.colors.azul } : {},]} >
        <View style={cardDisciplinaStyle.container}>
          <View style={cardDisciplinaStyle.boxPrincipal}>
              <View style={cardDisciplinaStyle.boxTopo}>
                <View style={cardDisciplinaStyle.boxTitulo}>
                  <Text variant='titleSmall' numberOfLines={3}> {nomeDisciplina.toUpperCase()} </Text>
                  <Text style={cardDisciplinaStyle.textoCodigo} variant='bodyMedium'> {codigoDisciplina ?? '-'} </Text>
                </View>
                  <IconButton icon={abrirDetalhes? 'chevron-up' : 'chevron-down'}
                    size={25} iconColor={theme.colors.preto} onPress={() => setAbrirDetalhes(!abrirDetalhes)}/>
              </View>
              <View style={cardDisciplinaStyle.boxDetalhes}>
                {abrirDetalhes? (
                  <>
                  <Alerta  detalhes={
                      <Text onPress={abreWebViewSalas} variant='labelLarge' style={{color: theme.colors.vermelhoVivo}}>
                        A sala pode não estar atualizada. Consulte aqui a versão mais recente.</Text> 
                  }
                  icone='launch'
                  />
                  {disciplinas.map((disciplina, i) => (
                      <View style={cardDisciplinaStyle.detalhes} key={i}> 
                          <Text variant='bodyMedium' style={cardDisciplinaStyle.textoDetalhes}> Turma: {disciplina.turma ?? '-'} </Text>
                          <Text variant='bodyMedium' style={cardDisciplinaStyle.textoDetalhes}> Professor (a): {professor(disciplina)} </Text>
                          <Text variant='bodyMedium' style={cardDisciplinaStyle.textoDetalhes}> Horário: {disciplina.horario ?? '-'} </Text>
                          <Text variant='bodyMedium' style={cardDisciplinaStyle.textoDetalhes}> Sala: {disciplina.sala ?? '-'} </Text>
                      </View>
                    ))}
                    </>
              ) : null}
              </View>
          </View>
      </View>
      <Divider style={cardDisciplinaStyle.divisor}/>
      </Pressable>
    </> 
    );
};

