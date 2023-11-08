import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CreateModal = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const handleOnSubmitCreate = async (data) => {
        try {
            console.log(data);
            const response = await axios.post('http://localhost:5000/add-task', data);
            console.log("create response : ", response);
            reset();
        } catch (error) {
            console.log('Error submitting the Task:', error);
        }
    }

    return (
        <dialog id="create_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create Task</h3>
                <form onSubmit={handleSubmit((data) => handleOnSubmitCreate(data))} className='pt-4'>
                    <div className='text-start mt-2'>
                        <label htmlFor="taskName" className='block'>Task Name</label>
                        <input {...register("taskName", { required: true })} id='taskName'  name="taskName" type="text" placeholder="Type here..." className="input input-bordered input-accent w-full" />
                        {errors.taskName && <span className="text-red-700">Task name field is required</span>}
                    </div>
                    <div className='text-start mt-2'>
                        <label htmlFor="description" className='block'>Job Description</label>
                        <input {...register('description', { required: true })} id='description'  name="description" type="text" placeholder="Type here..." className="input input-bordered input-accent w-full" />
                        {errors.description && <span className="text-red-700">Task description field is required</span>}
                    </div>
                    <button type='submit' className="btn btn-outline btn-success mt-4 float-right">Create</button>
                </form>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form with method dialog, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default CreateModal;