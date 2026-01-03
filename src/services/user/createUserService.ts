import { hash } from "bcryptjs";
import { IUser, User } from "../../models/userModel";

class CreateUserService {
  async execute({ email, password }: IUser) {
    if (!email) {
      throw new Error("Email é obrigatorio!");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Email inválido!");
    }

    const userAlreadyExists = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (userAlreadyExists) {
      throw new Error("Email já cadastrado!");
    };

    if (!password || password.length < 6) {
      throw new Error("Senha deve ter pelo menos 6 caracteres!");
    }

    const passwordHash = await hash(password, 8);

    const user = new User({
      email: email.toLowerCase().trim(),
      password: passwordHash,
    })

    await user.save();

    return {
      id: user._id,
      email: user.email
    }
  }
}

export { CreateUserService };
