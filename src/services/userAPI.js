<<<<<<< HEAD
import { CONFIG } from "@/constants/config";
import bcryptjs from "bcryptjs";
=======

import { CONFIG } from "@/constants/config"
import bcryptjs from 'bcryptjs'
>>>>>>> b59635e63d96b77c44c18ba75db20222652b1708

const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": CONFIG.JSONBIN_API_KEY,
  "X-Access-Key": CONFIG.JSONBIN_API_KEY,
};

export const userApi = {
  // GET
  async fetchUsers() {
    const response = await fetch(CONFIG.USER_API_URL, { headers });
    // console.log(response)
    const data = await response.json();
    return data.record.users;
  },

  // POST
  async createUser(newUser) {
<<<<<<< HEAD
    const salt = bcryptjs.genSaltSync(10);
    const cryptPW = bcryptjs.hashSync(newUser.password, salt);
    const cryptUser = { ...newUser, password: cryptPW };
=======

    const salt = bcryptjs.genSaltSync(10);
    const cryptPW = bcryptjs.hashSync(newUser.password, salt)
    const cryptUser = {...newUser, password: cryptPW}

>>>>>>> b59635e63d96b77c44c18ba75db20222652b1708

    const currentUsers = await this.fetchUsers();
    const response = await fetch(CONFIG.USER_API_URL, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        users: [...currentUsers, cryptUser],
      }),
    });
    const data = await response.json();
    return data.record.users;
  },

  // PUT
  async updateUser(id, updatedUser) {
    const currentUsers = await this.fetchUsers();
    const updatedUsers = currentUsers.map((user) =>
      user.id === id ? { ...user, ...updatedUser } : user,
    );

    const response = await fetch(CONFIG.USER_API_URL, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        users: updatedUsers,
      }),
    });
    const data = await response.json();
    return data.record.Users;
  },

  // DELETE
  async deleteUser(id) {
    const currentUsers = await this.fetchUsers();
    const filteredUsers = currentUsers.filter((user) => user.id !== id);

    const response = await fetch(CONFIG.USER_API_URL, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        Users: filteredUsers,
      }),
    });
    const data = await response.json();
    return data.record.Users;
  },
};
