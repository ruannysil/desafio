import {Response, Request, Router} from 'express';
import { CreateUserController } from './controllers/user/createUserController';
import { DetailUserController } from './controllers/user/detailsUserController';
import { AuthUserController } from './controllers/user/authUserContoller';
import { isAuthenticated } from './middleware/isAuthenticated';
import { CreateOrderController } from './controllers/order/createOrderController';
import { GetOrderListController } from './controllers/order/getOrderListController';

const router = Router();

router.get("/test", (req: Request, res: Response) => {
    res.json({message: "testando rotas api"});
});

router.post("/create-user", new CreateUserController().handle);
router.post("/session",  new AuthUserController().handle);
router.get("/detail-user", isAuthenticated, new DetailUserController().handle);

router.post("/create-order", isAuthenticated, new CreateOrderController().handle);
router.get("/orders", isAuthenticated, new GetOrderListController().handle);

export {router};