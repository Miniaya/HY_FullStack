import { CoursePart } from "./data/courseParts";

const Total = ({ courseParts }: { courseParts: Array<CoursePart> }): JSX.Element => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry: number, part: CoursePart) => carry + part.exerciseCount, 0)}
    </p>
  )
};

export default Total;