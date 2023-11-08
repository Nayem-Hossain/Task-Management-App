import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const UpdateModal = ({ singleTask, isupdateList, setIsupdateList }) => {
    const { _id, taskName, description, status } = singleTask;
    // console.log("single task taskname from UpdateModal: ", taskName);
    // console.log("single task description from UpdateModal: ", description);
    const dialogRef = useRef(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            taskName: taskName,
            description: description,
        },
    });

    const handleOnSubmitUpdate = async (data) => {
        try {
            // console.log("updated data", data);
            const response = await axios.put(
                `http://localhost:7000/update-task/${_id}`,
                data
            );
            console.log("update-task response api : ", response);
            setIsupdateList(!isupdateList);
            dialogRef.current.close();
            reset();
        } catch (error) {
            console.log("Error updating task: ", error);
        }
    };

    return (
        <dialog ref={dialogRef} id="update_modal" className="modal modal-middle">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form with method dialog, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => reset()}>
                        ✕
                    </button>
                </form>
                <div>
                    <h3 className="font-bold text-lg">Update Task</h3>
                    <form onSubmit={handleSubmit(handleOnSubmitUpdate)} className="pt-4">
                        <div className="text-start mt-2">
                            <label htmlFor="taskName" className="block">
                                Task Name
                            </label>
                            <input
                                {...register("taskName", {
                                    required: true,
                                    minLength: {
                                        value: 2,
                                        message: "Task name must be at least 2 characters",
                                    },
                                })}
                                defaultValue={taskName}
                                id="taskName"
                                name="taskName"
                                type="text"
                                placeholder="Type here..."
                                className="input input-bordered input-accent w-full"
                            />
                            {errors.taskName && (
                                <span className="text-red-700">
                                    Task name field is required
                                </span>
                            )}
                        </div>
                        <div className="text-start mt-2">
                            <label htmlFor="description" className="block">
                                Job Description
                            </label>
                            <input
                                {...register("description", {
                                    required: true,
                                    minLength: {
                                        value: 5,
                                        message: "Task description must be at least 3 characters",
                                    },
                                })}
                                defaultValue={description}
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Type here..."
                                className="input input-bordered input-accent w-full"
                            />
                            {errors.description && (
                                <span className="text-red-700">
                                    {errors.description.message}
                                </span>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline btn-success mt-4 float-right"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default UpdateModal;
