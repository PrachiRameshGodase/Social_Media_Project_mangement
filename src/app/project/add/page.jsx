"use client"
import { Dropdown001 } from '@/app/components/common/Dropdown/Dropdown01';
import { Dropdown002 } from '@/app/components/common/Dropdown/Dropdown02';
import CustomDatePicker from '@/app/components/common/DatePicker/CustomDatePicker';
import { projectPriority, projectStage } from '@/app/components/common/Helper/Helper';
import LayOut from '@/app/components/LayOut';
import React, { useEffect, useState } from 'react'
import FileUpload from '@/app/components/common/Attachments/FileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '@/app/store/userSlice';
import { useRouter } from 'next/navigation';
import { Dropdown03 } from '@/app/components/common/Dropdown/Dropdown03';
import { addProject, fetchProjectDetails } from '@/app/store/projectSlice';

const AddProject = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const usersList = useSelector((state) => state.user?.list?.data);
    const projectDetailData = useSelector((state) => state?.project?.projectDetails?.data);


    const [itemId, setItemId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setItemId(params.get("id"));
            setIsEditMode(params.get("edit") === "true"); // Convert string to boolean
        }
    }, []);

    const [formData, setFormData] = useState({
        project_name: "",
        client_name: "",
        start_date: "",
        due_date: "",
        priority: "",
        project_leader: null,
        project_stage: "",
        team: "",
        attachments: [],
        description: "",

    });

    const [selectedPriority, setSelectedPriority] = useState(false)
    const [selectedLeader, setSelectedLeader] = useState(false)
    const [selectedStage, setSelectedStage] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState(false)
    const [searchTrigger, setSearchTrigger] = useState(0);

    useEffect(() => {
        const sendData = { is_employee: 1 };
        dispatch(fetchUsers(sendData));
    }, [searchTrigger, dispatch,]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDropdownChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };
    useEffect(() => {
        if (itemId) {
            dispatch(fetchProjectDetails(itemId));
        }
    }, [dispatch, itemId]);
    useEffect(() => {
        if (itemId && projectDetailData) {
           
            setFormData({
                id: projectDetailData?.id,
                project_name: projectDetailData?.project_name,
                client_name: projectDetailData?.client_name,
                start_date: projectDetailData?.start_date,
                due_date: projectDetailData?.due_date,
                priority: projectDetailData?.priority,
                project_leader: projectDetailData?.project_leader?.id,
                project_stage: projectDetailData?.project_stage,
                team: (projectDetailData?.team_leaders.map((item) => item?.id)),
                // attachments:formattedAttachments,
                description: projectDetailData?.description
            })
        }
    }, [itemId, projectDetailData])

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            team: JSON.stringify(formData?.team), // Convert array of IDs to JSON string
        };
        dispatch(addProject({ projectData: updatedFormData, router }));
    };
    console.log("formData", formData?.team)

    return (
        <LayOut>
            <div className="sm:flex mx-auto sm:mx-0  flex-col items-center justify-center ">
                <div className="text-2xl tracking-tight   sm:ml-[7px] text-[32px] w-full">Add New Project</div>

                <div className="sm:flex justify-center items-center h-screen mx-auto">
                    <form className="w-full sm:w-[650px] mb-4 h-[656px] bg-white p-8 rounded-lg space-y-6">
                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Project Name</label>
                            <input className="w-[310px] sm:w-[350px] md:w-[400px]   h-10 border border-[#0000004D] rounded-lg p-2 text-m sm:ml-7 placeholder:text-gray-600" type='text' placeholder='Enter Project Name ' value={formData?.project_name} onChange={handleChange} name='project_name' />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px] ">Client Name</label>
                            <input className="w-[310px] sm:w-[350px] md:w-[400px]  h-10 border border-[#0000004D] rounded-lg p-2 text-m sm:ml-7 placeholder:text-gray-600" type='text' placeholder='Enter Client Name ' value={formData?.client_name} onChange={handleChange} name='client_name' />
                        </div>
                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Starting date</label>
                            {/* <input className="w-[310px] sm:w-[350px] md:w-[400px] h-10 border border-[#0000004D] rounded-lg p-2 text-m ml-7 placeholder:text-gray-700" type='Date' placeholder='Enter Starting date' /> */}
                            <CustomDatePicker
                                selectedDate={formData?.start_date}
                                onChange={(date) => handleDropdownChange("start_date", date)} />
                        </div>

                        <div className='sm:flex justify-between '>
                            <label className="block text-[20px]">Due date</label>
                            {/* <input className="w-[310px] sm:w-[350px] md:w-[400px] h-10 border border-[#0000004D] rounded-lg p-2 text-m ml-14 placeholder:text-gray-700" type='Date' placeholder='Enter Due date' /> */}
                            <CustomDatePicker
                                selectedDate={formData?.due_date}
                                onChange={(date) => handleDropdownChange("due_date", date)} />

                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px] mr-16">Priority</label>
                            <Dropdown001
                                options={projectPriority}
                                selectedValue={formData?.priority}
                                onSelect={(value) => handleDropdownChange("priority", value)}

                                label="Select Priority"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px] mr-4">Project Leader</label>
                            <Dropdown03
                                options={usersList}
                                selectedValue={formData?.project_leader}
                                onSelect={(value) => handleDropdownChange("project_leader", value)}
                                label="Select Project Leader"
                                type="project"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px] mr-6">Project Stage</label>
                            <Dropdown001
                                options={projectStage}
                                selectedValue={formData?.project_stage}
                                onSelect={(value) => handleDropdownChange("project_stage", value)}
                                label="Select Stage"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-m mr-20">Team</label>
                            <Dropdown002
                                options={usersList}
                                selectedValue={formData.team}
                                onSelect={(value) => handleDropdownChange("team", value)}
                                label="Select Team"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-black text-[20px] font-medium">Attachments</label>
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
                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Description</label>
                            <textarea className="w-[310px] sm:w-[350px] md:w-[400px] h-40 border border-[#0000004D] rounded-lg p-2 text-m sm:ml-[35px] placeholder:text-gray-600" type='text' placeholder='Enter Description....' value={formData?.description} onChange={handleChange} name='description' />
                        </div>

                        <div className=" sm:flex justify-end">
                            <button className="w-[310px] sm:w-[350px] md:w-[400px] h-10 border border-[#0000004D] rounded-lg p-2 text-m sm:ml-[55px] bg-black text-gray-100 " onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </LayOut>
    );
}

export default AddProject
