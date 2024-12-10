import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/mainLayout.vue'
import EmployeeLayout from '../layout/EmployeeLayout.vue'
import Heropage from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import DashboardEmployee from '../views/Employee/Dashboard.vue'
import DepartmentList from '../views/HRM/Departments.vue'
import AwardList from '../views/HRM/Award.vue'
import ExpenseList from '../views/HRM/Expense.vue'
import NotFound from '../views/Notfound.vue'
import EmployeeList from '../views/HRM/Employee/List.vue'
import EmployeeCreate from '../views/HRM/Employee/Add.vue'
import EmployeeEdit from '../views/HRM/Employee/Edit.vue'
import BranchtList from '../views/HRM/Branch.vue'
import NoticeboardList from '../views/HRM/NoticeBoard.vue'
import LeaveTypeList from '../views/HRM/LeaveType.vue'
import HolydaysList from '../views/HRM/Holydays.vue'
import PayrollList from '../views/HRM/Payroll/index.vue'
import PayrollCreate from '../views/HRM/Payroll/create.vue'
import PayrollEdit from '../views/HRM/Payroll/edit.vue'
import PayrollView from '../views/HRM/Payroll/view.vue'
import AttendanceView from '../views/HRM/Attendance/list.vue'
import Setting from '../views/Setting/Sidebar.vue';
import AttendanceCreate from '../views/HRM/Attendance/mark.vue'
import LeaveApplication from '@/views/HRM/LeaveApplication.vue'
import Profile from '@/views/HRM/Profile.vue'

//employee

import EmployeeLeaveList from '../views/Employee/Leave.vue'
import EmployeeExpense from '../views/Employee/Expense.vue'
import EmployeeAttendence from '../views/Employee/Attendence.vue'
import EmployeeSalary from '../views/Employee/Salary.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
       path:'/',
       name:'login',
       component: Heropage
    },
    {
      path: '/erp',
      name: 'home',
      component: Layout,
      children:[
        {
          path:'dashboard',
          name:'Dashboard',
          component: Dashboard
        },

        {
          path:'profile',
          name:'Profile',
          component: Profile
        },
        {
          path:'department/list',
          name:'DepartmentList',
          component: DepartmentList
        },
        {
          path:'branch/list',
          name:'BranchtList',
          component: BranchtList
        },
        {
          path:'employee/list',
          name:'EmployeeList',
          component: EmployeeList
        },
        {
          path:'employee/create',
          name:'EmployeeCreate',
          component: EmployeeCreate
        },
        {
          path:'employee/:dataId/edit',
          name:'EmployeeEdit',
          component: EmployeeEdit
        },
        {
          path:'award/list',
          name:'AwardList',
          component: AwardList
        },
        {
          path:'expense/list',
          name:'ExpenseList',
          component: ExpenseList
        },
        {
          path:'noticeboard/list',
          name:'NoticeboardList',
          component: NoticeboardList
        },
        {
          path:'leave/type/list',
          name:'LeaveTypeList',
          component: LeaveTypeList
        },
        {
          path:'holy/days/list',
          name:'HolydaysList',
          component: HolydaysList
        },
        {
          path:'payroll/list',
          name:'PayrollList',
          component: PayrollList
        },
        {
          path:'payroll/create',
          name:'PayrollCreate',
          component: PayrollCreate
        },
        {
          path:'payroll/:dataId/edit',
          name:'PayrollEdit',
          component: PayrollEdit
        },
        {
          path:'payroll/:dataId',
          name:'PayrollView',
          component: PayrollView
        },
        {
          path:'attendance/list',
          name:'AttendanceView',
          component: AttendanceView
        },
        {
          path:'setting',
          name:'Setting',
          component: Setting
        },
        {
          path:'attendance/create',
          name:'AttendanceCreate',
          component:AttendanceCreate
        },
        {
          path:'leave/application',
          name:'LeaveApplication',
          component:LeaveApplication
        }
      ]
    },

    {
      path: '/erp/employee',
      name: 'EmployeeLayout',
      component: EmployeeLayout,
      children:[
        {
          path:'dashboard',
          name:'DashboardEmployee',
          component: DashboardEmployee
        },

        {
          path:'leave',
          name:'EmployeeLeaveList',
          component: EmployeeLeaveList
        },

        {
          path:'expense',
          name:'EmployeeExpense',
          component: EmployeeExpense
        },
        {
          path:'attendence',
          name:'EmployeeAttendence',
          component: EmployeeAttendence
        },
        {
          path:'salary',
          name:'EmployeeSalary',
          component: EmployeeSalary
        },

      ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]
})

export default router
