import { getMainContainer } from "../../core/uiContainer.js";
import { getNotes, addNote, deleteNote } from "./notes.js";

export function renderNotesUI() {
    const container = getMainContainer();
    const notes = getNotes();
    
    let html = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
            <h2 style="color:#bb86fc">📝 Мои заметки</h2>
            <button onclick="showNewNoteModal()" style="padding:8px 24px;background:#bb86fc;color:#121212;border:none;border-radius:4px;font-weight:bold;cursor:pointer">➕ Новая заметка</button>
        </div>
        
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">
    `;
    
    notes.forEach(note => {
        html += `
            <div style="background:#1e1e1e;padding:16px;border-radius:8px">
                <h3 style="color:#bb86fc;margin:0 0 10px 0">${note.title}</h3>
                <p style="color:#b3b3b3;margin:0 0 15px 0;white-space:pre-wrap">${note.content}</p>
                <div style="display:flex;justify-content:flex-end">
                    <button onclick="deleteNote(${note.id})" style="background:none;border:none;color:#f44336;cursor:pointer">🗑️ Удалить</button>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    container.innerHTML = html;
    
    window.showNewNoteModal = () => {
        const title = prompt("Введите заголовок заметки:");
        if (title) {
            const content = prompt("Введите содержание заметки:");
            addNote(title, content);
            renderNotesUI();
        }
    };
    window.deleteNote = (id) => {
        if (confirm("Удалить заметку?")) {
            deleteNote(id);
            renderNotesUI();
        }
    };
}
