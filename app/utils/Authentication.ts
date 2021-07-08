import Database from '@ioc:Adonis/Lucid/Database'
import Hash from '@ioc:Adonis/Core/Hash'
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'

export default class Authentication {
  private uid: string

  public async attempt(uid: string, password: string): Promise<string> {
    this.uid = uid

    const user = await this.getUser()
    console.log('user', user.password)

    const match = await Hash.verify(user.password, password)
    if (match) {
      return await this.sign({ id: user.id })
    }

    return 'ok'
  }

  public async verify(token: string): Promise<boolean> {
    try {
      jwt.verify(token, Env.get('JWT_PUBLIC_KEY'), function (err, decoded) {
        console.log(err)
      })
      return true
    } catch (error) {
      return false
    }
  }

  private async getUser(): Promise<any> {
    const [user] = await Database.query()
      .from('users')
      .select('id', 'password')
      .where('email', this.uid)
      .limit(1)

    return user
  }

  private async sign(payload: any): Promise<any> {
    const token = await jwt.sign(payload, Env.get('JWT_PRIVATE_KEY'), { algorithm: 'RS256' })

    return token
  }
}
