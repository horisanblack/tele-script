import { useState, useCallback, useRef } from 'react';
import ScriptEditor from './components/Editor/ScriptEditor';
import CallView from './components/CallMode/CallView';
import { SCRIPTS } from './data/scripts';
import './App.css';

function loadScript(script) {
  try {
    const raw = localStorage.getItem(script.storageKey);
    if (!raw) return { nodes: script.defaultNodes, edges: script.defaultEdges };
    return JSON.parse(raw);
  } catch {
    return { nodes: script.defaultNodes, edges: script.defaultEdges };
  }
}

function saveScript(script, nodes, edges) {
  localStorage.setItem(script.storageKey, JSON.stringify({ nodes, edges }));
}

export default function App() {
  const [mode, setMode] = useState('edit');
  const [selectedScriptId, setSelectedScriptId] = useState('default');
  const [callData, setCallData] = useState(() => loadScript(SCRIPTS[0]));

  const currentScript = SCRIPTS.find((s) => s.id === selectedScriptId);
  const currentScriptRef = useRef(currentScript);
  currentScriptRef.current = currentScript;

  const initialData = useRef(loadScript(SCRIPTS[0]));

  const handleScriptChange = useCallback((newId) => {
    const newScript = SCRIPTS.find((s) => s.id === newId);
    const data = loadScript(newScript);
    initialData.current = data;
    setCallData(data);
    setSelectedScriptId(newId);
    setMode('edit');
  }, []);

  const handlePersist = useCallback((nodes, edges) => {
    saveScript(currentScriptRef.current, nodes, edges);
    initialData.current = { nodes, edges };
  }, []);

  const handleReset = useCallback(() => {
    const script = currentScriptRef.current;
    saveScript(script, script.defaultNodes, script.defaultEdges);
    initialData.current = { nodes: script.defaultNodes, edges: script.defaultEdges };
  }, []);

  function switchToCall() {
    const data = loadScript(currentScriptRef.current);
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
        <select
          className="app-script-select"
          value={selectedScriptId}
          onChange={(e) => handleScriptChange(e.target.value)}
        >
          {SCRIPTS.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>
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
            key={selectedScriptId}
            initialNodes={initialData.current.nodes}
            initialEdges={initialData.current.edges}
            scriptDefaultNodes={currentScript.defaultNodes}
            scriptDefaultEdges={currentScript.defaultEdges}
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
