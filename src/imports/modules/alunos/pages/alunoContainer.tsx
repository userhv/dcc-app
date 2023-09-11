import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AlunosList } from "./alunosList";
import { Oferta } from "./subsecoes/Oferta";
import { Professores } from "./subsecoes/Professores";
import { OfertasDisciplinas } from "./subsecoes/OfertasDisciplinas";
import { OportunidadesList } from "../../oportunidades/pages/oportunidadesList";

const { Navigator, Screen } = createNativeStackNavigator();

export const AlunoContainer = () => {

	return(
		<Navigator initialRouteName={'Alunos'} screenOptions={{ headerShown: false }}>
			<Screen key={'Alunos'} name={'Alunos'} component={AlunosList}/>
			<Screen key={'OfertasDisciplinas'} name={'OfertasDisciplinas'} component={OfertasDisciplinas}/>
			<Screen key={'Professores'} name={'Professores'} component={Professores}/>
			<Screen key={'Ofertas'} name={'Ofertas'} component={Oferta}/>
			<Screen key={'Oportunidades'} name={'Oportunidades'} component={OportunidadesList}/>
		</Navigator>
	)
};


