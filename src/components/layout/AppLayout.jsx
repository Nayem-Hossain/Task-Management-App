import React, { useEffect, useState } from 'react';
import SideNavbar from '../side-navbar/SideNavbar';
import TopNavbar from '../top-navbar/TopNavbar';
import axios from 'axios';
import TaskTable from '../data-tables/TaskTable';
import CreateModal from '../modal/CreateModal';

const AppLayout = () => {
    const [isupdateList, setIsupdateList] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        // Using an Immediately Invoked Async Function:
        (async () => {
            try {
                const response = await axios.get('http://localhost:7000/get-task');
                console.log("get-task api response : ", response.data);
                setTaskList(response.data);
                console.log("setTaskList : ", taskList);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();


        /* Use Axios to make a GET request */

        // axios.get("http://localhost:7000/get-task")
        //     .then((response) => {
        //         setTaskList(response.data);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching data:', error);
        //     });
    }, [isupdateList])


    return (
        <div>
            <div className="relative bg-cyan-600 overflow-hidden max-h-screen">
                <SideNavbar />
                <div className="fixed right-0 top-0 left-72 h-16">
                    <TopNavbar />
                    <div className='pt-5 relative'>
                        <div>
                            {/* <form onSubmit={handleSubmit((data) => setTask(JSON.stringify(data)))}}>
                                <div className="flex justify-center">
                                    <input {...register("taskName", { required: true })} placeholder="Input Task..." className="input input-bordered input-accent w-full max-w-xs border-r-0 rounded-r-none focus:outline-offset-0" />
                                    <input type="submit" className='btn btn-neutral rounded-l-none border-y-4 border-teal-500 py-1' />
                                </div>
                            </form> */}


                            <div>
                                <button onClick={() => document.getElementById('create_modal').showModal()} type="button" className="btn btn-outline hover: rounded-full absolute top-10 right-10">
                                    <svg className="fill-current text-black hover:text-white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                                    </svg>
                                </button>
                                <CreateModal />
                            </div>

                            <div className='mt-20'>
                                {
                                    taskList.length > 0 && <TaskTable taskList={taskList} setTaskList={setTaskList} isupdateList={isupdateList} setIsupdateList={setIsupdateList} />
                                }
                            </div>
                        </div>


                    </div>
                </div>

            </div>

        </div>
    );
};

export default AppLayout;