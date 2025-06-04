import { BadgeCheck, CheckCircle2, CheckIcon, ChevronRightIcon, SpellCheckIcon, Trash2 } from "lucide-react";
import AddTaskButton from "../components/AddTaskButton";
import TaskStatus from "../components/TaskStatus";
import Select from "../components/Select";
import { useState } from "react";
import TaskDetailsModal from "../components/TaskDetailsModal";

function TaskListPage(props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className='bg-white flex flex-col items-center transition duration-200 shadow-lg rounded-lg'>
      <AddTaskButton addTask={props.addTask} setAlert={props.setAlert} />

      {props.tasks.length > 0 && (
        <ul
          className={`w-full space-y-4 rounded-md pb-5 pr-5 pl-5 transition duration-150 ${
            props.tasks.length == 0 ? `pb-0 pr-0 pl-0` : ""
          }`}
        >
          {props.tasks.map((task) => (
            <li
              key={task.id}
              className={`flex gap-2 items-center ${
                props.deletedTask.includes(task.id)
                  ? "scale-animation-reverse"
                  : "opacity-100"
              }`}
            >
              <div
                className={`w-full grid grid-cols-2 border-argentinian-blue border-[2px] text-argentinian-blue p-2 rounded-md text-left font-bold gap-2 transition duration-100 hover:border-lapis-lazuli cursor-pointer`}
              >
                <div>
                  <p
                    className={`text-left flex gap-2 transition duration-300 ${
                      task.isCompleted ? "text-green-500" : ""
                    }`}
                  >
                    {task.isCompleted ? (
                      <CheckCircle2 className='scale-animation' />
                    ) : (
                      ""
                    )}
                    {task.title}
                  </p>

                  <p
                    className={`text-[8pt] text-left transition duration-150 ${
                      task.isCompleted ? "text-slate-500" : ""
                    }`}
                  >
                    Para: {task.date}
                  </p>
                </div>

                <div className='mr-2 gap-2 flex justify-end self-center'>
                  <TaskStatus status={task.statusNumber} h="20px" w="20px"/>
                  <Select
                    w={"150px"}
                    h={"30px"}
                    placeholder={task.statusName}
                    changeTaskStatus={props.changeTaskStatus}
                    taskId={task.id}
                    option1={["Não concluído", 0, <TaskStatus status={0} h="12px" w="12px"/>, false]}
                    option2={["Em andamento", 1, <TaskStatus status={1} h="12px" w="12px"/>, false]}
                    option3={["Concluído", 2, <TaskStatus status={2} h="12px" w="12px"/>, true]}
                  />
                </div>
                
              </div>
              <button
                //onClick={() => seeMore(task)}
                onClick={() => setShowDetails(true)}
                className='bg-argentinian-blue hover:bg-lapis-lazuli transition text-white p-2 rounded-md'
              >
                <ChevronRightIcon />
              </button>
              <button
                className={`text-white p-2 rounded-md hover:bg-lapis-lazuli ${
                  props.blockCursor
                    ? "cursor-not-allowed bg-space-cadet"
                    : "bg-argentinian-blue"
                }`}
                disabled={props.blockCursor}
                onClick={() => props.deleteTask(task.id)}
              >
                <Trash2 />
              </button>

              {showDetails && (
              <TaskDetailsModal setModal={setShowDetails} title={task.title} description={task.description} date={task.date} statusNumber={task.statusNumber}/>
              )}
            </li>
          ))}
        </ul>
      )}


    </div>
  );
}

export default TaskListPage;
