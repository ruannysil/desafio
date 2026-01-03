import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUser, User } from "../../models/userModel";

class AuthUserService {
  async execute({ email, password }: IUser) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Usuário ou senha inválidos!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Usuário ou senha inválidos!");
    }

    const token = sign({
      email: user.email,
    },
      process.env.JWT_SECRET,
      {
        subject: user._id.toString(),
        expiresIn: "1d"
      }
    );

    return {
      id: user._id,
      email: user.email,
      token,
    }
  }
}

export { AuthUserService };
