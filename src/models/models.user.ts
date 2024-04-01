import { dbLoginFunction, pool } from "@/db/config";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  bitrhDate: string;
  email?: string;
}

export default class M_User {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  async authenticateUser(): Promise<
    | {
        isAuthenticated: true;
        user: User;
      }
    | { isAuthenticated: false }
  > {
    const { rows: queryRes } = await pool.query(
      `select * from ${dbLoginFunction(this.email, this.password)}`
    );
    if (queryRes && queryRes.length) {
      const user = queryRes[0];
      return {
        isAuthenticated: true,
        user: user,
      };
    } else {
      return {
        isAuthenticated: false,
      };
    }
  }
}
