import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import TableHeading from "@/Components/TableHeading";
import { Button } from "@headlessui/react";
const Index = ({ users, querParams = null, success }) => {
    
    querParams = querParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            querParams[name] = value;
        } else {
            delete querParams[name];
        }
        router.get(route("user.index", querParams));
    };
    const onKeyPress = (name, e) => {
        if (e.key === "Enter") {
            searchFieldChanged(name, e.target.value);
        }
    };
    const sortChanged = (name) => {
        if (name === querParams.sort_field) {
            if (querParams.sort_direction === "asc") {
                querParams.sort_direction = "desc";
            } else {
                querParams.sort_direction = "asc";
            }
        } else {
            querParams.sort_field = name;
            querParams.sort_direction = "asc";
        }
        router.get(route("user.index", querParams));
    };
    const deleteuser = (e) => {
        e.preventDefault;
        if (!window.confirm("Are you sure want to delete the users?")) {
            return;
        }
        router.delete(route("user.destroy", e.id));
    };

    return (
        <>
            <AuthenticatedLayout
                header={
                    <div className="flex  justify-between items-center">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                            users
                        </h2>
                        <Link
                            href={route("user.create")}
                            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                        >
                            Add user
                        </Link>
                    </div>
                }
            >
                <Head title="users" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-gray-900 shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                {success && (
                                    <div className="bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg mb-4">
                                        {success}
                                    </div>
                                )}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg">
                                        <thead>
                                            <tr className="bg-gray-800 text-gray-500 uppercase text-sm leading-normal">
                                                <TableHeading
                                                    name="id"
                                                    sortable
                                                    sortChanged={sortChanged}
                                                    sort_field={
                                                        querParams.sort_field
                                                    }
                                                    sort_direction={
                                                        querParams.sort_direction
                                                    }
                                                >
                                                    ID
                                                </TableHeading>

                                                
                                                <TableHeading
                                                    name="name"
                                                    sortable
                                                    sortChanged={sortChanged}
                                                    sort_field={
                                                        querParams.sort_field
                                                    }
                                                    sort_direction={
                                                        querParams.sort_direction
                                                    }
                                                >
                                                    Name
                                                </TableHeading>
                                                <TableHeading
                                                    name="email"
                                                    sortable
                                                    sortChanged={sortChanged}
                                                    sort_field={
                                                        querParams.sort_field
                                                    }
                                                    sort_direction={
                                                        querParams.sort_direction
                                                    }
                                                >
                                                   Email
                                                </TableHeading>
                                                
                                                <TableHeading
                                                    name="created_at"
                                                    sortable
                                                    sortChanged={sortChanged}
                                                    sort_field={
                                                        querParams.sort_field
                                                    }
                                                    sort_direction={
                                                        querParams.sort_direction
                                                    }
                                                >
                                                    Created date
                                                </TableHeading>
                                             
                                                
                                                <th className="py-3 px-6 text-center">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <thead>
                                            <tr className="bg-gray-800 text-gray-200 uppercase text-sm leading-normal">
                                                <th className="py-3 px-6 text-left"></th>
                                                <th className="py-3 px-6 text-center">
                                                    <TextInput
                                                        className="w-full"
                                                        defaultValue={
                                                            querParams.name
                                                        }
                                                        placeholder="user name"
                                                        onBlur={(e) =>
                                                            searchFieldChanged(
                                                                "name",
                                                                e.target.value
                                                            )
                                                        }
                                                        onKeyPress={(e) =>
                                                            onKeyPress(
                                                                "name",
                                                                e
                                                            )
                                                        }
                                                    />
                                                </th>
                                                <th className="py-3 px-6 text-center">
                                                <TextInput
                                                        className="w-full"
                                                        defaultValue={
                                                            querParams.email
                                                        }
                                                        placeholder="email"
                                                        onBlur={(e) =>
                                                            searchFieldChanged(
                                                                "email",
                                                                e.target.value
                                                            )
                                                        }
                                                        onKeyPress={(e) =>
                                                            onKeyPress(
                                                                "email",
                                                                e
                                                            )
                                                        }
                                                    />
                                                </th>
                                                <th className="py-3 px-6 text-center"></th>
                                                <th className="py-3 px-6 text-center"></th>
                                               
                                                
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-400 text-sm font-light">
                                            {users.data.map((user, key) => (
                                                <tr
                                                    key={key}
                                                    className="border-b border-gray-700 hover:bg-gray-800"
                                                >
                                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                                        {user.id}
                                                    </td>
                                                
                                                    <th className="py-3 px-6 text-center text-white text-nowrap">
                                                        
                                                            {user.name}
                                                    </th>
                                                    
                                                    <td className="py-3 px-6 text-center">
                                                        {user.email}
                                                    </td>
                                                    
                                                    <td className="py-3 px-6 text-center">
                                                        {user.created_at}
                                                    </td>
                                                    <td className="py-3 px-6 text-center flex space-x-4">
                                                        <Link
                                                            href={route(
                                                                "user.edit",
                                                                user.id
                                                            )}
                                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                            />
                                                        </Link>
                                                        <Button
                                                            onClick={(e) =>
                                                                deleteuser(user)
                                                            }
                                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                            />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination links={users.meta.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Index;
