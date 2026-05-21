import { defaultNodes, defaultEdges } from './defaultScript';
import { gittyNodes, gittyEdges } from './gittyScript';
import { interviewNodes, interviewEdges } from './interviewScript';

export const SCRIPTS = [
  {
    id: 'default',
    label: 'デフォルト',
    storageKey: 'tele-script-data',
    defaultNodes,
    defaultEdges,
  },
  {
    id: 'gitty',
    label: 'Gitty（採用担当者向け）',
    storageKey: 'tele-script-data-gitty',
    defaultNodes: gittyNodes,
    defaultEdges: gittyEdges,
  },
  {
    id: 'interview',
    label: 'StoD 一次面接',
    storageKey: 'tele-script-data-interview',
    defaultNodes: interviewNodes,
    defaultEdges: interviewEdges,
  },
];
