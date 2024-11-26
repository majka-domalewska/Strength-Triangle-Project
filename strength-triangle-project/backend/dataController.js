const { client, isConnected } = require("./db.js");

async function getAnswers() {
    if (!isConnected()) {
        throw new Error("Database not connected.");
    }

    const db = client.db("strength_triangle");
    const answersEn = db.collection("answers_en");
    const answersNl = db.collection("answers_nl");

    // console.log(answersEn, answersNl);
    return { answersEn, answersNl };
}

async function getOutcomes() {
    if (!isConnected()) {
        throw new Error("Database not connected.");
    }

    const db = client.db("strength_triangle");
    const outcomesEn = db.collection("outcomes_en");
    const outcomesNl = db.collection("outcomes_nl");

    // console.log(answersEn, answersNl);
    return { outcomesEn, outcomesEn };
}

module.exports = {getAnswers, getOutcomes};