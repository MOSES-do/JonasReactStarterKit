
const Spinner = () => {
    //when set to absolute "inset" defines the scope of the element
    return (
        <div className="absolute h-full flex items-center justify-center w-full
        bg-slate-200/20 backdrop-blur-sm inset-0
        ">
            <div className="loader"></div>
        </div>
    )
}

export default Spinner