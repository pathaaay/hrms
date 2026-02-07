export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IUserProfile {
  userId: number;
  profileId: number;
  name: string;
  email: string;
  manager: IUser;
  role: string;
  department: string;
  dateOfBirth: string;
  dateOfJoining: string;
  avatarPathSrc: string;
}
