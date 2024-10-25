import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const Create = ({auth,user}) => {
    const { data, setData, post, errors, reset } = useForm({
        name: user.name|| "",
        email: user.email|| "",
        password:  "",
        password_confirmation: "",
        _method:'PUT'
    });
    

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        post(route("user.update", user.id), {
            // Reset form on success
        });
    };
    return (
        <AuthenticatedLayout
        user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                 Edit User "{user.name}"
                </h2>
            }
        >
            <Head title="Edit User" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-gray-900 shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                                encType="multipart/form-data"
                            >
                                
                                {/* User Name */}
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="name"
                                        value="User Name"
                                    />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                        placeholder="Enter User name"
                                        required
                                    />
                                    {errors.name && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                {/* Email */}
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="Email"
                                        value="User email"
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                        placeholder="Enter User email"
                                        required
                                    />
                                    {errors.email && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                                {/* password */}
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                        placeholder="Enter User password"
                                    />
                                    {errors.password && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>
                                {/* confirm  password */}
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value=" Confirm Password"
                                    />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData("password_confirmation", e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                        placeholder="Enter User password_confirmation"
                                    />
                                    {errors.password_confirmation && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.password_confirmation}
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="mt-6 flex justify-end gap-1">
                                    <DangerButton>
                                        <Link href={route("user.index")}>
                                            {" "}
                                            Cancel
                                        </Link>
                                    </DangerButton>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Update User
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
