import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ExtensionsSchema extends BaseSchema {
  public async up() {
    await this.db.rawQuery('CREATE EXTENSION IF NOT EXISTS "unaccent";').knexQuery
    await this.db.rawQuery('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').knexQuery
  }

  public async down() {}
}
