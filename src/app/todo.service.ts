import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private storage: Storage) {
    this.init()
   }

  addTask(key, value){
    console.log(key)
    console.log(value)
    this.storage.set(key,value)
  }

  deleteTask(key){
    this.storage.remove(key) 
  }

  getAllTasks(){
    let tasks: any = []
    this.storage.forEach((key, value, index) => {
      
        tasks.push({'key':value, 'value':key})
    }); 
    return tasks   
  }

  

  async init(){
    await this.storage.create()
  }


}
