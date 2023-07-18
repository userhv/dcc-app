import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Pressable, ScrollView, View, useColorScheme} from 'react-native';
import {Button, IconButton, Text, useTheme} from 'react-native-paper';
import { viewOfertasDisciplinasStyle } from './style/ViewOfertasDisciplinasStyle';
import * as rssParser from 'react-native-rss-parser';
import { TiposDisciplinas, rolesDisciplinas } from '../config/EnumDisciplinas';
import { mediator } from '../../../mediator/mediator';
import { useState } from 'react';

interface IViewOfertasDisciplinas {
    titulo: string;
    oferta: rssParser.FeedItem;
    navigation?: NativeStackNavigationProp<any>;
}

export const ViewOfertasDisciplinas = (props: IViewOfertasDisciplinas) => {

    const { navigation, titulo, oferta } = props;

    const theme = useTheme<{[key:string]: any}>();
    const { colors } = theme;
    const styles = viewOfertasDisciplinasStyle(colors);
    
    const tituloTratado = titulo.toLowerCase().split("oferta de disciplinas – ").pop();

    const [abrirDetalhes, setAbrirDetalhes] = useState<boolean>(false);

    const colorScheme = useColorScheme();

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
            <View style={{...styles.container, backgroundColor: colorScheme === 'dark' ? colors.accentOpacoDark : colors.accentOpaco}}>
                <View style={styles.boxPrincipal}>
                    <View style={styles.boxTexto}>
                        <View style={{flex: 1}}>
                            <Text variant='titleLarge' style={{paddingLeft: 10, color: colorScheme === 'dark' ? colors.branco: null}}> {tituloTratado} </Text>
                        </View>
                        <View>
                            <IconButton icon={abrirDetalhes? 'chevron-up' : 'chevron-down'}
                                size={28} iconColor={colorScheme === 'dark' ? colors.branco : colors.preto} onPress={() => setAbrirDetalhes(!abrirDetalhes)}/>
                        </View>
                    </View>
                    <View style={styles.boxDetalhes}>
                    <ScrollView style={{flex: 1}}>
                        {oferta  && abrirDetalhes ? (
                                Object.keys(rolesDisciplinas).map((key, i) => (
                                    <Button key={i} onPress={() => 
                                        navigation?.navigate('alunosRoute', {
                                            screen: 'disciplinasSemestre',
                                            params: {
                                                ofertas: filtraDados(key),
                                                titulo: rolesDisciplinas[key]
                                            }
                                        })} mode='contained' style={styles.viewDetalhes} 
                                             textColor={colors.branco} labelStyle={{fontSize: 14}} buttonColor={colors.accent}>
                                        {rolesDisciplinas[key]}
                                     </Button>
                                ))
                            ) : null}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};
