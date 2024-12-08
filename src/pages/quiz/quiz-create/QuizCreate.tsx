import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Dropdown} from "primereact/dropdown";
import {useState} from "react";

export const QuizCreate = () => {
  const [terms, setTerms] = useState(Array.from({ length: 2 }).map((_, i) => i));

  const onTermDelete = (index: number) => {
    setTerms(terms.filter((_, i) => i !== index));
  }

  const onAddTerm = () => {
    setTerms([ ...terms, terms.length ]);
  }


  return <div className="flex flex-col gap-12 px-[20vw]">
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bolder">Create quiz</h1>
      <InputText placeholder="Enter title" className="input"/>
      <InputTextarea placeholder="Add description" className="input max-h-[20rem] min-h-[5rem]" rows={5} />

      <div className="flex gap-6">
        <Dropdown placeholder="Select tag" className="input !p-0"/>
        <Dropdown placeholder="Select Level" className="input !p-0"/>
      </div>
    </div>

    <div className="flex flex-col gap-4 pb-12">
      {
        terms.map((_, i) =>
          <div className="card flex flex-col gap-12 !px-4 !py-2 !pb-6">
            <span
              className="text-sm border-b border-slate-300 pb-2 flex justify-between"
            >
              { i }
              <i className="pi pi-trash cursor-pointer" onClick={() => onTermDelete(i)}/>
            </span>

            <div className="flex items-stretch gap-4">
              <input
                className='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0 text-sm'
                placeholder="Term"
              />

              <input
                className='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0 text-sm'
                placeholder="Definition"
              />
            </div>
          </div>
        )
      }

      <i className="pi pi-plus-circle text-2xl cursor-pointer self-center" onClick={() => onAddTerm()}/>
    </div>

  </div>;
}