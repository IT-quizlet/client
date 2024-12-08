import {Tag} from "primereact/tag";
import {ItemsSlider} from "../../../shared/components/items-slider.tsx";

export const QuizItem = () => {
  const quiz = {
    tag: 'Java',
    level: 'Middle'
  };

  return <div className="flex flex-col gap-6 px-[20vw] py-12">
    <h1 className="text-3xl font-bold">Java basic questions</h1>
    <div className="flex items-center gap-2">
      Tag: {<Tag value={quiz.tag}/>}
    </div>
    <div className="flex items-center gap-2">
      Level: {<Tag value={quiz.level}/>}
    </div>
    <div className="flex items-center gap-2">
      <i className="pi pi-users"/>
      39 studiers recently
    </div>

    <div className="card !border-0 flex flex-col items-center gap-32 !py-24">
      <h1 className="text-4xl font-bolder">Question</h1>

      <div className="flex flex-wrap justify-center gap-2 w-full">
        <span className="card min-w-[45%] cursor-pointer hover:bg-slate-100 !py-2">Answer</span>
        <span className="card min-w-[45%] cursor-pointer hover:bg-slate-100 !py-2">Answer</span>
        <span className="card min-w-[45%] cursor-pointer hover:bg-slate-100 !py-2">Answer</span>
        <span className="card min-w-[45%] cursor-pointer hover:bg-slate-100 !py-2">Answer</span>
      </div>
    </div>

    <ItemsSlider/>
  </div>;
}