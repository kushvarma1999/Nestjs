"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const app_resolver_1 = require("./app.resolver");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                playground: true,
                autoSchemaFile: (0, path_1.join)(process.cwd(), "src/schema.graphql"),
                definitions: {
                    path: (0, path_1.join)(process.cwd(), 'src/graphql.ts'),
                },
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env'
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    return {
                        type: 'postgres',
                        database: config.get('DB_NAME'),
                        host: config.get('HOST'),
                        port: config.get('PORT'),
                        username: config.get('DB_USERNAME'),
                        password: config.get('DB_PASSWORD'),
                        entities: [__dirname + '/**/*.entity{.ts,.js}'],
                        synchronize: true,
                    };
                }
            })
        ],
        controllers: [],
        providers: [app_resolver_1.AppResolver],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map