import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.all()
    try {
      const token = await auth.attempt(email, password)
      return token
    } catch (error) {
      response.badRequest('email e/ou senha inválidas')
    }
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
