import { CONFIG } from "@/constants/config";
import bcryptjs from "bcryptjs";

const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": CONFIG.JSONBIN_API_KEY,
  "X-Access-Key": CONFIG.JSONBIN_API_KEY,
};

export const userApi = {
  // GET
  async fetchUsers() {
    try{
      const response = await fetch(CONFIG.USER_API_URL, { headers });
      const data = await response.json();
      return data.record.users;
    } catch(error) {
      console.log(error)
    }
  },

  // get user by id
  async fetchUserById(id) {
    const allUsers = await this.fetchUsers();
    const user = allUsers.filter((user) => user.id === id);
    return user[0];
  },

  // POST
  async createUser(newUser) {
    
    const salt = bcryptjs.genSaltSync(10);
    const cryptPW = bcryptjs.hashSync(newUser.password, salt);
    newUser.name = newUser.name.charAt(0).toUpperCase() + newUser.name.slice(1);
    const cryptUser = { ...newUser, password: cryptPW };
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

  // PUT ############## används inte ännu ##############
  // async updateUser(id, updatedUser) {
  //   const currentUsers = await this.fetchUsers()
  //   const updatedUsers = currentUsers.map((user) =>
  //     user.id === id ? { ...user, ...updatedUser } : user,
  //   )

  //   const response = await fetch(CONFIG.USER_API_URL, {
  //     method: 'PUT',
  //     headers,
  //     body: JSON.stringify({
  //       users: updatedUsers,
  //     }),
  //   })
  //   const data = await response.json()
  //   return data.record.Users
  // },

  // DELETE ############## används inte ännu ##############
  // async deleteUser(id) {
  //   const currentUsers = await this.fetchUsers()
  //   const filteredUsers = currentUsers.filter((user) => user.id !== id)

  //   const response = await fetch(CONFIG.USER_API_URL, {
  //     method: 'PUT',
  //     headers,
  //     body: JSON.stringify({
  //       Users: filteredUsers,
  //     }),
  //   })
  //   const data = await response.json()
  //   return data.record.Users
  // },
};
