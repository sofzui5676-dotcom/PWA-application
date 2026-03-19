import { navigate } from "./router.js";

export function initUI() {
    document.getElementById("app").innerHTML = `
        <header style="background:#1e1e1e;padding:16px;display:flex;justify-content:space-between;align-items:center;color:white">
            <h1 style="color:#bb86fc;margin:0">📊 Smart Dashboard</h1>
            <nav>
                <button onclick="window.navigate('/tasks')" style="background:none;border:none;color:white;cursor:pointer;margin:0 10px;font-size:16px">✅ Tasks</button>
                <button onclick="window.navigate('/notes')" style="background:none;border:none;color:white;cursor:pointer;margin:0 10px;font-size:16px">📝 Notes</button>
                <button onclick="window.navigate('/tracker')" style="background:none;border:none;color:white;cursor:pointer;margin:0 10px;font-size:16px">📈 Tracker</button>
            </nav>
        </header>
        <main id="main-content" style="padding:20px;color:white;max-width:1200px;margin:0 auto"></main>
    `;
    window.navigate = navigate;
}

export function getMainContainer() {
    return document.getElementById("main-content");
}
