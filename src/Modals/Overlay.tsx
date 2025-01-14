import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
// /** @jsxImportSource @emotion/react */
// import { jsx, css } from '@emotion/react'
import * as React from 'react';


interface OverlayProps extends Omit<React.ComponentProps<typeof Wrapper>, ''> {
  blurBackgroundSelector?: string
}

const Wrapper = styled(motion.button) <{ invisible?: boolean }>`
pointer-events: all;
  border: none;
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  ${(props) => (props.invisible ? css`background: none;` : css`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(6px);
  /* filter: blur(6px); */
  `)}
`;

const Overlay: React.FC<OverlayProps> = ({ blurBackgroundSelector = '.app', ...props }) => {
  React.useLayoutEffect(() => {
    document.querySelector(blurBackgroundSelector)?.classList.add('modal-blur');
    return () => document.querySelector(blurBackgroundSelector)?.classList.remove('modal-blur');
  }, [blurBackgroundSelector]);

  return <>
    {/* <Global styles={css`
    .modal-blur {
      filter: blur(6px);
    }  `}    /> */}
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'tween',
        duration: 0.2,
      }}
      {...props}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.bubbles = false;
        props.onClick?.(e);
      }}
    />
  </>;
};

export default Overlay;
