import { useState } from "react";
import { ReceiptRussianRuble, X } from "lucide-react";
import AlertWindow from "./AlertWindow";
import InputText from "./InputText";
import InputTextArea from "./InputTextArea";
import InputDate from "./InputDate";


function AddTaskModal(props) {
  // Variáveis principais
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const maxTitleLength = 50;
  const maxDescriptionLength = 300;

  function formatTaskTitle(taskTitle, maxLength) {
    let formattedTitle = taskTitle.charAt(0).toUpperCase() + taskTitle.slice(1);

    if (formattedTitle.length > maxLength) {
      formattedTitle = formattedTitle.slice(0, maxLength);
    }

    return formattedTitle;
  }

  function formatTaskDescription(taskDescription, maxLength) {
    let formattedDescription = taskDescription.charAt(0).toUpperCase() + taskDescription.slice(1);

    if (formattedDescription.length > maxLength) {
      formattedDescription = formattedDescription.slice(0, maxLength);
    }

    return formattedDescription;
  }

  function formatTaskDate(taskDate) {
    const dateNumbers = taskDate.replace(/\D/g, "").slice(0, 8); // máximo de 8 dígitos

    // Insere as barras automaticamente
    let finalDate = "";

    if (dateNumbers.length <= 2) {
      finalDate = dateNumbers;
    } else if (dateNumbers.length <= 4) {
      finalDate = `${dateNumbers.slice(0, 2)}/${dateNumbers.slice(2)}`;
    } else {
      finalDate = `${dateNumbers.slice(0, 2)}/${dateNumbers.slice(
        2,
        4
      )}/${dateNumbers.slice(4)}`;
    }

    return finalDate;
  }

  function validateTaskTitle(taskTitle) {
    if (taskTitle.trim() === "") {
      return false;
    }
    return true;
  }

  function validateTaskDescription(taskDescription) {
    if (taskTitle.trim() === "") {
      return false;
    }
    return true;
  }

  function validateTaskDate(taskDate) {
    if (taskDate.length !== 10) {
      return false
    }

    const parts = taskDate.split("/");

    if (parts.length !== 3) {
      return false;
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    let currentYear = new Date();
    currentYear = currentYear.getFullYear();

    if (
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < currentYear ||
      year > 2100
    ) {
      return false;
    }

    // Cria uma data formatada
    // O construtor Date pode verificar se a data é válida ou não
    const dateObject = new Date(year, month - 1, day);

    const isValid =
      !isNaN(dateObject.getTime()) &&
      // Valida se o dia inserido após o construtor é o mesmo do que foi inserido anteriormente
      dateObject.getDate() === day &&
      // Valida se o mês inserido após o construtor é o mesmo do que foi inserido anteriormente
      dateObject.getMonth() === month - 1 &&
      // Valida se o ano inserido após o construtor é o mesmo do que foi inserido anteriormente
      dateObject.getFullYear() === year;

    return isValid ? true : false;
  }

  function validateFullTask() {
    const isTaskTitleValid = validateTaskTitle(taskTitle);
    const isTaskDescriptionValid = validateTaskDescription(taskDescription);
    const isTaskDateValid = validateTaskDate(taskDate);
    let currentDate = new Date;
    currentDate = currentDate.toLocaleDateString("pt-BR");

    if (!isTaskTitleValid) {
      props.setAlert({
        isError: true,
        isVisible: true,
        alertTitle: "NOME INVÁLIDO",
        alertDescription: "Insira um nome para a tarefa.",
      });

      return false;
    }

    if (!isTaskDescriptionValid) {
      props.setAlert({
        isError: true,
        isVisible: true,
        alertTitle: "DESCRIÇÃO INVÁLIDA",
        alertDescription: "Insira uma descrição para a tarefa.",
      });

      return false;
    }

    if (!isTaskDateValid || currentDate > taskDate) {
      props.setAlert({
        isError: true,
        isVisible: true,
        alertTitle: "DATA INVÁLIDA",
        alertDescription: "Insira uma data válida para criar a tarefa.",
      });

      return false;
    }

    return true;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 transition duration-100">
      <div className="bg-white-tone-1 p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-satoshiBlack m-1">ADICIONAR TAREFA</h2>
          <button
            className="bg-space-cadet text-white p-2 rounded-md hover:bg-lapis-lazuli"
            onClick={() => props.setModal(false)}
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <InputText
            id="inputText"
            label="Tarefa"
            placeholder="Tarefa"
            inputValue={taskTitle}
            setVariable={setTaskTitle}
            textFormatter={formatTaskTitle}
            maxLength={maxTitleLength}
          />

          <InputTextArea
            id="inputTextArea"
            label="Descrição"
            placeholder="Descrição"
            inputValue={taskDescription}
            setVariable={setTaskDescription}
            textFormatter={formatTaskDescription}
            rows={"5"}
            maxLength={maxDescriptionLength}
          />

          <InputDate
            id="inputDate"
            label="Data limite"
            placeholder="Data limite"
            inputValue={taskDate}
            setVariable={setTaskDate}
            textFormatter={formatTaskDate}
            width={"45%"}
          />

          <button
            className="w-full text-white flex justify-center bg-indigo-dye border-indigo-dye border-[2px] rounded-md p-3 font-bold
        hover:bg-argentinian-blue hover:text-white hover:border-argentinian-blue transition duration-100"
            onClick={() => {
              const isTaskValidated =  validateFullTask();

              if (isTaskValidated) {
                props.addTask(taskTitle, taskDescription, taskDate, 0);

                props.setAlert({
                  isError: false,
                  isVisible: true,
                  alertTitle: "ADICIONADO COM SUCESSO",
                  alertDescription:
                    "Sua nova tarefa foi registrada com sucesso.",
                });

                props.setModal(false);
              }
            }}
          >
            <p>Adicionar</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
