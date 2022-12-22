import bcrypt from 'bcrypt';

class PasswordService {
	saltRounds = 10;

	encrypt = async (password) => {
		return await bcrypt.hash(password, this.saltRounds);
	};

	check = async (reqPassword, PasswordHashed) => {
		return await bcrypt.compare(reqPassword, PasswordHashed);
	};
}

export default new PasswordService();
