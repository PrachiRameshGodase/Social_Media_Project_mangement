"use client"
import { fetchProjects } from '@/app/store/projectSlice';
import { OtherIcons } from '@/app/components/common/Icons/icons';
import LayOut from '@/app/components/common/NavBar/LayOut';
import Dropdown01 from '@/app/components/common/Dropdown/Dropdown01';
import { view } from '@/app/components/common/Helper/Helper';
import { useDebounceSearch } from '@/app/components/common/Helper/HelperFunction';
import Pagenation from '@/app/components/common/Pagenation/Pagenation';
import SearchComponent from '@/app/components/common/SearchComponent/SearchComponent';
import SortBy from '@/app/components/common/Sort/SortBy';
import TableSkeleton from '@/app/components/common/TableSkeleton/TableSkeleton';
import TruncatedTooltipText from '@/app/components/common/TruncatedTooltipText/TruncatedTooltipText';
import { Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProjectList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const projectListData = useSelector((state) => state.project?.list?.data);
  const projectLoading = useSelector((state) => state.project);
  const totalCount = useSelector((state) => state?.project?.list?.total || 0);
  const [selectedView, setSelectedView] = useState('List');

  const [selectedDesignation, setSelectedDesignation] = useState('');
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

  // filter
  const [selectedStatus, setSelectedStatus] = useState('View');
  // filter

  useEffect(() => {
    const sendData = {
     
      limit: itemsPerPage,
      page: currentPage,
      ...(searchTermFromChild ? { search: searchTermFromChild } : {}),
      ...(selectedSortBy && { sort_by: selectedSortBy, sort_order: sortOrder }),
      ...(selectedDesignation && { designation: selectedDesignation }),

      // ...(selectedStatus !== null && selectedStatus !== undefined
      //   ? { status: selectedStatus }
      //   : {}),
    };

    dispatch(fetchProjects(sendData));
  }, [searchTrigger, dispatch, selectedStatus, selectedDesignation]);


  // filter short-list
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <LayOut> <div>
      {/* Top Section with Filters and Buttons */}
      <div className="w-full h-[44px] flex justify-between items-center px-4  ">

        {/* Left Section (Heading + Count) */}
        <div className="flex">
          <p className="text-[20px] sm:text-[30px] leading-[32px] tracking-[-1.5px]">All Projects list</p>
          <p className="font-bold p-2 rounded-full text-[10.16px] leading-[12.19px] text-[#400F6F] mt-3 ml-2 bg-[#f0e7fa] flex items-center justify-center w-[50px] h-[10px]">
            {totalCount} total
          </p>
          <p
            className={`${projectLoading?.loading && "rotate_01"} mt-[6px] hover:cursor-pointer`}
            data-tooltip-content="Reload"
            data-tooltip-place="bottom"
            data-tooltip-id="my-tooltip"
            onClick={() => setSearchTrigger(prev => prev + 1)}>
            {OtherIcons?.refresh_svg}
          </p>
        </div>

        {/* Right Section (Filters & Search) */}
        <div className="hidden md:flex gap-6 items-center">
          <Dropdown01 options={view} selectedValue={selectedView} onSelect={setSelectedView} label="View" icon={OtherIcons.view_svg} />
          {/* <Dropdown01 options={statusProject} selectedValue={selectedStatus} onSelect={setSelectedStatus} label="Status" icon={OtherIcons.user_svg} />  */}
          {/* <Dropdown01 options={projectSortConstant} selectedValue={selectedSort} onSelect={setSelectedSort} label="Sort By" icon={OtherIcons.sort_by_svg} /> */}
          <SearchComponent onSearch={onSearch} section={searchTrigger} />


          <div className="w-[1px] h-[40px] bg-gray-400 opacity-40" />
          <Tooltip title='Add Project' arrow disableInteractive>
            <button className="w-[49px] h-[44px] bg-[#048339]  text-white rounded-lg flex items-center justify-center text-2xl" onClick={() => router.push('/project/add')}>+</button>
          </Tooltip>
        </div>

        {/* Mobile Filter Button */}
        <div className='flex gap-2 md:hidden'>

          <SearchComponent onSearch={onSearch} section={searchTrigger} />
          <Tooltip title='Filter' arrow disableInteractive>
            <button
              className="md:hidden w-[44px] h-[44px]  border border-gray-300 hover:ring-2 hover:ring-purple-200  hover:border-purple-500 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center text-2xl"
              onClick={() => setIsFilterOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M4 11L4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 13L19 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 3L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.5 3L11.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 3L4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.5 19L11.5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 9.5C2 9.03406 2 8.80109 2.07612 8.61732C2.17761 8.37229 2.37229 8.17761 2.61732 8.07612C2.80109 8 3.03406 8 3.5 8H4.5C4.96594 8 5.19891 8 5.38268 8.07612C5.62771 8.17761 5.82239 8.37229 5.92388 8.61732C6 8.80109 6 9.03406 6 9.5C6 9.96594 6 10.1989 5.92388 10.3827C5.82239 10.6277 5.62771 10.8224 5.38268 10.9239C5.19891 11 4.96594 11 4.5 11H3.5C3.03406 11 2.80109 11 2.61732 10.9239C2.37229 10.8224 2.17761 10.6277 2.07612 10.3827C2 10.1989 2 9.96594 2 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 11.5C17 11.0341 17 10.8011 17.0761 10.6173C17.1776 10.3723 17.3723 10.1776 17.6173 10.0761C17.8011 10 18.0341 10 18.5 10H19.5C19.9659 10 20.1989 10 20.3827 10.0761C20.6277 10.1776 20.8224 10.3723 20.9239 10.6173C21 10.8011 21 11.0341 21 11.5C21 11.9659 21 12.1989 20.9239 12.3827C20.8224 12.6277 20.6277 12.8224 20.3827 12.9239C20.1989 13 19.9659 13 19.5 13H18.5C18.0341 13 17.8011 13 17.6173 12.9239C17.3723 12.8224 17.1776 12.6277 17.0761 12.3827C17 12.1989 17 11.9659 17 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.5 14.5C9.5 14.0341 9.5 13.8011 9.57612 13.6173C9.67761 13.3723 9.87229 13.1776 10.1173 13.0761C10.3011 13 10.5341 13 11 13H12C12.4659 13 12.6989 13 12.8827 13.0761C13.1277 13.1776 13.3224 13.3723 13.4239 13.6173C13.5 13.8011 13.5 14.0341 13.5 14.5C13.5 14.9659 13.5 15.1989 13.4239 15.3827C13.3224 15.6277 13.1277 15.8224 12.8827 15.9239C12.6989 16 12.4659 16 12 16H11C10.5341 16 10.3011 16 10.1173 15.9239C9.87229 15.8224 9.67761 15.6277 9.57612 15.3827C9.5 15.1989 9.5 14.9659 9.5 14.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Tooltip>
        </div>

        {/* Mobile Filter Panel */}
        <div
          className={`fixed z-50 mt-20 top-0 right-0 w-[250px] h-full bg-white shadow-lg transform 
          ${isFilterOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out md:hidden`}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-2xl"
            onClick={() => setIsFilterOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
              <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Filter Options */}
          <div className="mt-16 flex flex-col gap-4 px-4">
            <Tooltip title='Add Project' arrow disableInteractive>
              <button className="w-[49px] h-[44px] bg-[#048339] text-white rounded-lg flex items-center justify-center text-2xl" onClick={() => router.push('/project/add')}>+</button>
            </Tooltip>
            <Dropdown01 options={view} selectedValue={selectedView} onSelect={setSelectedView} label="View" icon={OtherIcons.view_svg} />
            {/* <Dropdown01 options={statusProject} selectedValue={selectedStatus} onSelect={setSelectedStatus} label="Status" icon={OtherIcons.user_svg} />
            <Dropdown01 options={projectSortConstant} selectedValue={selectedSort} onSelect={setSelectedSort} label="Sort By" icon={OtherIcons.sort_by_svg} /> */}
            {/* <SearchComponent /> */}
          </div>
        </div>
      </div>


      {/* Table Section */}
      {selectedView == "List" && (
        <>
          <div className="max-w-full overflow-x-auto mt-6 ">
            {projectLoading?.loading ? (
              <TableSkeleton rows={7} columns={5} />
            ) : (
              <table className="w-full border-spacing-y-1 min-w-[1000px] border-2 border-transparent  ">
                <thead>
                  <tr className="text-left m-1 text-sm uppercase text-black opacity-80 shadow-tr-border rounded-md  ">
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[14px] min-w-[100px]   flex">
                      <div className='flex items-center justify-between'>
                        <span>PROJECT NAME</span><SortBy setSearchTrigger={setSearchTrigger} selectedSortBy={selectedSortBy} setSelectedSortBy={setSelectedSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} sortOptions="project_name" resetPageIfNeeded={resetPageIfNeeded} /> </div></th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[14px] min-w-[100px]">CLIENT  NAME</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[14px] w-[118px] sm:w-[160px]">STATUS</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[14px] min-w-[100px] ">STARTING DATE</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[14px] min-w-[100px]">DEADLINE</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[14px] min-w-[100px]">PROJECT LEADER</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[14px] min-w-[100px] ">TEAM</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4  text-[12px] sm:text-[14px] min-w-[100px] ">PRIORITY</th>
                  </tr>
                </thead>
                <tbody>
                  {projectListData?.map((item, index) => (
                    <tr key={item?.id} className="cursor-pointer hover:bg-gray-100   hover:shadow-tr-border   rounded-md  transition-all duration-200">
                      <td className="py-2 sm:py-3 px-2 sm:px-4   text-[13px]  sm:text-[17px]  rounded " onClick={() => router.push(`/project/details?id=${item?.id}`)}>{item?.project_name || ""}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4   text-[13px]  sm:text-[17px] rounded " onClick={() => router.push(`/project/details?id=${item?.id}`)}>{item?.client_name || ""}</td>
                      <td className={`py-2 sm:py-3 px-2 sm:px-4   text-[13px]  sm:text-[17px]   rounded  font-bold`} onClick={() => router.push(`/project/details?id=${item?.id}`)}>
                        <span
                          className={`px-3 py-1 border rounded-md ${item.status === 'To Do'
                            ? 'text-[#6C757D] border-[#6C757D]'
                            : item.status === 'In progress' ?
                              'text-[#CA9700] border-[#CA9700]' : item.status === 'Completed' ? 'text-[#008053] border-[#008053]' : 'text-[#0D4FA7] border-[#0D4FA7]'
                            } inline-block`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4   text-[13px]  sm:text-[17px]  " onClick={() => router.push(`/project/details?id=${item?.id}`)}>{item?.start_date}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4   text-[13px]  sm:text-[17px]  " onClick={() => router.push(`/project/details?id=${item?.id}`)}>{item?.due_date}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4   text-[13px]  sm:text-[17px]   " onClick={() => router.push(`/project/details?id=${item?.id}`)}>{item?.project_leader_name}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4   text-[13px]  sm:text-[17px]   " onClick={() => router.push(`/project/details?id=${item?.id}`)}>
                        <TruncatedTooltipText text={item?.team_leaders?.map((item)=>item?.first_name + " " + item?.last_name).join(",")} maxLength={25} />
                      </td>
                      <td className={`py-2 sm:py-3 px-2 sm:px-4   text-[13px]  sm:text-[17px] font-bold`} onClick={() => router.push(`/project/details?id=${item?.id}`)}>
                        <span
                          className={`py-1 sm:py-1 px-2 sm:px-4   text-[13px]  sm:text-[17px] border rounded-md  ${item?.priority === 'High'
                            ? 'text-[#4976F4] border-[#4976F4]' : item?.priority === 'Low' ?
                              'text-red-400 border-red-400' : 'text-[#954BAF] border-[#954BAF]'
                            } inline-block`}
                        >
                          {item?.priority?.charAt(0).toUpperCase() + item?.priority?.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {/* Pagination */}
          <Pagenation
            itemList={totalCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setSearchCall={setSearchTrigger} />
        </>
      )}


      {/* Card Section */}
      {selectedView == "Card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto mt-[50px]">
          {projectListData?.map((item, index) => (
            <div key={item?.id} className="w-full min-w-[305px] h-[240px] hover:border-gray-200 hover:shadow-lg  border border-gray-100 rounded-xl p-4 shadow-md hover:cursor-pointer" onClick={() => router.push(`/project/details?id=${item?.id}`)}>
              <div className="flex justify-between items-center mb-4">
                <p className="font-700 text-[21.33px] leading-[28.8px] ">{item?.project_name || ""}</p>
                {/* <p className="font-[400] text-[12px] leading-[16.8px] text-green-600 w-[70px] h-[20px]  rounded flex items-center justify-center">
                Completed
              </p> */}
                <p className={`font-[400] text-[12px] leading-[16.8px] border rounded flex items-center justify-center ${item.status === 'To Do'
                  ? 'text-[#6C757D] border-[#6C757D]  w-[50px] h-[20px]'
                  : item?.status === 'In progress' ?
                    'text-[#CA9700] border-[#CA9700]  w-[90px] h-[20px]' : item?.status === 'Completed' ? 'text-[#008053] border-[#008053]  w-[90px] h-[20px]' : 'text-[#0D4FA7] border-[#0D4FA7]  w-[90px] h-[20px]'
                  }`}>
                  {item?.status}
                </p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <ul className="flex gap-1 flex-col w-[150px]">
                  <li className=" text-[12.8px] leading-[17.28px] text-gray-400">Team</li>
                  <li className=" text-[12.8px] leading-[17.28px] text-gray-800 ">{JSON.parse(item?.team)?.join(", ")}</li>
                </ul>
                <ul className="flex gap-1 flex-col">
                  <li className=" text-[12.8px] text-gray-400">Due Date</li>
                  <li className=" text-[12.8px]  text-gray-800">{item?.due_date || ""}</li>

                </ul>

              </div>
              <div className="flex items-center gap-2 mb-2 justify-between">
                <p className='flex items-center flex-row gap-1'> {OtherIcons.projects_svg}
                  <span className=" font-normal text-[12.8px] leading-[17.28px]">Tasks (20)</span></p>

                <ul className="flex gap-1 flex-col mr-[20px]">

                  <li className=" text-[12.8px] text-gray-400">Priority</li>
                  <li className={`text-[12.8px]  text-gray-800 font-700 ${item.priority === 'high'
                    ? 'text-[#4976F4]' : item?.priority === 'low' ?
                      'text-red-400' : 'text-[#954BAF]'
                    }`}>{item?.priority?.charAt(0).toUpperCase() + item?.priority?.slice(1)}</li>
                </ul>
              </div>
              <div className="w-[270px] h-[39px]">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <td className='font-300 text-gray-400 text-[12px]'>To Do</td>
                      <td className='font-300 text-gray-400 text-[12px]'>In Progress</td>
                      <td className='font-300 text-gray-400 text-[12px]'>Under Review</td>
                      <td className='font-300 text-gray-400 text-[12px]'>Completed</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='font-300 text-gray-700 text-[12px] text-center'>08</td>
                      <td className='font-300 text-gray-700 text-[12px] text-center'>08</td>
                      <td className='font-300 text-gray-700 text-[12px] text-center'>08</td>
                      <td className='font-300 text-gray-700 text-[12px] text-center'>08</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>)}

    </div></LayOut>

  );
};

export default ProjectList
// 