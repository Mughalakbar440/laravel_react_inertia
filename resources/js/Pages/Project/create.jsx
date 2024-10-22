import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const Create = () => {
    const { data, setData, post, errors, reset } = useForm({
        image: null, // For file input
        name: "",
        status: "",
        description: "",
        due_date: "",
    });

    const handleFileChange = (e) => {
        setData("image", e.target.files[0]);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        
        post(route("project.store",data), {
           // Reset form on success
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Add Project
                </h2>
            }
        >
            <Head title="Add Project" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-gray-900 shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                                encType="multipart/form-data"
                            >
                                {/* Project Name */}
                                <div className="mb-4">
                                    <InputLabel htmlFor="name" value="Project Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="Enter project name"
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
                                    <InputLabel htmlFor="description" value="Project Description" />
                                    <TextAreaInput
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                
                                        required
                                    >Enter project description</TextAreaInput>
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
                                    <InputLabel htmlFor="project_image_path" value="Project Image" />
                                    <input
                                        id="project_image_path"
                                        type="file"
                                        onChange={handleFileChange}
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
                                    ><Link href={route("project.index")}> Cancel</Link>

                                    </DangerButton>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                        Add Project
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
