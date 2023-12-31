import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore"; // Firebase Firestore에서 필요한 함수 가져오기
import { db } from "../../firebaseSDK"; // Firebase 설정 가져오기
import {
  Container,
  WriteDiv,
  Submit,
  WriteProject,
  WriteInput,
  WriteContentInput,
  WriteEx,
  Ex,
} from "../../styled/ProjectPage/ProjectWrite.styles";
import {
  ProgressDiv,
  Ing,
  ProgressImg,
} from "../../styled/ProjectPage/ProjectList.styles";
import Progress from "../../assets/img/Progress.svg";
import Complete from "../../assets/img/Complete.svg";

const ProjectWrite: React.FC = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    projectProgress: "진행중",
    projectTeamName: "",
    projectDeadline: "",
    projectMember: "",
    projectTitle: "",
    projectContent: "",
  });

  // 첫 번째 인풋 요소에 대한 ref 생성
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // 페이지가 로드될 때 첫 번째 인풋 요소에 포커스 설정
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !projectData.projectTeamName ||
      !projectData.projectTitle ||
      !projectData.projectContent ||
      !projectData.projectDeadline ||
      !projectData.projectMember
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // Firestore에 데이터 추가 및 인덱스 업데이트
    try {
      const projectCollection = collection(db, "project"); // "project" 컬렉션을 대상으로 합니다.

      // 현재 프로젝트 개수를 가져와서 다음 인덱스를 설정합니다.
      const projectQuery = query(
        projectCollection,
        orderBy("projectIndex", "desc")
      );
      const projectQuerySnapshot = await getDocs(projectQuery);
      const currentProjectCount = projectQuerySnapshot.size;
      const nextProjectIndex = currentProjectCount + 1;

      // 새 문서 추가
      const newDocRef = await addDoc(projectCollection, projectData);

      // 추가된 문서의 인덱스 필드 업데이트
      const newDocId = newDocRef.id;
      const newDoc = doc(projectCollection, newDocId);
      await setDoc(newDoc, { projectIndex: nextProjectIndex }, { merge: true });

      // 프로젝트가 추가되면 원하는 경로로 리디렉션
      navigate(`/project/${newDocId}`);
      console.log(newDocId);
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };
  const handleProgressToggle = () => {
    // projectData.projectProgress 값이 "진행중"이면 "완료"로, 그 반대면 "진행중"으로 바꾸기
    const newProgress =
      projectData.projectProgress === "진행중" ? "완료" : "진행중";

    setProjectData({
      ...projectData,
      projectProgress: newProgress,
    });
  };
  return (
    <Container>
      <WriteEx>
        <ProgressDiv
          className={
            projectData.projectProgress === "진행중"
              ? "inProgress"
              : "completed"
          }
        >
          <Ing
            className={
              projectData.projectProgress === "진행중"
                ? "inProgress"
                : "completed"
            }
            onClick={handleProgressToggle}
          >
            {projectData.projectProgress}
          </Ing>
          {projectData.projectProgress === "진행중" ? (
            <ProgressImg src={Progress} alt="진행 중 이미지" />
          ) : (
            <ProgressImg src={Complete} alt="완료 이미지" />
          )}{" "}
        </ProgressDiv>
        <Ex>프로젝트 진행상황을 클릭해서 변경해주세요</Ex>
      </WriteEx>
      <WriteDiv>
        <WriteProject>Team Project</WriteProject>
        <form onSubmit={handleSubmit}>
          <Submit type="submit">등록</Submit>
        </form>
      </WriteDiv>
      <div>
        <WriteInput
          type="text"
          id="projectTeamName"
          name="projectTeamName"
          placeholder="팀명을 입력해주세요"
          value={projectData.projectTeamName}
          onChange={handleChange}
          required
          ref={firstInputRef}
        />
      </div>
      <div>
        <WriteInput
          type="text"
          id="projectTitle"
          name="projectTitle"
          placeholder="프로젝트 주제를 입력해주세요"
          value={projectData.projectTitle}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <WriteContentInput
          id="projectContent"
          name="projectContent"
          placeholder="프로젝트를 설명해주세요"
          value={projectData.projectContent}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <WriteInput
          type="text"
          id="projectDeadline"
          name="projectDeadline"
          placeholder="프로젝트 마감일을 입력해주세요 (ex.2023-09-22)"
          value={projectData.projectDeadline}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <WriteInput
          type="text"
          id="projectMember"
          name="projectMember"
          placeholder="프로젝트 참여 인원을 입력해주세요"
          value={projectData.projectMember}
          onChange={handleChange}
          required
        />
      </div>
    </Container>
  );
};

export default ProjectWrite;
