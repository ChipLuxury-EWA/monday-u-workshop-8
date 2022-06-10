const { body, validationResult, checkSchema } = require("express-validator");

function validate() {
    return [
        body("id", "id not valid number").exists().isNumeric(),
        body("name", "name dosn`t not exists or invalid")
            .exists()
            .isString()
            .escape(),
        body("gender", "password doesn't exists").isIn(["male", "female"]),
        (req, res, next) => {
            try {
                validationResult(req).throw();
                next();
            } catch (err) {
                console.log(err);
                res.status(400).json({
                    status: 400,
                    error: err.errors.map((value) => value.msg).join(),
                });
            }
        },
    ];
}

function validateSchema(schema) {
    const validationMiddleware = checkSchema(schema);
    return async (req, res, next) => {
        await validationMiddleware.run(req);
        const result = validationResult(req);
        if (result.isEmpty()) {
            next();
            return;
        }
        const error = Error(
            result
                .array()
                .map((value) => value.msg)
                .join()
        );
        error.statusCode = 400;
        next(error);
    };
}

//TODO 5: Add missing fields
const jediSchema = {
    id: {
        isInt: true,
        errorMessage: "ID is wrong",
        in: ["body"],
    },
    name: {
        isString: {
            errorMessage: "Name is wrong",
        },
        isLength: {
            errorMessage: "Name should be 4 chars long",
            options: { min: 4 },
        },
    },
    height: {
        isNumeric: { errorMessage: "height is not a number" },
        toFloat: true,
        isFloat: {
            options: { min: 10, max: 300 },
            errorMessage: "height is not in range",
        },
        errorMessage: "error in height parameter",
    },
    mass: {
        isNumeric: { errorMessage: "mass is not a number" },
        isInt: { options: { min: 10 }, errorMessage: "mass is not in range" },
    },
};

module.exports = {
    validateSchema,
    jediSchema,
};
