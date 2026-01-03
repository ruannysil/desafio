import {Response, Request, Router} from 'express';
import { CreateUserController } from './controllers/user/createUserController';

const router = Router();

router.get("/test", (req: Request, res: Response) => {
    res.json({message: "testando rotas api"});
});

router.post("/create-user", new CreateUserController().handle);

export {router};