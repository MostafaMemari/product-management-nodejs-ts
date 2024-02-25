import createHttpError from "http-errors";
import { errorHandler } from "../../common/exception/error.handler";

import { IUser } from "./auth.types";
import { UserDTO, UserLoginDTO } from "./auth.dto";
import { UserModel } from "./auth.model";
import { AuthMessage } from "./auth.message";
import { comparePassword, generateToken, hashPassword } from "../../common/utils/functions";

class AuthSevice {
  
  async register(userDto: UserDTO): Promise<string> {
    errorHandler({ userDto });
    const { password, confirmPassword, email, username } = userDto;

    const userExist = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (userExist) throw createHttpError.Conflict(AuthMessage.Conflict);

    if (password !== confirmPassword) throw createHttpError.BadRequest(AuthMessage.RepeatPassword);
    const countOfUsers = await UserModel.countDocuments();

    const hashedPassword = await hashPassword(password);

    const userCreate: IUser = await UserModel.create({ ...userDto, role: countOfUsers > 0 ? "USER" : "SUPER_ADMIN", password: hashedPassword });

    const user = userCreate.toObject();
    Reflect.deleteProperty(user, "password");

    const accessToken = await generateToken({ id: user._id });

    return accessToken;
  }
  async login(userDto: UserLoginDTO): Promise<string> {
    errorHandler({ userDto });
    const { password, identifier } = userDto;

    const userExist = await UserModel.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!userExist) throw createHttpError.Unauthorized(AuthMessage.Unauthorized);

    const isPasswordValid = await comparePassword(password, userExist.password);
    if (!isPasswordValid) throw createHttpError.Unauthorized(AuthMessage.Unauthorized);

    const accessToken = await generateToken({ id: userExist._id });

    return accessToken;
  }
}
export default new AuthSevice();
