
export default function Test(){
    return(
     <>
    


<div
  data-slot="base"
  className="inline-flex w-full sticky top-0 z-50 bg-slate-500 backdrop-filter backdrop-blur-sm bg-opacity-10 p-3"
  aria-title="Dynamic tabs"
>
  <div
    data-slot="tabList"
    className="flex p-1 h-fit gap-2 items-center flex-nowrap overflow-x-scroll scrollbar-hide bg-default-100 rounded-medium w-full"
    id="react-aria3961492990-:rg:"
    role="tablist"
    aria-orientation="horizontal"
  >
    <button
      data-slot="tab"
      tabIndex="-1"
      data-key="/"
      id="react-aria3961492990-:rg:-tab-/"
      aria-selected="false"
      role="tab"
      className="z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer transition-opacity tap-highlight-transparent data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-30 data-[hover-unselected=true]:opacity-disabled outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 h-8 text-small rounded-small"
      type="button"
    >
      <div className="relative z-10 whitespace-nowrap transition-colors text-default-500 group-data-[selected=true]:text-primary-foreground" data-slot="tabContent">
        <div className="flex items-center space-x-2">
       
          <span>Personal</span>
        </div>
      </div>
    </button>
    <button
      data-slot="tab"
      tabIndex="0"
      data-key="/projects"
      id="react-aria3961492990-:rg:-tab-/projects"
      aria-selected="true"
      role="tab"
      className="z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer transition-opacity tap-highlight-transparent data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-30 data-[hover-unselected=true]:opacity-disabled outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 h-8 text-small rounded-small"
      type="button"
      data-selected="true"
      aria-controls="react-aria3961492990-:rg:-tabpanel-/projects"
    >
      <span
        className="absolute z-0 inset-0 rounded-small bg-primary text-primary-foreground"
        data-slot="cursor"
      ></span>
      <div
        className="relative z-10 whitespace-nowrap transition-colors text-default-500 group-data-[selected=true]:text-primary-foreground"
        data-slot="tabContent"
      >
        <div className="flex items-center space-x-2">
       
          <span>Projects</span>
        </div>
      </div>
    </button>
    <button
      data-slot="tab"
      tabIndex="-1"
      data-key="/others"
      id="react-aria3961492990-:rg:-tab-/others"
      aria-selected="false"
      role="tab"
      className="z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer transition-opacity tap-highlight-transparent data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-30 data-[hover-unselected=true]:opacity-disabled outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 h-8 text-small rounded-small"
      type="button"
    >
      <div
        className="relative z-10 whitespace-nowrap transition-colors text-default-500 group-data-[selected=true]:text-primary-foreground"
        data-slot="tabContent"
      >
        <div className="flex items-center space-x-2">
    
          <span>Others</span>
        </div>
      </div>
    </button>
  </div>
</div>



     </>
    )
}