const Joi = require('joi')

 exports.LoginValidation = function(body){
  const JoiSchema = Joi.object({
        
    email: Joi.string()
              .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
              .min(5)
              .max(30)
              .required(),
                
    password: Joi.string()
          .min(5)
          .max(50)
          .required(),
  }).options({ abortEarly: false });


  return JoiSchema.validate(body); 
}

exports.RegistrationValidation = function(body){
  const JoiSchema = Joi.object().keys({
        
    first_name: Joi.string()
                    .min(5)
                    .max(30)
                    .required()
                    .messages({
                      'string.base': `"first_name" should be a type of 'text'`,
                      'string.empty': `"first_name" cannot be an empty field`,
                      'string.min': `"first_name" should have a minimum length of {#limit}`,
                      'string.max': `"first_name" should have a minimum length of {#limit}`,
                      'any.required': `"first_name" is a required field`
                    }),

    last_name: Joi.string()
                  .min(5)
                  .max(30)
                  .required(),            
    mobile: Joi.string()
                .length(10)
                .required()
                .messages({
                  'number.base': `"mobile" should be a type of 'text'`,
                  'number.empty': `"mobile" cannot be an empty field`,
                  'number.length': `"mobile" should have a minimum length of {#limit}`,
                  'number.max': `"mobile" should have a maxminum length of {#limit}`,
                  'any.required': `"mobile" is a required field`
                }),

    // date_of_birth: Joi.date()
    //                   .greater('1-1-1974')
    //                   .less('12-31-2022'),

    username: Joi.string()
                  .min(5)
                  .max(30)
                  .required(),

    email: Joi.string()
              .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
              .max(30)
              .required(),

    password: Joi.string()
                  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                  .min(5)
                  .max(30)
                  .required(),
    repeat_password: Joi.ref('password'),                      

    country: Joi.string()
                  .required(),

    city: Joi.string()
              .required(),                
    state: Joi.string()
              .required(),   

            
  }).options({ abortEarly: false });


  return JoiSchema.validate(body); 
}

exports.OrganizationValidation = function(body){
  const JoiSchema = Joi.object({     
            
    orgName: Joi.string()
             .required(),
    username: Joi.string()
             .required(),
    password: Joi.string()
             .required(),
    first_name: Joi.string()
             .required(),          
    orgSize: Joi.string()
              .required(),
    orgAddress: Joi.string()
               .required(),
    orgCountry: Joi.string()
                .required(),              
  }).options({ abortEarly: false });


  return JoiSchema.validate(body); 
} 

exports.TeacherValidation = function(body){
  const JoiSchema = Joi.object({     
            
    first_name: Joi.string()
             .required(),
    last_name: Joi.string()
             .required(),
    username: Joi.string()
             .required(),
    password: Joi.string()
             .required(),          
    email: Joi.string()
              .required(),
    experience: Joi.string()
               .required(),    
    country:Joi.string()
              .required(),                  
  }).options({ abortEarly: false });


  return JoiSchema.validate(body); 
} 