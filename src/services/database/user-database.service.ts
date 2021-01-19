import { ObjectId } from "mongoose";
import { UserData } from "../../types/interfaces/user-data.interface";

export class UserDatabaseService {
  createUser(userData: UserData) {

  }

  loginUser(userData: UserData) {

  }

  logoutUser(userId: ObjectId) {

  }

  logoutUserFromAllDevices(userId: ObjectId) {

  }

  getLogedUser(userId: ObjectId) {

  }

  updateLogedUser(userId: ObjectId, newUserData: UserData) {

  }

  deleteLogedUser() {

  }

  addUsersAvatar(userId: ObjectId, avatar: Buffer) {

  }

  deleteUsersAvatar(userId: ObjectId) {
    
  }
}