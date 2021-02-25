import { validatePassword } from './password-validator';




import { Request, Response } from "express";
import { db } from "./database";
import { USERS } from "./database-data";
import { hash } from "argon2";


export function createUser(req: Request, res: Response) {

  const { email, password } = req.body;

  const errors = validatePassword(password) as string[];


  console.log("errors",errors);

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {


    hash(password).then(passwordDigest => {


      const user = db.createUser(email, passwordDigest);

      console.log(USERS);

      res.status(200).json({ id: user.id, email: user.email });
    })

  }
}
