import React from 'react';
import styled from "styled-components";
import DeleteIcon from "@/app/components/icons/DeleteIcon";

interface ModalProps {
  closeModal: () => void;
  displayModal: number | null;
  onDelete: (id: number) => Promise<void>;
}

const Modal: React.FC<ModalProps> = ({closeModal, displayModal, onDelete}) => {
  const close = (e) => {
    e.stopPropagation()
    closeModal()
  };

  return (
    <div
      className="modal"
      onClick={ closeModal }
      style={{display: displayModal ? 'block' : 'none'}} >
      <div
        className="modal-content"
        onClick={ e => e.stopPropagation() } >
        <span
          className="close"
          onClick={ close }>&times;
         </span>
        <Title>Delete the Category?</Title>
        <Text>All templates in the category will be moved to the category "Other" </Text>
         <DeleteButton onClick={() => onDelete(displayModal)}>
           <DeleteIcon />
           Delete
         </DeleteButton>
        <CloseButton onClick={close}>Close</CloseButton>
      </div>
    </div>
  );
}

const Title = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  color: white;
  text-align: center;
`;

const Text = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  color: #9B9D9F;
  margin: 24px 0;
`;

const DeleteButton = styled('button')({
  width: '100%',
  height: 58,
  padding: '14px 0px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(104deg, #A139FD 11.26%, #50BDFC 90.79%)',
  boxShadow: '0px 4px 7px 0px rgba(0, 0, 0, 0.08)',
  color: 'white',
  'svg path': {
    fill: 'white'
  }
});

const CloseButton = styled.div`
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  margin-top: 24px;
  color: #FF5B5B;
  cursor: pointer;
`;

export default Modal;