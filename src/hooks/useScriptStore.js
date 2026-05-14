import { useState, useCallback } from 'react';
import { defaultNodes, defaultEdges } from '../data/defaultScript';

const STORAGE_KEY = 'tele-script-data';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveToStorage(nodes, edges) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }));
}

export function useScriptStore() {
  const stored = loadFromStorage();
  const [nodes, setNodes] = useState(stored?.nodes ?? defaultNodes);
  const [edges, setEdges] = useState(stored?.edges ?? defaultEdges);

  const persist = useCallback((newNodes, newEdges) => {
    saveToStorage(newNodes, newEdges);
  }, []);

  const updateNodes = useCallback((updater) => {
    setNodes((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveToStorage(next, edges);
      return next;
    });
  }, [edges]);

  const updateEdges = useCallback((updater) => {
    setEdges((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveToStorage(nodes, next);
      return next;
    });
  }, [nodes]);

  const resetToDefault = useCallback(() => {
    setNodes(defaultNodes);
    setEdges(defaultEdges);
    saveToStorage(defaultNodes, defaultEdges);
  }, []);

  return { nodes, edges, updateNodes, updateEdges, persist, resetToDefault };
}
