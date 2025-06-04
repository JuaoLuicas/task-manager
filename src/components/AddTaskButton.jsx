import { SquarePlus } from "lucide-react";
import AddTaskModal from "./AddTaskModal";
import { useState } from "react";

function AddTaskButton(props) {
  const [showModal, setModal] = useState(false);

  return (
    <div className='flex flex-col justify-center'>
      <button
        className='w-[250px] text-argentinian-blue flex justify-center bg-white-tone-1 border-argentinian-blue border-[2px] rounded-md p-3 font-bold m-5
        hover:bg-indigo-dye hover:text-white hover:border-indigo-dye transition duration-200'
        onClick={() => setModal(true)}
      >
        <p>Adicionar</p>
      </button>

      {showModal && (
        <AddTaskModal setModal={setModal} addTask={props.addTask} setAlert={props.setAlert}/>
      )}
    </div>
  );
}

export default AddTaskButton;
