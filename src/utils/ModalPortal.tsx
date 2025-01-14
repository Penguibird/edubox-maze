// /** @jsxImportSource @emotion/react */
// import { jsx, css } from '@emotion/react'
import * as React from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode
  modalKey?: string,
}

const ModalPortal: React.FC<ModalPortalProps> = ({ children, modalKey, ...props }) => (
  createPortal(
    children,
    document.querySelector('.modal-root') ?? document.body,
    modalKey ?? 'modal',
  )
);

export default ModalPortal;
