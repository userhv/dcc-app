import { MenuList } from "./menuList";


export const MenuContainer = (props: any) => {
	const {route} = props;
	
	return <MenuList {...props} />;
};
