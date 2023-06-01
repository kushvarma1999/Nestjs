import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    UserModule,
    AuthModule,
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      playground:true,
      autoSchemaFile: join(process.cwd(),"src/schema.graphql"),
      definitions:{
        path: join(process.cwd(),'src/graphql.ts'),//this will generate an interface according to the Schema file
      },
      // typePaths:["./**/*.graphql"]
    }),
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>{
        return{
            type:'postgres',
            database: config.get<string>('DB_NAME'),
            host: config.get<string>('HOST'),
            port: config.get<number>('PORT'),
            username: config.get<string>('DB_USERNAME'),
            password: config.get<string>('DB_PASSWORD'),
            entities:[__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }
      }
    })],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
