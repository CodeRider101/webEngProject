import highScoreSchema from "../models/highscoreSchema.js";

export const leaderboardOnInnit = async (req, res) => {
    try {
        const { username, wordLength, personal, timeSpan } = req.query;
        let result;
        if (personal == "true") {
            result = await highScoreSchema.find({
                username: username,
                wordLength: wordLength,
            });
        } else if (timeSpan === "All time") {
            result = await highScoreSchema.find({
                wordLength: wordLength,
            });
        } else {
            result = await highScoreSchema.find({
                wordLength: wordLength,
                date: { $gte: calculateDate(timeSpan) },
            });
        }

        result = sortLeaderboard(result);
        return res.json(result);
    } catch (e) {
        res.status(400).json(e);
        console.log(e);
    }
};
function sortLeaderboard(result) {
    result.sort((a, b) => {
        return b.score - a.score;
    });
    result = result.slice(0, 5);
    return result;
}

function calculateDate(timeSpan) {
    const currentDate = new Date();

    // Calculate the date based on the timeSpan
    if (timeSpan === "Daily") {
        currentDate.setDate(currentDate.getDate() - 1);
    } else if (timeSpan === "Hourly") {
        currentDate.setHours(currentDate.getHours() - 1);
    } else if (timeSpan === "Weekly") {
        currentDate.setDate(currentDate.getDate() - 7);
    } else if (timeSpan === "Monthly") {
        currentDate.setMonth(currentDate.getMonth() - 1);
    }
    return currentDate.toISOString();
}
