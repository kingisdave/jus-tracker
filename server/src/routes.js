const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.post('/admin/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/admin/login',
    AuthenticationController.login)
}
