import { dummyLeaderboard } from "./dummyLeaderboard.js";

let leaderboard = [...dummyLeaderboard];

export function getLeaderboard() {
    return [...leaderboard].sort((a, b) => b.points - a.points);
}

export function addScore(entry) {
    const newEntry = {
        id: Date.now(),
        name: entry.name,
        points: entry.points || 0,
        achievements: entry.achievements || [],
        lastActive: new Date().toISOString()
    };
    leaderboard.push(newEntry);
    return newEntry;
}

export function updateScore(id, points) {
    const entry = leaderboard.find(e => e.id === id);
    if (entry) {
        entry.points += points;
        entry.lastActive = new Date().toISOString();
    }
    return entry;
}

export function getTopUsers(limit = 5) {
    return getLeaderboard().slice(0, limit);
}

export function getUserRank(userId) {
    const sorted = getLeaderboard();
    const index = sorted.findIndex(u => u.id === userId);
    return index !== -1 ? index + 1 : null;
}
