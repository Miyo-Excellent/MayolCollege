//  Dependencies
import Joi from "@hapi/joi";

export default Joi.object({
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/),

  email: Joi.string()
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
});
