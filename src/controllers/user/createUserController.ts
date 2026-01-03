import { Request, Response } from "express";
import { IUser } from "../../models/userModel";
import { CreateUserService } from "../../services/user/createUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body as IUser;
    const CreateUser = new CreateUserService();

    try {
      const user = await CreateUser.execute({
        email,
        password
      } as IUser);
      return res.status(200).json(user);

    } catch (error: unknown) {
      if(error && typeof error === 'object' && 'code' in error && (error as any).code === 11000) {
        return res.status(400).json({ message: "Email já cadastrado!" });
      }
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}

export { CreateUserController };

