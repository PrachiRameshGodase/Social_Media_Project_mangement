"use client";
import React, { useState, useRef, useEffect } from "react";
import { Paperclip, Send, Trash2, Heart, Mic, PauseCircle, PlayCircle, MessageSquare } from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { format } from "date-fns";
import UserAvatar from "../UserAvatar/UserAvatar";

const users = ["John", "Alice", "David", "Emma", "Aryan", "Prachi"]; // Dummy Users


const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const fileInputRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const chatStartRef = useRef(null);
    const [mentionList, setMentionList] = useState([]);
    const [newMessageCount, setNewMessageCount] = useState(0);
    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToTop = () => {
        requestAnimationFrame(() => {
            chatStartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    };



    // Handle Input Change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setMessage(e.target.value);
        setMessage(value);

        // Detect @mention
        if (value.includes("@")) {
            const searchText = value.split("@").pop().trim().toLowerCase();
            setMentionList(
                searchText
                    ? users.filter((user) => user.toLowerCase().startsWith(searchText))
                    : users
            );
        } else {
            setMentionList([]);
        }
    };
    const handleMentionClick = () => {
        setMessage((prev) => prev + "@"); 
        inputRef.current?.focus(); 

        const searchText = ""; 
        setMentionList(users); 
    };



    // Select Mention
    const handleSelectMention = (user) => {
        setMessage(message.replace(/@\S*$/, `@${user} `));
        setMentionList([]);
    };

    // File Select
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile({ name: file.name, url: URL.createObjectURL(file), type: file.type.startsWith("image/") ? "image" : "document" });
        }
    };

    // Start Recording
    const startRecording = async () => {
        setRecording(true);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(chunks, { type: "audio/mp3" });
            setAudioBlob(audioBlob);
            setAudioURL(URL.createObjectURL(audioBlob));
        };

        mediaRecorder.start();
    };

    // Stop Recording
    const stopRecording = () => {
        setRecording(false);
        mediaRecorderRef.current.stop();
    };

    // Send Message
    const handleSend = () => {
        if (message.trim() === "" && !selectedFile && !audioBlob) return;

        const newMsg = {
            id: messages.length + 1,
            user: "You",
            text: message,
            file: selectedFile,
            audio: audioBlob ? { url: audioURL, blob: audioBlob } : null,
            time: format(new Date(), "h:mm a"), // 🕒 Format time like WhatsApp
            liked: false,
            deleted: false,
        };

        // setMessages([...messages, newMsg]);
        setMessages([newMsg, ...messages]);
        setMessage("");
        setSelectedFile(null);
        setAudioURL(null);
        setAudioBlob(null);
        setMentionList([]);
        setNewMessageCount((prev) => prev + 1);
        setTimeout(() => {
            scrollToTop();
        }, 100);
    };

    // Delete Message
    const handleDelete = (id) => {
        setMessages(
            messages.map((msg) => (msg.id === id ? { ...msg, text: "🗑️ Deleted by You", file: null, audio: null, deleted: true } : msg))
        );
    };

    // Like Message
    const handleLike = (id) => {
        setMessages(messages.map((msg) => (msg.id === id ? { ...msg, liked: !msg.liked } : msg)));
    };

    // 🔹 Highlight mentions in text
    const formatMessage = (text) => {
        return text.split(" ").map((word, index) =>
            word.startsWith("@") ? (
                <span key={index} className="text-blue-600 font-bold">{word}{" "}</span>
            ) : (
                word + " "
            )
        );
    };

    // new sms
    useEffect(() => {
        const handleScroll = () => {
            if (chatContainerRef.current) {
                const { scrollTop } = chatContainerRef.current;
                if (scrollTop === 0) {
                    setNewMessageCount(0); // Reset new message count when scrolled to top
                }
            }
        };

        chatContainerRef.current?.addEventListener("scroll", handleScroll);
        return () => chatContainerRef.current?.removeEventListener("scroll", handleScroll);
    }, []);


    const user = {
        name: "S",

        isActive: false,
        image: "",
    };

    return (
        <div className=" ">
            {/* Floating Chat Icon */}
            {/* <button
                className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
                onClick={() => setIsChatOpen(!isChatOpen)}
            >
                <MessageSquare size={24} />
            </button> */}

            {/* Chat Box */}
            {/* {isChatOpen && ( */}
            <div className="w-full p-2  border rounded-lg shadow-lg bg-white  bottom-16 ">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold">Comment</h2>
                    {/* <button className="text-gray-500 hover:text-black" onClick={() => setIsChatOpen(false)}>
                        ✖
                    </button> */}
                </div>



                {/* Input Field with File & Audio Preview */}
                <div className="flex justify-between items-center  ">
                    <div className="relative border w-full rounded-lg p-1 mb-2 ">
                        <div className="flex items-center ">
                            {/* Attach File */}
                            <UserAvatar name={user.name} dotcolor='' size={24} image={user.image} isActive={user.isActive} />
                            <input type="file" ref={fileInputRef} className="hidden " onChange={handleFileSelect} />
                            {/* Text Input */}
                            <input
                                ref={inputRef}
                                type="text"
                                className="flex-1 outline-none pl-1"
                                placeholder="Type a message..."
                                value={message}
                                onChange={handleInputChange}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />
                            <button
                                onClick={handleMentionClick}
                                className="p-1 text-[26px] text-gray-500 hover:text-black cursor-pointer">
                                @
                            </button>

                            <button className={`p-1  text-gray-500 hover:text-black `} onClick={() => fileInputRef.current.click()}>
                                <Paperclip size={22} />
                            </button>
                            {/* Mic Button */}
                            {recording ? (
                                <button className="p-2 text-red-500" onClick={stopRecording}>
                                    <PauseCircle size={20} />
                                </button>
                            ) : (
                                <button className="p-1  text-gray-500 hover:text-black" onClick={startRecording}>
                                    <Mic size={24} />
                                </button>
                            )}



                            {/* Mention List Dropdown */}
                            {mentionList.length > 0 && (
                                <ul className="absolute -mt-56 max-h-[180px]  overflow-y-auto bg-white border rounded-md shadow-md w-full z-10">
                                    {mentionList.map((user, index) => (
                                        <li
                                            key={index}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleSelectMention(user)}
                                        >
                                            @{user}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {/* Send Button */}

                        {/* File & Audio Preview Inside Input Box */}
                        {selectedFile && (
                            <div className="mt-2 p-1 bg-gray-100 rounded-md flex items-center gap-2 relative">
                                {selectedFile.type === "image" ? (
                                    <PhotoProvider>
                                        <PhotoView src={selectedFile.url}>
                                            <img src={selectedFile.url} alt="Preview" className="w-fit h-14 rounded-md cursor-pointer" />
                                        </PhotoView>
                                    </PhotoProvider>
                                ) : (
                                    <span className="text-gray-700">{selectedFile.name}</span>
                                )}

                                {/* Delete Button */}
                                <button
                                    className="absolute top-0 right-0 p-1 text-gray-500 hover:text-red-500"
                                    onClick={() => setSelectedFile(null)}
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        )}


                        {audioURL && (
                            <div className="mt-2 p-2  bg-gray-100 rounded-md flex items-center gap-2 relative">
                                <audio controls>
                                    <source src={audioURL} type="audio/mp3" />
                                    Your browser does not support audio playback.
                                </audio>

                                {/* Delete Button */}
                                <button
                                    className="absolute top-0 right-0 p-1 text-gray-500 hover:text-red-500"
                                    onClick={() => setAudioURL(null)}
                                >
                                    <Trash2 />
                                </button>


                            </div>
                        )}

                    </div>
                    <button className=" text-gray-500 pl-2 hover:text-black" onClick={handleSend}>
                        <Send size={20} />
                    </button>
                </div>
                {/* Messages */}
                <div className="space-y-3 p-2  max-h-64 overflow-y-auto " >

                    <PhotoProvider>
                        <div ref={chatStartRef} />

                        {messages.map((msg) => (
                            <div key={msg.id} className="flex gap-1 items-start group  ">
                                <UserAvatar name={user.name} dotcolor='' size={20} image={user.image} isActive={user.isActive} />
                                <div className="bg-gray-100 p-2 rounded-lg w-fit max-w-[90%] relative">

                                    <span className="text-xs text-gray-500">{msg.time}</span>

                                    {/* Image Preview */}
                                    {msg.file && msg.file.type === "image" && !msg.deleted && (
                                        <PhotoView src={msg.file.url}>
                                            <img src={msg.file.url} alt="Uploaded" className="w-40 mt-2 rounded-md cursor-pointer" />
                                        </PhotoView>
                                    )}
                                    {/* Audio Player */}
                                    {msg.audio && !msg.deleted && (
                                        <audio controls className="mt-2 border-2 rounded-md max-w-[99%] ">
                                            <source src={msg.audio.url} type="audio/mp3" />
                                        </audio>
                                    )}
                                    {/* Text Message */}
                                    {msg.text && <p className={`whitespace-pre-line  ${msg.deleted ? "italic text-[12px] text-gray-500" : ""}`}>{formatMessage(msg.text)}</p>}




                                    {/* Like & Delete */}
                                    <div className="absolute  -mt-2 top-2 right-1 hidden group-hover:flex gap-2">
                                        {/* {!msg.liked && (
                                                <button className="text-gray-500 hover:text-red-500" onClick={() => handleLike(msg.id)}>
                                                    <Heart size={12} />
                                                </button>
                                            )} */}
                                        {/* {msg.liked && <span className="text-red-500 text-[12px]">❤️</span>} */}
                                        <button className="text-gray-500 hover:text-red-500" onClick={() => handleDelete(msg.id)}>
                                            <Trash2 size={12} />
                                        </button>
                                    </div>


                                </div>

                            </div>
                        ))}
                    </PhotoProvider>

                </div>



            </div>
            {/* )} */}
        </div>
    );
};
export default ChatBox;
// 