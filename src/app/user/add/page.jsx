"use client"
import { addUser, fetchUserDetails } from '@/app/store/userSlice';
import CustomDatePicker from '@/app/components/common/DatePicker/CustomDatePicker';
import { Dropdown001 } from '@/app/components/common/Dropdown/Dropdown01';
import { Dropdown02 } from '@/app/components/common/Dropdown/Dropdown02';
import { departmentOptions, designation, projectPriority, Skills, status } from '@/app/components/common/Helper/Helper';
import LayOut from '@/app/components/LayOut';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff } from "lucide-react";

const AddUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [itemId, setItemId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setItemId(params.get("id"));
      setIsEditMode(params.get("edit") === "true"); // Convert string to boolean
    }
  }, []);
  const userDetailData = useSelector(state => state?.user?.userDetails?.data);


  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    // employee_id: "",
    email: "",
    password: "",
    phone_number: "",
    department: "",
    designation: "",
    joining_date: "",
    skill_set: [],
    status: 1,
    is_employee: 1,
  });



  useEffect(() => {
    if (itemId) {
      dispatch(fetchUserDetails(itemId));
    }
  }, [dispatch, itemId]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
const sendData={
  ...formData,
  name:formData?.first_name + formData?.last_name
}
    dispatch(addUser({ userData:sendData, router }));
  };


  useEffect(() => {
    if (userDetailData && itemId) {
      setFormData({
        id: userDetailData?.id,
        first_name: userDetailData?.first_name,
        last_name: userDetailData?.last_name,
        password: userDetailData?.c_password,
        // employee_id: userDetailData?.employee_id,
        email: userDetailData?.email,
        phone_number: userDetailData?.phone_number,
        department: userDetailData?.department || "",  // Ensure default value
        designation: userDetailData?.designation || "",
        joining_date: userDetailData?.joining_date || "", // Ensure default value
        skill_set: userDetailData?.skill_set || [],
        status: userDetailData?.status,
      });
    }
  }, [userDetailData, itemId]);

  console.log("formData", formData)
  return (
    <LayOut>
      <div className="sm:flex mx-auto sm:mx-0  flex-col items-center justify-center">
        <div className="text-2xl tracking-tight sm:ml-[7px] text-[32px]  w-full">Add New User</div>

        <div className="sm:flex justify-between items-center h-screen mx-auto b">
          <form className="sm:w-[650px] h-[100%] bg-white p-2 sm:p-8 rounded-lg space-y-6" onSubmit={handleSubmit}>

            <div className="sm:flex justify-between items-center">
              <label className="block text-[20px]">First Name <span className='text-red-600'>*</span></label>
              <input
                className="w-[310px] sm:w-[350px] md:w-[400px]  h-10 border border-[#0000004D] rounded-lg p-2 text-m placeholder:text-gray-600"
                type="text"
                name="first_name"
                placeholder="Enter First Name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>

            <div className="sm:flex justify-between items-center">
              <label className="block text-[20px]">Last Name</label>
              <input
                className="w-[310px] sm:w-[350px] md:w-[400px]  h-10 border border-[#0000004D] rounded-lg p-2 text-m placeholder:text-gray-600"
                type="text"
                name="last_name"
                placeholder="Enter Last Name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>

            {/* <div className="sm:flex justify-between items-center">
              <label className="block text-m">User ID <span className='text-red-600'>*</span></label>
              <input
                className="w-[310px] sm:w-[350px] md:w-[400px]  h-10 border border-[#0000004D] rounded-lg p-2 text-m placeholder:text-gray-600"
                type="text"
                name="employee_id"
                placeholder="Enter User ID"
                value={formData.employee_id}
                onChange={handleChange}
              />
            </div> */}

            <div className="sm:flex justify-between items-center">
              <label className="block text-[20px]">Email <span className='text-red-600'>*</span></label>
              <input
                className="w-[310px] sm:w-[350px] md:w-[400px]  h-10 border border-[#0000004D] rounded-lg p-2 text-m placeholder:text-gray-600"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="sm:flex justify-between items-center relative">
              <label className="block text-[20px]">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  className="w-[310px] sm:w-[350px]  md:w-[400px] h-10 border border-[#0000004D] rounded-lg p-2 pr-10 text-m placeholder:text-gray-600"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData?.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="sm:flex justify-between items-center">
              <label className="block text-[20px]">Phone Number</label>
              <input
                className="w-[310px] sm:w-[350px] md:w-[400px]  h-10 border border-[#0000004D] rounded-lg p-2 text-m placeholder:text-gray-600"
                type="text"
                name="phone_number"
                placeholder="Enter Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>

            <div className="sm:flex justify-between items-center">
              <label className="block text-[20px]">Department</label>
              <Dropdown001
                options={departmentOptions}
                selectedValue={formData.department}
                onSelect={(value) => handleDropdownChange("department", value)}
                label="Select Department"
              />
            </div>

            <div className="sm:flex justify-between items-center">
              <label className="block text-[20px]">Designation</label>
              <Dropdown001
                options={designation}
                selectedValue={formData.designation}
                onSelect={(value) => handleDropdownChange("designation", value)}
                label="Select Designation"
              />
            </div>

            <div className="sm:flex justify-between items-center">
              <label className="block text-[20px]">Joining Date</label>
              <CustomDatePicker
                selectedDate={formData.joining_date}
                onChange={(date) => handleDropdownChange("joining_date", date)}
              />
            </div>

            <div className="sm:flex justify-between items-center">
              <label className="block text-[20px]">Skill Set</label>
              <Dropdown02
                options={Skills}
                selectedValues={Array.isArray(formData.skill_set) ? formData.skill_set : []}
                onSelect={(value) => handleDropdownChange("skill_set", value)}
                label="Select Skill"
              />
            </div>

            <div className='sm:flex w-full justify-end'>
              <button
                type="submit"
                className="w-[310px] sm:w-[350px]  md:w-[400px]  h-10 border border-[#0000004D] rounded-lg p-2 text-m bg-black text-gray-100"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayOut>
  );
};

export default AddUser;
