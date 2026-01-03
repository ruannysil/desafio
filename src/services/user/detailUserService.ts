import { User } from "../../models/userModel";

class DetailUserService{
  async execute(user_id: string) {
    try {
      const user = await User.findOne({
        _id: user_id
      });
      return user;
    } catch (error) {
      throw new Error("Erro ao buscar usuário!");
    }
  }
}

export { DetailUserService };