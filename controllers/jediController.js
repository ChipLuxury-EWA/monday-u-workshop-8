const jediService = require("../service/JediService");

async function createJedi(req, res) {
    console.log("saving jedi");
    await jediService.addJedi(req.body);
    res.status(200).json(req.body);
}

function raiseError(statusCode, message) {
    const error = Error();
    error.statusCode = statusCode;
    error.message = message;
    throw error;
}

async function getJedi(req, res) {
    let jediId = Number.parseInt(req.params.id);
    //TODO-DONE 1. Turn it to error with proper status and throw it
    if (isNaN(jediId)) {
        raiseError(400, "jedi id not a number");
    }

    const jedi = await jediService.getJedi(jediId);

    if (!jedi) {
        //TODO-DONE 2. Turn it to error with proper status and throw it
        raiseError(404, "Not found");
    }

    res.status(200).json(jedi);
}

async function getAll(req, res) {
    let data = await jediService.getAll();
    if (!data) data = [];
    res.status(200).json(data);
}

async function replaceJedi(req, res) {
    const jediId = Number.parseInt(req.params.id);
    if (isNaN(jediId)) {
        //TODO-DONE  3. Turn it to error with proper status and throw it
        raiseError(400, "wrong parameters");
    }

    const data = await jediService.replaceJedi(jediId, req.body);
    res.status(200).json(data);
}

async function deleteJedi(req, res) {
    let jediId = Number.parseInt(req.params.id);
    //TODO-DONE 4. Turn it to error with proper status and throw it
    if (isNaN(jediId))
        raiseError(400, "wrong parameters")

    const data = await jediService.deleteJedi(jediId);
    res.status(200).json(data);
}

module.exports = {
    createJedi,
    deleteJedi,
    getAll,
    getJedi,
    replaceJedi,
};
