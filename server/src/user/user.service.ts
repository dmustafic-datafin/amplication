import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { UserServiceBase } from "./base/user.service.base";
import { PasswordService } from "../auth/password.service";
import { User } from "./base/User";
import { UserFindUniqueArgs } from "./base/UserFindUniqueArgs";

@Injectable()
export class UserService extends UserServiceBase {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly passwordService: PasswordService
  ) {
    super(prisma, passwordService);
  }

  async resetPassword(args: UserFindUniqueArgs): Promise<User> {
    return this.prisma.user.update({
      where: args.where,
      data:{
        password: generateRandomString(16)
      }
    });
  }
}

function generateRandomString(length: number) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,/{}=+-_)(*&^%$#@!~';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

