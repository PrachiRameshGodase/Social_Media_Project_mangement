import React, { useEffect } from "react";

import { usePathname } from "next/navigation"; // Use for App Router
import toast, { Toaster } from "react-hot-toast";

const LogOut = ({ isOpen2, user, setIsOpen2 }) => {
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token && pathname !== "/login") {
            window.location.href = "/login"; // Redirect manually for App Router
        }
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        toast.success("Logout Successful!");
        window.location.href = "/login"; // Redirect manually for App Router
    };

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />

            {/* Sidebar Overlay */}
            {isOpen2 && (
                <div
                    className="fixed inset-0  bg-opacity-50 z-40"
                    onClick={() => setIsOpen2(false)}
                ></div>
            )}

            {/* Sidebar Content */}
            <div
                className={`fixed top-[75px] right-0 w-64 h-[80px] bg-white shadow-lg p-5 rounded-md transition-transform duration-300 z-50 ${isOpen2 ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* <button
                    className="absolute top-4 right-4 text-gray-500"
                    onClick={() => setIsOpen2(false)}
                >
                    ✖
                </button>

                <div className="flex gap-3 items-start mt-10">
                    <div className="top-4 right-[20px] flex items-center space-x-2">
                        <UserAvatar
                            name={user?.name}
                            dotcolor="#E19F1E"
                            size={50}
                            image={user?.image}
                            isActive={user?.isActive}
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">{user?.name || "Guest"}</h2>
                        <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
                    </div>
                </div> */}

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className=" flex items-center justify-center hover:gap-2 gap-1 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                        <path d="M11 3L10.3374 3.23384C7.75867 4.144 6.46928 4.59908 5.73464 5.63742C5 6.67576 5 8.0431 5 10.7778V13.2222C5 15.9569 5 17.3242 5.73464 18.3626C6.46928 19.4009 7.75867 19.856 10.3374 20.7662L11 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M21 12L11 12M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default LogOut;
