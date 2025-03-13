"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OtherIcons } from "../components/common/Icons/icons";
import UserAvatar from "../components/common/UserAvatar/UserAvatar";
import LogOut from "../components/common/LogOut/LogOut";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../store/dashboardSlice";

const cardData = [
    { id: 1, title: "Accounting", description: "Manage your finances effectively.", status: "In Progress", task: [1, 2, 3, 4] },
    { id: 2, title: "Finance", description: "Track your income and expenses.", status: "In Progress", task: [1, 0, 1, 1] },
    { id: 3, title: "Invoicing", description: "Create invoices with ease.", status: "In Progress", task: [0, 1, 1, 2] },
    { id: 4, title: "Marketing Webapp", description: "Stay tax compliant effortlessly.", status: "In Progress", task: [1, 1, 1, 1] },
    { id: 5, title: "Accounting", description: "Manage your finances effectively.", status: "In Progress", task: [1, 1, 8, 1] },
    { id: 6, title: "Finance", description: "Track your income and expenses.", status: "In Progress", task: [1, 1, 1, 1] },
    { id: 7, title: "Invoicing", description: "Create invoices with ease.", status: "Under Review", task: [1, 1, 1, 1] },
    { id: 8, title: "Tax Management", description: "Stay tax compliant effortlessly.", status: "Under Review", task: [3, 1, 4, 1] },
];

const HomePage = () => {
    const router = useRouter();
    const dispatch=useDispatch()
    const dashboardList = useSelector((state) => state.dashboard?.list?.data);
    const dashboardLoading = useSelector((state) => state.dashboard);
    const [isOpen2, setIsOpen2] = useState(false);
    const user = {
        name: "Shubham Yadhav",
        isActive: true,
        email: 'a@gmai.com',
        image: "",
    };
console.log("dashboardList", dashboardList?.projects.recent_projects)

    useEffect(() => {

        dispatch(fetchDashboard());

    }, [dispatch]);
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-10 relative ">
            {/* Avatar Section (Top-Right) */}
            <LogOut isOpen2={isOpen2} user={user} setIsOpen2={setIsOpen2} />

            <div className="absolute top-4 right-5 sm:right-14 flex items-center space-x-2">
                <UserAvatar onClick={() => setIsOpen2(true)} name={user.name} dotcolor="green" size={36} image={user.image} isActive={user.isActive} />

                <span className="cursor-pointer" onClick={() => router.push(`/`)}>
                    {OtherIcons.back_svg}
                </span>
            </div>

            <div className="flex flex-col w-full mt-[10px]  ">
                <h1 className="text-3xl  font-semibold text-gray-800 sm:text-center ">All Projects</h1>

                {/* Projects Grid */}
                <div className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto mt-[30px]">
                    {dashboardList?.projects?.recent_projects?.map((card) => {
                        const [toDo, inProgress, underReview, completed] = card.task || [0, 0, 0, 0];
                        // const taskSum = card.task.reduce((acc, num) => acc + num, 0); // 🔹 Har card ka apna total task sum

                        return (
                            <div
                                key={card.id}
                                className="w-full h-full bg-white shadow-sm hover:shadow-md rounded-[17.5px] p-4 text-center flex flex-col justify-between hover:cursor-pointer"
                                onClick={()=>router.push(`/project/details?id=${card?.id}`)}
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <p className="capitalize text-[18px] text-[#2A2A2A] text-left">{card?.project_name ||""}</p>

                                        <span
                                            className={`border rounded-[4px] ${card.status === "In Progress"
                                                ? "text-[#CA9700] border-[#CA9700]"
                                                : card.status === "Under Review"
                                                    ? "text-[#0D4FA7] border-[#0D4FA7]"
                                                    : ""
                                                } h-[24px] w-fit px-2 py-1 flex items-center text-[12px]`}
                                        >
                                            {card?.status ||""}
                                        </span>
                                    </div>

                                    {/* Date Section */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                                            {OtherIcons.dateTime_svg}
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-800 text-[14px]">1 Jan, 2025</p>
                                            <p className="text-[#320b5775] text-[12px]">Deadline Date</p>
                                        </div>
                                    </div>

                                    {/* Team Members */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                                            {OtherIcons.clients_svg}
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <p className="text-gray-800 text-[14px]">
                                                Prachi Godase, Anurag, Punit, Sumit, Aryan
                                            </p>
                                            <p className="text-[#320b5775] text-[12px]">Team</p>
                                        </div>
                                    </div>

                                    {/* Task Counts Table */}
                                    <div className="border border-gray-200 -mb-2 rounded-b-lg p-1 bg-[#EDF2FE99] mt-1 w-[106%] -ml-[9px]">
                                        <div className=" flex items-center gap-2 mb-2 justify-between">
                                            <div className="flex items-center flex-row gap-1">
                                                <div className="border bg-white border-gray-400 p-1 rounded-full">
                                                    {OtherIcons.task_svg}
                                                </div>
                                                <p className="font-normal text-[14px] leading-[17.28px]">
                                                    Tasks {/* 🔹 Har Card ka apna total sum */}
                                                </p>
                                            </div>
                                        </div>

                                        <div className=" h-[48px] border rounded-sm p-1 border-gray-200 bg-white">
                                            <table className="  w-full">
                                                <thead>
                                                    <tr className="text-left ">
                                                        <td className="font-300 text-gray-400 text-[12px]">To Do</td>
                                                        <td className="font-300 text-gray-400 text-[12px]">In Progress</td>
                                                        <td className="font-300 text-gray-400 text-[12px]">Under Review</td>
                                                        <td className="font-300 text-gray-400 text-[12px]">Completed</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="">
                                                        <td className="font-300 text-gray-700 text-[14px] text-center">
                                                            {toDo}
                                                        </td>
                                                        <td className="font-300 text-gray-700 text-[14px] text-center">
                                                            {inProgress}
                                                        </td>
                                                        <td className="font-300 text-gray-700 text-[14px] text-center">
                                                            {underReview}
                                                        </td>
                                                        <td className="font-300 text-gray-700 text-[14px] text-center">
                                                            {completed}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
