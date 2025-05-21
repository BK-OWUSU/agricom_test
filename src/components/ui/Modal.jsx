"use client";
import PropTypes from "prop-types";
import {  Modal } from "flowbite-react";

export function ModalComponent({header, children, openModal, onClose }) {
  return (
    <main>
      <Modal show={openModal} className="bg-black bg-opacity-50 backdrop-blur-md" size="5xl" onClose={onClose} popup>
        <Modal.Header/>
        <h1 className='text-green-800  font-bold text-2xl text-center pb-2'>{header}</h1>
        <Modal.Body className="flex flex-col gap-2">
            {children}
        </Modal.Body>
      </Modal>
    </main>
  );
}

//SETTING THE PROPERTIES DATA TYPES
ModalComponent.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node,
  openModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};