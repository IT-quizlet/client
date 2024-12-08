import {Avatar} from "primereact/avatar";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";

export const AccountSettings = () => {

  return <div className="px-12 flex gap-12 flex-col content-left">
    <div className="flex items-center gap-4 mb-6">
      <h1 className="font-bold text-xl">Account Name</h1>
      <Avatar label="Z" size="large" shape="circle"/>
    </div>

    <div className="flex flex-col gap-6">
      <h2 className="text-xl">Statistics</h2>
      <Dropdown placeholder="Created tests" className="input w-[25rem]"/>
      <Dropdown placeholder="Passed tests" className="input w-[25rem]"/>
    </div>

    <div className="flex flex-col gap-6">

      <h2 className="text-xl">Settings</h2>
      <div className="flex gap-4">
        <div className="card flex flex-col gap-6">
          <InputText className="input" value="John Doe"/>
          <button className="btn filled w-fit px-3">Change name</button>
        </div>
        <div className="card flex flex-col gap-6">
          <InputText className="input" value="JohnDoe@gmail.com"/>
          <button className="btn filled w-fit px-3">Change email</button>
        </div>
      </div>
    </div>
  </div>
}