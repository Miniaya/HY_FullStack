import { CoursePart } from "./data/courseParts";

const assertNever = (value: never): never => {
  throw new Error (
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
};

const Part = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
  switch (coursePart.type) {
    case "normal":
      return (
        <div>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong>
          <br/>
          <i>{coursePart.description}</i>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong>
          <br/>
          project exercises {coursePart.groupProjectCount}
        </div>
      );
    case "submission":
      return (
        <div>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong>
          <br/>
          <i>{coursePart.description}</i>
          <br/>
          submit to {coursePart.exerciseSubmissionLink}
        </div>
      );
    case "special":
      return (
        <div>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong>
          <br/>
          <i>{coursePart.description}</i>
          <br/>
          required skills: {coursePart.requirements[0]}{coursePart.requirements.slice(1).map(r => `, ${r}`)}
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;