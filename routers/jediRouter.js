const express = require('express');
const {validateSchema, jediSchema} = require("../middleware/validation");
const {
    createJedi,
    getAll,
    getJedi,
    replaceJedi,
    deleteJedi,
} = require('../controllers/jediController');

const jediRouter = express.Router();

//TODO 6 Add validation schema in proper request
//TODO 8 Add auth middleware to all routes
jediRouter.get('/', getAll);
jediRouter.get('/:id', getJedi);
jediRouter.post('/', validateSchema(jediSchema), createJedi);
jediRouter.put('/:id',validateSchema(jediSchema), replaceJedi);
jediRouter.delete('/:id', deleteJedi);

module.exports = jediRouter;