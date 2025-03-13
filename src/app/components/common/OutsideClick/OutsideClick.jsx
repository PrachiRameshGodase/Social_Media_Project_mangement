// useOutsideClick.js
import { useState, useEffect, useRef } from 'react';

export const OutsideClick = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const ref = useRef(null);
    const buttonRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            ref.current &&
            !ref.current.contains(event.target) &&
            (!buttonRef.current || !buttonRef.current.contains(event.target))
        ) {
            setIsOpen(false);
        }
    };

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return { isOpen, ref, buttonRef, handleToggle };
};

