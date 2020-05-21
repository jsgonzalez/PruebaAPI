exports.userPostValidator = (req, res, next) => {
    // title
    req.check('nombre', "Escribe un nombre").notEmpty();
    req.check('nombre', "Nombre debe de ser entre 4 y 10 caracteres").isLength({
        min : 4,
        max : 10
    });

    // email
    req.check('email', "Escribe un email").notEmpty();
    req.check('email', "Email debe de ser entre 3 y 32 caracteres")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min : 3,
        max : 32
    });

    // Password
    req.check('password', "Escribe un password").notEmpty();
    req.check('password')
    .isLength({min: 6})
    .withMessage("Password debe tener al menos 6 caracteres")
    .matches(/\d/)
    .withMessage("Password debe contener un numero");

    const errors = req.validationErrors();

    // if error show the first one ones as they happen
    if(errors){
        const firstError = errors.map((error)=> error.msg)[0];
        return res.status(400).json({error : firstError});
    }

    /// process to next middleware
    next();
};