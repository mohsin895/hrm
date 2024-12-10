<template>
    <div class="loyel-erp-department mt-10 ml-10 mr-10">
      
  
      <div class="card w-full mt-4 bg-white p-6">
        <div class=" mb-4 flex justify-between">
          <div class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer">
            <span class="inline-flex items-center text-white">
              
             Notification Setting
            </span>
          </div>
        </div>
  
        <div class="overflow-x-auto">
          <div class="flex space-x-4">
            <div class="w-full">
              <form @submit.prevent="submitForm">
                
              <div class="pl-6 pr-6 ">
                <div class="flex">
                  <label for="startTime" class="w-1/5">Awards :</label>
                  <div class="flex items-center">
            <div
              @click="toggleAwards()"
              :class="[
                'relative inline-flex items-center cursor-pointer',
                award === 1 ? 'bg-green-500' : 'bg-red-500',
                'w-20 h-8 border border-gray-300 transition-colors duration-300 ease-in-out',
              ]"
            >
              <span
                :class="[
                  'absolute top-0 left-0 h-8 w-10 bg-white border border-gray-300 transform transition-transform duration-300 ease-in-out',
                  award === 1 ? 'translate-x-full' : 'translate-x-0',
                ]"
              ></span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-white font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  award === 1 ? 'opacity-100' : 'opacity-0',
                ]"
                style="top: 50%; transform: translateY(-50%); left: 1px;"
              >
               Yes
              </span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-black font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  award === 1 ? 'opacity-0' : 'opacity-100',
                ]"
                style="top: 50%; transform: translateY(-50%); right: 1px;"
              >
                No
              </span>
            </div>
          </div>
                </div>
                
                <div class="flex mt-4">
                  <label for="endTime" class="w-1/5">Attendance:</label>
                  <div class="flex items-center">
            <div
              @click="toggleAtendance()"
              :class="[
                'relative inline-flex items-center cursor-pointer',
                attendance_notification === 1 ? 'bg-green-500' : 'bg-red-500',
                'w-20 h-8 border border-gray-300 transition-colors duration-300 ease-in-out',
              ]"
            >
              <span
                :class="[
                  'absolute top-0 left-0 h-8 w-10 bg-white border border-gray-300 transform transition-transform duration-300 ease-in-out',
                  attendance_notification === 1 ? 'translate-x-full' : 'translate-x-0',
                ]"
              ></span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-white font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  attendance_notification === 1 ? 'opacity-100' : 'opacity-0',
                ]"
                style="top: 50%; transform: translateY(-50%); left: 1px;"
              >
               Yes
              </span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-black font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  attendance_notification === 1 ? 'opacity-0' : 'opacity-100',
                ]"
                style="top: 50%; transform: translateY(-50%); right: 1px;"
              >
                No
              </span>
            </div>
          </div>
                </div>
                <div class="flex mt-4">
                  <label for="lateTime" class="w-1/5">Notice Board:</label>
                  <div class="flex items-center">
            <div
              @click="toggleNoticeboard()"
              :class="[
                'relative inline-flex items-center cursor-pointer',
                noticeboard === 1 ? 'bg-green-500' : 'bg-red-500',
                'w-20 h-8 border border-gray-300 transition-colors duration-300 ease-in-out',
              ]"
            >
              <span
                :class="[
                  'absolute top-0 left-0 h-8 w-10 bg-white border border-gray-300 transform transition-transform duration-300 ease-in-out',
                  noticeboard === 1 ? 'translate-x-full' : 'translate-x-0',
                ]"
              ></span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-white font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  noticeboard === 1 ? 'opacity-100' : 'opacity-0',
                ]"
                style="top: 50%; transform: translateY(-50%); left: 1px;"
              >
               Yes
              </span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-black font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  noticeboard === 1 ? 'opacity-0' : 'opacity-100',
                ]"
                style="top: 50%; transform: translateY(-50%); right: 1px;"
              >
                No
              </span>
            </div>
          </div>
                </div>
                <div class="flex mt-4">
                  <label for="lateTime" class="w-1/5">Payroll:</label>
                  <div class="flex items-center">
            <div
              @click="togglePayroll()"
              :class="[
                'relative inline-flex items-center cursor-pointer',
                payroll === 1 ? 'bg-green-500' : 'bg-red-500',
                'w-20 h-8 border border-gray-300 transition-colors duration-300 ease-in-out',
              ]"
            >
              <span
                :class="[
                  'absolute top-0 left-0 h-8 w-10 bg-white border border-gray-300 transform transition-transform duration-300 ease-in-out',
                  payroll === 1 ? 'translate-x-full' : 'translate-x-0',
                ]"
              ></span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-white font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  payroll === 1 ? 'opacity-100' : 'opacity-0',
                ]"
                style="top: 50%; transform: translateY(-50%); left: 1px;"
              >
               Yes
              </span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-black font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  payroll === 1 ? 'opacity-0' : 'opacity-100',
                ]"
                style="top: 50%; transform: translateY(-50%); right: 1px;"
              >
                No
              </span>
            </div>
          </div>
                </div>
                <div class="flex mt-4">
                  <label for="lateTime" class="w-1/5">Leave Applications:</label>
                  <div class="flex items-center">
            <div
              @click="toggleLeave()"
              :class="[
                'relative inline-flex items-center cursor-pointer',
                leave === 1 ? 'bg-green-500' : 'bg-red-500',
                'w-20 h-8 border border-gray-300 transition-colors duration-300 ease-in-out',
              ]"
            >
              <span
                :class="[
                  'absolute top-0 left-0 h-8 w-10 bg-white border border-gray-300 transform transition-transform duration-300 ease-in-out',
                  leave === 1 ? 'translate-x-full' : 'translate-x-0',
                ]"
              ></span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-white font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  leave === 1 ? 'opacity-100' : 'opacity-0',
                ]"
                style="top: 50%; transform: translateY(-50%); left: 1px;"
              >
               Yes
              </span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-black font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  leave === 1 ? 'opacity-0' : 'opacity-100',
                ]"
                style="top: 50%; transform: translateY(-50%); right: 1px;"
              >
                No
              </span>
            </div>
          </div>
                </div>
                <div class="flex mt-4">
                  <label for="lateTime" class="w-1/5">Employee Add:</label>
                  <div class="flex items-center">
            <div
              @click="toggleEmployee()"
              :class="[
                'relative inline-flex items-center cursor-pointer',
                employee === 1 ? 'bg-green-500' : 'bg-red-500',
                'w-20 h-8 border border-gray-300 transition-colors duration-300 ease-in-out',
              ]"
            >
              <span
                :class="[
                  'absolute top-0 left-0 h-8 w-10 bg-white border border-gray-300 transform transition-transform duration-300 ease-in-out',
                  employee === 1 ? 'translate-x-full' : 'translate-x-0',
                ]"
              ></span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-white font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  employee === 1 ? 'opacity-100' : 'opacity-0',
                ]"
                style="top: 50%; transform: translateY(-50%); left: 1px;"
              >
               Yes
              </span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-black font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  employee === 1 ? 'opacity-0' : 'opacity-100',
                ]"
                style="top: 50%; transform: translateY(-50%); right: 1px;"
              >
                No
              </span>
            </div>
          </div>
                </div>
                <div class="flex mt-4">
                  <label for="lateTime" class="w-1/5">Expense Claim:</label>
                  <div class="flex items-center">
            <div
              @click="toggleExpense()"
              :class="[
                'relative inline-flex items-center cursor-pointer',
                expense === 1 ? 'bg-green-500' : 'bg-red-500',
                'w-20 h-8 border border-gray-300 transition-colors duration-300 ease-in-out',
              ]"
            >
              <span
                :class="[
                  'absolute top-0 left-0 h-8 w-10 bg-white border border-gray-300 transform transition-transform duration-300 ease-in-out',
                  expense === 1 ? 'translate-x-full' : 'translate-x-0',
                ]"
              ></span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-white font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  expense === 1 ? 'opacity-100' : 'opacity-0',
                ]"
                style="top: 50%; transform: translateY(-50%); left: 1px;"
              >
               Yes
              </span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-black font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  expense === 1 ? 'opacity-0' : 'opacity-100',
                ]"
                style="top: 50%; transform: translateY(-50%); right: 1px;"
              >
                No
              </span>
            </div>
          </div>
                </div>
              </div>
    
              <div class="border-t border-gray-200 modal-footer mt-4">
                <div class="p-6 flex items-end justify-end space-x-4">
                 
                  <button
                    class="bg-customCyan hover:bg-hoverCyan text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline text-right"
                    type="submit"
                  >
                    <span class="inline-flex items-center text-white">
                      <span >
                        <icon
                          name="pencil"
                          size="15px"
                          style="margin-right: 8px" /></span
                      >
                        Update
                    </span>
                  </button>
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
  
   
    </div>
  </template>
      
    <script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import { useToast } from "vue-toastification";
  
  const toast = useToast();
  
  const award = ref(1);
  const expense = ref(1);
  const employee = ref(1);
  const leave = ref(1);
  const noticeboard = ref(1);
  const payroll = ref(1);
  const attendance_notification = ref(1);

  function toggleAwards() {
  award.value = award.value === 1 ? 2 : 1;
}

function toggleExpense() {
  expense.value = expense.value === 1 ? 2 : 1;
}

function toggleEmployee() {
  employee.value = employee.value === 1 ? 2 : 1;
}

function toggleLeave() {
  leave.value = leave.value === 1 ? 2 : 1;
}
function togglePayroll() {
  payroll.value = payroll.value === 1 ? 2 : 1;
}
function toggleNoticeboard() {
  noticeboard.value = noticeboard.value === 1 ? 2 : 1;
}

function toggleAtendance() {
  attendance_notification.value = attendance_notification.value === 1 ? 2 : 1;
}
  const fetchDataList = async () => {
    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        console.error("Authentication token is missing.");
        return;
      }
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await axios.get("/staff/v1/erp/setting/info", config);
      const dataInfo = response.data;
      award.value = dataInfo.award_notification;
      attendance_notification.value = dataInfo.attendance_notification;
      noticeboard.value = dataInfo.notice_notification;
      payroll.value = dataInfo.payroll_notification;
      leave.value = dataInfo.leave_notification;
      employee.value = dataInfo.employee_add;
      expense.value = dataInfo.expense_notification;
  
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };
  

    
    async function submitForm() {
     
     
          const token = window.localStorage.getItem("token");
          if (!token) {
            console.error("Authentication token is missing.");
            return;
          }
          const config = {
            headers: {
              Authorization: "Bearer " + token,
            },
          };
          const payload = {
           award: award.value,
            attendance_notification: attendance_notification.value,
            noticeboard: noticeboard.value,
            payroll: payroll.value,
            leave: leave.value,
            employee: employee.value,
            expense: expense.value,
       
          };
          const response = await axios.post(
            "/staff/v1/erp/setting/notification",
            payload,
            config
          );
          if (response.data.msgFlag) {
            toast.success(response.data.msg);
            await fetchDataList();
            closeModal();
          } else {
            toast.error(response.data.errMsg);
          }
       
      
    }
  
  onMounted(fetchDataList);
  </script>
    
    <style>
  .bg-selected-month {
    background-color: #169ef4; /* Selected month background color */
  }
  .text-selected-color {
    color: white; /* Selected month text color */
  }
  </style>
    
    
      