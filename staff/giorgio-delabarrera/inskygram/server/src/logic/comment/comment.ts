import { UserModelInterface } from "../../models/user";

const post = {
  create(user: UserModelInterface, description?: string) { },

  update(id: string, description: string) { },

  remove(id: string) { },
};

export default post;
