import { notesDummy } from "./notesDummyData.js";

let notes = [...notesDummy];

export function getNotes() {
    return notes;
}

export function addNote(note) {
    const newNote = {
        id: Date.now(),
        title: note.title,
        content: note.content || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    notes.push(newNote);
    return newNote;
}

export function updateNote(id, updates) {
    const note = notes.find(n => n.id === id);
    if (note) {
        Object.assign(note, updates);
        note.updatedAt = new Date().toISOString();
    }
    return note;
}

export function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
}

export function getNote(id) {
    return notes.find(n => n.id === id);
}
