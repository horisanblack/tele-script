import { useState, useCallback, useRef } from 'react';
import ScriptEditor from './components/Editor/ScriptEditor';
import CallView from './components/CallMode/CallView';
import { SCRIPTS } from './data/scripts';
import './App.css';

const SALARY_SHEET_URL = 'https://docs.google.com/spreadsheets/d/16--ick98Ekeemsx4lPiwAJMezIWjHruBMAC9csrLoSg/edit?gid=0#gid=0';

const CANDIDATE_TALK_SCRIPT = '【候補者に渡すトークスクリプト】\nお世話になっております。\n私、株式会社StoDの〇〇と申します。\n\n本日、御社のIT人材採用の件でご連絡しておりまして、\n新卒採用のご担当者様はいらっしゃいますでしょうか？\n\nお電話代わっていただき、ありがとうございます。\n私、株式会社StoDの〇〇と申します。\n\n本日は御社のIT人材採用についてご連絡させていただきました。\n今、2〜3分ほどお時間よろしいでしょうか？';

function insertAfter(text, anchor, insertion) {
  if (text.includes(insertion)) return text;
  if (!text.includes(anchor)) return `${insertion}\n\n${text}`;
  return text.replace(anchor, `${anchor}\n${insertion}`);
}

function insertBefore(text, anchor, insertion) {
  if (text.includes(insertion)) return text;
  if (!text.includes(anchor)) return `${text}\n\n${insertion}`;
  return text.replace(anchor, `${insertion}\n\n${anchor}`);
}

function migrateScript(script, data) {
  if (script.id !== 'interview') return { data, changed: false };

  let changed = false;
  const nodes = data.nodes.map((node) => {
    if (node.id !== 'salary-explain' && node.id !== 'script-reading') return node;

    const currentText = node.data?.text ?? '';
    let nextText = currentText;

    if (node.id === 'salary-explain') {
      nextText = insertAfter(currentText, '【画面共有する】', SALARY_SHEET_URL);
    }

    if (node.id === 'script-reading') {
      nextText = insertBefore(currentText, '【読み終わったら】', CANDIDATE_TALK_SCRIPT);
    }

    if (nextText === currentText) return node;
    changed = true;
    return { ...node, data: { ...node.data, text: nextText } };
  });

  return { data: { ...data, nodes }, changed };
}

function loadScript(script) {
  try {
    const raw = localStorage.getItem(script.storageKey);
    if (!raw) return { nodes: script.defaultNodes, edges: script.defaultEdges };
    const loaded = JSON.parse(raw);
    const migrated = migrateScript(script, loaded);
    if (migrated.changed) saveScript(script, migrated.data.nodes, migrated.data.edges);
    return migrated.data;
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
