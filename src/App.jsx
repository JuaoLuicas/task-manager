import { useState } from "react";
import { useEffect } from "react";
import logo from "./assets/imgs/icon.png";
import { ChartBar, ListCheck } from "lucide-react";
import AlertWindow from "./components/AlertWindow";
import GraphicsPage from "./pages/GraphicsPage";
import TaskListPage from "./pages/TaskListPage";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("taskList")) || []
  );

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }, [tasks]);

  const [pages, setPages] = useState([
    { pageName: "tasks", buttonName: "Tarefas", buttonIcon: <ListCheck/>, isSelected: true }, 
    { pageName: "graphics", buttonName: "Relatórios", buttonIcon: <ChartBar/>, isSelected: false }
  ]);

  function handlePageSelection(selectedPageName) {
    setPages(prevPages => // Use a função de callback para garantir o último estado
      prevPages.map(page =>
        page.pageName === selectedPageName
          ? { ...page, isSelected: true } // Se for a página clicada, defina como selecionada
          : { ...page, isSelected: false } // Caso contrário, defina como não selecionada
      )
    );
  };

  function renderSelectedPage() {
    const selectedPage = pages.find(page => page.isSelected);

    switch (selectedPage.pageName) {
      case 'tasks':
        return (
          <TaskListPage
            tasks={tasks}
            deletedTask={deletedTask}
            changeTaskStatus={changeTaskStatus}
            deleteTask={deleteTask}
            addTask={addTask}
            blockCursor={blockCursor}
            setAlert={setAlert}
            />
        )
        break;

        case 'graphics':
          return (
            <GraphicsPage
            chartLabels={extractedStatusName}
            chartData={extractedStatusQuantity}/>
          )
          
          break;
    
      default:
        break;
    }
  }

    const [alert, setAlert] = useState({
    isError: false,
    isVisible: false,
    alertTitle: "",
    alertDescription: "",
  });

  
// Tasks Page Functions
  const [deletedTask, setDeletedTask] = useState([]);
  const [blockCursor, setBlockCursor] = useState(false);

  function changeTaskStatus(taskId, status) {
    const newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        switch (status) {
          case 0:
            task.isCompleted = false;
            return { ...task, statusNumber: 0, statusName: 'Não concluído' };
          case 1:
            task.isCompleted = false;
            return { ...task, statusNumber: 1, statusName: 'Em andamento' };
          case 2:
            task.isCompleted = true;
            return { ...task, statusNumber: 2, statusName: 'Concluído' };

          default:
            break;
        }
      }
      return task;
    });

    setTasks(newTasks);
  }

  function deleteTask(taskId) {
    // Bloqueia o cursor de todos os itens
    setBlockCursor(true);

    // Armazena o item deletado temporariamente
    setDeletedTask((deleted) => [...deleted, taskId]);

    setTimeout(() => {
      // Filtra as tarefas que são diferentes do "taskId"
      const taskFilter = tasks.filter((task) => task.id !== taskId);
      setTasks(taskFilter);

      const jsonTaskList = JSON.stringify(tasks);
      localStorage.setItem("taskList", jsonTaskList);

      // Remove o item armazenado
      setDeletedTask((deleted) => deleted.filter((id) => id !== taskId));

      // Libera o cursor de todos os itens
      setBlockCursor(false);
    }, 800);
  }

  function addTask(title, description, date) {
    const newTask = {
      id: tasks.length + 1,
      title: title,
      description: description,
      date: date,
      statusNumber: 0,
      statusName: 'Não concluído',
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }

  //Graphic Page Functions

  function extractStatusName() {
    // Extrai todas os atributos com o nome de statusName
    const bruteStatusName = tasks.map(task => task.statusName);
    // Realiza a mesclagem de atributos repetidos
    const cleanStatusName = [...new Set(bruteStatusName)];
    // Ordena o array em ordem afabética
    cleanStatusName.sort();
    return cleanStatusName;
  }

  const extractedStatusName = extractStatusName();

  function extractStatusQuantity() {
    const bruteStatusQuantity = tasks.map(task => task.statusName);
    const quantity = [];

    bruteStatusQuantity.forEach(statusName => {
      if (quantity[statusName]) {
        quantity[statusName]++;
      } else {
        quantity[statusName] = 1;
      }
    });

    const quantityArray = Object.values(quantity);

    return quantityArray;
  }

  const extractedStatusQuantity = extractStatusQuantity(); 



  return (
    <div className='w-screen h-screen'>
      <header className='h-[75px] w-screen bg-space-cadet flex gap-2 justify-start items-center p-5'>
        <img src={logo} alt='' className='w-8 h-8' />
        <h1 className='text-white font-bold font-satoshiBlack text-[15pt]'>
          TaskManager
        </h1>
      </header>

      <div className='w-screen h-[calc(100vh-75px)] flex'>
        <nav className='w-[300px] h-full flex bg-white-tone-1 border-r-[2px] border-argentinian-blue'>
          <ul className="flex flex-col items-center ml-3 mr-3 mt-6 mb-6 gap-3">
            {pages.map((page) => (
              <li className='flex items-center' key={page.pageName}>
                <span className={`${page.isSelected ? "bg-indigo-dye select-tab" : ''} w-[5px] h-[35px] rounded-full transition duration-200`}></span>
                <button className={`flex font-satoshiBlack gap-3 items-center text-white w-[200px]  hover:bg-indigo-dye p-2 ml-3 rounded-md transition ${page.isSelected ? "bg-indigo-dye" : 'bg-united-nations-blue'}`}
                onClick={() => handlePageSelection(page.pageName)}>
                  {page.buttonIcon} {page.buttonName}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className='w-[calc(100vw-50px)] p-10 bg-white-tone-2 max-h-full'>
          {renderSelectedPage()}
        </div>
      </div>
      <AlertWindow
        isError={alert.isError}
        isVisible={alert.isVisible}
        alertTitle={alert.alertTitle}
        alertDescription={alert.alertDescription}
        setIsVisible={(visibility) =>
          setAlert((prev) => ({ ...prev, isVisible: visibility }))
        }
      />
    </div>
  );
}

export default App;
