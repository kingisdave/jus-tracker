const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const userSchema = Joi.object({
      firstName: Joi.string()
        .regex(/^[a-zA-Z0-9]{2,20}$/),
      lastName: Joi.string()
        .regex(/^[a-zA-Z0-9]{2,20}$/),
      userName: Joi.string()
        .regex(/^[a-zA-Z0-9]{2,15}$/),
      email: Joi.string().email(),
      password: Joi.string().min(6)
        .regex(/^[a-zA-Z0-9]{2,20}$/),
      profilePic: Joi.string()
    })

    // schema options 
    const options = {
      abortEarly: false,  //include all the errors
      allowUnknown: true, //ignore unknown props
      stripUnknown: true,  // remove unknown props
    }
    const { error, value } = userSchema.validate(req.body, options);
    if (error){
      // on fail return comma seperated errors
      switch (error.details[0].context.key) {
        case 'firstName':
          res.status(400).send({
            error: 'Must be more than 2 characters in length and less than 12'
          })
          break;
        case 'lastName':
          res.status(400).send({
            error: 'Must be more than 2 characters in length and less than 12'
          })
          break;
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break;
        case 'password':
          res.status(400).send({
            error: `The password provided fail to match the following rules
              <br>
              1. Must contain ONLY the following characters: lower case, upper case, numerics
              <br>
              2. Must be at least 8 characters in length and not greater than 32 characters in length.  
            `
          })
          break;
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
          break;
      }
    } else {
      req.body = value;
      next();
    }

  }
}