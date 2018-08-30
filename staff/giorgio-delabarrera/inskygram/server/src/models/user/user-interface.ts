/**
 *
 *
 * @interface UserInterface
 */
interface UserInterface {
  username: string;
  password: string;
  name: string;
  email: string;
  website: string;
  phoneNumber: string;
  gender: number;
  biography: string;
  avatar: string;
  privateAccount: boolean;
  lastLogin: Date;
  enable: boolean;
  created: Date;
  updated: Date;
}

export default UserInterface;
