import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../paper/theme';
import { varianteSemOutline } from '../libs/removerVarianteOutline';

export const bottomTabNavigatorIcon = (name: string) => {

	const variante = varianteSemOutline(name);

	return ({ focused }: { focused: boolean }) => <Icon name={focused ? variante : name} 
			size={24} color={focused ? theme.colors.azul : theme.colors.cinza10} />;
};
