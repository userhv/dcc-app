import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import { viewOfertasDisciplinasStyle } from './style/ViewOfertasDisciplinasStyle';
import { useState } from 'react';
import * as rssParser from 'react-native-rss-parser';
import { TiposDisciplinas, rolesDisciplinas } from '../config/EnumDisciplinas';
import { mediator } from '../../../mediator/mediator';

interface IViewOfertasDisciplinas {
    titulo: string;
    oferta: rssParser.FeedItem;
    navigation?: NativeStackNavigationProp<any>;
}

export const ViewOfertasDisciplinas = (props: IViewOfertasDisciplinas) => {

    const { navigation, titulo, oferta } = props;
    const tituloTratado = titulo.toLowerCase().split("oferta de disciplinas – ").pop();

    const filtraDados = (key:string) => {
        const data = mediator.converteTabelaGeral(oferta);
        let filtro;
        
        if(rolesDisciplinas[key] === rolesDisciplinas[TiposDisciplinas.GERAL]){
            filtro = data.filter((disciplina)=> {
                return(
                    !disciplina.disciplina?.toLowerCase().includes(rolesDisciplinas[TiposDisciplinas.TCC].toLowerCase()) &&
                    !disciplina.disciplina?.toLowerCase().includes(TiposDisciplinas.TCC.toLowerCase()) &&
                    !disciplina.disciplina?.toLowerCase().includes(rolesDisciplinas[TiposDisciplinas.TSI].toLowerCase()) &&
                    !disciplina.disciplina?.toLowerCase().includes(TiposDisciplinas.TSI.toLowerCase()) &&
                    !disciplina.disciplina?.toLowerCase().includes(rolesDisciplinas[TiposDisciplinas.TECC].toLowerCase()) &&
                    !disciplina.disciplina?.toLowerCase().includes(TiposDisciplinas.TECC.toLowerCase())
                )
            })
        }else{
            filtro = data.filter((disciplina) => {
                return (
                    disciplina.disciplina?.toLowerCase().includes(key.toLowerCase()) || 
                    disciplina.disciplina?.toLowerCase().includes(rolesDisciplinas[key].toLowerCase())
                )
            })
        }
        return filtro;
    }

    return (
        <View style={viewOfertasDisciplinasStyle.container}>
            <View style={viewOfertasDisciplinasStyle.boxPrincipal}>
                <View style={viewOfertasDisciplinasStyle.boxTexto}>
                    <Text variant='titleLarge'> {tituloTratado} </Text>
                </View>
                <View style={viewOfertasDisciplinasStyle.boxDetalhes}>
                <ScrollView style={{flex: 1}}>
                    {oferta  ? (
                            Object.keys(rolesDisciplinas).map((key, i) => (
                            <View style={viewOfertasDisciplinasStyle.viewDetalhes} key={i}>
                                <Text style={viewOfertasDisciplinasStyle.textoDetalhes} numberOfLines={2} onPress={() => 
                                    navigation?.navigate('alunosRoute', {
                                        screen: 'disciplinasSemestre',
                                        params: {
                                            ofertas: filtraDados(key),
                                            titulo: rolesDisciplinas[key]
                                        }
                                    })}> {rolesDisciplinas[key]} </Text>
                            </View>
                            ))
                        ) : null}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};
