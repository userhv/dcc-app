import { IDoc } from "../../typings/IDoc";
import { EnumAnexo } from "./EnumAnexo";

export interface IAnexo extends IDoc {
	email: string | undefined;
	nome: string | undefined;
	link: string;
	tipo: EnumAnexo;

}