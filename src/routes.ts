import {Response, Request, Router} from 'express';
import { CreateUserController } from './controllers/user/createUserController';
import { DetailUserController } from './controllers/user/detailsUserController';
import { AuthUserController } from './controllers/user/authUserContoller';
import { isAuthenticated } from './middleware/isAuthenticated';

const router = Router();

router.get("/test", (req: Request, res: Response) => {
    res.json({message: "testando rotas api"});
});

router.post("/create-user", new CreateUserController().handle);
router.post("/session",  new AuthUserController().handle);
router.get("/detail-user", isAuthenticated, new DetailUserController().handle);

export {router};