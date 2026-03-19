import { getMainContainer } from "../../core/uiContainer.js";
import { getTasks, addTask, toggleTask, deleteTask, getTotalPoints } from "./tasks.js";

export function renderTasksUI() {
    const container = getMainContainer();
    const tasks = getTasks();
    const totalPoints = getTotalPoints();
    
    let html = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
            <h2 style="color:#bb86fc">✅ Мои задачи</h2>
            <div style="background:#bb86fc;color:#121212;padding:8px 24px;border-radius:30px;font-weight:bold">⭐ ${totalPoints} очков</div>
        </div>
        
        <div style="display:flex;gap:10px;margin-bottom:20px;background:#1e1e1e;padding:16px;border-radius:8px">
            <input type="text" id="newTaskTitle" placeholder="Новая задача..." style="flex:1;padding:8px;background:#2d2d2d;border:none;color:white;border-radius:4px">
            <input type="number" id="newTaskPoints" value="1" min="1" max="10" style="width:80px;padding:8px;background:#2d2d2d;border:none;color:white;border-radius:4px">
            <button onclick="addNewTask()" style="padding:8px 24px;background:#bb86fc;color:#121212;border:none;border-radius:4px;font-weight:bold;cursor:pointer">➕ Добавить</button>
        </div>
        
        <div id="tasksList">
    `;
    
    tasks.forEach(task => {
        html += `
            <div style="display:flex;align-items:center;gap:10px;padding:12px;background:#1e1e1e;margin-bottom:8px;border-radius:8px;opacity:${task.completed?0.7:1}">
                <input type="checkbox" ${task.completed?'checked':''} onchange="toggleTask(${task.id})" style="width:20px;height:20px">
                <span style="flex:1;${task.completed?'text-decoration:line-through':''}">${task.title}</span>
                <span style="color:#bb86fc;font-weight:bold">⭐ ${task.points}</span>
                <button onclick="deleteTask(${task.id})" style="background:none;border:none;color:#f44336;cursor:pointer;font-size:18px">🗑️</button>
            </div>
        `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
    
    window.addNewTask = () => {
        const title = document.getElementById('newTaskTitle').value;
        const points = document.getElementById('newTaskPoints').value;
        if (title) {
            addTask(title, points);
            renderTasksUI();
        }
    };
    window.toggleTask = (id) => {
        toggleTask(id);
        renderTasksUI();
    };
    window.deleteTask = (id) => {
        deleteTask(id);
        renderTasksUI();
    };
}
