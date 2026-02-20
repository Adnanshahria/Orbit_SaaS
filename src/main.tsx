import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Lock console output
const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
    debug: console.debug,
    trace: console.trace,
    dir: console.dir,
    table: console.table,
};

(window as any).__unlockConsole = () => {
    Object.assign(console, originalConsole);
    console.log("Console unlocked!");
};

console.log = () => { };
console.error = () => { };
console.warn = () => { };
console.info = () => { };
console.debug = () => { };
console.trace = () => { };
console.dir = () => { };
console.table = () => { };


createRoot(document.getElementById("root")!).render(<App />);
