<template>
  <div class="loyel-erp-department mt-6 ml-10 mr-10">
    <div class="card w-full bg-white p-6">
      <div class="p-2 mb-4 flex justify-between">
        <div class="bg-customCyan hover:bg-hoverCyan p-2 w-60 cursor-pointer">
          <span class="inline-flex items-center text-white">
            <icon name="clock" size="20px" style="margin-right: 8px" />
            Today's Attendance
          </span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <div class="flex space-x-4">
          <div class="w-full">
            <div class="flex justify-between">
              <div class="flex-1 mr-4">
                <label
                  for="website-admin-1"
                  class="block mb-2 text-md font-bold text-gray-900 dark:text-white"
                >
                  Current Time
                </label>
                <div class="flex">
                  <span
                    class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 border-e-0 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                  >
                    <icon name="clock" size="20px" style="margin-right: 8px" />
                  </span>
                  <input
                    type="text"
                    disabled
                    v-model="currentTime"
                    id="website-admin-1"
                    class="bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="elonmusk"
                  />
                </div>
              </div>

              <div class="flex-1 mx-4">
                <label
                  for="website-admin-2"
                  class="block mb-2 text-md font-bold text-gray-900 dark:text-white"
                >
                  IP Address
                </label>
                <div class="flex">
                  <span
                    class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 border-e-0 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                  >
                    <icon
                      name="desktop"
                      size="20px"
                      style="margin-right: 8px"
                    />
                  </span>
                  <input
                    type="text"
                    disabled
                    v-model="ipAddress"
                    id="website-admin-2"
                    class="bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="elonmusk"
                  />
                </div>
              </div>

              <div class="flex-1 ml-4">
                <label
                  for="website-admin-3"
                  class="block mb-2 text-md font-bold text-gray-900 dark:text-white"
                >
                  Work From
                </label>
                <div class="flex">
                  <input
                    type="text"
                    id="website-admin-3"
                    class="bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Office,Home,etc"
                  />
                </div>
              </div>
            </div>

            <label
              for="website-admin-1"
              class="block mb-2 text-md font-bold text-gray-900 dark:text-white"
            >
              Notes
            </label>
            <div class="flex">
              <textarea
                type="text"
                v-model="notes"
                id="website-admin-1"
                class="bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Note to your manager"
              ></textarea>
            </div>

            <div class="border-t border-gray-200">
              <div class="flex items-center justify-center space-x-4 p-6" v-if="set_attendance==1">
                <div v-if="clock_set==1">
                  <button
                 
                  class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-red-600 focus:outline-none focus:shadow-outline text-right"
                  type="button"
                >
                  Clock In:{{formattedClockInTime }}
                </button>
                  
                </div>
                <div v-else>
                  <button
                  @click="setClock"
                  class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right"
                  type="button"
                >
                  Clock In
                </button>
                </div>
               
                <button
                  @click="unsetClock"
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Clock Out
                </button>
              </div>
              <div class="flex items-center justify-center space-x-4 p-6" v-if="set_attendance==0">
                <button
                 
                  class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-red-600 focus:outline-none focus:shadow-outline text-right"
                  type="button"
                >
                Clock In:{{formattedClockInTime }}
                </button>
                <button
                 
                  class=" hover:bg-red-700 text-black hover:text-white border border-red-600 font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                Clock Out:{{formattedClockOutTime }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card w-full mt-4 bg-white p-6">
      <div class="mb-4 flex justify-between">
        <div class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer">
          <span class="inline-flex items-center text-white">
            <icon name="clock" size="20px" style="margin-right: 8px" />
            Attendance Summary
          </span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <div class="flex space-x-4">
          <div class="w-full">
            <table
              class="border-collapse border border-slate-400 w-full min-w-max"
            >
              <thead>
                <tr>
                  <th class="border border-slate-300 h-10">Sr No.</th>
                  <th class="border border-slate-300">Date</th>
                  <th class="border border-slate-300">Status</th>
                  <!-- <th class="border border-slate-300">Progress</th> -->
                  <th class="border border-slate-300">Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(dataInfo, index) in dataList" :key="dataInfo.id">
                  <td class="border border-slate-300 pl-4 h-16 text-sm">
                    {{ index + 1 }}
                  </td>
                  <td class="border border-slate-300 pl-4 text-sm">
                    {{ $filters.formatDateWithDayMonth(dataInfo.date) }}
                  </td>
                  <td class="border border-slate-300 pl-4 text-sm" v-if="dataInfo.status=='present'">
                    
                    <span class="bg-bgPresent text-white p-2">{{ capitalizeFirstLetter(dataInfo.status) }}</span>
                  </td>
                  <td class="border border-slate-300 pl-4 text-sm" v-else-if="dataInfo.status=='absent'">
                    <span class="bg-bgDanger text-white p-2">{{ capitalizeFirstLetter(dataInfo.status) }}</span>
                  </td>
                  <!-- <td class="border border-slate-300 pl-4 text-sm">
                    {{ dataInfo.leaveType }}
                  </td> -->
                  <td class="border border-slate-300 pl-4 text-sm" v-if="dataInfo.status=='present'">
                    {{ differenceBetweenTwoTime(dataInfo) }}
                  </td>
                  <td v-else class="text-center border border-slate-300 pl-4 text-sm">
                    <span class="text-4xl">-</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Backdrop -->

    <!-- Designation Delete -->
  </div>
</template>
      
    <script setup>
import axios from "axios";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useToast } from "vue-toastification";
import moment from "moment";
const toast = useToast();

const dataList = ref([]);

const ipAddress = ref();
const notes = ref("");
const set_attendance = ref("");
const clock_set=ref("");
const clock_in_time=ref("");
const clock_out_time=ref("");



const currentTime = ref("");
const formattedClockInTime = computed(() => {
  return moment(clock_in_time.value, "HH:mm:ss").format("h:mm:ss A");
});

const formattedClockOutTime = computed(() => {
  return moment(clock_out_time.value, "HH:mm:ss").format("h:mm:ss A");
});

const updateCurrentTime = () => {
  currentTime.value = moment().format("h:mm:ss A");
};


let timerInterval;

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
    const response = await axios.get(
      "/employee/v1/erp/attendance/get/list",
      config
    );
    dataList.value = response.data.dataInfo;
    ipAddress.value = response.data.ipAddress;
    set_attendance.value = response.data.set_attendance;
    clock_set.value=response.data.clock_set;
    clock_in_time.value= response.data.clock_in_time;
    clock_out_time.value=response.data.clock_out_time;
  } catch (error) {
    console.error("Error fetching leave data:", error);
  }
};

const setClock = async () => {
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
    const response = await axios.post(
      "/employee/v1/erp/attendance/clock/in",
      {
        notes: notes.value,
      },
      config
    );
    await fetchDataList();
    console.log("Clock in successful:", response.data);
  } catch (error) {
    console.error("Error clocking in:", error);
  }
};

const unsetClock = async () => {
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
    const response = await axios.post(
      "/employee/v1/erp/attendance/clock/out",
      {
        notes: notes.value,
      },
      config
    );
    await fetchDataList();
    console.log("Clock out successful:", response.data);
  } catch (error) {
    console.error("Error clocking out:", error);
  }
};
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const differenceBetweenTwoTime = (dataInfo) => {
  const clockInTime = moment(dataInfo.clock_in, "HH:mm:ss");
  const clockOutTime = dataInfo.clock_out
    ? moment(dataInfo.clock_out, "HH:mm:ss")
    : moment(); 

  const duration = moment.duration(clockOutTime.diff(clockInTime));
  let hours = Math.floor(duration.asHours());
  let minutes = duration.minutes();
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;


  return `${hours} : ${minutes} `;
};
onMounted(() => {
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
  fetchDataList();
});

onBeforeUnmount(() => {
  clearInterval(timerInterval);
});
</script>
    
    <style>
.bg-selected-month {
  background-color: #169ef4; /* Selected month background color */
}
.text-selected-color {
  color: white; /* Selected month text color */
}
</style>
    
    
      