// /** @jsxImportSource @emotion/react */ 
// import { jsx, css } from '@emotion/react'
import * as React from 'react';
import styled from '@emotion/styled';
import { edgeToArray, getEdgesAtNode, Maze } from './maze.types';
import { MazeComponent } from './maze';
import { useCurrentMazeState } from './main';
import { LineDrawingCanvas, LineMarker } from './LineDrawing';
import { LayerGrid } from './LayerGrid';
import { useCustomEvent } from './CustomEvents';

interface MazeSearchTreeProps extends Omit<React.ComponentProps<typeof Wrapper>, ''> {
  maze: Maze
};

const MazeSearchTree: React.FC<MazeSearchTreeProps> = ({ maze, ...props }) => {
  const tree = React.useMemo(() => constructMazeSearchTree()(maze), [maze])
  const scrollParentRef = React.useRef(null)
  const [zoomedOut, setZoomedOut] = React.useState(false)
  return <Wrapper {...props}>
    <button style={{ position: 'fixed', right: 20, top: 20, zIndex: 50 }} onClick={() => setZoomedOut(s => !s)}>Zoom</button>
    <InnerWrapper ref={scrollParentRef} >
      <LineDrawingCanvas scrollParent={scrollParentRef.current as any} />
      <MazeTreeNode style={{ transformOrigin: 'top center', transform: `scale(${zoomedOut ? 0.15 : 0.7})` }} tree={tree} level={0} />
    </InnerWrapper>
  </Wrapper>
}

const Wrapper = styled.div`
  overflow: scroll;
  height: 100%;
  max-height: 98vh;
  width: 100%;
`;
const InnerWrapper = styled.div`
  width: max-content;
  position: relative;
  &>:first-child {
    position: absolute;
    inset: 0;
    z-index: -1;
  }
`


interface MazeTreeNodeProps extends React.ComponentProps<typeof MazeTreeNodeWrapper> {
  tree: Tree<Maze>
  level: number
};

const MazeTreeNode: React.FC<MazeTreeNodeProps> = React.memo(({ level, tree, ...props }) => {
  const { setState, state: { treeNodeId } } = useCurrentMazeState();
  const isHighlighted = treeNodeId == tree.id;
  const ref = React.useRef(null as null | HTMLDivElement)
  React.useEffect(() => {
    if (isHighlighted) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    }
  }, [isHighlighted])
  useCustomEvent('mazeMove', ({ detail: newPos }) => {
    if (isHighlighted) {
      const newTree = tree.children.find(child => child.node.currentPosition == newPos);
      if (newTree) {
        setState((s) => ({
          ...s,
          treeNodeId: newTree.id,
          // maze: newTree.node,
        }))
      } else {
        if (!tree.parentId) {
          throw new Error("Invalid dataaa")
        }
        setState(s => ({
          ...s,
          treeNodeId: tree.parentId!,
        }))
      }
    }
  })
  return <MazeTreeNodeWrapper {...props}>
    <LineMarker id={tree.id} style={{
      marginBottom: '-70px'
      // marginTop: 50,
    }} />
    <div ref={ref} style={{ border: isHighlighted ? '2px solid hotpink' : 'none' }}
      onClick={() => setState(() => ({
        treeNodeId: tree.id,
        maze: tree.node,
      }))}
    >
      <MazeComponent maze={tree.node} />
    </div>
    <LayerGrid>
      {tree.children.map((child) => <LineMarker id={child.id} />)}
    </LayerGrid>
    <Row>
      {tree.children.map((child) => <div >
        {/* <Line style={{ transform: tree.children.length == 1 ? 'none' : i == 0 ? 'rotate(45deg)' : 'rotate(-45deg)' }} /> */}
        <MazeTreeNode tree={child} level={level + 1} />
      </div>)}
    </Row>
  </MazeTreeNodeWrapper>
})

const Row = styled.div`
/* margin-top: 50px; */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 80px;
`

const MazeTreeNodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80px;
  margin-inline: 50px;

`


type Tree<T> = {
  node: T,
  id: number
  parentId: number | null
  children: Array<Tree<T>>,
}

const getPossibleMoves = (maze: Maze): Maze[] => {
  const list = getEdgesAtNode(maze.edgeList, maze.currentPosition)
  return Object.entries(list).map(([edge, cost]) => {
    if (cost == null) {
      throw new Error("Invalid data")
    }
    const [newN] = edgeToArray(edge).filter(x => x != maze.currentPosition);
    if (maze.visitedNodes.includes(newN)) {
      return null;
    }
    return {
      ...maze,
      costIncurred: maze.costIncurred + cost,
      turnsTaken: maze.turnsTaken + 1,
      currentPosition: newN,
      visitedNodes: [...maze.visitedNodes, newN]
    }
  }).filter(notEmpty)
}

const notEmpty = <U,>(t: U | null | undefined): t is U => Boolean(t)


export const constructMazeSearchTree = () => {

  let id = 1;

  const f = (initial: Maze, parentId: number | null = null): Tree<Maze> => {
    const thisId = id++;
    return {
      parentId: parentId,
      node: initial,
      id: thisId,
      children: initial.currentPosition == initial.endCoord
        ? []
        : getPossibleMoves(initial).map(x => f(x, thisId))
    }
  }

  return f
}

export default MazeSearchTree;
