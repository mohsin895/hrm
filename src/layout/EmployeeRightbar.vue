<template>
  <div class="right-nav bg-profilebgColor text-black mt-5 pl-2 pr-2 pt-6">
    <div class=" items-center text-center justify-center m-0 ">
      <div dir="ltr">
        <div class="snap-x ...">
          <div class="scroll-ms-6 snap-start ...">
            <span v-if="employeeInfo.profile_image === null">
              <img
              src="@/assets/profile.webp"
              class="h-60 w-60"
            />
            </span>
            <span v-else>
              <img
              :src="baseUrl + employeeInfo.profile_image"
              class="h-60 w-60"
            />
            </span>
          
          </div>
        </div>
      </div>
     <div class=" items-center text-xl">
      {{ employeeInfo.full_name }}
     </div>
     <div class="text-xs">
      <span v-if="employeeInfo.get_designation != null">
        {{ employeeInfo.get_designation.designation }}
    </span>
   
     </div>
    </div>
   
    <br>
    

    <div class="mb-4 mt-6 flex justify-between">
      <div class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer text-center">
        <span class="inline-flex items-center text-white">
          At work for:{{ workingDuration }}
        </span>
      </div>
    </div>
    <div class="mb-4 pb-6 flex justify-between">
      <div class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer">
        <span class="inline-flex items-center text-white">
          <div class="grid gap-x-8 gap-y-3 grid-cols-3 text-center">
            <div>{{dayWiseWorking}} <br>Attendance</div>
            <div>{{leaveLeft}} <br>Leaves</div>
            <div>0 <br>Awards</div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted, inject } from "vue";

const employeeInfo = ref([]);
const workingDuration = ref([]);
const dayWiseWorking = ref([]);
const leaveLeft = ref([]);
const baseUrl = inject('$baseUrl');
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
    const response = await axios.get("/employee/v1/erp/employee/info", config);
    employeeInfo.value = response.data.employeeInfo;
    workingDuration.value = response.data.string;
    dayWiseWorking.value = response.data.dayWiseWorking;
    leaveLeft.value = response.data.leaveLeft;
  } catch (error) {
    console.error("Error fetching leave data:", error);
  }
};

onMounted(fetchDataList);
</script>
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