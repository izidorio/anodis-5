import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        email: 'virk@adonisjs.com',
        password: '123456',
      },
      {
        email: 'romain@adonisjs.com',
        password: '123456',
      },
    ])
  }
}
