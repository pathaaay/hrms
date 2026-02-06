export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IUserProfileType {
  userId: number;
  profileId: number;
  name: string;
  email: string;
  manager: IUser;
  role: string;
  department: string;
  dateOfBirth: string;
  dateOfJoining: string;
}
