export const ItemsSlider = () => {

  return <div className="w-full flex gap-12 items-center justify-center">
    <div className="rounded-full cursor-pointer bg-black w-fit p-2 flex items-center justify-center hover:shadow-lg">
      <i className="pi pi-arrow-left" style={{ fontSize: '1.5rem', color: 'white' }}/>
    </div>

    <span>1/2</span>

    <div className="rounded-full cursor-pointer bg-black w-fit p-2 flex items-center justify-center hover:shadow-lg">
      <i className="pi pi-arrow-right" style={{ fontSize: '1.5rem', color: 'white' }}/>
    </div>
  </div>
}