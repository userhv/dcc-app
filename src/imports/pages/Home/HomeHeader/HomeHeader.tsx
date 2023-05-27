//@ts-ignore
import React from 'react';
import { View, Image } from 'react-native';
import { homeHeaderStyle } from './HomeHeaderStyle';
import { IAsyncStorageUser} from '../../../context/UserContext';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../../paper/theme';

interface IHomeHeader {
	user?: IAsyncStorageUser;
}

export const HomeHeader = (props: IHomeHeader) => {
	const { user } = props;

	return (
		<View style={[homeHeaderStyle.container]}>
			<View style={homeHeaderStyle.viewImagem}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 10}}>
					<Text variant='titleSmall' style={{color: theme.colors.azul}}> Preview</Text>
				</View>
				<View style={{ justifyContent: 'space-between', flex: 1, flexDirection: 'row', paddingLeft: 85}}>
					<Image source={require('../../../../img/icone_dcc.png')} style={homeHeaderStyle.imagem}/>
				</View>
			</View>
		</View>
	);
};
