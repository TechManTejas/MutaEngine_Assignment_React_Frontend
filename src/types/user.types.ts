export interface IUserData {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface IAuthResponse {
  user: IUserData;
  access: string;
  refresh: string;
}
