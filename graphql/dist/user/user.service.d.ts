import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
export declare class UserService {
    readonly userRepo: Repository<User>;
    constructor(userRepo: Repository<User>);
    findUserByEmail(email: string): Promise<User>;
}
