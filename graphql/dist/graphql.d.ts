export interface IQuery {
    index(): string | Promise<string>;
    securedDataForAdmin(): string | Promise<string>;
    securedDataForNormalUser(): string | Promise<string>;
    login(email: string, password: string): string | Promise<string>;
}
