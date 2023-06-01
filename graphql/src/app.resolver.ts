import { UseGuards } from "@nestjs/common";
import { Args, Context, Query,Resolver } from "@nestjs/graphql";
import { AuthGuard } from "./auth/auth.guard";
import * as jwt from "jsonwebtoken"
import { User } from "./user/entity/user.entity";
import { JwtGuard } from "./auth/jwt.guard";
import { RoleGuard, Roles } from "./auth/role.guard";
@Resolver(of => String)
export class AppResolver{

    @Query(resource => String)
    index():string{
        return "NestJs Graphql Server"; 
    }

    @Query(resource => String)
    @UseGuards(JwtGuard,new RoleGuard(Roles.ADMIN))
    securedDataForAdmin(@Context("user") user : any):string{
        return "This is total secure data for Admin" + JSON.stringify(user); 
    }
  
    @Query(resource => String)
    @UseGuards(JwtGuard,new RoleGuard(Roles.NORMAL_USER))
    securedDataForNormalUser(@Context("user") user : any):string{
        return "This is total secure data for normal user" + JSON.stringify(user); 
    }

    @Query(resource => String)
    @UseGuards(AuthGuard)
    login(
         @Args({name:"email",type:()=>String}) email:string,
         @Args({name:"password",type:()=>String}) password:string,
         @Context("user") user:User
        ):string{
            let payload = {
                id:user.id,
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
                role:user.role
            }
        
        return jwt.sign(payload,"key",{expiresIn:"200s"}); 
    }
}