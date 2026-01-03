import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import {router} from "./routes"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export {app};