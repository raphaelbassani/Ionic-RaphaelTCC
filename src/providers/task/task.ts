import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class ProductProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public async insert(id: number, task: string) {
    await this.dbProvider.getDB()
      .then(async (db: SQLiteObject) => {
        let sql = 'insert into Tasks (id, task) values (?,?)';
        let data = [id, task];

        try {
          return await db.executeSql(sql, data);
        } catch (e) {
          return console.error(e);
        }
      })
      .catch((e) => console.error(e));
      return;
  }

  public async remove(task: string) {
    return await this.dbProvider.getDB()
      .then(async (db: SQLiteObject) => {
        let sql = 'delete from Tasks where task = ?';
        let data = [task];

        try {
          return db.executeSql(sql, data);
        } catch (e) {
          return console.error(e);
        }
      })
      .catch((e) => console.error(e));
  }

   public async getAll(task: string = null) {
    return await this.dbProvider.getDB()
      .then(async (db: SQLiteObject) => {

        try {
          const data = await db.executeSql('select task from Tasks', []);
          if (data.rows.length > 0) {
            let tasks: any[] = [];
            for (var i = 0; i < data.rows.length; i++) {
              var task = data.rows.item(i);
              tasks.push(task);
            }
            return tasks;
          } else {
            return [];
          }
        } catch (e) {
          return console.error(e);
        }
      })
      .catch((e) => console.error(e));
    }
  }


export class Task {
  id: number;
  task: string;
}