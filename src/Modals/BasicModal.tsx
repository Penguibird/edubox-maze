/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { ReactNode } from 'react';
import { useEscToClose } from './useEscToClose';
import Overlay from './Overlay';
import SvgCross from './Cross';

interface BasicModalProps extends React.ComponentProps<typeof Wrapper> {

  opened: boolean
  onClose: () => void
  innerProps?: React.ComponentProps<typeof ModalInner>
  modalProps?: React.ComponentProps<typeof ModalWrapper>
  overlayProps?: React.ComponentProps<typeof Overlay>
  heading?: React.ReactNode
  withCloseButton?: boolean
  includeAnimatePresence?: boolean
  shouldPortal?: boolean
  closeButton?: ReactNode
  children?: ReactNode
}

const Wrapper = styled(motion.div)`
  position: fixed;
  z-index: 300;
  inset: 0;
  display : grid ;
  &>*{
    grid-area: 1/1/1/1;
  }
  place-items: center; 
`;

const ModalWrapper = styled(motion.div)`
  position: relative;
  z-index: 202;
  width: min(430px, calc(100vw - 24px));
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14);
  padding: 24px;
  border-radius: 8px;
  background: white;
  margin: 0 12px;
  max-height: calc(100vh - 24px);
  overflow: auto;

`;

const ModalInner = styled(motion.div)`
  /* width: auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const ModalText = styled.h4 <{ light?: boolean }>`
  font-weight: 700;
  margin: 0;
  text-align: center;
  margin-top: 24px;
  ${(props) => props.light && css`
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 400;
    margin-top: 12px;
  `}
`;

const B = styled.button`
  background: none;
  border: none;
  height: 1.5em;
  aspect-ratio: 1;
`;

export const PotentialAnimatePresence = ({ children, b }: { b: boolean, children: React.ReactNode }) => (b ? <AnimatePresence>{children}</AnimatePresence> : <>{children}</>);

const BasicModal: { Text: typeof Text } & React.FC<BasicModalProps> = (
  {
    overlayProps, children, onClose, opened, modalProps, includeAnimatePresence = true, withCloseButton, closeButton, innerProps, heading: text, ...props
  }: BasicModalProps,
) => {
  const MaybePortal = React.Fragment;
  useEscToClose(opened, onClose);

  const [reveal, setReveal] = React.useState(true);
  const layoutDuration = 0.1;
  return <MaybePortal>
    <PotentialAnimatePresence b={includeAnimatePresence}>
      {opened && <Wrapper
        {...props}
        layout
        transition={{
          duration: 0.2,
        }}
      >
        <Overlay onClick={onClose} {...overlayProps} />
        <ModalWrapper
          layout
          initial={{
            scale: 0.6,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.6,
            opacity: 0,
          }}
          transition={{
            type: 'spring',
            duration: 0.2,

            bounce: 0.4,
            layout: {
              type: 'tween',
              duration: layoutDuration,
              ease: 'easeIn',
            },
          }}
          onLayoutAnimationStart={() => setReveal(false)}
          onLayoutAnimationComplete={() => setReveal(true)}
          className="ModalWrapper"
          {...modalProps}
        >
          {closeButton}
          <ModalInner
            layout
            transition={{
              opacity: {
                type: 'tween',
                duration: 0.1,
              },
              layout: {
                type: 'tween',
                duration: layoutDuration,
                ease: 'easeIn',
              },
            }}
            onLayoutAnimationStart={() => setReveal(false)}
            onLayoutAnimationComplete={() => setReveal(true)}
            className="ModalInner"
            {...innerProps}
            style={{
              opacity: reveal ? 1 : 0.7,
              ...(innerProps?.style ?? {}),
            }}
          >
            {text && <ModalText>
              {text}</ModalText>}
            {children}
          </ModalInner>
          {withCloseButton && <div style={{ position: 'absolute', top: 15, right: 15 }}>
            <B onClick={onClose} style={{ margin: 0, padding: 0, cursor: 'pointer' }}>
              <SvgCross height={25} fill="#5C5C5C" />
            </B>
          </div>}
        </ModalWrapper>
      </Wrapper>}
    </PotentialAnimatePresence>
  </MaybePortal>;
};

const Text = ModalText;

BasicModal.Text = Text;

export default BasicModal;
