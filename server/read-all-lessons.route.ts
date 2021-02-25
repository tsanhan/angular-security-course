

import {db} from "./database";
import { Request, Response } from "express";


export function readAllLessons(req: Request, res: Response) {


    return res.status(200).json(db.readAllLessons());
}
