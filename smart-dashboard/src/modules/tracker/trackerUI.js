import { getMainContainer } from "../../core/uiContainer.js";
import { getLeaderboard } from "./tracker.js";

export function renderTrackerUI() {
    const container = getMainContainer();
    const leaderboard = getLeaderboard();
    
    let html = `
        <h2 style="color:#bb86fc;margin-bottom:20px">📊 Таблица лидеров</h2>
        
        <div style="background:#1e1e1e;border-radius:8px;overflow:hidden">
            <table style="width:100%;border-collapse:collapse">
                <thead>
                    <tr style="background:#2d2d2d">
                        <th style="padding:16px;text-align:left;color:#bb86fc">Место</th>
                        <th style="padding:16px;text-align:left;color:#bb86fc">Участник</th>
                        <th style="padding:16px;text-align:left;color:#bb86fc">Очки</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    leaderboard.forEach((user, index) => {
        html += `
            <tr style="border-bottom:1px solid #2d2d2d">
                <td style="padding:16px">#${index + 1}</td>
                <td style="padding:16px">${user.name}</td>
                <td style="padding:16px;color:#bb86fc">⭐ ${user.points}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    container.innerHTML = html;
}
