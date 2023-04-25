//@ts-ignore
import React, { useContext } from 'react';
import { View } from 'react-native';
import { Avatar, Divider, Menu, Text } from 'react-native-paper';
import { homeHeaderStyle } from './HomeHeaderStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAsyncStorageUser, IUserContext, UserContext } from '../../../context/UserContext';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { theme } from '../../../paper/theme';


interface IHomeHeader {
	user: IAsyncStorageUser;
}

export const HomeHeader = (props: IHomeHeader) => {
	const { user } = props;
	const { setAsyncStorageUser } = useContext(UserContext) as IUserContext;
	const [visible, setVisible] = React.useState(true);

	const nomes = "Helio Victor".split(' ');
	const iniciais = nomes.length === 1 ? nomes[0].substring(0, 2) : nomes[0][0] + nomes[1][0];

	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);
	const clearAll = async () => {
		try {
			await AsyncStorage.clear();
			setAsyncStorageUser(null);
		} catch (err) {
			console.log('error', err);
		}
	};

	const handleLogout = () => {
		clearAll();
	};

	return (
		<View style={[homeHeaderStyle.container]}>
			<Text style={homeHeaderStyle.titulo} variant="headlineSmall">
				Logo
			</Text>
			<View style={homeHeaderStyle.menu}>
				<Menu
					visible={visible}
					onDismiss={closeMenu}
					anchor={
						<TouchableWithoutFeedback onPress={openMenu}>
							<Avatar.Text style={homeHeaderStyle.avatar} color={theme.colors.primary} size={36} label={iniciais} />
						</TouchableWithoutFeedback>
					}
					contentStyle={{ backgroundColor: theme.colors.branco }}>
					<Menu.Item title={"Helio"} titleStyle={homeHeaderStyle.usuario} />

					<Menu.Item title={"Teste"} titleStyle={homeHeaderStyle.matricula} />
					<Divider />
					<Menu.Item
						leadingIcon="key-outline"
						onPress={() => {}}
						title="Trocar Senha"
						titleStyle={homeHeaderStyle.itemMenu}
					/>
					<Menu.Item leadingIcon="logout" onPress={handleLogout} title="Sair" titleStyle={homeHeaderStyle.itemMenu} />
				</Menu>
			</View>
		</View>
	);
};
