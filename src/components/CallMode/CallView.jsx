import { useState, useEffect } from 'react';
import BranchButton from './BranchButton';
import './CallView.css';

const NODE_COLORS = {
  start: '#22c55e',
  talk: '#3b82f6',
  objection: '#f97316',
  end: '#ef4444',
};

const NODE_LABELS = {
  start: '開始',
  talk: 'トーク',
  objection: '切り返し',
  end: '終了',
};

export default function CallView({ nodes, edges }) {
  const startNode = nodes.find((n) => n.data.nodeType === 'start') ?? nodes[0];
  const [currentId, setCurrentId] = useState(startNode?.id ?? null);
  const [history, setHistory] = useState([]);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  const currentNode = nodes.find((n) => n.id === currentId);
  const outgoing = edges.filter((e) => e.source === currentId);

  function navigate(targetId) {
    setHistory((h) => [...h, currentId]);
    setCurrentId(targetId);
    if (!timerRunning) setTimerRunning(true);
  }

  function goBack() {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentId(prev);
  }

  function restart() {
    setCurrentId(startNode?.id ?? null);
    setHistory([]);
    setElapsedSec(0);
    setTimerRunning(false);
  }

  const minutes = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
  const seconds = String(elapsedSec % 60).padStart(2, '0');
  const color = NODE_COLORS[currentNode?.data?.nodeType] ?? '#6b7280';
  const typeLabel = NODE_LABELS[currentNode?.data?.nodeType] ?? 'トーク';

  if (!currentNode) {
    return (
      <div className="call-view">
        <div className="call-view-empty">スクリプトにノードがありません。<br />まず編集モードでノードを追加してください。</div>
      </div>
    );
  }

  return (
    <div className="call-view">
      <div className="call-view-top-bar">
        <div className="call-view-timer" onClick={() => setTimerRunning((v) => !v)}>
          <span className={`call-view-timer-dot ${timerRunning ? 'running' : ''}`} />
          {minutes}:{seconds}
          <span className="call-view-timer-hint">{timerRunning ? '（クリックで停止）' : '（クリックで開始）'}</span>
        </div>
        <div className="call-view-history">ステップ {history.length + 1}</div>
      </div>

      <div className="call-view-card" style={{ borderTopColor: color }}>
        <div className="call-view-type-badge" style={{ background: color }}>{typeLabel}</div>
        <div className="call-view-node-title">{currentNode.data.title}</div>
        <div className="call-view-node-text">{currentNode.data.text}</div>
      </div>

      {outgoing.length > 0 && (
        <div className="call-view-branches">
          <div className="call-view-branches-label">相手の反応に合わせて選択</div>
          <div className="call-view-branches-list">
            {outgoing.map((edge) => {
              const target = nodes.find((n) => n.id === edge.target);
              return (
                <BranchButton
                  key={edge.id}
                  label={edge.label ?? '次へ'}
                  onClick={() => navigate(edge.target)}
                />
              );
            })}
          </div>
        </div>
      )}

      {currentNode.data.nodeType === 'end' && (
        <div className="call-view-end-msg">通話終了</div>
      )}

      <div className="call-view-footer">
        <button
          className="call-view-back-btn"
          onClick={goBack}
          disabled={history.length === 0}
        >
          ← 戻る
        </button>
        <button className="call-view-restart-btn" onClick={restart}>
          最初から
        </button>
      </div>
    </div>
  );
}
