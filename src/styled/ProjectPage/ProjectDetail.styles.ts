import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 100px;
  background-color: rgba(150, 160, 255, 0.15);
`;
export const TeamName = styled.h2`
  font-size: 40px;
  font-weight: bold;
`;

export const DivContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  margin-left: 14px;
  padding: 10px;
`;

export const Date = styled.p`
  font-size: 20px;
  margin-left: 20px;
  padding: 10px;
`;

export const DetailTitle = styled.h3`
  font-size: 40px;
  color: #484aad;
  margin: 50px 0 0 20px;
`;
export const DetailContent = styled.p`
  font-size: 15px;
  margin: 20px 0 0 20px;
  border: 1px solid #484aad;
  height: 300px;
  padding: 20px;
`;

export const ListBtn = styled.button`
  width: 130px;
  height: 40px;
  font-size: 15px;
  color: white;
  background-color: #484aad;
  border: none;
  border-radius: 10px;
  margin-top: 100px;
  margin-left: 450px;
  margin-bottom: 30px;
  cursor: pointer; /* 마우스 커서를 포인터 모양으로 지정 */
`;
export const UpdateDiv = styled.div`
  margin-right: 20px;
  cursor: pointer; /* 마우스 커서를 포인터 모양으로 지정 */
`;
export const DeleteDiv = styled.div`
  color: red;
  cursor: pointer; /* 마우스 커서를 포인터 모양으로 지정 */
`;

export const BtnDiv = styled.div`
  display: flex;
  margin-right: 10px;
`;
