import { createPortal } from "react-dom";
import React, { useState } from "react";
interface Props {
  children?: any;
  open: boolean;
  onClose: () => void;
}

export default function Modal({ children, open, onClose }: Props) {
  if (!open) return null;
  return createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal__header">
          <div className="title"></div>
          <button onClick={onClose} className="btn__close">
            close
          </button>
        </div>
        {children}
      </div>
    </>,
    document.getElementById("portal") as HTMLElement
  );
}
