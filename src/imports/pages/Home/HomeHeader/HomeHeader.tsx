//@ts-ignore
import React from 'react';
import { View, Image } from 'react-native';
import { homeHeaderStyle } from './HomeHeaderStyle';
import { IAsyncStorageUser} from '../../../context/UserContext';

interface IHomeHeader {
	user?: IAsyncStorageUser;
}

export const HomeHeader = (props: IHomeHeader) => {
	const { user } = props;

	return (
		<View style={[homeHeaderStyle.container]}>
			<View style={homeHeaderStyle.viewImagem}>
				<View style={{ justifyContent: 'center'}}>
					<Image source={require('../../../../img/icone_dcc.png')} style={homeHeaderStyle.imagem}/>
				</View>
			</View>
		</View>
	);
};
