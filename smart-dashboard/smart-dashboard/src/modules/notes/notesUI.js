import { getMainContainer } from "../../core/uiContainer.js";
import { getNotes, addNote, deleteNote, updateNote } from "./notes.js";

export function renderNotesUI() {
    const container = getMainContainer();
    const notes = getNotes();
    
    container.innerHTML = `
        <div class="module-header">
            <h2>📝 Мои заметки</h2>
            <button id="new-note-btn" class="primary-btn">➕ Новая заметка</button>
        </div>
        
        <div id="notes-list" class="notes-grid">
            ${renderNotesGrid(notes)}
        </div>
    `;
    
    setupNotesListeners();
}

function renderNotesGrid(notes) {
    if (notes.length === 0) {
        return '<p class="empty-state">Нет заметок. Создайте первую! 📝</p>';
    }
    
    return notes.map(note => `
        <div class="note-card" data-id="${note.id}">
            <h3 class="note-title">${note.title}</h3>
            <p class="note-preview">${note.content.substring(0, 100)}${note.content.length > 100 ? '...' : ''}</p>
            <div class="note-footer">
                <span class="note-date">${new Date(note.updatedAt).toLocaleDateString()}</span>
                <div class="note-actions">
                    <button class="edit-note">✏️</button>
                    <button class="delete-note">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
}

function setupNotesListeners() {
    const newNoteBtn = document.getElementById("new-note-btn");
    if (newNoteBtn) {
        newNoteBtn.addEventListener("click", () => showNoteModal());
    }
    
    document.querySelectorAll(".edit-note").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const noteId = parseInt(e.target.closest(".note-card").dataset.id);
            showNoteModal(noteId);
        });
    });
    
    document.querySelectorAll(".delete-note").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const noteId = parseInt(e.target.closest(".note-card").dataset.id);
            if (confirm("Удалить заметку?")) {
                deleteNote(noteId);
                renderNotesUI();
            }
        });
    });
}

function showNoteModal(noteId = null) {
    const note = noteId ? getNotes().find(n => n.id === noteId) : null;
    
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${note ? 'Редактировать' : 'Новая'} заметка</h3>
            <form id="note-form">
                <input type="text" id="note-title" placeholder="Заголовок" value="${note ? note.title : ''}" required>
                <textarea id="note-content" placeholder="Содержание..." rows="5">${note ? note.content : ''}</textarea>
                <div class="modal-actions">
                    <button type="button" class="cancel-btn">Отмена</button>
                    <button type="submit" class="save-btn">Сохранить</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const form = document.getElementById("note-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("note-title").value;
        const content = document.getElementById("note-content").value;
        
        if (note) {
            updateNote(note.id, { title, content });
        } else {
            addNote({ title, content });
        }
        
        document.body.removeChild(modal);
        renderNotesUI();
    });
    
    modal.querySelector(".cancel-btn").addEventListener("click", () => {
        document.body.removeChild(modal);
    });
}
