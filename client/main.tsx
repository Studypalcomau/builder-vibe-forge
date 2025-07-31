import { createRoot } from 'react-dom/client';
import { App } from './App';

// Ensure we only create root once
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

// Check if root already exists (for hot module replacement)
let root: ReturnType<typeof createRoot>;

if (import.meta.hot) {
  // Development mode with hot module replacement
  const existingRoot = (window as any).__vite_root;
  if (existingRoot) {
    root = existingRoot;
  } else {
    root = createRoot(container);
    (window as any).__vite_root = root;
  }
} else {
  // Production mode
  root = createRoot(container);
}

root.render(<App />);
