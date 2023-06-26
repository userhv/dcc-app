import { WebViewRN } from "../../../components/WebViewRN/WebViewRN";
import { MenuList } from "./menuList";


export const MenuContainer = (props: any) => {
	const {route} = props;
	const {url} = route?.params ?? { url: ""};

	if(url)
		return <WebViewRN url={url} {...props} />
	
	return <MenuList {...props} />;
};
