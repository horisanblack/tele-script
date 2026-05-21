import { useCallback, useRef, useState, useEffect } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { nodeTypes } from '../nodes/nodeTypes';
import NodePanel from './NodePanel';
import './ScriptEditor.css';

let nodeIdCounter = 100;
function makeNodeId() { return `node-${++nodeIdCounter}`; }

const edgeDefaults = {
  markerEnd: { type: MarkerType.ArrowClosed },
  style: { strokeWidth: 2 },
  labelStyle: { fontSize: 12, fontWeight: 600 },
  labelBgStyle: { fill: '#fff', fillOpacity: 0.85 },
  labelBgPadding: [4, 6],
  labelBgBorderRadius: 4,
};

function snapshot(nodes, edges) {
  return { nodes: nodes.map((n) => ({ ...n })), edges: edges.map((e) => ({ ...e })) };
}

export default function ScriptEditor({ initialNodes, initialEdges, scriptDefaultNodes, scriptDefaultEdges, onPersist, onReset }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodesRef = useRef(nodes);
  const edgesRef = useRef(edges);
  nodesRef.current = nodes;
  edgesRef.current = edges;

  const rfInstance = useRef(null);

  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const isUndoRedo = useRef(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const saveSnapshot = useCallback(() => {
    if (isUndoRedo.current) return;
    undoStack.current.push(snapshot(nodesRef.current, edgesRef.current));
    if (undoStack.current.length > 50) undoStack.current.shift();
    redoStack.current = [];
    setCanUndo(true);
    setCanRedo(false);
  }, []);

  const undo = useCallback(() => {
    if (undoStack.current.length === 0) return;
    const prev = undoStack.current.pop();
    redoStack.current.push(snapshot(nodesRef.current, edgesRef.current));
    isUndoRedo.current = true;
    setNodes(prev.nodes);
    setEdges(prev.edges);
    onPersist(prev.nodes, prev.edges);
    setCanUndo(undoStack.current.length > 0);
    setCanRedo(true);
    setTimeout(() => { isUndoRedo.current = false; }, 0);
  }, [setNodes, setEdges, onPersist]);

  const redo = useCallback(() => {
    if (redoStack.current.length === 0) return;
    const next = redoStack.current.pop();
    undoStack.current.push(snapshot(nodesRef.current, edgesRef.current));
    isUndoRedo.current = true;
    setNodes(next.nodes);
    setEdges(next.edges);
    onPersist(next.nodes, next.edges);
    setCanUndo(true);
    setCanRedo(redoStack.current.length > 0);
    setTimeout(() => { isUndoRedo.current = false; }, 0);
  }, [setNodes, setEdges, onPersist]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
      if (e.key === 'z' && e.shiftKey)  { e.preventDefault(); redo(); }
      if (e.key === 'y')                 { e.preventDefault(); redo(); }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey) return;
      const textEl = e.target?.closest?.('.script-node-text');
      if (!textEl) return;
      const { scrollTop, scrollHeight, clientHeight } = textEl;
      const atTop    = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
      if (!atTop && !atBottom) e.stopImmediatePropagation();
    };
    window.addEventListener('wheel', handler, { capture: true, passive: false });
    return () => window.removeEventListener('wheel', handler, { capture: true });
  }, []);

  const handleNodesChange = useCallback((changes) => {
    if (changes.some((c) => c.type === 'remove')) saveSnapshot();
    onNodesChange(changes);
  }, [onNodesChange, saveSnapshot]);

  const handleEdgesChange = useCallback((changes) => {
    if (changes.some((c) => c.type === 'remove')) saveSnapshot();
    onEdgesChange(changes);
  }, [onEdgesChange, saveSnapshot]);

  const onConnect = useCallback((params) => {
    const label = window.prompt('この矢印のラベルを入力してください（例：断られた、興味あり）', '次へ');
    if (label === null) return;
    saveSnapshot();
    const newEdge = { ...params, ...edgeDefaults, id: `edge-${Date.now()}`, label: label || '次へ' };
    setEdges((eds) => {
      const next = addEdge(newEdge, eds);
      onPersist(nodesRef.current, next);
      return next;
    });
  }, [setEdges, onPersist, saveSnapshot]);

  const onNodeUpdate = useCallback((id, newData) => {
    saveSnapshot();
    setNodes((nds) => {
      const next = nds.map((n) => n.id === id ? { ...n, data: { ...n.data, ...newData } } : n);
      onPersist(next, edgesRef.current);
      return next;
    });
  }, [setNodes, onPersist, saveSnapshot]);

  const onNodeDragStop = useCallback(() => {
    onPersist(nodesRef.current, edgesRef.current);
  }, [onPersist]);

  const onNodeDragStart = useCallback(() => {
    saveSnapshot();
  }, [saveSnapshot]);

  const onNodesDelete = useCallback(() => {
    setTimeout(() => onPersist(nodesRef.current, edgesRef.current), 0);
  }, [onPersist]);

  const onEdgesDelete = useCallback(() => {
    setTimeout(() => onPersist(nodesRef.current, edgesRef.current), 0);
  }, [onPersist]);

  const handleAddNode = useCallback((nodeType, position) => {
    saveSnapshot();
    const id = makeNodeId();
    const pos = position ?? { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 };
    const newNode = {
      id,
      type: 'scriptNode',
      position: pos,
      data: { nodeType, title: 'タイトルを入力', text: 'トークスクリプトをここに入力してください。' },
      selected: true,
    };
    setNodes((nds) => {
      const deselected = nds.map((n) => ({ ...n, selected: false }));
      const next = [...deselected, newNode];
      onPersist(next, edgesRef.current);
      return next;
    });
  }, [setNodes, onPersist, saveSnapshot]);

  const onEdgeDoubleClick = useCallback((event, edge) => {
    const newLabel = window.prompt('ラベルを変更', edge.label ?? '');
    if (newLabel === null) return;
    saveSnapshot();
    setEdges((eds) => {
      const next = eds.map((e) => e.id === edge.id ? { ...e, label: newLabel } : e);
      onPersist(nodesRef.current, next);
      return next;
    });
  }, [setEdges, onPersist, saveSnapshot]);

  const handleReset = useCallback(() => {
    if (!window.confirm('スクリプトをサンプルに戻しますか？現在の内容は削除されます。')) return;
    saveSnapshot();
    onReset();
    setNodes(scriptDefaultNodes);
    setEdges(scriptDefaultEdges);
  }, [onReset, setNodes, setEdges, saveSnapshot, scriptDefaultNodes, scriptDefaultEdges]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const nodeType = e.dataTransfer.getData('nodeType');
    if (!nodeType || !rfInstance.current) return;
    const position = rfInstance.current.screenToFlowPosition({ x: e.clientX, y: e.clientY });
    handleAddNode(nodeType, position);
  }, [handleAddNode]);

  const nodesWithCallbacks = nodes.map((n) => ({
    ...n,
    data: { ...n.data, onUpdate: onNodeUpdate },
  }));

  return (
    <div className="script-editor">
      <NodePanel
        onAddNode={handleAddNode}
        onReset={handleReset}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <div className="script-editor-canvas" onDragOver={onDragOver} onDrop={onDrop}>
        <ReactFlow
          nodes={nodesWithCallbacks}
          edges={edges.map((e) => ({ ...edgeDefaults, ...e, selectable: true }))}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={onConnect}
          onEdgeDoubleClick={onEdgeDoubleClick}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          onNodesDelete={onNodesDelete}
          onEdgesDelete={onEdgesDelete}
          onInit={(instance) => { rfInstance.current = instance; }}
          nodeTypes={nodeTypes}
          fitView
          connectOnClick={false}
          deleteKeyCode={['Delete', 'Backspace']}
          panOnScroll
          panOnScrollSpeed={0.8}
          zoomOnScroll={false}
        >
          <Background color="#e2e8f0" gap={20} />
          <Controls />
          <MiniMap
            nodeColor={(n) => {
              const colors = { start: '#22c55e', talk: '#3b82f6', objection: '#f97316', end: '#ef4444' };
              const base = colors[n.data?.nodeType] ?? '#6b7280';
              return n.selected ? 'rgba(250, 204, 21, 0.4)' : base;
            }}
            nodeStrokeColor={(n) => {
              const colors = { start: '#22c55e', talk: '#3b82f6', objection: '#f97316', end: '#ef4444' };
              return n.selected ? '#facc15' : (colors[n.data?.nodeType] ?? '#6b7280');
            }}
            nodeStrokeWidth={4}
          />
        </ReactFlow>
      </div>
    </div>
  );
}
