import { NoticiasList } from "./noticiasList";

export const NoticiasContainer = (props: any) => {
	const {route} = props;
	
	return <NoticiasList {...props} />;
};
