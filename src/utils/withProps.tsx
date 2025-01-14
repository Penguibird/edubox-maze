import * as React from 'react';
import { WithOptional } from './WithOptional';

export const withProps = <U extends {}, K extends keyof Partial<U>>(C: React.FC<U>, props: Pick<U, K>): React.FC<WithOptional<U, K>> => {
  return (p: Omit<U, K>) => {

    const finProps = {
      ...props,
      ...p,
    } as any as U;
    return <C
      {...finProps}
    />;
  };
};
