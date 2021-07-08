import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Authentication from '../../utils/Authentication'
export default class AuthController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.all()

    const authentication = new Authentication()

    try {
      const token = await authentication.attempt(email, password)

      return response.ok({ token: token })
    } catch (error) {
      console.log(error)

      response.badRequest('email e/ou senha inválidas')
    }
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
