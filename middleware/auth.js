// TODO 7:DONE Add auth middleware
// check to see ig the header han an Authorization Bearer may_the_force_be_with_you

function checkMidFromAuth(req, res, next) {
    console.log("hiii from auth");
    next();
}

const checkAuth = (req, res, next) => {
        console.log(req.headers.authorization);
        const secretToken = req.headers.authorization.split(" ")[1]
        if (secretToken === "may_the_force_be_with_you") {
            console.log("You shall pass from (another movie)")
            next()
        } else {
            res.status(405).json("Wrong password")
        }
};

module.exports = {
    checkAuth,
    checkMidFromAuth,
};
