import { tasksDummy } from "./tasksDummyData.js";

let tasks = [...tasksDummy];

export function getTasks() {
    return tasks;
}

export function addTask(task) {
    const newTask = {
        id: Date.now(),
        title: task.title,
        description: task.description || "",
        completed: false,
        points: task.points || 1,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return newTask;
}

export function completeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
    }
    return task;
}

export function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
}

export function getTotalPoints() {
    return tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0);
}

export function getCompletedTasks() {
    return tasks.filter(t => t.completed);
}

export function getPendingTasks() {
    return tasks.filter(t => !t.completed);
}
