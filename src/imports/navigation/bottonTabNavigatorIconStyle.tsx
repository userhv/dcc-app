import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../paper/theme';

export const bottomTabNavigatorIcon = (name: string) => {
	return ({ focused }: { focused: boolean }) => <Icon name={name} size={25} color={focused ? theme.colors.cinza10 : theme.colors.cinzaIconeNavegacao} />;
};
