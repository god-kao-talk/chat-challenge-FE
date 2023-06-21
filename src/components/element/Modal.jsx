import { TfiClose } from 'react-icons/tfi';
import { styled } from 'styled-components';

const Modal = (props) => {
  return (
    <div id='modalbg' className={props.isModalOpen === true ? 'open' : ''}>
      <StModalContainer className='modal'>
        <TfiClose className='modalClose' onClick={() => props.setIsModalOpen(false)} />
        <StForm>
          <div>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
          </div>
          <StInputWrapper>
            <label htmlFor={props.id}>{props.label}</label>
            <input
              type='text'
              id={props.id}
              value={props.inputData}
              onChange={props.inputChangeHandler}
            />
          </StInputWrapper>
          <StSubmitButton type='button' onClick={() => props.buttonClickHandler(props.inputData)}>
            {props.buttonContent}
          </StSubmitButton>
        </StForm>
      </StModalContainer>
    </div>
  );
};

const StModalContainer = styled.div``;

const StForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 40px);
  margin-top: 30px;
  & h2 {
    text-align: center;
    padding-bottom: 5px;
  }
  & p {
    text-align: center;
  }
`;

const StInputWrapper = styled.div`
  & label {
    display: block;
    text-align: left;
    padding-bottom: 10px;
  }
  & input {
    width: 100%;
    height: 40px;
    padding: 0 20px;
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    background-color: #e3e5e8;
    margin-right: 15px;
  }
`;

const StSubmitButton = styled.button`
  width: 150px;
  height: 40px;
  padding: 0 25px;
  border-radius: 5px;
  background-color: #5865f2;
  margin-left: calc(100% - 150px);
`;

export default Modal;
