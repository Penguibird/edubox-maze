/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { Maze, MazeState, presetMazes, } from './maze.types';
import { MazeComponent } from './maze';
import { createRoot } from 'react-dom/client';
import styled from '@emotion/styled';
import MazeSearchTree, { constructMazeSearchTree } from './mazeSearchTree';
// @ts-expect-error idk
import './style.css'
import { dispatchCustomEvent } from './CustomEvents';
import ModalManager from './Modals/ModalManager';
import BasicModal from './Modals/BasicModal';
import { ReactState } from './utils/ReactState.type';
import { GlobalAppState, GlobalSettingsProvider, useGlobalSettings, useShowPathCosts } from './GlobalSettings';
import SvgArrowDown from './utils/ArrowDown';
import { costToTime } from './costToTime';
import { ObjectEntries } from './utils/ObjectEntries';
import { sleep } from './utils/sleep';


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



interface VictoryModalProps extends React.ComponentProps<typeof BasicModal> {
    cost: number
};

const VictoryModal: React.FC<VictoryModalProps> = ({ cost, ...props }) => {
    return <BasicModal {...props}>
        <h2>Výhra!</h2>
        {useShowPathCosts() && <p>
            Karkulka prošla bludištěm za {costToTime(cost)}
        </p>}
        <button onClick={props.onClose}>
            Znova
        </button>
    </BasicModal>
}


const runSimulation = async (
    setMazeState: React.Dispatch<React.SetStateAction<MazeState>>,
    initialMaze: MazeState,
) => {
    const tree = constructMazeSearchTree()(initialMaze.maze);

    let minCost = Infinity;
    let minCostPath = [] as number[];

    const visitNode = (node: typeof tree) => {
        if (node.node.endCoord == node.node.currentPosition) {
            minCost = node.node.costIncurred;
            minCostPath = node.node.visitedNodes;
        }
        node.children.forEach(visitNode)
    }

    visitNode(tree);

    for (const visitedNode of minCostPath) {
        if (visitedNode == 0) {
            continue;
        }
        setMazeState(s => {

            const edgeKey = `${s.maze.currentPosition},${visitedNode}` as const;
            const edgeTakenCost = s.maze.edgeList[edgeKey]
            if (!edgeTakenCost) {
                console.log(edgeKey, s)
                throw new Error("Cannot find taken edge")
            }
            return ({
                treeNodeId: 1,
                maze: {
                    ...s.maze,
                    currentPosition: visitedNode,
                    visitedNodes: [...s.maze.visitedNodes, visitedNode],
                    turnsTaken: s.maze.turnsTaken + 1,
                    costIncurred: s.maze.costIncurred + edgeTakenCost,
                }
            });
        })

        await sleep(1_000)
    }
}


const App: React.FC<object> = () => {

    const { setState: setGlobalState, state: { showTree, initialMazeState, state: globalState } } = useGlobalSettings();
    const [mazeState, setMazeState] = React.useState(initialMazeState)

    // React.useEffect(() => {
    // }, [state.maze.costIncurred, state.maze.currentPosition, state.maze.endCoord])
    console.log(mazeState)
    if (mazeState.maze.currentPosition == mazeState.maze.endCoord) {
        ModalManager.showModal(VictoryModal, { cost: mazeState.maze.costIncurred })
            .then(() => {
                setMazeState(initialMazeState)
            })
    }

    React.useEffect(() => {
        if (globalState == GlobalAppState.Simulation) {
            runSimulation(setMazeState, initialMazeState)
                .then(() => setGlobalState(s => ({ ...s, state: GlobalAppState.Interactive })))
        }
    }, [globalState, initialMazeState, setGlobalState])

    React.useEffect(() => {
        setMazeState(initialMazeState)
    }, [initialMazeState])


    const currentMaze = <MazeComponent
        maze={mazeState.maze}
        mainOne
    />

    return <>
        <CurrentMazeStateProvider value={{
            state: mazeState, setState: setMazeState
        }}>
            <ModalManager.Container />
            <Layout>
                <Col style={{ gridColumn: showTree ? 'span 1' : 'span 2' }}>
                    <h1>Najdi cestu bludištěm</h1>
                    {currentMaze}

                    <Settings onReset={() => setMazeState(initialMazeState)} />
                </Col>

                {showTree &&
                    <MazeSearchTree
                        maze={initialMazeState.maze}
                        onScroll={() => dispatchCustomEvent('scrollUpdate', null)}
                    />
                }
            </Layout>
        </CurrentMazeStateProvider>
    </>
}


interface SettingsProps {
    onReset: () => void
};

const Settings: React.FC<SettingsProps> = ({ onReset, }) => {

    const { setState, state } = useGlobalSettings()
    const [expanded, setExpanded] = React.useState(false)
    return <SettingsWrapper>
        <Row onClick={() => setExpanded(s => !s)} style={{ cursor: 'pointer' }}>
            <h4>Možnosti</h4>
            <SvgArrowDown style={{ height: 20, transform: expanded ? 'rotate(180deg)' : undefined }} />
        </Row>
        {expanded && <>
            <button onClick={onReset}>Reset hry</button>
            <button onClick={() => setState(s => ({ ...s, showTree: !s.showTree }))}> {state.showTree ? 'Schovat' : 'Ukázat'} strom </button>
            <button onClick={() => setState(s => ({ ...s, noCostMode: !s.noCostMode }))}>{state.noCostMode ? 'Zapnout' : 'Vypnout'} časy cest</button>
            <Row>
                <p>Presety bludiště</p>
                {ObjectEntries(presetMazes)?.map(([k, v]) => <button key={k} onClick={() => setState(s => ({ ...s, initialMazeState: v }))}>{k}</button>)}
            </Row>
            <button onClick={() => setState(s => ({ ...s, state: GlobalAppState.Simulation }))}>Spustit simulaci</button>
        </>}
    </SettingsWrapper>
}

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
`

const SettingsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
    padding: 12px;
`




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



createRoot(document.getElementById('root')!).render(
    <GlobalSettingsProvider>
        <App />
    </GlobalSettingsProvider>
)
