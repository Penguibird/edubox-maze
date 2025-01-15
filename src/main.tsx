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
import { zip } from 'lodash'
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


const runSimulation = (
    initialMaze: MazeState,
): MazeState[] => {
    const tree = constructMazeSearchTree()(initialMaze.maze);

    let minCost = Infinity;
    let minCostPath = [] as number[];
    let minCostPathTreeNodeIds = [] as number[]

    const visitNode = (node: typeof tree, treeNodeIds: number[]) => {
        treeNodeIds = [...treeNodeIds, node.id];
        if (node.node.endCoord == node.node.currentPosition && node.node.costIncurred < minCost) {
            minCost = node.node.costIncurred;
            minCostPath = node.node.visitedNodes;
            minCostPathTreeNodeIds = treeNodeIds;
        }
        node.children.forEach(n => visitNode(n, treeNodeIds))
    }

    visitNode(tree, []);

    const states = [initialMaze] as MazeState[];
    console.log(minCostPath);
    console.log({
        minCostPath,
        minCostPathTreeNodeIds,
        zip: zip(minCostPath, minCostPathTreeNodeIds)
    })
    for (const [visitedNode, treeNodeId] of zip(minCostPath, minCostPathTreeNodeIds)) {
        if (visitedNode == 0) {
            continue;
        }

        if (!visitedNode || !treeNodeId) {
            throw new Error("Invalid data")
        }

        const s = states[states.length - 1];

        const edgeKey = `${s.maze.currentPosition},${visitedNode}` as const;
        const edgeTakenCost = s.maze.edgeList[edgeKey]
        if (!edgeTakenCost) {
            console.log(edgeKey, s)
            throw new Error("Cannot find taken edge")
        }
        states.push({
            treeNodeId,
            maze: {
                ...s.maze,
                currentPosition: visitedNode,
                visitedNodes: [...s.maze.visitedNodes, visitedNode],
                turnsTaken: s.maze.turnsTaken + 1,
                costIncurred: s.maze.costIncurred + edgeTakenCost,
            }
        });

    }

    return states;
}


const App: React.FC<object> = () => {

    const { setState: setGlobalState, state: { showTree, initialMazeState, state: globalState } } = useGlobalSettings();
    const [mazeState, setMazeState] = React.useState(initialMazeState)

    // React.useEffect(() => {
    // }, [state.maze.costIncurred, state.maze.currentPosition, state.maze.endCoord])
    React.useEffect(() => {
        (async () => {
            if (mazeState.maze.currentPosition == mazeState.maze.endCoord) {
                if (globalState == GlobalAppState.Simulation) {
                    await sleep(1_000);
                }
                await ModalManager.showModal(VictoryModal, { cost: mazeState.maze.costIncurred }, { key: 'victorymodal' })
                setMazeState(initialMazeState)
            }
        })()

    }, [globalState, initialMazeState, mazeState.maze.costIncurred, mazeState.maze.currentPosition, mazeState.maze.endCoord])
    const simulationStack = React.useRef([] as MazeState[])


    React.useEffect(() => {

        if (globalState == GlobalAppState.Simulation) {
            const nextState = simulationStack.current.shift()
            console.log(nextState?.maze.currentPosition, simulationStack.current.map(n => n.maze.currentPosition))
            const i = setTimeout(() => {
                if (nextState) {
                    setMazeState(nextState);
                } else {
                    setGlobalState(s => ({ ...s, state: GlobalAppState.Interactive }))
                }
            }, 1_000)

            return () => clearTimeout(i)
        }

    }, [globalState, mazeState])

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

                    <Settings
                        onReset={() => setMazeState(initialMazeState)}
                        onSimulate={() => {
                            setMazeState(initialMazeState)
                            simulationStack.current = (runSimulation(initialMazeState))
                            setGlobalState(s => ({ ...s, state: GlobalAppState.Simulation }))
                        }}
                    />
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
    onSimulate: () => void
};

const Settings: React.FC<SettingsProps> = ({ onSimulate, onReset, }) => {

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
                {ObjectEntries(presetMazes)?.map(([k, v]) => (
                    <button key={k} onClick={() => {
                        setState(s => ({ ...s, initialMazeState: v }));
                        setTimeout(() => {
                            onReset();
                        }, 0);
                    }}>{k}</button>
                ))}
            </Row>
            <button onClick={onSimulate}>Spustit simulaci</button>
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
