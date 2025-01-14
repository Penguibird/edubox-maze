
export type Tile = [costRight: number | null, costDown: number | null];
export type MazeMap = Array<Array<Tile>>

export type NodeId = number;

export type Edge = `${number},${number}`
export type EdgeList = Record<Edge, number | null>

export const getEdgeCost = (l: EdgeList, n1: number, n2: number): number | null => {
  [n1, n2] = [n1, n2].sort((a, b) => a - b)
  return l[`${n1},${n2}`]
}

export const getEdgesAtNode = (l: EdgeList, node: number): EdgeList => {
  const x = Object
    .entries(l)
    .map(([k, v]) => {
      const newK = edgeToArray(k)
      if (newK.includes(node)) {
        return [k, v]
      } else {
        return null;
      }
    })
    .filter(Boolean);
  return Object.fromEntries(x as any) as EdgeList;
}

export function edgeToArray(k: string) {
  return k.split(',').map(n => parseInt(n, 10));
}

export type Maze = {
  edgeList: EdgeList
  startCoord: NodeId
  endCoord: NodeId
  currentPosition: NodeId
  costIncurred: number
  turnsTaken: number
  visitedNodes: number[]
  dimensions: {
    width: number
    height: number
  }
}

export type MazeState = {
  maze: Maze,
  treeNodeId: number
}


export const newMazeState = (edgeList: EdgeList, height: number, width: number): MazeState => {
  const lastNode = (height * width) - 1
  return {
    treeNodeId: 1,
    maze: {
      visitedNodes: [0],
      currentPosition: 0,
      startCoord: 0,
      endCoord: lastNode,
      edgeList,
      costIncurred: 0,
      turnsTaken: 0,
      dimensions: {
        height, width,
      }
    }
  }
}

// 3 x 2
const small: EdgeList = {
  '0,1': 3,
  '1,2': 1,
  '0,3': 1,
  '1,4': 2,
  '3,4': 2,
  '4,5': 3,
  '2,5': 1,
  // '3,5': 1,
}

// 4 x 4
const medium = {
  '0,1': 1,
  '1,2': 1,
  '2,3': 1,

  '0,4': 1,
  '1,5': 1,
  '2,6': 1,
  '3,7': 1,

  '4,5': 1,
  '5,6': 1,
  '6,7': 1,

  '4,8': 1,
  '5,9': 1,
  '6,10': 1,
  '7,11': 1,

  '8,9': 1,
  '9,10': 1,
  '10,11': 1,

  '8,12': 1,
  '9,13': 1,
  '10,14': 1,
  '11,15': 1,
}

export const presetMazes = {
  small: newMazeState(small, 2, 3),
  medium: newMazeState(medium, 4, 4),
}

