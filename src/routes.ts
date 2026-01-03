import {Response, Request, Router} from 'express';

const router = Router();

router.get("/test", (req: Request, res: Response) => {
    res.json({message: "testando rotas api"});
});

export {router};