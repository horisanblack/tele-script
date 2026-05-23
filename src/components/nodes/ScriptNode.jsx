import { useState, useRef, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { renderTextWithLinks } from '../../utils/renderTextWithLinks';
import './ScriptNode.css';

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

export default function ScriptNode({ data, id, selected }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [text, setText] = useState(data.text);
  const [copyMode, setCopyMode] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    setTitle(data.title);
    setText(data.text);
  }, [data.title, data.text]);

  const color = NODE_COLORS[data.nodeType] ?? '#6b7280';
  const label = NODE_LABELS[data.nodeType] ?? 'トーク';

  function handleSave() {
    data.onUpdate?.(id, { title, text });
    setEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') setEditing(false);
  }

  useEffect(() => {
    if (editing && titleRef.current) titleRef.current.focus();
  }, [editing]);

  useEffect(() => {
    function syncCopyMode(e) {
      setCopyMode(e.ctrlKey || e.metaKey || e.shiftKey);
    }

    function disableCopyMode() {
      setCopyMode(false);
    }

    window.addEventListener('keydown', syncCopyMode);
    window.addEventListener('keyup', syncCopyMode);
    window.addEventListener('blur', disableCopyMode);
    return () => {
      window.removeEventListener('keydown', syncCopyMode);
      window.removeEventListener('keyup', syncCopyMode);
      window.removeEventListener('blur', disableCopyMode);
    };
  }, []);

  function handleSelectablePointerDown(e) {
    if (!(e.ctrlKey || e.metaKey || e.shiftKey)) return;
    e.stopPropagation();
  }

  const linkProps = {
    className: 'script-node-link nodrag nopan',
    onClick: (e) => e.stopPropagation(),
    onDoubleClick: (e) => e.stopPropagation(),
    onPointerDown: (e) => e.stopPropagation(),
  };

  return (
    <div
      className={`script-node ${selected ? 'selected' : ''}`}
      style={{ borderColor: color }}
      onDoubleClick={(e) => {
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;
        setEditing(true);
      }}
    >
      <Handle type="target" position={Position.Top} />

      <div className="script-node-header" style={{ background: color }}>
        <span className="script-node-type-label">{label}</span>
        {!editing && (
          <button
            className="script-node-edit-btn"
            onClick={(e) => { e.stopPropagation(); setEditing(true); }}
          >
            ✏️
          </button>
        )}
      </div>

      {editing ? (
        <div className="script-node-body editing nodrag" onKeyDown={handleKeyDown}>
          <input
            ref={titleRef}
            className="script-node-title-input nodrag"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル"
          />
          <textarea
            className="script-node-text-input nodrag"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="トークスクリプト本文"
          />
          <div className="script-node-actions nodrag">
            <button className="btn-save" onClick={handleSave}>保存</button>
            <button className="btn-cancel" onClick={() => setEditing(false)}>キャンセル</button>
          </div>
        </div>
      ) : (
        <div
          className={`script-node-body ${copyMode ? 'copy-mode nodrag nopan' : ''}`}
          onPointerDownCapture={handleSelectablePointerDown}
        >
          <div className="script-node-title">{title}</div>
          <div className="script-node-text">
            {renderTextWithLinks(text, linkProps)}
          </div>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
