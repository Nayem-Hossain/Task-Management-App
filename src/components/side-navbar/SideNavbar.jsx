import React from 'react';
import { BsListTask } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const SideNavbar = () => {
    return (
        <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-72">
            <div className="flex flex-col justify-between h-full">
                <div className="flex-grow">
                    <div className="px-4 py-6 text-center border-b">
                        <h1 className="text-xl font-bold leading-none">
                            <span className="text-cyan-600">Task Manager</span> App
                        </h1>
                    </div>
                    <div className="p-4">
                        <ul className="space-y-1">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center bg-cyan-200 rounded-xl font-bold text-sm text-yellow-900 py-3 px-4"
                                >
                                    <BsListTask className="me-4" />
                                    Task List
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4"
                                >
                                    <GiCheckMark className="me-4" />
                                    Completed
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SideNavbar;