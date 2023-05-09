import { OportunidadesDetail } from "./oportunidadesDetail";
import { OportunidadesList } from "./oportunidadesList";

export const OportunidadesContainer = (props: any) => {
	const {route} = props;

	const validState: {[key: string]: number} = {view: 1, edit: 1, create: 1};

	const {screenState, id} = route?.params ?? {screenState: null, id: null}; // obter via param de navegação

	if (!!screenState && validState[screenState as string]) {
		return <OportunidadesDetail {...props} screenState={screenState} id={id} />;
	}
	return <OportunidadesList {...props} />;
};
