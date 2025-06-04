import { CheckCircle, XCircleIcon } from "lucide-react";
import { useEffect } from "react";

function AlertWindow(props) {
  useEffect(() => {
    if (props.isVisible) {
      setTimeout(() => {
        props.setIsVisible(false);
      }, 2500);
    }
  }, [props.isVisible]);

  const baseClass = `absolute bottom-5 left-5 rounded-md flex flex-col bg-white-tone-2 items-center border-[3px] text-white transition ease-in-out duration-500 z-50`;
  const visibilityClass = props.isVisible
    ? "translate-x-0"
    : "-translate-x-[200%]";
  const alertDefinitionClass = props.isError
    ? "border-red-700"
    : "border-green-700";

  return (
    <div className={`${baseClass} ${visibilityClass} ${alertDefinitionClass}`}>
      <div className="flex gap-5 items-center p-3">
        {props.isError ? <XCircleIcon size={30} color="red"/> : <CheckCircle size={30} color="green"/>}
        <div className={`flex flex-col text-[10pt] ${props.isError ? "text-red-700" : "text-green-700"}`}>
          <h1 className='font-bold'>{props.alertTitle}</h1>
          {props.alertDescription}
        </div>
      </div>

      <span className={`self-start w-full h-[5px] rounded-full ${props.isVisible ? "load-bar" : ''} ${props.isError ? "bg-red-700" : "bg-green-700"}`}></span>
    </div>
  );
}

export default AlertWindow;
