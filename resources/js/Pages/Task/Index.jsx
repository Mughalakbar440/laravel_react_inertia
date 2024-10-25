
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link ,usePage } from "@inertiajs/react";

import React from "react";
import TaskTable from "./TaskTable";
import { faL } from "@fortawesome/free-solid-svg-icons";
const Index = ({ Tasks,success, querParams = null }) => {

    const { url } = usePage(); // Extract URL from usePage
    
    return (
        <>
            <AuthenticatedLayout
                header={
                    <div className="flex  justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        {url ==='/task/my-task'?' My Task':'Task'}
                    </h2>
                    { url !== '/task/my-task'&&

                        <Link
                        href={route("task.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                        >
                        Add Task
                    </Link>
                    }
                </div>
                }
            >
                <Head title="Tasks" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-gray-900 shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                               <TaskTable Tasks={Tasks} querParams={querParams} success={success} />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Index;
