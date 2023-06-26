import { WebViewRN } from "../../../components/WebViewRN/WebViewRN";
import { NoticiasList } from "./noticiasList";

export const NoticiasContainer = (props: any) => {
	const {route} = props;
	const {url} = route?.params ?? { url: ""};

	if(url)
		return <WebViewRN url={url} {...props} />
	
	return <NoticiasList {...props} />;
};
