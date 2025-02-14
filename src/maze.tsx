/* eslint-disable @typescript-eslint/no-empty-object-type */
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { getEdgeCost, Maze } from "./maze.types";
import { useCurrentMazeState } from "./main";
import React from "react";
import { dispatchCustomEvent } from "./CustomEvents";
import { useShowPathCosts } from "./GlobalSettings";
import { costToTime } from "./costToTime";



// Renders the maze with a robot on it
interface MazeProps {
  maze: Maze
  mainOne?: boolean
};

const cellSize = 100;

const UMazeComponent: React.FC<MazeProps> = ({ mainOne, maze }) => {
  const { setState } = useCurrentMazeState();
  const { height, width } = maze.dimensions;


  const onClickRightBridge = (cellId: number, costRight: number) => {
    if (!mainOne) {
      return;
    }
    if (maze.currentPosition == cellId) {
      const newP = maze.currentPosition + 1;
      dispatchCustomEvent('mazeMove', newP)
      setState(s => ({
        ...s, maze: {
          ...s.maze,
          currentPosition: newP,
          costIncurred: s.maze.costIncurred + costRight!,
          turnsTaken: s.maze.turnsTaken + 1,
        }
      }));
    }
    if (maze.currentPosition == cellId + 1) {
      const newP = maze.currentPosition - 1;
      dispatchCustomEvent('mazeMove', newP)
      setState(s => ({
        ...s, maze: {
          ...s.maze,
          currentPosition: newP,
          costIncurred: s.maze.costIncurred + costRight!,
          turnsTaken: s.maze.turnsTaken + 1,
        }
      }));
    }
  };

  const onClickDownBridge = (cellId: number, costDown: number) => {
    if (!mainOne) {
      return;
    }
    if (maze.currentPosition == cellId) {
      const newPosition = maze.currentPosition + width;
      dispatchCustomEvent('mazeMove', newPosition)
      setState(s => ({
        ...s, maze: {
          ...s.maze,
          currentPosition: newPosition,
          costIncurred: s.maze.costIncurred + costDown!,
          turnsTaken: s.maze.turnsTaken + 1,
        }
      }));
    }
    if (maze.currentPosition == cellId + width) {
      const newP = maze.currentPosition - width;
      dispatchCustomEvent('mazeMove', newP)
      setState(s => ({
        ...s, maze: {
          ...s.maze,
          currentPosition: newP,
          costIncurred: s.maze.costIncurred + costDown!,
          turnsTaken: s.maze.turnsTaken + 1,
        }
      }));
    }
  };

  return <Container>
    <Grid>
      {
        Array.from({ length: height }).map((_, rowI) => <React.Fragment key={rowI}>
          <Row >
            {Array.from({ length: width }).map((__, cellI) => {
              const cellId = rowI * width + cellI;
              const costRight = getEdgeCost(maze.edgeList, cellId, cellId + 1);
              const canClickOnRight = mainOne && (maze.currentPosition == cellId || maze.currentPosition == cellId + 1)
              return <React.Fragment key={cellI}>
                <Cell
                  key={cellI}
                >
                  {maze.currentPosition == cellId && <Player />}
                  {maze.endCoord == cellId && <House />}
                </Cell>

                {cellI != width - 1
                  && <Bridge
                    style={{ cursor: canClickOnRight ? 'pointer' : undefined }}
                    onClick={() => React.startTransition(() => onClickRightBridge(cellId, costRight!))}
                    right
                    index={cellI + rowI}
                    cost={costRight}
                  ></Bridge>}

              </React.Fragment>;
            })}
          </Row>
          <Row>
            {Array.from({ length: width }).map((__, cellI) => {

              const cellId = rowI * width + cellI; //cell above

              const costDown = getEdgeCost(maze.edgeList, rowI * width + cellI, (rowI + 1) * width + cellI);
              const canClickOnDown = mainOne && (maze.currentPosition == cellId || maze.currentPosition == cellId + width)
              return <React.Fragment key={cellI}>
                <Bridge
                  index={0}
                  style={{ cursor: canClickOnDown ? 'pointer' : undefined }}
                  onClick={() => React.startTransition(() => onClickDownBridge(cellId, costDown!))}
                  cost={costDown}
                ></Bridge>
                {cellI == width - 1 ? null : <Spacer />}
              </React.Fragment>;
            })}
          </Row>
        </React.Fragment>)
      }
    </Grid>
    <ClockText><img src="/assets/clock.webp" /> <p>Čas strávený v lese: {costToTime(maze.costIncurred)}</p></ClockText>
  </Container>
}

const ClockText = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 8px;
  img {
    height: 30px;
    aspect-ratio: 1;
    margin: 4px;
  }
`

const Spacer = styled.div`
  width: ${cellSize}px;
  aspect-ratio: 1;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`

const Player = styled.div`
  background-image: url("/assets/Karkulka.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 60px;
  aspect-ratio: 1;
`

const House = styled.div`
  background-image: url("/assets/house.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 80px;
  aspect-ratio: 1;
`

const Grid = styled.div`
display: flex;
flex-direction: column;
align-items: stretch;
justify-content: center;
`

const Row = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`


interface CellProps extends Omit<React.ComponentProps<typeof CellWrapper>, ''> {

};

const Cell: React.FC<CellProps> = ({ children, ...props }) => {
  return <CellWrapper {...props}>
    {children}
  </CellWrapper>
}

const CellWrapper = styled.div`
  height: ${cellSize}px;
  aspect-ratio: 1;
  background-image: url('/assets/clearing_1.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


// function getRandomInt(min: number, max: number) {
//   // Ensure the range includes both min and max
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

interface BridgeProps extends Omit<React.ComponentProps<typeof BridgeWrapper>, ''> {
  right?: boolean
  index: number
  cost: number | null
};

const Bridge: React.FC<BridgeProps> = ({ cost, index, right, ...props }) => {
  const getRandomInt = (min: number, max: number) => {
    return (index % (max - min + 1)) + min;
  }

  const showCost = useShowPathCosts();

  if (cost == null) {
    return <Spacer />;
  }
  return <BridgeWrapper
    {...props}
    style={{
      ...props.style,
      backgroundImage: right
        ? `url("/assets/Path_${getRandomInt(2, 3)}_horizontal.png")`
        : `url("/assets/Path_${getRandomInt(1, 3)}.png")`,
      // rotate: `${getRandomInt(0, 1) * 180}deg`,
    }}
  >
    {showCost && <CostText>
      {costToTime(cost)}
    </CostText>}
  </BridgeWrapper>
}

const CostText = styled.p`
  color: white;
  font-weight: 700;
  background-color: gray;
  padding: 4px;
  /* border-radius: 10px; */
  border-radius: 50%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const margin = 10
const BridgeWrapper = styled.div`

filter: saturate(0.8) brightness(0.9);

  height: ${cellSize - (margin * 2)}px;
  aspect-ratio: 1;
  margin: ${margin}px;

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;



export const MazeComponent = React.memo(UMazeComponent, (prevProps, nextProps) => {
  return prevProps.mainOne == nextProps.mainOne
    && prevProps.maze.costIncurred == nextProps.maze.costIncurred
    && prevProps.maze.currentPosition == nextProps.maze.currentPosition
})