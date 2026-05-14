import './NodePanel.css';

const NODE_TYPES = [
  { nodeType: 'start', label: '開始ノード', color: '#22c55e', desc: '通話のスタート地点' },
  { nodeType: 'talk', label: 'トークノード', color: '#3b82f6', desc: 'セリフ・説明' },
  { nodeType: 'objection', label: '切り返しノード', color: '#f97316', desc: '反論・断り対応' },
  { nodeType: 'end', label: '終了ノード', color: '#ef4444', desc: '通話の終わり' },
];

export default function NodePanel({ onAddNode, onReset, onUndo, onRedo, canUndo, canRedo }) {
  return (
    <div className="node-panel">
      <div className="node-panel-title">ノードを追加</div>
      <div className="node-panel-hint">ダブルクリックでテキスト編集</div>

      {NODE_TYPES.map(({ nodeType, label, color, desc }) => (
        <button
          key={nodeType}
          className="node-panel-btn"
          style={{ borderLeftColor: color }}
          onClick={() => onAddNode(nodeType)}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('nodeType', nodeType);
            e.dataTransfer.effectAllowed = 'move';
          }}
        >
          <span className="node-panel-btn-dot" style={{ background: color }} />
          <span>
            <div className="node-panel-btn-label">{label}</div>
            <div className="node-panel-btn-desc">{desc}</div>
          </span>
        </button>
      ))}

      <hr className="node-panel-divider" />

      <div className="node-panel-undo-row">
        <button className="node-panel-undo-btn" onClick={onUndo} disabled={!canUndo} title="元に戻す (⌘Z)">
          ↩ 戻す
        </button>
        <button className="node-panel-undo-btn" onClick={onRedo} disabled={!canRedo} title="やり直す (⌘⇧Z)">
          ↪ 進む
        </button>
      </div>

      <hr className="node-panel-divider" />

      <div className="node-panel-hint">接続方法：ノード下部の点をドラッグして別のノードへ</div>
      <div className="node-panel-hint">削除：ノードを選択して Delete キー</div>

      <hr className="node-panel-divider" />

      <button className="node-panel-reset-btn" onClick={onReset}>
        サンプルに戻す
      </button>
    </div>
  );
}
