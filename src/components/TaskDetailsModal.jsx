import { Book, ChartBar, ChevronLeftCircle, Clock10, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdjustableLine from "../components/AdjustableLine";
import TaskStatus from "./TaskStatus";

function TaskDetailsModal(props) {

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 transition duration-100'>
      <div className='bg-white-tone-1 p-6 rounded-lg shadow-lg flex flex-col gap-4 w-[450px]'>
        <header className='flex justify-between items-center'>
          <h1 className='font-satoshiBlack text-xl '>DETALHES</h1>
          <button
            className='bg-space-cadet text-white p-2 rounded-md hover:bg-lapis-lazuli'
            onClick={() => props.setModal(false)}
          >
            <X />
          </button>
        </header>

        <div>
          <div className='flex flex-col gap-5'>
            <div>
              <div className='m-1 mb-2 rounded-md p-1 border-argentinian-blue border-[2px]'>
                <h2 className='font-satoshiBold text-lapis-lazuli text-center text-[14pt] break-all'>{props.title}</h2>
              </div>
              <div className='m-1 rounded-md grid grid-cols-2 gap-2'>
                <div className='rounded-md p-1 col-span-2 border-argentinian-blue border-[2px]'>
                  <h3 className='font-bold flex items-center gap-1 m-2 text-left text-lapis-lazuli text-[10pt]'>
                    <Book size={20}/> Descrição:
                  </h3>
                  <AdjustableLine margin={'10px'} bg={'space-cadet'} h={'2px'}/>
                  <p className='text-[10pt] m-2 overflow-auto break-all max-h-[100px] font-satoshiRegular'>{props.description}</p>
                </div>
                <div className='rounded-md p-1 border-argentinian-blue border-[2px]'>
                  <h3 className='font-bold flex items-center gap-1 m-2 text-left text-lapis-lazuli text-[10pt]'>
                    <Clock10 size={20}/> Data limite:
                  </h3>
                  <AdjustableLine margin={'10px'} bg={'space-cadet'} h={'2px'}/>
                  <p className='text-[12pt] m-2 tex font-satoshiBold text-lapis-lazuli text-center'>{props.date}</p>
                </div>
                <div className='rounded-md p-1 border-argentinian-blue border-[2px]'>
                  <h3 className='font-bold flex items-center gap-1 m-2 text-left text-lapis-lazuli text-[10pt]'>
                    <ChartBar size={20}/> Status da tarefa:
                  </h3>
                  <AdjustableLine margin={'10px'} bg={'space-cadet'} h={'2px'}/>
                  <div className='text-[12pt] m-2 flex gap-2 font-satoshiBold items-center justify-center'>
                    <TaskStatus status={props.statusNumber} w={18}/>
                    <p className={props.statusNumber == 0
                      ? "text-red-800"
                      : props.statusNumber == 1
                      ? "text-yellow-500"
                      : "text-green-600"}>
                      {props.statusNumber == 0
                      ? "Não iniciado"
                      : props.statusNumber == 1
                      ? "Em andamamento"
                      : "Concluído"}

                    </p>
                    
                      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;
