import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
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
        I define myself as an communicative and a fast-learner. I'm currently
        studying Front-End at SoftUni. I'm also fluent in English and have a
        basic knowledge of German.
      </p>
    </>
  );
}

function SkillList() {
  return (
    <ul className="skill-list">
      <Skill color="#4169E1" text="HTML+CSS" emoji="💪" />
      <Skill color="yellow" text="JavaScript" emoji="💪" />
      <Skill color="lightgreen" text="Web Design" emoji="💪" />
      <Skill color="crimson" text="Git and GitHub" emoji="💪" />
      <Skill color="lightblue" text="React" emoji="👶" />
    </ul>
  );
}

function Skill(props) {
  return (
    <li
      className="skill"
      style={{ backgroundColor: props.color }}
    >{`${props.text} ${props.emoji}`}</li>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
