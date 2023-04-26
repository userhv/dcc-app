import { NoticiasDetail } from "./noticiasDetail";
import { NoticiasList } from "./noticiasList";


export const NoticiasContainer = (props: any) => {
	const {route} = props;

	const validState: {[key: string]: number} = {view: 1, edit: 1, create: 1};

	const {screenState, id} = route?.params ?? {screenState: null, id: null}; // obter via param de navegação

	if (!!screenState && validState[screenState as string]) {
		return <NoticiasDetail {...props} screenState={screenState} id={id} />;
	}
	return <NoticiasList {...props} />;
};
