interface CourseParts {
  name: string;
  exerciseCount: number;
}

const Total = ({ courseParts }: { courseParts: Array<CourseParts> }): JSX.Element => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry: number, part: CourseParts) => carry + part.exerciseCount, 0)}
    </p>
  )
};

export default Total;