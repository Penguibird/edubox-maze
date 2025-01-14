import { ComponentProps } from 'react';

export const withClass = <T extends (keyof JSX.IntrinsicElements | React.JSXElementConstructor<unknown>)>(name: T, ...classNames: string[]) => {
  const Component = name;
  return (p: ComponentProps<T>) =>
    // @ts-ignore
    <Component {...p} className={[...classNames, p.className].join(' ')} />;
};
