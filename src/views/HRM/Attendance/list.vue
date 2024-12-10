<template>
  <div class="loyel-erp-department">
    <div class="bg-white h-8 pl-5 py-1">
      <span class="text-black flex">
        <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
       
       
      </span>
    </div>
    <div class="sm:ml-2 sm:mr-2 md:ml-10 md:mr-10">
      <div class="card w-full bg-white mt-4 pb-4 pt-4">
        <span class="pl-4 pt-4 text-xl text-bold text-red-500">Employee Info</span>
        <hr class="mt-4" />
        <div class="flex p-4">
          <div class="flex-grow">
            <select
              v-model="employeeID"
              @change="fetchAllData"
              class="block h-9 w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="all">All</option>
              <option
                v-for="employee in employeeList"
                :key="employee.id"
                :value="employee.id"
              >
                {{ employee.full_name }}(EmpId:{{ employee.employeeID }})
              </option>
            </select>
          </div>
          <div class="flex-grow">
            <select
              v-model="selectedMonth" @change="fetchAllData"
              class="block h-9 w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option
                v-for="month in months"
                :key="month.value"
                :value="month.value"
              >
                {{ month.name }}
              </option>
            </select>
          </div>
          <div class="flex-grow">
            <select
              v-model="year"
              @change="fetchAllData"
              class="block h-9 w-full border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          <div class="flex-grow">
            <button
              class="bg-white-500 bg-customCyan hover:bg-hoverCyan font-bold py-1 px-4 border text-white focus:outline-none focus:shadow-outline text-right"
              type="button"
              @click="fetchAllData"
            >
              Go
            </button>
          </div>
        </div>
        <div class="overflow-x-auto p-4">
          <table class="border-collapse border border-slate-400 w-full min-w-max ">
            <thead>
              <tr class="text-xs bg-tableHeaderColor text-textColor  ">
                <th>Employee</th>
                <th v-for="day in daysInMonth" :key="day"> {{ day }}<br>
                  {{ getDayName(day) }}

                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(attendance, key) in employeeAttendence" :key="key" class="h-10 border  hover:bg-tableColor border-slate-300" >
                <td class="pl-4">{{ key.split('#').pop() }}</td>
                <td v-for="(status, index) in attendance" :key="index" >
                  <icon :name="getIconInfo(status).name" :size="getIconInfo(status).size" class="ml-2 mr-2" :class="getIconInfo(status).color" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onBeforeMount, inject } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

const year = ref(new Date().getFullYear());
const employeeAttendence = ref([]);
const employeeID = ref('all');
const daysInMonth = ref([]);
const employeeList = ref([]);
const selectedMonth = ref(new Date().getMonth() + 1);
const currentYear = new Date().getFullYear() + 1;
const years = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => currentYear - i);

const months = [
  { name: "January", value: 1 },
  { name: "February", value: 2 },
  { name: "March", value: 3 },
  { name: "April", value: 4 },
  { name: "May", value: 5 },
  { name: "June", value: 6 },
  { name: "July", value: 7 },
  { name: "August", value: 8 },
  { name: "September", value: 9 },
  { name: "October", value: 10 },
  { name: "November", value: 11 },
  { name: "December", value: 12 },
];
const $filters = inject('$filters');
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
        year: year.value,
        month: selectedMonth.value,
      },
    };
    const response = await axios.get("/staff/v1/erp/attendance/get/list", config);
    employeeList.value = response.data.data;
    daysInMonth.value = Array.from({ length: response.data.daysInMonth }, (_, i) => i + 1);
    employeeAttendence.value = response.data.employeeAttendence;
  } catch (error) {
    console.error("Error fetching branch data:", error);
  }
};

const fetchAllData = async () => {
  await fetchEmployeeList();
};

onBeforeMount(fetchAllData);

const getIconInfo = (status) => {
  if (status === 'absent') {
    return { name: 'xmark', color: 'text-red-500', size: '15px' };
  } else if (status === 'present') {
    return { name: 'check', color: 'text-blue-500', size: '15px' };
  } else {
    return { name: 'minus', color: '', size: '10px' };
  }
};



const getDayName = (day) => {
  const currentDate = new Date(year.value, selectedMonth.value - 1, day); 
  return currentDate.toLocaleString('en-US', { weekday: 'short' });
};
</script>