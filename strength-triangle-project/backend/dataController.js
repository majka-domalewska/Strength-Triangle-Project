const { client, isConnected } = require("./db.js");

async function getAnswers() {
    if (!isConnected()) {
        throw new Error("Database not connected.");
    }

    const db = client.db("strength_triangle");
    const answersEn = db.collection("answers_en").find().toArray();
    const answersNl = db.collection("answers_nl").find().toArray();

    // console.log(answersEn, answersNl);
    return { answersEn, answersNl };
}

async function getOutcomes() {
    if (!isConnected()) {
        throw new Error("Database not connected.");
    }

    const db = client.db("strength_triangle");
    const outcomesEn = db.collection("outcomes_en").find().toArray();
    const outcomesNl = db.collection("outcomes_nl").find().toArray();

    // console.log(answersEn, answersNl);
    return { outcomesEn, outcomesNl };
}

getOutcomes();

module.exports = {getAnswers, getOutcomes};