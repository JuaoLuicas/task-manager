function TaskStatus(props) {

const baseClass = `rounded-full border-black border-[1px] self-center transition duration-150`;

    switch (props.status) {
        case 0:
            return <div className={`bg-red-600 ${baseClass}`} style={{ width: props.w, height: props.w }}></div>
        case 1:
            return <div className={`bg-yellow-400 ${baseClass}`}  style={{ width: props.w, height: props.w }}></div>
        case 2:
            return <div className={`bg-green-500 ${baseClass}`} style={{ width: props.w, height: props.w }}></div>
        default:
            break;
    } 
}

export default TaskStatus;