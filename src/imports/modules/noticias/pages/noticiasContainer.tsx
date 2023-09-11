import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NoticiasList } from "./noticiasList";
import { NoticiasSalvas } from "./noticiasSalvas";

const { Navigator, Screen } = createNativeStackNavigator();

export const NoticiasContainer = () => {

	return(
		<Navigator initialRouteName={'Noticias'} screenOptions={{ headerShown: false }}>
			<Screen key={'Noticias'} name={'Noticias'} component={NoticiasList}/>
			<Screen key={'NoticiasSalvas'} name={'NoticiasSalvas'} component={NoticiasSalvas}/>
		</Navigator>
	)
};
