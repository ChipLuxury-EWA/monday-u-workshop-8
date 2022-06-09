const fs = require('fs').promises;
const jediFile = 'jedi_list.json';

async function replaceJedi(jediId, body) {
    const data = await getAll();
    const index = data.findIndex(value => {
        return value.id === jediId;
    });
    const jedi = data[index];
    Object.assign(jedi, body);
    await writeJediFile(data);
    return jedi;
}

async function getAll() {
    return await readJediFile();
}

async function addJedi(jedi) {
    let data = await readJediFile();
    if (!data) {
        data = [];
    }
    data.push(jedi);
    await writeJediFile(data);
}

async function getJedi(id) {
    const data = await readJediFile();
    return data.find((value) => value.id === id);
}

async function readJediFile() {
    try {
        const data = await fs.readFile(jediFile);
        return JSON.parse(data.toString());
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
}

async function writeJediFile(content) {
    try {
        await fs.writeFile(jediFile, JSON.stringify(content));
    } catch (error) {
        console.error(`Failed to write to file ${error.message}`);
    }
}

async function deleteJedi(id) {
    const data = await getAll();
    const index = data.findIndex((value) => value.id === id);
    const deletedJedi = data[index]
    data.splice(index, 1);
    await writeJediFile(data);
    return deletedJedi
}

module.exports = {
    addJedi,
    getAll,
    getJedi,
    replaceJedi,
    deleteJedi,
};