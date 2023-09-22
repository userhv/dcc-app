import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuList } from "./menuList";
import { Sobre } from "./subsecoes/Sobre";
import { Contatos } from "./subsecoes/Contatos";
const { Navigator, Screen } = createNativeStackNavigator();

export const MenuContainer = (props: any) => {

	return(
		<Navigator initialRouteName={'Menu'} screenOptions={{ headerShown: false }}>
			<Screen key={'Menu'} name={'Menu'} component={MenuList}/>
			<Screen key={'Feedback'} name={'Feedback'} component={Contatos}/>
			<Screen key={'Sobre'} name={'Sobre'} component={Sobre}/>
		</Navigator>
	)
};
