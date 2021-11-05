import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    return this.sqlite.create({
      name: 'tasks.db',
      location: 'default'
    });
  }

  /**
   * Cria a estrutura inicial do banco de dados
   */
  public async createDatabase() {
    return await this.getDB()
      .then(async (db: SQLiteObject) => {
        this.createTable(db);
      })
      .catch(e => console.log(e));
  }

  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTable(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS Tasks (id integer, task TEXT)'],
    ])
      .then(() => console.log('Tabela criada'))
      .catch(e => console.error('Erro ao criar a tabela', e));
  }
}