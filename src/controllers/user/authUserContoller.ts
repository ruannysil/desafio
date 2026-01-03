import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/authUserService";
import { IUser } from "../../models/userModel";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body as IUser;

    const authService = new AuthUserService();
    try {
      const auth = await authService.execute({
        email,
        password
      } as IUser);
      return res.status(200).json(auth);
    } catch (error: unknown) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}

export { AuthUserController };