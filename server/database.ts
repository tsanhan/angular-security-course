import { DbUser } from './db-user.model';

import * as _ from 'lodash';
import { LESSONS, USERS } from "./database-data";


class InMemoryDatabase {

  userCounter = 0;

  readAllLessons() {
    return _.values(LESSONS);
  }

  createUser(email: string, password: string) {
    const id = ++this.userCounter;
    const user: DbUser = {
      id,
      email,
      password
    };

    USERS[id] = user;
    return user;
  }

}

export const db = new InMemoryDatabase();
