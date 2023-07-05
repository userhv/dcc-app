import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import { viewOfertasDisciplinasStyle } from './style/ViewOfertasDisciplinasStyle';
import { useState } from 'react';
import * as rssParser from 'react-native-rss-parser';
import { TiposDisciplinas, rolesDisciplinas } from '../config/EnumDisciplinas';
import { mediator } from '../../../mediator/mediator';

interface IViewOfertasDisciplinas {
    titulo: string;
    ofertas: rssParser.FeedItem[];
    onPress?: () => void;
    navigation?: NativeStackNavigationProp<any>;
}

export const ViewOfertasDisciplinas = (props: IViewOfertasDisciplinas) => {

    const { navigation, titulo, onPress, ofertas } = props;
    const tituloTratado = titulo.toLowerCase().split("oferta de disciplinas – ").pop();
    const [abrirDetalhes, setAbrirDetalhes] = useState<boolean>(false);

    const filtraDados = (key:string) => {
        const data = mediator.converteTabelaGeral(ofertas[0]);
        let filtro;
        
        if(rolesDisciplinas[key] === rolesDisciplinas[TiposDisciplinas.GERAL]){
            filtro = data.filter((disciplina)=> {
                return(
                    !disciplina.disciplina.toLowerCase().includes(rolesDisciplinas[TiposDisciplinas.TCC].toLowerCase()) &&
                    !disciplina.disciplina.toLowerCase().includes(TiposDisciplinas.TCC.toLowerCase()) &&
                    !disciplina.disciplina.toLowerCase().includes(rolesDisciplinas[TiposDisciplinas.TSI].toLowerCase()) &&
                    !disciplina.disciplina.toLowerCase().includes(TiposDisciplinas.TSI.toLowerCase()) &&
                    !disciplina.disciplina.toLowerCase().includes(rolesDisciplinas[TiposDisciplinas.TECC].toLowerCase()) &&
                    !disciplina.disciplina.toLowerCase().includes(TiposDisciplinas.TECC.toLowerCase()) &&
                    !disciplina.disciplina.toLowerCase().includes(rolesDisciplinas[TiposDisciplinas.TEI].toLowerCase()) && 
                    !disciplina.disciplina.toLowerCase().includes(TiposDisciplinas.TEI.toLowerCase())
                )
            })
        }else{
            filtro = data.filter((disciplina) => {
                return (
                    disciplina.disciplina.toLowerCase().includes(key.toLowerCase()) || 
                    disciplina.disciplina.toLowerCase().includes(rolesDisciplinas[key].toLowerCase())
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
                    <Text style={viewOfertasDisciplinasStyle.texto} 
                    numberOfLines={2}  variant='labelLarge' onPress={() => setAbrirDetalhes(!abrirDetalhes)}> 
                    {abrirDetalhes ? " Esconder" : "Expandir"} </Text>  
                 {abrirDetalhes? (
                    ofertas.length > 0 ? (
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
                    ) : null
                 ) : null}
                </View>
            </View>
        </View>
    );
};
