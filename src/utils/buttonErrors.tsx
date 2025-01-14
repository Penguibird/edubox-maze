import { ObjectEntries } from './ObjectEntries';

/**
 * Use to succintly disable a button with an error tooltip
 * @param errors Errors in the shape error: isError
 * @returns props to pass to button.
 */
export const buttonErrors = (errors: { [errorKey: string]: boolean; }): { disabled: boolean; tooltip?: string; } => {
  for (const [error, val] of ObjectEntries(errors) ?? []) {
    if (val) {
      return {
        disabled: true,
        tooltip: error
      };
    }
  }
  return {
    disabled: false
  };
};
