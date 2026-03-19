import { getMainContainer } from "../../core/uiContainer.js";
import { getLeaderboard, getTopUsers } from "./tracker.js";

export function renderTrackerUI() {
    const container = getMainContainer();
    const leaderboard = getLeaderboard();
    const topUsers = getTopUsers(3);
    
    container.innerHTML = `
        <div class="module-header">
            <h2>📊 Таблица лидеров</h2>
        </div>
        
        <div class="podium">
            ${renderPodium(topUsers)}
        </div>
        
        <div class="leaderboard-table">
            <table>
                <thead>
                    <tr>
                        <th>Место</th>
                        <th>Участник</th>
                        <th>Очки</th>
                        <th>Достижения</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderLeaderboardRows(leaderboard)}
                </tbody>
            </table>
        </div>
    `;
}

function renderPodium(topUsers) {
    if (topUsers.length === 0) return '';
    
    const podiumMap = {
        0: { place: 1, medal: '🥇', height: '120px' },
        1: { place: 2, medal: '🥈', height: '90px' },
        2: { place: 3, medal: '🥉', height: '60px' }
    };
    
    return topUsers.map((user, index) => {
        const podium = podiumMap[index];
        if (!podium) return '';
        
        return `
            <div class="podium-item" style="height: ${podium.height}">
                <div class="podium-medal">${podium.medal}</div>
                <div class="podium-name">${user.name}</div>
                <div class="podium-points">${user.points} ⭐</div>
            </div>
        `;
    }).join('');
}

function renderLeaderboardRows(leaderboard) {
    return leaderboard.map((user, index) => `
        <tr>
            <td>#${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.points} ⭐</td>
            <td>${user.achievements.length} 🏆</td>
        </tr>
    `).join('');
}
