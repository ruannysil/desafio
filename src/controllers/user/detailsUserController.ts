import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/detailUserService';


class DetailUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user._id;
    const detailUser = new DetailUserService();

    try {
      const user = await detailUser.execute(user_id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}


export { DetailUserController };
