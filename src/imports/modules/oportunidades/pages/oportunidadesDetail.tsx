import React, { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {  Dimensions, ScrollView, StatusBar, View } from 'react-native';
import { noticiasDetailRNStyle } from './style/oportunidadesDetailRNStyle';
import { theme } from '../../../paper/theme';
import { Button, IconButton, Text } from 'react-native-paper';
import * as rssParser from 'react-native-rss-parser';
import { oportunidadesOff } from '../api/oportunidadesOff';
import WebView from 'react-native-webview';
import RenderHTML from 'react-native-render-html';

interface IOportunidadesDetail {
	user: any;
	screenState: string;
	id: string;
	navigation?: NativeStackNavigationProp<any>;
}

export const OportunidadesDetail = (props: IOportunidadesDetail) => {

	const { user, screenState, id, navigation} = props;
	const [oportunidade, setOportunidade] = useState<rssParser.FeedItem | undefined>(undefined);
	const {width, height} = Dimensions.get('window');


	useEffect(() => {
		const retornaOportunidade = async () => {
			const oportunidadeEncontrada = await oportunidadesOff.findById(id);
			if(oportunidadeEncontrada)
				setOportunidade(oportunidadeEncontrada)
		}
		retornaOportunidade();
	},[])

	useEffect(() => {


	},[oportunidade])
	

	return (
		<View style={noticiasDetailRNStyle.container}>
		<StatusBar
        	backgroundColor={theme.colors.branco}
        	barStyle={'dark-content'}
     	 />
		<View style={noticiasDetailRNStyle.containerTop}>
			<View style={noticiasDetailRNStyle.containerIcone}>
				<IconButton
					accessible={true}
					accessibilityLabel='Toque para voltar a página'
					accessibilityRole='button' 
					icon='arrow-left'
					iconColor={theme.colors.azul}
					style={noticiasDetailRNStyle.icone}
					onPress={() => navigation?.goBack()}
				/>
			</View>
		<View style={noticiasDetailRNStyle.descricao} accessible={true}>
          <Text variant="titleMedium" numberOfLines={1} ellipsizeMode='tail'> {oportunidade?.title}</Text>
        </View>
		</View>
		 {oportunidade?.content ? (
		     <ScrollView style={noticiasDetailRNStyle.scrollView} showsVerticalScrollIndicator={false}>
					<RenderHTML contentWidth={width} source={{ html: oportunidade?.content }} baseStyle={noticiasDetailRNStyle.baseRender}/>
					{/* <View style={noticiasDetailRNStyle.botaoInscrever}>
						<Button
							icon='check-bold'
							mode='contained'
							buttonColor={theme.colors.azul}
							onPress={() => {}}>
							Quero me inscrever
						</Button>
					</View> */}
    		</ScrollView>
		 ): null}
	  </View>
	);
};
