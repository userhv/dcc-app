import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pressable, ScrollView, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import { viewOfertasDisciplinasStyle } from './style/ViewOfertasDisciplinasStyle';
import * as rssParser from 'react-native-rss-parser';
import { TiposDisciplinas, rolesDisciplinas } from '../config/EnumDisciplinas';
import { mediator } from '../../../mediator/mediator';
import { theme } from '../../../paper/theme';
import { useState } from 'react';

interface IViewOfertasDisciplinas {
    titulo: string;
    oferta: rssParser.FeedItem;
    navigation?: NativeStackNavigationProp<any>;
}

export const ViewOfertasDisciplinas = (props: IViewOfertasDisciplinas) => {

    const { navigation, titulo, oferta } = props;
    const tituloTratado = titulo.toLowerCase().split("oferta de disciplinas – ").pop();

    const [abrirDetalhes, setAbrirDetalhes] = useState<boolean>(false);

    const filtraDados = (key:string) => {
        const data = mediator.converteTabelaGeral(oferta);
        let filtro;
        
        if(rolesDisciplinas[key] === rolesDisciplinas[TiposDisciplinas.GERAL]){
            filtro = data.filter((disciplina)=> {
                return(
                    !disciplina.disciplina?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(rolesDisciplinas[TiposDisciplinas.TCC].toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")) &&
                    !disciplina.disciplina?.toLowerCase().includes(TiposDisciplinas.TCC.toLowerCase()) &&
                    !disciplina.disciplina?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(rolesDisciplinas[TiposDisciplinas.TSI].toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")) &&
                    !disciplina.disciplina?.toLowerCase().includes(TiposDisciplinas.TSI.toLowerCase()) &&
                    !disciplina.disciplina?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(rolesDisciplinas[TiposDisciplinas.TECC].toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")) &&
                    !disciplina.disciplina?.toLowerCase().includes(TiposDisciplinas.TECC.toLowerCase())
                )
            })
        }else{
            filtro = data.filter((disciplina) => {
                return (
                    disciplina.disciplina?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(key.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")) || 
                    disciplina.disciplina?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(rolesDisciplinas[key].toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))
                )
            })
        }
        return filtro;
    }

    return (
        <Pressable  onPress={() => setAbrirDetalhes(!abrirDetalhes)} >
            <View style={viewOfertasDisciplinasStyle.container}>
                <View style={viewOfertasDisciplinasStyle.boxPrincipal}>
                    <View style={viewOfertasDisciplinasStyle.boxTexto}>
                        <View style={{flex: 1}}>
                            <Text variant='titleLarge' style={{paddingLeft: 10}}> {tituloTratado} </Text>
                        </View>
                        <View>
                            <IconButton icon={abrirDetalhes? 'chevron-up' : 'chevron-down'}
                                size={28} iconColor={theme.colors.preto} onPress={() => setAbrirDetalhes(!abrirDetalhes)}/>
                        </View>
                    </View>
                    <View style={viewOfertasDisciplinasStyle.boxDetalhes}>
                    <ScrollView style={{flex: 1}}>
                        {oferta  && abrirDetalhes ? (
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
        </Pressable>
    );
};
