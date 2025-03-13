"use client";
import {
  fetchProjectDetails,
  fetchProjectTaskDetails,
  fetchProjectTasks,
  updateProjectStatus,
  updateStatus,
} from "@/app/store/projectSlice";
import { OtherIcons } from "@/app/components/common/Icons/icons";
import Drawer01, { Drawer001 } from "@/app/components/common/Drawer/Drawer01";
import Dropdown01 from "@/app/components/common/Dropdown/Dropdown01";
import DropdownStatus01 from "@/app/components/common/Dropdown/DropdownStatus01";
import {
  getStatusDetails,
  projectSortConstant,
  status,
  statusProject,
  taskView,
  view,
} from "@/app/components/common/Helper/Helper";
import KanBanView from "@/app/components/common/KanBanView/KanBanView";
import Loader from "@/app/components/common/Loader/Loader";
import SearchComponent from "@/app/components/common/SearchComponent/SearchComponent";
import TruncatedTooltipText from "@/app/components/common/TruncatedTooltipText/TruncatedTooltipText";
import UserAvatar from "@/app/components/common/UserAvatar/UserAvatar";
import LayOut from "@/app/components/common/NavBar/LayOut";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Pagenation from "@/app/components/common/Pagenation/Pagenation";
import { useDebounceSearch } from "@/app/components/common/Helper/HelperFunction";
import { Tooltip } from "@mui/material";
import { Check, X } from "lucide-react";

const TaskList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [itemId, setItemId] = useState(null);

  const projectLoading = useSelector((state) => state.project);
  const projectDetailData = useSelector(
    (state) => state?.project?.projectDetails?.data
  );
  const projectTaskListData = useSelector((state) => state.project?.list?.data);
  const projectTaskLoading = useSelector((state) => state.project);
  const totalCount = useSelector((state) => state?.project?.list?.total);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setItemId(params.get("id"));
    }
  }, []);

  useEffect(() => {
    if (itemId) {
      dispatch(fetchProjectDetails(itemId));
    }
  }, [dispatch, itemId]);

  const user = {
    name: projectDetailData?.project_name || "",

    isActive: true,
    image: "",
  };

  const [selectedStatus, setSelectedStatus] = useState("");
  const handleStatusChange = async (value) => {
    const result = await Swal.fire({
      text: `Do you want to update the status of this Project?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && itemId) {
      setSelectedStatus(value);

      // Dispatch updateUserStatus with the new status
      dispatch(updateProjectStatus({ id: itemId, status: value, router }));
    }
  };

  const [selectedView, setSelectedView] = useState("List");
  const [selectedSort, setSelectedSort] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerOpen1, setIsDrawerOpen1] = useState(false);

  const [isActive, setIsActive] = useState(
    projectDetailData?.project_status || ""
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTrigger, setSearchTrigger] = useState(0);

  // reset current page to 1 when any filters are applied
  const resetPageIfNeeded = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

  //Search/////////////////////////////////////////////////////////////
  const [searchTermFromChild, setSearchTermFromChild] = useState("");
  // Debounced function to trigger search
  const debouncedSearch = useDebounceSearch(() => {
    setSearchTrigger((prev) => prev + 1);
  }, 800);

  // Handle search term change from child component
  const onSearch = (term) => {
    setSearchTermFromChild(term);
    if (term.length > 0 || term === "") {
      debouncedSearch();
    }
  };

  // sortBy
  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  //sortby

  // // filter
  // const [selectedStatus, setSelectedStatus] = useState('View');
  // // filter

  useEffect(() => {
    if (!itemId) return; // Ensure itemId is set before dispatching

    const sendData = {
      project_id: itemId,
      limit: itemsPerPage,
      page: currentPage,
      ...(searchTermFromChild ? { search: searchTermFromChild } : {}),
      ...(selectedSortBy && { sort_by: selectedSortBy, sort_order: sortOrder }),
    };

    dispatch(fetchProjectTasks(sendData));
  }, [searchTrigger, dispatch, selectedStatus, itemId]); // Include all dependencies

  useEffect(() => {
    if (projectDetailData?.project_status !== undefined) {
      setIsActive(projectDetailData?.project_status);
    }
  }, [projectDetailData]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const statusDetails = getStatusDetails(projectDetailData?.status);
  const handleToggleStatus = async (event) => {
    const newStatus = !isActive ? 1 : 0; // Toggle logic: Active (0) → Inactive (1), Inactive (1) → Active (0)

    const result = await Swal.fire({
      text: `Do you want to ${
        newStatus === 1 ? "Active" : "Inactive"
      } this Project?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && itemId) {
      setIsActive(!isActive); // Update local state immediately

      // Dispatch updateUserStatus with the new status
      dispatch(updateStatus({ id: itemId, project_status: newStatus, router }));
    }
  };
  const [itemId2, setItemId2] = useState(null);
  const handleTaskClick = (id) => {
    setItemId2(id);
    setIsDrawerOpen1(true);
  };

  const taskDetailsData = useSelector(
    (state) => state.project?.projectTaskDetails?.data
  );
  useEffect(() => {
    if (itemId2) {
      dispatch(fetchProjectTaskDetails(itemId2));
    }
  }, [dispatch, itemId2]);
  return (
    <>
      {projectLoading?.loading ? (
        <Loader />
      ) : (
        <LayOut>
          <div className="w-full  h-full mx-auto px-1  sm:px-4  ml-[5px] sm:border sm:border-gray-200 sm:shadow-md">
            <div className=" min-[1250px]:flex   justify-between mt-[10px] sm:p-4 w-full">
              {/* Avatar Section */}
              <div className="  sm:w-[360px] h-[69px] flex items-center gap-[12.21px] ">
                <UserAvatar
                  name={user.name}
                  dotcolor="blue"
                  size={66}
                  image={user.image}
                  isActive={user.isActive}
                />

                <div className="text-xl text-gray-700">
                  <p className="font-bold text-[14px] sm:text-[18px]">
                    {projectDetailData?.project_name || ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    {projectDetailData?.client_name || ""}
                  </p>
                </div>
                {/* <p className={`font-[400] text-[12px] leading-[16.8px] border rounded flex items-center justify-center ${projectDetailData?.status === 'To Do'
                ? 'text-[#6C757D] border-[#6C757D]  w-[50px] h-[20px]'
                : projectDetailData?.status === 'In Progress' ?
                  'text-[#CA9700] border-[#CA9700]  w-[90px] h-[20px]' : projectDetailData?.status === 'Completed' ? 'text-[#008053] border-[#008053]  w-[90px] h-[20px]' : 'text-[#0D4FA7] border-[#0D4FA7]  w-[90px] h-[20px]'
                }`}>
                {projectDetailData?.status}
              </p> */}
                <DropdownStatus01
                  options={statusProject}
                  selectedValue={projectDetailData?.status}
                  onSelect={(value) => handleStatusChange(value)}
                  label="Status"
                  className="w-[150px]"
                />
              </div>
              <div className="flex max-[850px]:flex-col justify-between gap-5 md:gap-10 lg:gap-4 max-[1250px]:mt-4">
                <div className="w-[260px] h-[69px] border border-gray-150 rounded p-2">
                  <p className="text-[#000000] text-400">Project Completion</p>
                  <div className="flex">
                    <div
                      className="relative mt-2"
                      style={{ width: "177.73px", height: "10px" }}>
                      {/* Background Bar */}
                      <div className="w-full h-full bg-[#EBF0FF] rounded-full"></div>
                      {/* Progress Bar */}
                      <div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                          width: `${statusDetails.percentage}%`,
                          backgroundColor: statusDetails.color,
                        }}></div>
                    </div>
                    <span className="block mt-1 text-sm ml-4">
                      {statusDetails.percentage}%
                    </span>
                  </div>
                </div>

                <div className="sm:flex items-center gap-2">
                  <div className="flex items-center mr-2">
                    <label className="flex items-center cursor-pointer">
                      <span className="ml-2 text-[15px] mr-2">
                        {!isActive ? "Inactive" : "Active"}
                      </span>

                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isActive}
                          onChange={handleToggleStatus}
                        />
                        {/* Track */}
                        <div
                          className={`w-[70px] h-[40px] rounded-full shadow- transition duration-300 ease-in-out bg-[#ECE4FF]`}></div>
                        <div
                          className={`absolute w-[33px] h-[33px] rounded-full shadow-md top-[4px] left-[4px] transition-transform duration-300 ease-in-out ${
                            isActive
                              ? "translate-x-7 bg-[#048339]"
                              : "bg-[#E23703]"
                          }`}>
                          {isActive && (
                            <span className="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                              <Check size={16} />
                            </span>
                          )}
                          {!isActive && (
                            <span className="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                              <X size={16} />
                            </span>
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                  <button
                    className="w-[140px] mt-3 sm:mt-0 h-[35px] text-[10px] rounded-[4px] py-[4px] border border-gray-400 text-black text-lg mr-[10px] mb-2 hover:bg-black hover:text-white"
                    onClick={() => setIsDrawerOpen(true)}>
                    See All Details
                  </button>
                  <button
                    onClick={() => router.push(`/project/add?id=${itemId}`)}
                    className="w-[80px] h-[35px] rounded-[4px] py-[4px] bg-black text-white text-lg mr-[10px] mb-2">
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full h-[44px] mt-6  flex justify-between items-center px-2 sm:px-4  ">
              {/* Left Section (Heading + Count) */}
              <div className="flex">
                <p className="text-[20px] sm:text-[30px] leading-[32px] tracking-[-1.5px]">
                  All Tasks list
                </p>
                <p className="font-bold p-2 rounded-full text-[10.16px] leading-[12.19px] text-[#400F6F] mt-3 ml-2 bg-[#f0e7fa] flex items-center justify-center w-[50px] h-[10px]">
                  {totalCount} total
                </p>
                <p
                  className={`${
                    projectTaskLoading?.loading && "rotate_01"
                  } mt-[6px] hover:cursor-pointer`}
                  data-tooltip-content="Reload"
                  data-tooltip-place="bottom"
                  data-tooltip-id="my-tooltip"
                  onClick={() => setSearchTrigger((prev) => prev + 1)}>
                  {OtherIcons?.refresh_svg}
                </p>
              </div>

              {/* Right Section (Filters & Search) */}
              <div className="hidden min-[950px]:flex gap-6 items-center">
                <Dropdown01
                  options={taskView}
                  selectedValue={selectedView}
                  onSelect={setSelectedView}
                  label="View"
                  icon={OtherIcons.view_svg}
                />
                <Dropdown01
                  options={statusProject}
                  selectedValue={selectedStatus}
                  onSelect={setSelectedStatus}
                  label="Status"
                  icon={OtherIcons.user_svg}
                />
                {/* <Dropdown01 options={projectSortConstant} selectedValue={selectedSort} onSelect={setSelectedSort} label="Sort By" icon={OtherIcons.sort_by_svg} /> */}
                <SearchComponent onSearch={onSearch} section={searchTrigger} />

                <div className="w-[1px] h-[40px] bg-gray-400 opacity-40" />
                <Tooltip title="Add Task" arrow disableInteractive>
                  <button
                    className="w-[49px] h-[44px] bg-[#048339] text-white rounded-lg flex items-center justify-center text-2xl"
                    onClick={() =>
                      router.push(`/project/add-task?id=${itemId}`)
                    }>
                    +
                  </button>
                </Tooltip>
              </div>

              {/* Mobile Filter Button */}
              <div className="flex  gap-2  min-[950px]:hidden ">
                <SearchComponent onSearch={onSearch} section={searchTrigger} />
                <Tooltip title="Filter" arrow disableInteractive>
                  <button
                    className="min-[950px]:hidden w-[44px] h-[44px]  border border-gray-300 hover:ring-2 hover:ring-purple-200  hover:border-purple-500 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center text-2xl"
                    onClick={() => setIsFilterOpen(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      color="#000000"
                      fill="none">
                      <path
                        d="M4 11L4 21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 13L19 21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 3L19 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.5 3L11.5 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 3L4 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.5 19L11.5 21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 9.5C2 9.03406 2 8.80109 2.07612 8.61732C2.17761 8.37229 2.37229 8.17761 2.61732 8.07612C2.80109 8 3.03406 8 3.5 8H4.5C4.96594 8 5.19891 8 5.38268 8.07612C5.62771 8.17761 5.82239 8.37229 5.92388 8.61732C6 8.80109 6 9.03406 6 9.5C6 9.96594 6 10.1989 5.92388 10.3827C5.82239 10.6277 5.62771 10.8224 5.38268 10.9239C5.19891 11 4.96594 11 4.5 11H3.5C3.03406 11 2.80109 11 2.61732 10.9239C2.37229 10.8224 2.17761 10.6277 2.07612 10.3827C2 10.1989 2 9.96594 2 9.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 11.5C17 11.0341 17 10.8011 17.0761 10.6173C17.1776 10.3723 17.3723 10.1776 17.6173 10.0761C17.8011 10 18.0341 10 18.5 10H19.5C19.9659 10 20.1989 10 20.3827 10.0761C20.6277 10.1776 20.8224 10.3723 20.9239 10.6173C21 10.8011 21 11.0341 21 11.5C21 11.9659 21 12.1989 20.9239 12.3827C20.8224 12.6277 20.6277 12.8224 20.3827 12.9239C20.1989 13 19.9659 13 19.5 13H18.5C18.0341 13 17.8011 13 17.6173 12.9239C17.3723 12.8224 17.1776 12.6277 17.0761 12.3827C17 12.1989 17 11.9659 17 11.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.5 14.5C9.5 14.0341 9.5 13.8011 9.57612 13.6173C9.67761 13.3723 9.87229 13.1776 10.1173 13.0761C10.3011 13 10.5341 13 11 13H12C12.4659 13 12.6989 13 12.8827 13.0761C13.1277 13.1776 13.3224 13.3723 13.4239 13.6173C13.5 13.8011 13.5 14.0341 13.5 14.5C13.5 14.9659 13.5 15.1989 13.4239 15.3827C13.3224 15.6277 13.1277 15.8224 12.8827 15.9239C12.6989 16 12.4659 16 12 16H11C10.5341 16 10.3011 16 10.1173 15.9239C9.87229 15.8224 9.67761 15.6277 9.57612 15.3827C9.5 15.1989 9.5 14.9659 9.5 14.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </Tooltip>
              </div>

              {/* Mobile Filter Panel */}
              <div
                className={`fixed mt-20 top-0 right-0 w-[250px] h-full bg-white shadow-lg transform 
          ${
            isFilterOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}>
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-2xl"
                  onClick={() => setIsFilterOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#000000"
                    fill="none">
                    <path
                      d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Filter Options */}
                <div className="mt-16 flex flex-col gap-4 px-4">
                  <Dropdown01
                    options={taskView}
                    selectedValue={selectedView}
                    onSelect={setSelectedView}
                    label="View"
                    icon={OtherIcons.view_svg}
                  />
                  <Dropdown01
                    options={statusProject}
                    selectedValue={selectedStatus}
                    onSelect={setSelectedStatus}
                    label="Status"
                    icon={OtherIcons.user_svg}
                  />
                  {/* <Dropdown01 options={projectSortConstant} selectedValue={selectedSort} onSelect={setSelectedSort} label="Sort By" icon={OtherIcons.sort_by_svg} /> */}
                  {/* <SearchComponent /> */}
                </div>
              </div>
            </div>

            {/* w */}
            {/* Table Section */}
            {selectedView == "List" && (
              <>
                <div className="max-w-full  overflow-x-auto mt-6 ">
                  <table className="w-full border-spacing-y-1 min-w-[1000px] border-2 border-transparent  ">
                    <thead className=" ">
                      <tr className="text-left m-1 text-sm uppercase text-gray-800 shadow-tr-border rounded-md  ">
                        <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[15px]   flex ">
                          TASK TITLE
                          <span className="mt-1 pl-10 flex flex-col gap-1">
                            {OtherIcons.arrow_up_svg}
                            {OtherIcons.arrow_down_svg}
                          </span>
                        </th>
                        <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[14px] ">
                          STATUS
                        </th>
                        <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[14px]  ">
                          DUE DATE
                        </th>
                        <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[14px]  ">
                          TASK TYPE
                        </th>

                        <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[14px] ">
                          TEAM
                        </th>
                        <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[14px] ">
                          PRIORITY
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectTaskListData?.map((item, index) => (
                        <tr
                          key={item?.id}
                          className="cursor-pointer  hover:bg-gray-100   hover:shadow-tr-border   rounded-md  transition-all duration-200">
                          <td
                            className="py-2 sm:py-3 px-2 sm:px-4   text-[13px]  sm:text-[17px]   rounded "
                            onClick={() => handleTaskClick(item?.id)}>
                            {item?.task_title || ""}
                          </td>
                          <td
                            className={`py-2 sm:py-3 px-2 sm:px-4   text-[13px]  sm:text-[17px]  min-w-[150px] rounded  font-bold`}
                            onClick={() => handleTaskClick(item?.id)}>
                            <span
                              className={`py-1 px-2 sm:px-2   text-[13px]  sm:text-[17px]  border rounded-md ${
                                item?.status === "To Do"
                                  ? "text-[#6C757D] border-[#6C757D]"
                                  : item?.status === "In progress"
                                  ? "text-[#CA9700] border-[#CA9700]"
                                  : item?.status === "Completed"
                                  ? "text-[#008053] border-[#008053]"
                                  : "text-[#0D4FA7] border-[#0D4FA7]"
                              } inline-block`}>
                              {item?.status || ""}
                            </span>
                          </td>
                          <td
                            className="py-2 sm:py-3 px-2 sm:px-4   text-[13px]  sm:text-[17px]   "
                            onClick={() => handleTaskClick(item?.id)}>
                            {item?.due_date || ""}
                          </td>
                          <td
                            className="py-2 sm:py-3 px-2 sm:px-4   text-[13px]  sm:text-[17px]   "
                            onClick={() => handleTaskClick(item?.id)}>
                            {item?.task_type || ""}
                          </td>
                          <td
                            className="py-2 sm:py-3 px-2 sm:px-4   text-[13px]  sm:text-[17px]  "
                            onClick={() => handleTaskClick(item?.id)}>
                            <TruncatedTooltipText
                              text={item?.team_names?.join(", ")}
                              maxLength={25}
                            />
                          </td>
                          <td
                            className={` text-[12px] sm:text-[15px]   font-bold`}
                            onClick={() => handleTaskClick(item?.id)}>
                            <span
                              className={`py-1 px-2 sm:px-4   text-[13px]  sm:text-[17px]  border rounded-md  ${
                                user.priority === "High"
                                  ? "text-[#4976F4] border-[#4976F4]"
                                  : user.priority === "Low"
                                  ? "text-red-400 border-red-400"
                                  : "text-[#954BAF] border-[#954BAF]"
                              } inline-block`}>
                              {item?.priority}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <Pagenation
                  itemList={totalCount}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  setSearchCall={setSearchTrigger}
                />
              </>
            )}

            {selectedView == "Kanban" && (
              <KanBanView groupedUsers={projectTaskListData} />
            )}
          </div>
          <Drawer01
            isOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            details={projectDetailData}
            itemId={itemId}
            setSelectedStatus={setSelectedStatus}
          />
          <Drawer001
            isOpen={isDrawerOpen1}
            setIsDrawerOpen={setIsDrawerOpen1}
            itemId={itemId2}
            details={taskDetailsData}
          />
        </LayOut>
      )}
    </>
  );
};

export default TaskList;
