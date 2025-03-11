"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

const StyledBadge = styled(Badge)(({ theme, dotcolor }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: dotcolor,
        color: dotcolor,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(1)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}));

const UserAvatar = ({ name, image, isActive, size = 68, dotcolor = "green", onClick }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={onClick}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant={isActive && dotcolor !== "none" ? "dot" : "standard"}
                dotcolor={dotcolor}
                className="border-2 border-[#A448EE] rounded-full p-[2px]"
            >
                <Avatar
                    alt={name}
                    src={image}
                    sx={{
                        width: size,
                        height: size,
                        bgcolor: "#E4E4E4",
                        fontSize: size / 2,
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: 'Supreme-Medium',
                    }}
                >
                    {name ? name.split(" ").map((n) => n[0]).join("") : "U"}
                </Avatar>
            </StyledBadge>
        </Box>
    );
};

export default UserAvatar;
