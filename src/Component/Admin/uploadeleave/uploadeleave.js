import "./uploadeleave.css"

const UploadeLeave  = () =>{

    return (
        <div className="uploade-leave-container" >
            <label for = "file" className = "upload-excel" >Uoloade your excel </label>
            <input type= "file" id = "file" name="file" accept=".xlsl" />
        </div>
    )
}

export default UploadeLeave ;