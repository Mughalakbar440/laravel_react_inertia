
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head } from "@inertiajs/react";

import React from "react";
import TaskTable from "./TaskTable";
import { faL } from "@fortawesome/free-solid-svg-icons";
const Index = ({ Tasks, querParams = null }) => {
   
    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                     Tasks
                    </h2>
                }
            >
                <Head title="tasks" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-gray-900 shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                               <TaskTable Tasks={Tasks} querParams={querParams} />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Index;
