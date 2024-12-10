<template>
    

       
  <div class="right-nav w-52 text-white  mt-5 " >
 
  <ul>
    <li class="h-10 py-2 border-b-2 border-gray-500 " :class="{ 'bg-rightActiveColor': $route.name === 'Dashboard', 'hover:bg-rightHoverColor': $route.name !== 'Dashboard' }">
    <span class="ml-4">
        <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
    </span>
</li>
<li class="h-10 py-2 border-b-2 border-gray-500" :class="{ 'bg-rightActiveColor': $route.name === 'DepartmentList', 'hover:bg-rightHoverColor': $route.name !== 'DepartmentList' }">
    <span class="ml-4">
        <router-link :to="{ name: 'DepartmentList' }">Department</router-link>
    </span>
</li>
<li class="h-10 py-2 border-b-2 border-gray-500" :class="{ 'bg-rightActiveColor': $route.name === 'BranchtList', 'hover:bg-rightHoverColor': $route.name !== 'BranchtList' }">
    <span class="ml-4">
        <router-link :to="{ name: 'BranchtList' }">Branch</router-link>
    </span>
</li>
<li class="h-10 py-2 border-b-2 border-gray-500" :class="{ 'bg-rightActiveColor': $route.name === 'EmployeeList', 'hover:bg-rightHoverColor': $route.name !== 'EmployeeList' }">
    <span class="ml-4">
        <router-link :to="{ name: 'EmployeeList' }">Employee</router-link>
    </span>
</li>
<li class="h-10 py-2 border-b-2 border-gray-500" :class="{ 'bg-rightActiveColor': $route.name === 'AwardList' , 'hover:bg-rightHoverColor': $route.name !== 'AwardList'}">
    <span class="ml-4">
        <router-link :to="{ name: 'AwardList' }">Awards</router-link>
    </span>
</li>
<li class="h-10 py-2 border-b-2 border-gray-500" :class="{ 'bg-rightActiveColor': $route.name === 'ExpenseList', 'hover:bg-rightHoverColor': $route.name !== 'ExpenseList' }">
    <span class="ml-4">
        <router-link :to="{ name: 'ExpenseList' }">Expenses</router-link>
    </span>
</li>
<li class="h-10 py-2 border-b-2 border-gray-500" :class="{ 'bg-rightActiveColor': $route.name === 'HolydaysList', 'hover:bg-rightHoverColor': $route.name !== 'HolydaysList' }">
    <span class="ml-4">
        <router-link :to="{ name: 'HolydaysList' }">Holydays</router-link>
    </span>
</li>
<li class="h-10 py-2 border-b-2 border-gray-500" :class="{ 'bg-rightActiveColor': $route.name === 'PayrollList' , 'hover:bg-rightHoverColor': $route.name !== 'PayrollList'}">
    <span class="ml-4">
        <router-link :to="{ name: 'PayrollList' }">Payroll</router-link>
    </span>
</li>
<li class="h-10 py-2 border-b-2 border-gray-500" :class="{ 'bg-rightActiveColor': $route.name === 'NoticeboardList', 'hover:bg-rightHoverColor': $route.name !== 'NoticeboardList' }">
    <span class="ml-4">
        <router-link :to="{ name: 'NoticeboardList' }">Notice Board</router-link>
    </span>
</li>
<li class="h-10 py-2 border-b-2 border-gray-500" :class="{ 'bg-rightActiveColor': $route.name === 'AttendanceView', 'hover:bg-rightHoverColor': $route.name !== 'AttendanceView' }">
    <span class="ml-4">
        <router-link :to="{ name: 'AttendanceView' }">Attendance</router-link>
    </span>
</li>
<li class="h-10 py-2 border-b-2 border-gray-500" :class="{ 'bg-rightActiveColor': $route.name === 'AttendanceCreate', 'hover:bg-rightHoverColor': $route.name !== 'AttendanceCreate' }">
    <span class="ml-4">
        <router-link :to="{ name: 'AttendanceCreate' }">Attendance Mark</router-link>
    </span>
</li>

<li class="h-10 py-2 border-b-2 border-gray-500" :class="{ 'bg-rightActiveColor': $route.name === 'LeaveTypeList', 'hover:bg-rightHoverColor': $route.name !== 'LeaveTypeList' }">
    <span class="ml-4">
        <router-link :to="{ name: 'LeaveTypeList' }">Leave Types</router-link>
    </span>
</li>
<li class="h-10 py-2 border-b-2 border-gray-500" :class="{ 'bg-rightActiveColor': $route.name === 'LeaveApplication', 'hover:bg-rightHoverColor': $route.name !== 'LeaveApplication' }">
    <span class="ml-4">
        <router-link :to="{ name: 'LeaveApplication' }">Leave Application</router-link>
    </span>
</li>


<li class="h-10 py-2 border-b-2 border-gray-500" :class="{ 'bg-rightActiveColor': $route.name === 'Setting', 'hover:bg-rightHoverColor': $route.name !== 'Setting' }">
    <span class="ml-4">
        <router-link :to="{ name: 'Setting' }">Settings</router-link>
    </span>
</li>



  </ul>

 
  </div>
       
   
</template>

<style scoped>
.active-li {
    background-color: blue; /* Change background color to highlight */
}
.page-header {
    width: 100%;
    padding: 0 20px 0 20px;
    margin: 0;
    border: 0px;
    padding: 0px;
    box-shadow: none;
    height: 46px;
    min-height: 46px;
    filter: none;
    background-image: none;
}


    </style>
