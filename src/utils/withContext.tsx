import * as React from 'react';

export const withContext = <T extends object>(A: React.FC<T>, ...providers: React.FC<any>[]) => (p: T) => providers.reduce((acc, Provider) => <Provider>{acc}</Provider>, <A {...p} />);
