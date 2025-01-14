/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { initialState, Maze, } from './maze.types';
import { MazeComponent } from './maze';
import { createRoot } from 'react-dom/client';
import styled from '@emotion/styled';
import MazeSearchTree from './mazeSearchTree';
// @ts-expect-error idk
import './style.css'
import { LineDrawingCanvas } from './LineDrawing';
import { dispatchCustomEvent } from './CustomEvents';


type ReactState<T> = {
    state: T,
    setState: (a: (t: T) => T) => void
}
type GlobalMazeState = {
    treeNodeId: number,
    maze: Maze,
}
const CurrentMazeState = React.createContext<ReactState<GlobalMazeState> | null>(null);

export const useCurrentMazeState = () => {
    const value = React.useContext(CurrentMazeState);
    if (!value)
        throw new Error('CurrentMazeState used incorrectly');

    return value;
};

export const CurrentMazeStateProvider = CurrentMazeState.Provider;


const App: React.FC<object> = () => {

    const [state, setState] = React.useState(initialState)

    const currentMaze = <MazeComponent
        maze={state.maze}
        mainOne
    />

    return <CurrentMazeStateProvider value={{
        state, setState
    }}>
        <Layout>
            <Col>
                <h1>Nadi cestu bludistem</h1>
                {currentMaze}
            </Col>

            <MazeSearchTree
                maze={initialState.maze}
                onScroll={() => dispatchCustomEvent('scrollUpdate', null)}
            />
            {/* <Container onScroll={() => dispatchCustomEvent('scrollUpdate', null)}>
                <LineDrawingCanvas />
            </Container> */}
        </Layout>
    </CurrentMazeStateProvider>
}



const Col = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;

border-right: 4px solid blue;
padding: 12px;
`



const Layout = styled.div`
    display: grid;
    grid-template-columns: 
    1fr 
    3fr;
    height: 100%;
    overflow: hidden;
`



createRoot(document.getElementById('root')!).render(<App />)
