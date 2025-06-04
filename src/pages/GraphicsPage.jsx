import Charts from "../components/Charts";

function GraphicsPage(props) {
    return (
        <div className='bg-white flex flex-col justify-center items-center transition duration-200 shadow-lg rounded-lg w-full'>
            <div className="flex gap-5 justify-center w-auto m-10 items-center">
                {}
                <Charts chartLabels={props.chartLabels} chartData={props.chartData}/>
            </div>
            
        </div>
    )
}

export default GraphicsPage;