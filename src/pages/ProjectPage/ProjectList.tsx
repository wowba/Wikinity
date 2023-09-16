import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseSDK";
import {
  Container,
  TitleContainer,
  WriteBtn,
  WriteText,
  ListItem,
  ProjectTitle,
  Text,
  TeamName,
  List,
} from "../../styled/ProjectPage/ProjectList.styles";

interface Project {
  id: string; // Firestore 문서의 ID를 저장할 필드 추가
  projectTitle: string;
  projectContent: string;
  projectDeadline: string;
  projectMember: number;
  projectTeamName: string;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "project"));

        const projectData: Project[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Project;
          // Firestore 문서의 ID를 project 객체에 추가
          projectData.push({ ...data, id: doc.id });
        });

        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <TitleContainer>
        <WriteText>Team Project</WriteText>
        <WriteBtn onClick={() => navigate(`/projectwrite`)}>
          프로젝트 작성하기
        </WriteBtn>
      </TitleContainer>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <TeamName
              onClick={() => navigate(`/project/${project.id}`)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  navigate(`/project/${project.id}`);
                }
              }}
              role="button"
              tabIndex={0}
            >
              {project.projectTeamName} Project
            </TeamName>
            <List>
              <ListItem>
                <ProjectTitle>주제: </ProjectTitle>
                <ProjectTitle>{project.projectTitle}</ProjectTitle>
              </ListItem>
              <ListItem>
                <Text>마감일:</Text>
                <Text>{project.projectDeadline}</Text>
              </ListItem>
              <ListItem>
                <Text>인원: </Text>
                <Text>{project.projectMember}</Text>
              </ListItem>
            </List>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ProjectList;