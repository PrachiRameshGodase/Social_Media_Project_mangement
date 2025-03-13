"use client"
import { addProjectTask, fetchProjectTaskDetails } from '@/app/store/projectSlice'
import { fetchUsers } from '@/app/store/userSlice'
import FileUpload from '@/app/components/common/Attachments/FileUpload'
import CustomDatePicker from '@/app/components/common/DatePicker/CustomDatePicker'
import { Dropdown001 } from '@/app/components/common/Dropdown/Dropdown01'
import { Dropdown002, Dropdown02 } from '@/app/components/common/Dropdown/Dropdown02'
import { departmentOptions, projectPriority, taskType, taskVisibility } from '@/app/components/common/Helper/Helper'
import LayOut from '@/app/components/LayOut'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AddTask = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const usersList = useSelector((state) => state.user?.list?.data);


    const [itemId, setItemId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const taskDetailsData = useSelector(
        (state) => state.project?.projectTaskDetails?.data
    );
    useEffect(() => {
        if (itemId) {
            dispatch(fetchProjectTaskDetails(itemId));
        }
    }, [dispatch, itemId]);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setItemId(params.get("id"));

        }
    }, []);
    const [searchTrigger, setSearchTrigger] = useState(0);

    useEffect(() => {
        const sendData = {};
        dispatch(fetchUsers(sendData));
    }, [searchTrigger, dispatch,]);
    const [formData, setFormData] = useState({
        project_id: "",
        task_title: "",
        task_type: "",
        due_date: "",
        priority: "",
        department: "",
        team: [],
        link: "",
        visibility: "",
        description: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleDropdownChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }))
    }

    useEffect(() => {
        if (itemId) {
            setFormData(prev => ({ ...prev, project_id: itemId }));
        }
    }, [itemId]);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProjectTask({ projectData: formData, router, itemId }));
    };



    useEffect(() => {
        if (taskDetailsData && itemId) {
            setFormData({
                id: taskDetailsData?.id,
                project_id: taskDetailsData?.project_id,
                task_title: taskDetailsData?.task_title,
                task_type: taskDetailsData?.task_type,
                due_date: taskDetailsData?.due_date,
                priority: taskDetailsData?.priority,
                department: taskDetailsData?.department,
                link: taskDetailsData?.link,
                visibility: taskDetailsData?.visibility,
                description: taskDetailsData?.description,
                // team: taskDetailsData?.team_leaders?.map((item) => item?.id)
            });
        }
    }, [taskDetailsData, itemId]);

    return (
        <LayOut>
            <div className="sm:flex mx-auto sm:mx-0  flex-col items-center justify-center">
                <div className="text-2xl tracking-tight ml-4 sm:ml-[7px] text-[32px]  w-full ">Add New Task</div>

                <div className="sm:flex justify-center items-center h-screen mx-auto">
                    <form className="w-full sm:w-[650px] mb-4 h-[656px] bg-white p-8 rounded-lg space-y-6">
                        <div className="sm:flex justify-between">
                            <label className="block text-[20px] ">Task Title  <span className="text-red-600">*</span></label>
                            <input className="w-[310px] sm:w-[350px] md:w-[400px] h-10 border border-[#0000004D] rounded-lg p-2 text-m sm:ml-7 placeholder:text-gray-600" type='text' placeholder='Enter Task Title' value={formData?.task_title} onChange={handleChange} name='task_title' />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Task Type</label>
                            <Dropdown001
                                options={taskType}
                                selectedValue={formData?.task_type}
                                onSelect={(value) => handleDropdownChange("task_type", value)}

                                label="Select Task Type"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Due date</label>
                            <CustomDatePicker
                                selectedDate={formData?.due_date}
                                onChange={(date) => handleDropdownChange("due_date", date)} />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Priority</label>
                            <Dropdown001
                                options={projectPriority}
                                selectedValue={formData?.priority}
                                onSelect={(value) => handleDropdownChange("priority", value)}
                                label="Select Priority"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Department</label>
                            <Dropdown001
                                options={departmentOptions}
                                selectedValue={formData?.department}
                                onSelect={(value) => handleDropdownChange("department", value)}
                                label="Select Department"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Team</label>
                            <Dropdown002
                                options={usersList}
                                selectedValue={formData?.team}
                                onSelect={(value) => handleDropdownChange("team", value)}
                                label="Select Team"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Link</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[78px] placeholder:text-gray-400" type='text' placeholder='Enter Link' value={formData?.link} name='link' onChange={handleChange} />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Visibility</label>
                            <Dropdown001
                                options={taskVisibility}
                                selectedValue={formData?.visibility}
                                onSelect={(value) => handleDropdownChange("visibility", value)}
                                label="Select Who Can See"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Attachments</label>
                            <FileUpload

                                onFilesChange={(files) => {
                                    const fileNames = files.map((file) => file.name);
                                    setFormData((prev) => ({
                                        ...prev,
                                        attachments: fileNames,
                                    }))
                                }

                                } initialFiles={formData.attachments} />

                        </div>
                        <div className="flex justify-between">
                            <label className="block text-m">Description..</label>
                            <textarea className="w-[350px] h-40 border border-gray-300 rounded-lg p-2 text-m ml-[35px] placeholder:text-gray-400" type='text' placeholder='Enter Description' value={formData?.description} name='description' onChange={handleChange} />
                        </div>

                        <div className="sm:flex justify-between ">
                            <button className="w-[310px] sm:w-[350px] md:w-[400px] h-10 border border-[#0000004D] rounded-lg p-2 text-m  bg-black text-gray-100 " onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </LayOut>
    )
}

export default AddTask
