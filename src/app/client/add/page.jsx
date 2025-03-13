"use client"

import LayOut from '@/app/components/common/NavBar/LayOut';
import { addUser, fetchUserDetails } from '@/app/store/userSlice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AddClient = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [itemId, setItemId] = useState(null);
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
        name: "",
        email: "",
        contact_name: "",
        password: "",
       
        is_client: 1,
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
        const sendData = {
            ...formData,

        }
        dispatch(addUser({ userData: sendData, router, section: "client" }));
    };


    useEffect(() => {
        if (userDetailData && itemId) {
            setFormData({
                id: userDetailData?.id,
                email: userDetailData?.email,
                contact_name: userDetailData?.contact_name,
                password: userDetailData?.c_password,
                name:userDetailData?.name
            });
        }
    }, [userDetailData, itemId]);


    return (
        <LayOut> <div className="sm:flex mx-auto sm:mx-0  flex-col items-center justify-center">
            <div className="text-2xl tracking-tight sm:ml-[7px] text-[32px]  w-full">Add New Client</div>

            <div className="sm:flex   justify-between items-center h-screen mx-auto">
                <form className="sm:w-[690px] h-[656px] bg-white p-3 sm:p-8 rounded-lg space-y-8">
                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-m ">Client Name*</label>
                        <input name='name' className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-7 placeholder:text-gray-400" type='text' placeholder='Enter Client Name' value={formData.name}
                            onChange={handleChange} />
                    </div>

                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-m">Email Address*</label>
                        <input className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-7 placeholder:text-gray-400" type='text' placeholder='Enter Email Address' value={formData.email} name='email'
                            onChange={handleChange} />
                    </div>
                    {/* <div className="sm:flex justify-between items-center">
                        <label className="block text-m">Client ID <span className='text-red-600'>*</span></label>
                        <input
                            className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m placeholder:text-gray-400"
                            type="text"
                            name="employee_id"
                            placeholder="Enter Client ID"
                            value={formData.employee_id}
                            onChange={handleChange}
                        />
                    </div> */}

                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-m">Contact Person Name</label>
                        <input className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-3 placeholder:text-gray-400" type='text' placeholder='Enter Name' value={formData.contact_name} name='contact_name'
                            onChange={handleChange} />
                    </div>

                    {/* <div className="sm:flex  justify-between items-center">
                        <label className="block text-m">Username</label>
                        <input className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-[60px] placeholder:text-gray-400" type='text' placeholder='Enter Username' />
                    </div> */}

                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-m ">Password</label>
                        <input className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-1 placeholder:text-gray-400" type='text' placeholder='Enter Password' value={formData.password} name='password'
                            onChange={handleChange} />
                    </div>
                    {/* <div className="sm:flex  justify-between items-center">
                        <label className="block text-m ">Confirm Password</label>
                        <input className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-1 placeholder:text-gray-400" type='text' placeholder='Enter Confirm Password' />
                    </div> */}




                    <div className='sm:flex w-full justify-end'>
                        <button className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m   bg-black text-gray-100 " onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div></LayOut>

    );
}

export default AddClient;
