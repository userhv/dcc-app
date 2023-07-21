import { WebViewRN } from "../../../components/WebViewRN/WebViewRN";
import { AlunosList } from "./alunosList";
import { Oferta } from "./subsecoes/Oferta";

export const AlunoContainer = (props: any) => {
	const {route} = props;
	const {url} = route?.params ?? { url: undefined};
	const {ofertas, titulo} = route?.params ?? { ofertas: undefined, titulo: undefined};
	if(url)
		return <WebViewRN url={url} {...props} />

	if(ofertas && titulo)
		return <Oferta ofertas={ofertas} titulo={titulo} {...props} />
	
	return <AlunosList {...props} />;
};
