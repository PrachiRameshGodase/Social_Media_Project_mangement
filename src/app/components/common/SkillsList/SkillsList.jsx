"use client";
import { useState, useEffect } from "react";

const SkillsList = ({ skills }) => {
    const [maxVisible, setMaxVisible] = useState(4);
    const [showMore, setShowMore] = useState(false);

    // Ensure skills is always an array of individual skill strings
    const formattedSkills = Array.isArray(skills)
        ? skills.flatMap(skill => skill.split(",").map(s => s.trim()))
        : [];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setMaxVisible(2);
            } else if (window.innerWidth < 800) {
                setMaxVisible(3);
            } else {
                setMaxVisible(4);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex flex-wrap items-center gap-2 w-full">
            <span className="flex flex-wrap gap-2 w-full items-center">
                {(showMore ? formattedSkills : formattedSkills.slice(0, maxVisible)).map((skill, index) => (
                    <span key={index} className="bg-[#F0F0FF] py-1 px-3 rounded-full">
                        {skill}
                    </span>
                ))}
                {!showMore && formattedSkills.length > maxVisible && (
                    <button
                        onClick={() => setShowMore(true)}
                        className="bg-gray-200 px-3 py-1 w-[110px] rounded-full text-sm text-blue-600 hover:bg-gray-300"
                    >
                        + More Skills
                    </button>
                )}
            </span>
        </div>
    );
};

export default SkillsList;
