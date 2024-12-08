import {Tag} from "primereact/tag";
import {Avatar} from "primereact/avatar";
import {ItemsSlider} from "../../../shared/components/items-slider.tsx";
import {Link} from "react-router-dom";

export const QuizList = () => {
  // TODO: integrate with BE
  const quizes = [0, 1, 2, 3];

  return <div className="flex flex-col gap-4 p-6">
    <h1 className="px-12 font-bold text-2xl">Popular</h1>

    <div className="flex flex-wrap gap-12 p-6">
      {
        quizes.map(() =>
          <Link
            className='card flex flex-col gap-6 flex-auto min-w-[40%] items-start cursor-pointer hover:shadow-lg'
            to={'/quiz/item'}
          >
            <h1>Test name</h1>
            <Tag value="40 terms" style={{background: 'black'}}/>

            <div className="flex gap-2 mt-12 content-center items-center">
              <Avatar
                label="Z"
                shape="circle"
              />
              <span className="">uZer</span>
              <Tag value="Teacher" style={{background: 'black'}}/>
            </div>
          </Link>
        )
      }
    </div>

    <ItemsSlider/>
  </div>;
}