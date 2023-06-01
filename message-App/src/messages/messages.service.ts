import { Injectable } from "@nestjs/common";
import { MessageRepository } from "./messages.repository";

@Injectable()
export class MessagesService{
     constructor(public messageRepo : MessageRepository){
     }

    findone(id:string){
        return this.messageRepo.findOne(id);
    }
    findAll(){
        return this.messageRepo.findAll();
    }
    create(content:string){
        return this.messageRepo.create(content);
    }
}