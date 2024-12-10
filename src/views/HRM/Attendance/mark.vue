<template>
  <div class="loyel-erp-department">
    <div class="bg-white h-8 pl-5 py-1">
      <span class="text-black flex">
        <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
      </span>
    </div>
    <div class="sm:ml-2 sm:mr-2 md:ml-10 md:mr-10">
      <div class="card w-full bg-white mt-4 pb-4 pt-4">
        <span class="pl-4 pt-4 text-xl text-bold text-red-500"
          >Employee Info</span
        >
        <hr class="mt-4" />
        <div class="flex p-4">
          <div class="flex-grow">
            <select
              v-model="employeeID"
              @change="fetchAllData"
              class="block h-10 pl-2 w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="all">All</option>
              <option
                v-for="employee in getAllEmployee"
                :key="employee.id"
                :value="employee.id"
              >
                {{ employee.full_name }}(EmpId:{{ employee.employeeID }})
              </option>
            </select>
          </div>
          <div class="flex-grow">
            
          </div>
          <div class="flex-grow">
            
          </div>
          <div class="flex-grow pr-6">
            <input
              type="date"
              @change="fetchAllData"
              v-model="currentDate"
              id="website-admin-1"
              class="bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="elonmusk"
            />
          </div>
        </div>
        <div
          class="flex items-center justify-center"
          v-if="today != currentDate"
        >
          <div
            class="bg-customCyan hover:bg-hoverCyan p-2 w-56 cursor-pointer"
            @click="todayDate();fetchAllData()"
           
          >
            <span class="inline-flex items-center text-white">
              Mark Today's Attendance
              <icon name="plus" size="15px" style="margin-left: 8px" />
            </span>
          </div>
        </div>
        <div class="text-center">
          <span class="font-bold text-xl"
            >Date:{{ $filters.formatDateWithDayMonth(currentDate) }}
            <span v-if="today == currentDate">(Today)</span></span
          >
        </div>
        <div class="overflow-x-auto p-4 h-96 relative">
          <table
            class="border-collapse border border-slate-400 w-full min-w-max"
          >
            <thead>
              <tr class="text-xs bg-tableHeaderColor text-textColor text-left">
                <th class="pl-2 h-10">Name</th>
                <th>Status</th>
                <th>Attendance</th>
                <th>Clock-in/Out Time</th>
                <th>Save</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(employee, key) in employeeList"
                :key="key"
                class="min-h-36 border hover:bg-tableColor border-slate-300"
              >
                <td class="pl-2">
                  {{ employee.full_name }}
                  <p>{{ employee.employeeID }}</p>
                </td>
                <td>
                 
          <div class="flex items-center">
            <div
              @click="toggleStatus(employee)"
              :class="[
                'relative inline-flex items-center cursor-pointer',
                employee.status === 'present' ? 'bg-green-500' : 'bg-red-500',
                'w-20 h-8 border border-gray-300 transition-colors duration-300 ease-in-out',
              ]"
            >
              <span
                :class="[
                  'absolute top-0 left-0 h-8 w-10 bg-white border border-gray-300 transform transition-transform duration-300 ease-in-out',
                  employee.status === 'present' ? 'translate-x-full' : 'translate-x-0',
                ]"
              ></span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-white font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  employee.status === 'present' ? 'opacity-100' : 'opacity-0',
                ]"
                style="top: 50%; transform: translateY(-50%); left: 1px;"
              >
                P
              </span>
              <span
                :class="[
                  'absolute flex items-center justify-center h-8 w-10 text-black font-semibold text-xs transition-opacity duration-300 ease-in-out',
                  employee.status === 'present' ? 'opacity-0' : 'opacity-100',
                ]"
                style="top: 50%; transform: translateY(-50%); right: 1px;"
              >
                A
              </span>
            </div>
          </div>
          <div v-if="employee.status === 'absent'">
            <div class="leave-form" id="leaveForm45">
    <div class="flex flex-wrap -mx-2">
        <div class="w-full lg:w-1/2 px-2 mb-4">
            <label class="control-label block text-sm font-medium text-gray-700">Leave Type</label>
            <select class="form-control leaveType input-sm mt-1 h-10 block w-full border border-gray-700  shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"  id="leaveType45" name="leaveType[]">
                <option>sick</option>
                <option>casual</option>
                <option>maternity</option>
                <option>annual</option>
                <option>unpaid</option>
                <option>others</option>
            </select>
        </div>
        <div class="w-md lg:w-1/2 px-2 mb-4 flex items-center">
            <label class="control-label flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input type="checkbox" id="halfDay45" name="half_day[]" class="half-day-checkbox form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                <span>Half Day</span>
            </label>
        </div>
        <div class="w-md px-2 mb-4">
    <label class="control-label block text-sm font-medium text-gray-700">Reason</label>
    <input 
      type="text"
      :class="[
        'form-control reason input-sm mt-1 h-8 px-2 py-1.5 block w-full shadow-sm',
        isFocused ? 'border border-red-500' : 'border border-gray-700',
        'focus:ring focus:ring-blue-200 focus:ring-opacity-50'
      ]"
      id="reason45"
      name="reason[]" 
      placeholder="Absent Reason"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </div>
    </div>
</div>


          </div>


                </td>
                <td class="h-40">
                  <div
                    v-if="
                      employee.status == 'present' ||
                      employee.status == 'absent'
                    "
                  >
                    <span class="bg-rightActiveColor text-white p-2">
                      Marked</span
                    >

                    <p class="mt-2">
                      <span class="font-bold">Clock In IP:</span>
                      {{ employee.clock_in_ip_address }}
                    </p>
                    <p>
                      <span class="font-bold">Clock Out IP:</span>
                      {{ employee.clock_out_ip_address }}
                    </p>
                    <p>
                      <span class="font-bold">Working From:</span>
                      {{ employee.working_from }}
                    </p>
                    <p><span class="font-bold">Notes:</span> Not Set</p>
                  </div>
                  <div v-else>
                    <span class="bg-bgDanger text-white p-2">Not Marked</span>
                  </div>
                </td>
                <td>
                  <div class="flex space-x-2 ">
                    <div class="flex justify-between">
                      <div class="flex-1 mr-4">
                        <label
                          for="website-admin-1"
                          class="block mb-2 text-md font-bold text-gray-900 dark:text-white"
                        >
                          Clock In
                        </label>
                        <div class="flex">
                          <span
                            class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 border-e-0 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                          >
                            <icon
                              name="clock"
                              size="20px"
                              style="margin-right: 8px"
                            />
                          </span>

                          <div v-if="employee.clock_in == null">
                            <input
                              type="time"
                              v-model="generalInfo.office_start_time"
                              id="website-admin-1"
                              class="bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                          <div v-else>
                            <input
                              type="time"
                              v-model="employee.clock_in"
                              id="website-admin-1"
                              class="bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="flex-1 mx-4">
                        <label
                          for="website-admin-2"
                          class="block mb-2 text-md font-bold text-gray-900 dark:text-white"
                        >
                          Clock Out
                        </label>
                        <div class="flex">
                          <span
                            class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 border-e-0 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                          >
                            <icon
                              name="clock"
                              size="20px"
                              style="margin-right: 8px"
                            />
                          </span>
                          <div v-if="employee.clock_out == null">
                            <input
                              type="time"
                              v-model="generalInfo.office_end_time"
                              id="website-admin-2"
                              class="bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                          <div v-else>
                            <input
                              type="time"
                              v-model="employee.clock_out"
                              id="website-admin-2"
                              class="bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <label class="control-label flex items-center space-x-2 mt-2">
                  <div class="checker">
                    <input type="checkbox" class="form-checkbox form-control late_checkbox h-[19px] w-[19px]" id="late27" name="late[]">
                  </div>
                  <span>Late</span>
                </label>

                </td>
                <td>
                  <div
                    class="bg-customCyan hover:bg-hoverCyan p-2 w-12 cursor-pointer"
                    @click="updateEmployeeAttendance(employee, generalInfo)"
                  >
                    <span class="inline-flex items-center text-white">
                      <icon name="check" size="15px" style="margin-left: 8px" />
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center p-6 border border-gray-300 ml-4 mr-4">
          <div class="p-6 flex items-center justify-center space-x-4">
            <button
              class="bg-customCyan hover:bg-hoverCyan text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline text-right"
              type="submit"
            >
              <span class="inline-flex items-center text-white">
                <span>
                  <icon name="check" size="15px" style="margin-right: 8px"
                /></span>

                Save
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup >
import axios from "axios";
import { ref, onBeforeMount } from "vue";
import { useToast } from "vue-toastification";
const toast = useToast();
const currentDate = ref(new Date().toISOString().split("T")[0]);
const today = ref(new Date().toISOString().split("T")[0]);
const employeeID = ref("all");
const employeeList = ref([]);
const getAllEmployee = ref([]);
const generalInfo = ref();
const isFocused = ref(false);

function toggleStatus(employee) {
  
  employee.status = employee.status === 'present' ? 'absent' : 'present';
 
}


function todayDate() {
  currentDate.value = new Date().toISOString().split("T")[0];
}
const fetchEmployeeList = async () => {
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
      params: {
        employeeID: employeeID.value,

        currentDate: currentDate.value,
      },
    };
    const response = await axios.get(
      "/staff/v1/erp/attendance/mark/list",
      config
    );
    employeeList.value = response.data.employeeList;
    getAllEmployee.value = response.data.getAllEmployee;
    generalInfo.value = response.data.generalInfo;
  } catch (error) {
    console.error("Error fetching branch data:", error);
  }
};
const updateEmployeeAttendance = async (dataInfo, generalInfo) => {
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

  let formData = new FormData();
  formData.append("dataId", dataInfo.employeeID);
  formData.append("date", currentDate.value);
  formData.append(
    "clock_in",
    dataInfo.clock_in || generalInfo.office_start_time
  );
  formData.append(
    "clock_out",
    dataInfo.clock_out || generalInfo.office_end_time
  );
  if(dataInfo.status ==null){
    formData.append("status", 'absent');
  }else{
    formData.append("status", dataInfo.status);
  }
 
  const response = await axios.post(
    "/staff/v1/erp/attendance/update/employee",
    formData,
    config
  );
  if (response.data.msgFlag) {
    toast.success(response.data.msg);
    await fetchEmployeeList();
  } else {
    toast.error(response.data.errMsg);
  }
};
const fetchAllData = async () => {
  await fetchEmployeeList();
};

onBeforeMount(fetchAllData);
</script>