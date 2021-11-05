import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';
import axios from "axios";
import { ProductProvider } from '../../providers/task/task'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todoList = []
  newTaskObj = {}
  itemName
  name
  
  today: number = Date.now();

  constructor(public modalCtlr: ModalController, public todoService:TodoService, public alertController: AlertController, private productProvider: ProductProvider) { 
    this.getAllTask()
    this.getNewName()
  }

  async add(){
    this.newTaskObj = ({itemName:this.itemName})
    let uid = this.itemName
    let canCreate = true
    this.todoList.forEach((key, value, index) => {
      if(key.key==this.itemName){
        canCreate = false
      }
    });
    if(canCreate){
      await this.todoService.addTask(uid,this.newTaskObj)
      this.productProvider.insert(uid, this.newTaskObj.toString())
      this.getAllTask()
      this.itemName = ""
    }else{
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Item já cadastrado',
        buttons: ['OK']
      });
      await alert.present();
    }
    
  }
  
  async getNewName(){ 
    let newName: string
    await axios.request({url: 'https://randomuser.me/api/', method: 'get'}).then(function (response) {
      console.log(response.data.results[0].name.first)
      newName = response.data.results[0].name.first
    }).catch(function (error) {
      console.error(error);
    });
    if(newName){
      this.name = newName;
    }
  }  

  async getAllTask(){
    this.todoList = this.todoService.getAllTasks()
    this.productProvider.getAll()
      .then((result: any[]) => {
        this.todoList = result;
      });
  }

  async delete(key) { 
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Deseja deletar este item?',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Deletar',
          handler: () => {
            this.todoService.deleteTask(key)
            this.productProvider.remove(key)
      .then(() => {
        this.todoService.deleteTask(key);
      })
            this.getAllTask()
          }
        }
      ]
    });
    await alert.present();
  }
}
