import { CoursePart } from "./data/courseParts";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: Array<CoursePart>}): JSX.Element => {
  return (
    <div>
      {courseParts.map((part: CoursePart) => {
        return (
          <dl key={part.name}>
            <dt>
              <Part coursePart={part} />
            </dt>
          </dl>
        )
      })}  
    </div>
  )
};

export default Content;