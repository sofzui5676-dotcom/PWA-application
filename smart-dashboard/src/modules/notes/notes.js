let notes = [
    {id:1, title:"Идеи для PWA", content:"Добавить темную тему, синхронизацию"},
    {id:2, title:"План разработки", content:"1. Создать структуру\n2. Настроить SW"}
];

export function getNotes() { return notes; }
export function addNote(title, content) { 
    notes.push({id:Date.now(), title, content}); 
}
export function deleteNote(id) { 
    notes = notes.filter(n => n.id != id); 
}
