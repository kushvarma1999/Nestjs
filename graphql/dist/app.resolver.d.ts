import { User } from "./user/entity/user.entity";
export declare class AppResolver {
    index(): string;
    securedDataForAdmin(user: any): string;
    securedDataForNormalUser(user: any): string;
    login(email: string, password: string, user: User): string;
}
