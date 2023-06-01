import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from "jsonwebtoken"

import { Observable } from "rxjs";
import { User } from "src/user/entity/user.entity";

import { UserService } from "src/user/user.service";

@Injectable()
export class JwtGuard implements CanActivate 
{

async canActivate(context: ExecutionContext): Promise<boolean> 
{
    const ctx = GqlExecutionContext.create(context).getContext();
    console.log(ctx.req)
    const authorizationHeader = ctx.req.headers.authorization;
    if(authorizationHeader){
        const token = authorizationHeader.split(" ")[1];
        try {
            const user = jwt.verify(token,"key");
            ctx.user = user;
            console.log(user);
            return true;
        }catch(error){
            throw new HttpException('Invalid Token'+error.message,HttpStatus.UNAUTHORIZED)
        }
     }
}

}
