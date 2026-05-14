import { useState, useCallback, useRef } from 'react';
import ScriptEditor from './components/Editor/ScriptEditor';
import CallView from './components/CallMode/CallView';
import { defaultNodes, defaultEdges } from './data/defaultScript';
import './App.css';

const STORAGE_KEY = 'tele-script-data';

function loadScript() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { nodes: defaultNodes, edges: defaultEdges };
    return JSON.parse(raw);
  } catch {
    return { nodes: defaultNodes, edges: defaultEdges };
  }
}

function saveScript(nodes, edges) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }));
}

export default function App() {
  const [mode, setMode] = useState('edit');
  const [callData, setCallData] = useState(() => loadScript());
  const initialScript = useRef(loadScript());

  const handlePersist = useCallback((nodes, edges) => {
    saveScript(nodes, edges);
    initialScript.current = { nodes, edges };
  }, []);

  const handleReset = useCallback(() => {
    saveScript(defaultNodes, defaultEdges);
    initialScript.current = { nodes: defaultNodes, edges: defaultEdges };
  }, []);

  function switchToCall() {
    const data = loadScript();
    setCallData(data);
    setMode('call');
  }

  function switchToEdit() {
    setMode('edit');
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title">
          <span>📞</span>
          テレアポ スクリプト
        </div>
        <div className="app-mode-tabs">
          <button
            className={`app-mode-tab ${mode === 'edit' ? 'active' : ''}`}
            onClick={switchToEdit}
          >
            ✏️ 編集モード
          </button>
          <button
            className={`app-mode-tab ${mode === 'call' ? 'active call' : ''}`}
            onClick={switchToCall}
          >
            📞 通話モード
          </button>
        </div>
      </header>

      <main className="app-main">
        {mode === 'edit' ? (
          <ScriptEditor
            initialNodes={initialScript.current.nodes}
            initialEdges={initialScript.current.edges}
            onPersist={handlePersist}
            onReset={handleReset}
          />
        ) : (
          <CallView
            nodes={callData.nodes}
            edges={callData.edges}
          />
        )}
      </main>
    </div>
  );
}
