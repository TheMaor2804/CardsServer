const { loginUser, registerUser } = require('../users/models/usersAccessDataService');

const fs = require('fs');
const path = require('path');
const User = require('../users/models/mongodb/User');
const { createCard } = require('../cards/models/cardsAccessDataService');
const { generateBizNumber } = require('../cards/helpers/generateBizNumber');
const { normalizeCard } = require('../cards/helpers/normalizeCard');

const dataFilePath = path.join(__dirname, 'data.json');

function readDataFromFile() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data from file:', err);
        return null;
    }
}

const createInitialUsers = async () => {
    const data = readDataFromFile();
    if (!data) {
        return;
    }
    data.users.forEach(async (user) => {
        await registerUser(user);
    });
}

const createInitialCards = async (userId = "6376274068d78742d84f31d2") => {
    const data = readDataFromFile();
    if (!data) {
        return;
    }
    data.cards.forEach(async (card) => {
        card = await normalizeCard(card, userId);
        await createCard(card);
    });
}

module.exports = { createInitialUsers, createInitialCards };


