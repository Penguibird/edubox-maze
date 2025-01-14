
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
  visitedNodes: number[]
  dimensions: {
    width: number
    height: number
  }
}


export const defaultMaze: EdgeList = {
  '0,1': 3,
  '1,2': 1,
  '0,3': 1,
  '1,4': 2,
  '3,4': 2,
  '4,5': 3,
  '2,5': 1,
  // '3,5': 1,
}


export const initialState = {
  treeNodeId: 1,
  maze: {
    visitedNodes: [0],
    currentPosition: 0,
    endCoord: 5,
    startCoord: 0,
    edgeList: defaultMaze,
    costIncurred: 0,
    mazeWidth: 3,
    dimensions: {
      height: 2,
      width: 3,
    }
  } as Maze,
};