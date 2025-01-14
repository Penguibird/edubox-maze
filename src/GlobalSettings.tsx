import React from "react";
import { ReactState } from "./utils/ReactState.type";

import useLocalStorageState from 'use-local-storage-state'
import { MazeState, presetMazes } from "./maze.types";
export enum GlobalAppState {
  // The default, sandboxish, with interactions allowed
  Interactive = 'interactive',
  // When the simulation is running - interactions are disabled
  Simulation = 'simulation',
}
type GlobalSettingsType = {
  noCostMode: boolean
  showTree: boolean
  initialMazeState: MazeState
  state: GlobalAppState
}
const GlobalSettings = React.createContext<ReactState<GlobalSettingsType> | null>(null);

export const useGlobalSettings = () => {
  const value = React.useContext(GlobalSettings);
  if (!value)
    throw new Error('GlobalSettings used incorrectly');

  return value;
};

const DEFAULT_GLOBAL_SETTINGS: GlobalSettingsType = {
  noCostMode: true,
  showTree: false,
  initialMazeState: presetMazes.small,
  state: GlobalAppState.Interactive
}

export const useShowPathCosts = () => useGlobalSettings().state.noCostMode == false;

export const GlobalSettingsProvider = ({ children }: React.PropsWithChildren<any>) => {
  const [state, setState] = useLocalStorageState<GlobalSettingsType>('settings', {
    defaultValue: DEFAULT_GLOBAL_SETTINGS
  })

  const value = React.useMemo(() => ({ state, setState }), [setState, state])
  return (
    <GlobalSettings.Provider value={value}>
      {children}
    </GlobalSettings.Provider>
  );
};
