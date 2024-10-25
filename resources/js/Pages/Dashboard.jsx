import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { json } from "react-router-dom";

export default function Dashboard({
    TotalPendingTask,
    MyTaskPending,
    TotalProgressTask,
    MyTaksProgress,
    TotalCompelted,
    MytaskCompeted,
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-amber-400 text-2xl font-semibold">
                                Pending Tasks
                            </h3>
                            <p className="text-lg  mt-4">
                                <span className="mr-2">{MyTaskPending}</span>/
                                <span className="ml-2">{TotalPendingTask}</span>
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-blue-700 text-2xl font-semibold">
                                Priority Tasks
                            </h3>
                            <p className="text-lg  mt-4">
                                <span className="mr-2">{MyTaksProgress}</span>/
                                <span className="ml-2">
                                    {TotalProgressTask}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-green-700 text-2xl font-semibold">
                                Compeleted Tasks
                            </h3>
                            <p className="text-lg  mt-4">
                                <span className="mr-2">{MytaskCompeted}</span>/
                                <span className="ml-2">{TotalCompelted}</span>
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            sdafsadf
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
