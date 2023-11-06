import React from 'react';
import styled from "styled-components";
import CheckIcon from "@/app/components/icons/CheckIcon";

interface ActionsProps {
  handleSubmit: () => void;
  cancel: () => void;
}

const Actions:React.FC<ActionsProps> = ({ handleSubmit, cancel }) => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <SaveButton onClick={handleSubmit}>
          <CheckIcon />
          Save Changes
        </SaveButton>
        <CancelButton onClick={cancel}>Cancel</CancelButton>
      </FooterContainer>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  background: #2E2F3C;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 26px;
  width: 100%;
  height: 100%;
  padding: 0 30px;
  max-width: 1298px;
  margin: 0 auto;
  @media (max-width: 468px) {
    flex-direction: column;
  }
`;

const SaveButton = styled.button`
  display: flex;
  width: 100%;
  height: 64px;
  padding: 14px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: #45CB54;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.08);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  text-transform: capitalize;
  color: #FFF;
`;
const CancelButton = styled(SaveButton)`
  border-radius: 4px;
  border: 3px solid #424454;
  background: transparent;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.08);
`;

export default Actions;