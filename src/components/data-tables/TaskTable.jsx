import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UpdateModal from '../modal/UpdateModal';

const TaskTable = ({ taskList, setTaskList, isupdateList, setIsupdateList }) => {
    const [singleTask, setSingleTask] = useState({});
    // const [isChecked, setIsChecked] = useState(false);

    const handleIsCompleteTask = async (id, isChecked) => {
        console.log("id", id);
        console.log(isChecked);
        let data = isChecked ? { status: "complete" } : { status: "incomplete" }
        console.log("status data : ", data);
        const response = await axios.put(`http://localhost:7000/update-task-status/${id}`, data)
        console.log("update-task-status response api : ", data);
        setIsupdateList(!isupdateList);
    }

    const handleUpdateTask = async (id) => {
        console.log("uadate function called")
        const response = await axios.get(`http://localhost:7000/get-singletask/${id}`);
        console.log("get single task api from handleUpdateTask : ", response.data);
        setSingleTask(response.data);
        document.getElementById('update_modal').showModal();
    }

    const handleDeleteTask = async (id) => {
        console.log("delete function called")
        const response = await axios.delete(`http://localhost:7000/delete-task/${id}`);
        if (response.data.deletedCount > 0) {
            const isDone = confirm("deleted Successfully!");
            if (isDone) {
                const remainingTask = taskList.filter((task) => task._id !== id);
                setTaskList(remainingTask);
            }
        }
    }

    return (
        <div className="overflow-x-auto mt-5">
            <table className="table">
                <thead>
                    <tr>
                        <th>Mark</th>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        taskList.map((task) => {
                            return (
                                <tr key={task._id} className="hover">
                                    <td>
                                        <label>
                                            <input onChange={(event) => handleIsCompleteTask(task._id, event.target.checked)} type="checkbox" name='status' className="checkbox" />
                                        </label>
                                    </td>
                                    <td className={`${task.status === "complete" && "line-through text-red-500 line-thick"}`}>{task.taskName}</td>
                                    <td className={`${task.status === "complete" && "line-through text-red-500 line-thick"}`}>{task.description}</td>
                                    <td>{task.status}</td>
                                    <td><button onClick={() => handleUpdateTask(task._id)} className="btn btn-xs btn-outline btn-success">update</button></td>
                                    <td><button onClick={() => handleDeleteTask(task._id)} className='btn btn-xs btn-outline btn-error'>delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <UpdateModal singleTask={singleTask} isupdateList={isupdateList} setIsupdateList={setIsupdateList} />
        </div >
    );
};

export default TaskTable;