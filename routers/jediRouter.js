const express = require("express");
const { validateSchema, jediSchema } = require("../middleware/validation");
const { checkAuth, checkMidFromAuth } = require("../middleware/auth.js");
const {
    createJedi,
    getAll,
    getJedi,
    replaceJedi,
    deleteJedi,
} = require("../controllers/jediController");

const jediRouter = express.Router();
function checkMid(req, res, next) {
    console.log("hiii");
    next();
}
//TODO 6: DONE - Add validation schema in proper request
//TODO 8 Add auth middleware to all routes
jediRouter.get("/", checkAuth, getAll);
jediRouter.get("/:id", checkAuth, getJedi);
jediRouter.post("/", checkAuth, validateSchema(jediSchema), createJedi);
jediRouter.put("/:id", checkAuth, validateSchema(jediSchema), replaceJedi);
jediRouter.delete("/:id", checkAuth, deleteJedi);

module.exports = jediRouter;
