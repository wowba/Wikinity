import styled from "styled-components";
import { ModalCloseBtn, TitleText } from "../Common/Modal";

export const TodoModalLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 480px;
  height: 350px;
  border-radius: 20px;
  background-color: #dfe3ff;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index : 2;

  padding: 16px 16px;
  overflow : auto;
`;
export const ExitBtn = styled(ModalCloseBtn)`
  position: absolute;
  right: 20px;
  cursor: pointer;
`;
export const TodoTitle = styled(TitleText)`
  margin-bottom : 10px;
`;

export const TodoItemContainer = styled.div`
    display: flex;
    margin : 5px 0;
    gap : 5px;
`;
export const AddBtn = styled.button`
    border : 0;
    border-radius : 5px;
    background-color : #484AAD;
    color : white;
    padding : 5px;
    cursor: pointer;


`;
export const TodoInput = styled.input`
    border : 0;
    border-radius : 5px;
    padding : 5px 10px;
    outline : none;
`;

export const TodoContainer = styled.div`
    display : flex;
    flex-direction : column;
`;

export const DeleteBtn = styled.button`
    border : 0;
    border-radius : 2px;
    font-size : 13px;
    background-color : black;
    color : white;
    width : 13px;
    height : 13px;
    margin :auto 0;
`;