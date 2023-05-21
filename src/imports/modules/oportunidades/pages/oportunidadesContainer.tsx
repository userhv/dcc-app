import { EnumMediator } from "../../../mediator/EnumMediator";
import { OportunidadesDetail } from "./oportunidadesDetail";
import { OportunidadesList } from "./oportunidadesList";
import { OportunidadeEvento } from "./subpages/OportundadeEvento";
import { OportunidadeIC } from "./subpages/OportundadeIC";
import { OportunidadePalestra } from "./subpages/OportunidadePalestra";

export const OportunidadesContainer = (props: any) => {
	const {route} = props;

	const validState: {[key: string]: number} = {view: 1, edit: 1, create: 1};

	const {screenState, id, type} = route?.params ?? {screenState: null, id: null, type: null}; // obter via param de navegação
	
	if (!!screenState && validState[screenState as string] && !type) {
		return <OportunidadesDetail {...props} screenState={screenState} id={id} />;
	}
	else if(!!screenState && type === EnumMediator.EVENTOS && validState[screenState as string] ){
		return <OportunidadeEvento {...props} screenState={screenState}/>
	}
	else if(!!screenState && type === EnumMediator.PALESTRAS && validState[screenState as string] ){
		return <OportunidadePalestra {...props} screenState={screenState}/>
	}
	else if(!!screenState && type === EnumMediator.IC && validState[screenState as string] ){
		return <OportunidadeIC {...props} screenState={screenState}/>
	}

	return <OportunidadesList {...props} />;
};
