

const emailSchema = new emailValidator();

emailSchema.validate(req.body.email)

module.export