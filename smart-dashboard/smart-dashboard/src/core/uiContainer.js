import { navigate } from "./router.js";

export function initUI() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <header class="app-header">
            <h1>📊 Smart Dashboard</h1>
            <nav class="app-nav">
                <button data-path="/tasks" class="nav-btn">✅ Tasks</button>
                <button data-path="/notes" class="nav-btn">📝 Notes</button>
                <button data-path="/tracker" class="nav-btn">📈 Tracker</button>
            </nav>
        </header>
        <main id="main-content" class="main-content"></main>
    `;
    
    const buttons = app.querySelectorAll("button[data-path]");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const path = btn.getAttribute("data-path");
            navigate(path);
        });
    });
}

export function getMainContainer() {
    return document.getElementById("main-content");
}
