import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const skillsData = [
{
  color:"#4169E1" ,text:"HTML+CSS" ,level:"advanced"
},
{
  color:"yellow" ,text:"JavaScript" ,level: "advanced"
},
{
  color:"lightgreen" ,text:"Web Design" ,level: "advanced"
},
{
  color:"crimson" ,text:"Git and GitHub" ,level: "intermediate"
},
{
  color:"lightblue" ,text:"React" ,level: "beginner"
},
]
function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img className="avatar" src="avatar.jpg" alt="avatar"></img>;
}

function Intro() {
  return (
    <>
      <h1>Daniel Georgiev</h1>
      <p>
        I define myself as communicative and a fast-learner. I'm currently
        studying Front-End at SoftUni. I'm also fluent in English and have a
        basic knowledge of German.
      </p>
    </>
  );
}

function SkillList() {
  return (
    <ul className="skill-list">
      {skillsData.map( (skill) =>  <Skill color={skill.color} text={skill.text} level={skill.level} />)}
    </ul>
  );
}

function Skill( { color, text, level}) {
  return (
    <li
      className="skill"
      style={{ backgroundColor: color }}
    >
    <span>{text}</span>
    <span>
    {level === "beginner" && "👶"}
    {level === "intermediate" && "👍"}
    {level === "advanced" && "💪"}
    </span>
    </li>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
