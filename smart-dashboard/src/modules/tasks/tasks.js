let tasks = [
    {id:1, title:"Создать PWA", completed:true, points:5},
    {id:2, title:"Настроить Service Worker", completed:false, points:8},
    {id:3, title:"Добавить иконки", completed:false, points:3}
];

export function getTasks() { return tasks; }
export function addTask(title, points) { 
    tasks.push({id:Date.now(), title, completed:false, points:parseInt(points) || 1}); 
}
export function toggleTask(id) { 
    const task = tasks.find(t => t.id == id);
    if (task) task.completed = !task.completed;
}
export function deleteTask(id) { 
    tasks = tasks.filter(t => t.id != id); 
}
export function getTotalPoints() { 
    return tasks.filter(t => t.completed).reduce((s,t) => s + t.points, 0); 
}
