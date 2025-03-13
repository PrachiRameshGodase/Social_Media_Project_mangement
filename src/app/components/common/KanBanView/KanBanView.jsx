import React, { useState } from "react";

const DraggableCard = ({ user, index, status, moveUser, moveCard }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("userId", String(user.id)); // Ensure it's a string
    e.dataTransfer.setData("fromStatus", status);
    e.dataTransfer.setData("fromIndex", String(index));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="w-[300px] h-[240px] mt-4 bg-white p-4 gap-4 shadow-md rounded cursor-pointer"
    >
      <p
        className={`px-3 py-1 border rounded-md text-[15px] inline-block ${user.priority === "High"
          ? "text-[#4976F4] border-[#4976F4]"
          : user.priority === "Low"
            ? "text-red-400 border-red-400"
            : "text-[#954BAF] border-[#954BAF]"
          }`}
      >
        {user.priority}
      </p>
      <p className="text-[18px] mt-2">{user.userId}</p>
      <ul>
        <li className="flex">
          <p className="text-[15px] text-gray-400 w-[120px] mt-2">Due Date</p>
          <span className="text-[15px] mt-2">{user.dueDate}</span>
        </li>
        <li className="flex">
          <p className="text-[15px] text-gray-400 w-[280px] mt-2">Team</p>
          <span className="text-[15px] mt-2">{user.team}</span>
        </li>
        <li className="flex">
          <p className="text-[15px] text-gray-400 w-[120px] mt-2">Type</p>
          <span className="text-[15px] mt-2">{user.type}</span>
        </li>
      </ul>
    </div>
  );
};

const DroppableColumn = ({ status, users, moveUser, moveCard }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const userId = Number(e.dataTransfer.getData("userId"));
    const fromStatus = e.dataTransfer.getData("fromStatus");
    const fromIndex = Number(e.dataTransfer.getData("fromIndex"));

    if (fromStatus !== status) {
      moveUser(userId, fromStatus, status);
    } else {
      // Allow reordering within the same column
      const toIndex = users.length; // Move to the end of the list
      moveCard(userId, fromStatus, fromIndex, toIndex);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-[310px] h-full border border-gray-100 rounded bg-gray-100 mb-4 min-h-[1000px] flex flex-col"
    >
      <div className="w-full h-[40px] bg-[#F0E7FA] flex items-center px-4">
        <p
          className={`w-[13px] h-[13px] rounded-full ${status === "To Do"
            ? "bg-[#6C757D]"
            : status === "In progress"
              ? "bg-[#CA9700]"
              : status === "Under Review"
                ? "bg-[#0D4FA7]"
                : "bg-[#048339]"
            }`}
        ></p>
        <p className="text-[15px] ml-2">{status}</p>
        <p className="text-[14px] ml-4">{users.length}</p>
      </div>

      <div className="w-full h-full bg-gray-50 p-2  flex flex-col">
        {users.length > 0 ? (
          users.map((user, index) => (
            <DraggableCard
              key={user.id}
              user={user}
              index={index}
              status={status}
              moveUser={moveUser}
              moveCard={moveCard}
            />
          ))
        ) : (
          <div className="w-full flex items-center justify-center text-gray-400 text-sm">
            Drag here
          </div>
        )}
      </div>
    </div>
  );
};


const KanBanView = ({ groupedUsers }) => {
  const [columns, setColumns] = useState(groupedUsers);

  const moveUser = (userId, fromStatus, toStatus) => {
    if (fromStatus === toStatus) return;

    let userToMove;
    const updatedColumns = columns.map((group) => {
      if (group.status === fromStatus) {
        userToMove = group.users.find((user) => user.id === userId);
        return {
          ...group,
          users: group.users.filter((user) => user.id !== userId),
        };
      }
      return group;
    });

    if (!userToMove) return;

    const finalColumns = updatedColumns.map((group) => {
      if (group.status === toStatus) {
        return {
          ...group,
          users: [...group.users, { ...userToMove, status: toStatus }],
        };
      }
      return group;
    });

    setColumns(finalColumns);
  };

  const moveCard = (id, fromStatus, fromIndex, toIndex) => {
    const updatedColumns = columns.map((group) => {
      if (group.status === fromStatus) {
        const updatedUsers = [...group.users];
        const [movedUser] = updatedUsers.splice(fromIndex, 1);
        updatedUsers.splice(toIndex, 0, movedUser);

        return { ...group, users: updatedUsers };
      }
      return group;
    });

    setColumns(updatedColumns);
  };

  return (
    <div className="w-full mx-auto max-w-full overflow-x-auto mt-[50px]">
      <div className="flex w-full min-w-[1000px] gap-4">
        {columns.map((group) => (
          <DroppableColumn
            key={group.status}
            status={group.status}
            users={group.users}
            moveUser={moveUser}
            moveCard={moveCard}
          />
        ))}
      </div>
    </div>
  );
};

export default KanBanView;
