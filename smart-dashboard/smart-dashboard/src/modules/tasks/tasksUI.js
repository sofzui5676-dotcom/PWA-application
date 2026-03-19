import { getMainContainer } from "../../core/uiContainer.js";
import { getTasks, addTask, completeTask, deleteTask, getTotalPoints } from "./tasks.js";

export function renderTasksUI() {
    const container = getMainContainer();
    const tasks = getTasks();
    const totalPoints = getTotalPoints();
    
    container.innerHTML = `
        <div class="module-header">
            <h2>✅ Мои задачи</h2>
            <div class="points-badge">⭐ ${totalPoints} очков</div>
        </div>
        
        <form id="task-form" class="task-form">
            <input type="text" id="task-title" placeholder="Новая задача..." required>
            <input type="number" id="task-points" placeholder="Очки" value="1" min="1" max="10">
            <button type="submit">➕ Добавить</button>
        </form>
        
        <div class="tasks-list">
            ${renderTasksList(tasks)}
        </div>
    `;
    
    setupTaskForm();
    setupTaskButtons();
}

function renderTasksList(tasks) {
    if (tasks.length === 0) {
        return '<p class="empty-state">Нет задач. Создайте первую! 🎯</p>';
    }
    
    return tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <div class="task-content">
                <span class="task-title">${task.title}</span>
                ${task.description ? `<span class="task-desc">${task.description}</span>` : ''}
            </div>
            <span class="task-points">⭐ ${task.points}</span>
            <button class="delete-task">🗑️</button>
        </div>
    `).join('');
}

function setupTaskForm() {
    const form = document.getElementById("task-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("task-title").value;
            const points = parseInt(document.getElementById("task-points").value) || 1;
            
            addTask({ title, points });
            renderTasksUI();
        });
    }
}

function setupTaskButtons() {
    document.querySelectorAll(".task-checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
            const taskItem = e.target.closest(".task-item");
            const taskId = parseInt(taskItem.dataset.id);
            completeTask(taskId);
            renderTasksUI();
        });
    });
    
    document.querySelectorAll(".delete-task").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const taskItem = e.target.closest(".task-item");
            const taskId = parseInt(taskItem.dataset.id);
            deleteTask(taskId);
            renderTasksUI();
        });
    });
}
