const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Agent = sequelize.define('agent', {
    agentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 3
    },
    createdBy: {
        type: DataTypes.STRING,
        defaultValue: 'company123',
    },
    createdOn: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    timestamps: false,
    tableName: "agent",
});

// Function to create static data
async function createStaticData() {
    const existingAgents = await Agent.count();
    if (existingAgents === 0) {
        await Agent.bulkCreate([
            { name: "Agent1", email: "agent1@example.com", username: "agent1", password: "agent1", createdBy: "company123" },
            { name: "Agent2", email: "agent2@example.com", username: "agent2", password: "agent2", createdBy: "company123" },
            { name: "Agent3", email: "agent3@example.com", username: "agent3", password: "agent3", createdBy: "company123" },
            { name: "Agent4", email: "agent4@example.com", username: "agent4", password: "agent4", createdBy: "company123" },
            { name: "Agent5", email: "agent5@example.com", username: "agent5", password: "agent5", createdBy: "company123" },
        ]);
    }
}

// Call this after sequelize.sync() in your main server file
sequelize.sync().then(createStaticData);

module.exports = Agent;
