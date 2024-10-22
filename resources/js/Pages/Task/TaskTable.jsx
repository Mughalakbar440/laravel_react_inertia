import React from "react";
import TableHeading from "@/Components/TableHeading";
import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskTable = ({ Tasks, querParams = null, hideProjectColums = false }) => {
    querParams = querParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            querParams[name] = value;
        } else {
            delete querParams[name];
        }
        router.get(route("task.index", querParams));
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
        router.get(route("task.index", querParams));
    };
    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg">
                    <thead>
                        <tr className="bg-gray-800 text-gray-500 uppercase text-sm leading-normal">
                            <TableHeading
                                name="id"
                                sortable
                                sortChanged={sortChanged}
                                sort_field={querParams.sort_field}
                                sort_direction={querParams.sort_direction}
                            >
                                ID
                            </TableHeading>

                            <th className="py-3 px-6 text-left">Image</th>
                            {!hideProjectColums && (
                                <th className="py-3 px-6 text-left">
                                    Project name
                                </th>
                            )}

                            <TableHeading
                                name="name"
                                sortable
                                sortChanged={sortChanged}
                                sort_field={querParams.sort_field}
                                sort_direction={querParams.sort_direction}
                            >
                                Name
                            </TableHeading>
                            <TableHeading
                                name="status"
                                sortable
                                sortChanged={sortChanged}
                                sort_field={querParams.sort_field}
                                sort_direction={querParams.sort_direction}
                            >
                                Status
                            </TableHeading>
                            <TableHeading
                                name="created_at"
                                sortable
                                sortChanged={sortChanged}
                                sort_field={querParams.sort_field}
                                sort_direction={querParams.sort_direction}
                            >
                                Created date
                            </TableHeading>
                            <TableHeading
                                name="due_date"
                                sortable
                                sortChanged={sortChanged}
                                sort_field={querParams.sort_field}
                                sort_direction={querParams.sort_direction}
                            >
                                Due date
                            </TableHeading>
                            <th className="py-3 px-6 text-center">
                                Created by
                            </th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr className="bg-gray-800 text-gray-200 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left"></th>
                            <th className="py-3 px-6 text-left"></th>
                            {!hideProjectColums && (
                                <th className="py-3 px-6 text-left"></th>
                            )}
                            <th className="py-3 px-6 text-center">
                                <TextInput
                                    className="w-full"
                                    defaultValue={querParams.name}
                                    placeholder="task name"
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                            </th>
                            <th className="py-3 px-6 text-center">
                                <SelectInput
                                    defaultValue={querParams.status}
                                    className="w-full"
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select option</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progres">
                                        In Progress
                                    </option>
                                    <option value="completed">
                                        Compeleted
                                    </option>
                                </SelectInput>
                            </th>
                            <th className="py-3 px-6 text-center"></th>
                            <th className="py-3 px-6 text-center"></th>
                            <th className="py-3 px-6 text-center"></th>
                            <th className="py-3 px-6 text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-400 text-sm font-light">
                        {Tasks.data.map((task, key) => (
                            <tr
                                key={key}
                                className="border-b border-gray-700 hover:bg-gray-800"
                            >
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    {task.id}
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <img
                                        src={task.image_path}
                                        alt={task.name}
                                        className="rounded-full h-10 w-10 object-cover"
                                    />
                                </td>
                                {!hideProjectColums && (
                                    <td className="py-3 px-6 text-center">
                                    {task.project.name}
                                    </td>
                                )}
                                <td className="py-3 px-6 text-center">
                                    {task.name}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <span
                                        className={
                                            "px-2 py-1 rounded text-white " +
                                            TASK_STATUS_CLASS_MAP[task.status]
                                        }
                                    >
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {task.created_at}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {task.due_date}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {task.createdBy.name}
                                </td>
                                <td className="py-3 px-6 text-center flex space-x-4">
                                    <Link
                                        href={route("task.edit", task.id)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Link>
                                    <Link
                                        href={route("task.destroy", task.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination links={Tasks.meta.links} />
            </div>
        </>
    );
};

export default TaskTable;
