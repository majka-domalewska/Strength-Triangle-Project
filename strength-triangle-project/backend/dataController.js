const { client, isConnected, connectDB } = require("./db.js");

async function getAnswers() {
    if (!isConnected()) {
        await connectDB();
        throw new Error("Database not connected.");
    }

    const db = client.db("strength_triangle");
    const answersEn = await db.collection("answers_en").find().toArray();
    const answersNl = await db.collection("answers_nl").find().toArray();

    return { answersEn, answersNl };
}

async function getOutcomes() {
    if (!isConnected()) {
        await connectDB();
        throw new Error("Database not connected.");
    }

    const db = client.db("strength_triangle");
    const outcomesEn = await db.collection("outcomes_en").find().toArray();
    const outcomesNl = await db.collection("outcomes_nl").find().toArray();

    return { outcomesEn, outcomesNl };
}

async function fetchData() {
    try {
        await connectDB();
        const { answersEn, answersNl } = await getAnswers();
        const { outcomesEn, outcomesNl } = await getOutcomes();

        // console.log("Answers EN:", JSON.stringify(answersEn, null, 2));
        // console.log("Answers NL:", JSON.stringify(answersNl, null, 2));
        // console.log("Outcomes EN:", JSON.stringify(outcomesEn, null, 2));
        // console.log("Outcomes NL:", JSON.stringify(outcomesNl, null, 2));
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

fetchData();

module.exports = {getAnswers, getOutcomes};