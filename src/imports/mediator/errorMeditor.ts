export class ErrorMediator {
	private message: string;
	private context: string;
	constructor(context: string, message: string) {
		this.context = context;
		this.message = message;
	}
}