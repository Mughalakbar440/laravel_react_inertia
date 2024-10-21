import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link } from "@inertiajs/react";
import React from "react";
const Index = ({ projects }) => {
    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Projects
                    </h2>
                }
            >
                <Head title="Projects" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                                        <thead>
                                            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                                                <th className="py-3 px-6 text-left">
                                                    ID
                                                </th>
                                                <th className="py-3 px-6 text-left">
                                                    Image
                                                </th>
                                                <th className="py-3 px-6 text-center">
                                                    Name
                                                </th>
                                                <th className="py-3 px-6 text-center">
                                                    Status
                                                </th>
                                                <th className="py-3 px-6 text-center">
                                                    Create Date
                                                </th>
                                                <th className="py-3 px-6 text-center">
                                                    Due Date
                                                </th>
                                                <th className="py-3 px-6 text-center">
                                                    Created by
                                                </th>
                                                <th className="py-3 px-6 text-center">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm font-light">
                                            {projects.data.map(
                                                (project, key) => (
                                                    <tr
                                                        key={key}
                                                        className="border-b border-gray-300 hover:bg-gray-100"
                                                    >
                                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                                            {project.id}
                                                        </td>
                                                        <td className="py-3 px-6 text-left">
                                                            <img
                                                                src={
                                                                    project.image_path
                                                                }
                                                                alt={
                                                                    project.name
                                                                }
                                                                className="rounded-full h-10 w-10 object-cover"
                                                            />
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            {project.name}
                                                        </td>
                                                       <td>
                                                        <span className={"px-2 py-1 rounded text-white "+PROJECT_STATUS_CLASS_MAP[project.status]}> {PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                                       </td>
                                                        <td className="py-3 px-6 text-center">
                                                            {project.created_at}
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            {project.due_date}
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            {
                                                                project
                                                                    .createdBy
                                                                    .name
                                                            }
                                                        </td>
                                                        <td className="py-3 px-6 text-center flex space-x-4">
                                                            <Link href={route('project.edit',project.id)} className="bg-blue-500 text-white px-3 py-1 rounded">
                                                            <FontAwesomeIcon icon={faEdit} />
                                                            </Link>
                                                            <Link href={route('project.destroy',project.id)} className="bg-red-500 text-white px-3 py-1  rounded">
                                                            <FontAwesomeIcon icon={faTrash} />

                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                    <Pagination links={projects.meta.links}/> 
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
