class ErrorService extends Error {
	constructor(status, name, message) {
		super(message);
		this.name = name;
		this.status = status;
	}

	static BadRequest(name, message) {
		return new this(400, name, message);
	}

	static ErrorServer(name, message) {
		return new this(500, name, message);
	}
}

export default ErrorService;
