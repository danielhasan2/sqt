/**
 * @namespace Score
 * @author A. Freddie Page
 * @version 2022.23
 * @description Provides the scoring system for a Tetris Game.
 */
const Score = {};

/**
 * Represents the score, lines cleared, and last clear status in a Tetris game.
 * @typedef {Object} ScoreObject
 * @property {number} score - Current score of the game.
 * @property {number} lines_cleared - Total number of lines cleared.
 * @property {boolean} last_clear_was_tetris - Indicates if the last cleared lines were a Tetris (4 lines).
 * @memberof Score
 */

/**
 * Initializes a new score object for a Tetris game.
 * @function
 * @memberof Score
 * @returns {Score.ScoreObject} Initialized score object.
 */
Score.new_score = function () {
    return {
        "score": 0,
        "lines_cleared": 0,
        "last_clear_was_tetris": false
    };
};

/**
 * Computes the current level based on lines cleared.
 * @memberof Score
 * @param {Score.ScoreObject} score - Current score object.
 * @returns {number} Current level.
 */
Score.level = function (score) {
    return Math.floor(score.lines_cleared / 10) + 1;
};

/**
 * Updates the game score and lines cleared based on lines removed.
 * @function
 * @memberof Score
 * @param {number} numLines - Number of lines cleared in the current move.
 * @param {Score.ScoreObject} currentScore - Current score object.
 * @returns {Score.ScoreObject} Updated score object.
 */
Score.cleared_lines = function(numLines, currentScore) {
    const currentLevel = Score.level(currentScore);
    const scoreLookup = {
        1: 100,
        2: 300,
        3: 500,
        4: currentScore.last_clear_was_tetris ? 1200 : 800
    };

    return {
        ...currentScore,
        score: currentScore.score + ((scoreLookup[numLines] || 0) * currentLevel),
        lines_cleared: currentScore.lines_cleared + numLines,
        last_clear_was_tetris: numLines === 4
    };
};

/**
 * Adds points to the current score.
 * @memberof Score
 * @param {number} points - Points to be added.
 * @param {Score.ScoreObject} currentScore - Current score object.
 * @returns {Score.ScoreObject} Updated score object with added points.
 */
Score.add_points = function(points, currentScore) {
    return {
        ...currentScore,
        score: currentScore.score + points
    };
};

export default Object.freeze(Score);
