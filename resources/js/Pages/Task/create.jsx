    import DangerButton from "@/Components/DangerButton";
    import InputLabel from "@/Components/InputLabel";
    import SelectInput from "@/Components/SelectInput";
    import TextAreaInput from "@/Components/TextAreaInput";
    import TextInput from "@/Components/TextInput";
    import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
    import { Head, Link, useForm } from "@inertiajs/react";
    import React from "react";

    const Create = ({users,projects}) => {

        
        const { data, setData, post, errors, reset } = useForm({
            image: "", // For file input
            name: "",
            project_id:"",
            assigned_user_id:"",
            status: "",
            description: "",
            due_date: "",
            priority:""
        });

        const handleFileChange = (e) => {
            setData("image_path", e.target.files[0]);
        };

        const onSubmit = (e) => {
            e.preventDefault();
            
            post(route("task.store",data), {
            // Reset form on success
            });
        };

        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Add Task
                    </h2>
                }
            >
                <Head title="Add Task" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-gray-900 shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <form
                                    onSubmit={onSubmit}
                                    className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                                    encType="multipart/form-data"
                                >

                                    {/* Select Project */}
                                    <div className="mb-4">
                                        <InputLabel htmlFor="task_assigned_user" value="Task Project" />
                                        <SelectInput
                                            id="task_assigned_user"
                                            value={data.project_id}
                                            onChange={(e) => setData("project_id", e.target.value)}
                                            required
                                        >
                                            <option value="">Select Project</option>
                                            {projects.data.map(project =>(
                                                <option key={project.id} value={project.id}>{project.name}</option>
                                            ))}
                                        </SelectInput>
                                        {errors.project_id && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.project_id}
                                            </div>
                                        )}
                                    </div>

                                    {/* Task Name */}
                                    <div className="mb-4">
                                        <InputLabel htmlFor="name" value="Task Name" />
                                        <TextInput
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            className="mt-1 block w-full"
                                            placeholder="Enter task name"
                                            required
                                        />
                                        {errors.name && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="mb-4">
                                        <InputLabel htmlFor="description" value="Task Description" />
                                        <TextAreaInput
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData("description", e.target.value)}
                                    
                                            required
                                        >Enter task description</TextAreaInput>
                                        {errors.description && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.description}
                                            </div>
                                        )}
                                    </div>

                                    

                                    {/* Status */}
                                    <div className="mb-4">
                                        <InputLabel htmlFor="status" value="Status" />
                                        <SelectInput
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData("status", e.target.value)}
                                            required
                                        >
                                            <option value="">Select status</option>
                                            <option value="pending">Pending</option>
                                            <option value="in_progres">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </SelectInput>
                                        {errors.status && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.status}
                                            </div>
                                        )}
                                    </div>
                                    {/* Priority */}
                                    <div className="mb-4">
                                        <InputLabel htmlFor="priority" value="Task Priority" />
                                        <SelectInput
                                            id="priority"
                                            value={data.priority}
                                            onChange={(e) => setData("priority", e.target.value)}
                                            required
                                        >
                                            <option value="">Select priority</option>
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </SelectInput>
                                        {errors.priority && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.priority}
                                            </div>
                                        )}
                                    </div>
                                    {/* Select user */}
                                    <div className="mb-4">
                                        <InputLabel htmlFor="task_assigned_user" value="Task Priority" />
                                        <SelectInput
                                            id="task_assigned_user"
                                            value={data.assigned_user_id}
                                            onChange={(e) => setData("assigned_user_id", e.target.value)}
                                            required
                                        >
                                            <option value="">Select Assigned user</option>
                                            {users.data.map(user=>(
                                                <option value={user.id} key={user.id}>{user.name}</option>
                                            ))}
                                            
                                        </SelectInput>
                                        {errors.assigned_user_id && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.assigned_user_id}
                                            </div>
                                        )}
                                    </div>

                                    

                                    {/* Due Date */}
                                    <div className="mb-4">
                                        <InputLabel htmlFor="due_date" value="Due Date" />
                                        <TextInput
                                            id="due_date"
                                            type="date"
                                            value={data.due_date}
                                            onChange={(e) => setData("due_date", e.target.value)}
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        {errors.due_date && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.due_date}
                                            </div>
                                        )}
                                    </div>

                                    {/* Image */}
                                    <div className="mb-4">
                                        <InputLabel htmlFor="task_image_path" value="Task Image" />
                                        <input
                                            id="task_image_path"
                                            type="file"
                                            onChange={handleFileChange}
                                            required
                                            className="mt-1 block w-full text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                        />
                                        {errors.image && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.image}
                                            </div>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mt-6 flex justify-end gap-1">
                                        <DangerButton
                                        ><Link href={route("task.index")}> Cancel</Link>

                                        </DangerButton>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                            Add Task
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    };

    export default Create;
