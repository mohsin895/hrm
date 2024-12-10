<template>
  <div class="loyel-erp-department mt-10 ml-10 mr-10">
    

    <div class="card w-full mt-4 bg-white p-6">
      <div class=" mb-4 flex justify-between">
        <div class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer">
          <span class="inline-flex items-center text-white">
            
           Attendance Setting
          </span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <div class="flex space-x-4">
          <div class="w-full">
            <form @submit.prevent="submitForm">
              
            <div class="pl-6 pr-6 ">
              <div class="flex">
                <label for="startTime" class="w-1/5">Office Start Time:</label>
                <div class="flex-grow">
                <input type="time" id="startTime" v-model="startTime"  :style="{
                        border: startTimeError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="formValidation('startTime')" class="min-w-96 ml-2 h-9 pl-2 text-black border focus:outline-none focus:ring focus:border-loginFocus" />
                      <div class="text-red-500 text-xs mt-1 ml-2">
                      {{ startTimeErrorMessage }}
                    </div>
                    </div>
              </div>
              
              <div class="flex mt-4">
                <label for="endTime" class="w-1/5">Office End Time:</label>
                <div class="flex-grow">
                <input type="time" id="endTime"  :style="{
                        border: endTimeError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="formValidation('endTime')" v-model="endTime" class="min-w-96 ml-2 h-9 pl-2 text-black border focus:outline-none focus:ring focus:border-loginFocus" />
                      <div class="text-red-500 text-xs mt-1 ml-2">
                      {{ endTimeErrorMessage }}
                    </div>
                    </div>
              </div>
              <div class="flex mt-4">
                <label for="lateTime" class="w-1/5">Mark late after:</label>
                <input type="text" id="lateTime" v-model="lateTime" class="min-w-96 ml-2 h-9 pl-2 text-black border focus:outline-none focus:ring focus:border-loginFocus" />
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

 const startTime=ref("");
 const endTime=ref("");
 const lateTime=ref("");
const startTimeError = ref(false);
const endTimeError = ref(false);
const startTimeErrorMessage=ref("");
const endTimeErrorMessage=ref("");



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
    startTime.value = dataInfo.office_start_time;
    endTime.value = dataInfo.office_end_time;
    lateTime.value = dataInfo.mark_late_after;

  } catch (error) {
    console.error("Error fetching leave data:", error);
  }
};

function validateStartTime() {
    if (!startTime.value || startTime.value.length === 0) {
      startTimeError.value = true;
      startTimeErrorMessage.value = "Start Time  Field cannot be empty";
      return false;
    } else {
      startTimeError.value = false;
      startTimeErrorMessage.value = "";
      return true;
    }
  }
  function validateEndTime() {
    if (!endTime.value || endTime.value.length === 0) {
      endTimeError.value = true;
      endTimeErrorMessage.value = "End Time Field cannot be empty";
      return false;
    } else {
      endTimeError.value = false;
      endTimeErrorMessage.value = "";
      return true;
    }
  }
  
  function formValidation(fieldName) {
    if (fieldName === "submit") {
      const isStartTimeValid = validateStartTime();
      const isEndTimeValid = validateEndTime();
      return isStartTimeValid && isEndTimeValid;
    } else if (fieldName === "startTime") {
      validateStartTime();
    }else if (fieldName === "endTime") {
      validateEndTime();
    }
  }
  
  async function submitForm() {
    if (formValidation("submit")) {
   
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
          startTime: startTime.value,
          endTime: endTime.value,
          lateTime: lateTime.value,
      
          attendance: 1,
     
        };
        const response = await axios.post(
          "/staff/v1/erp/setting/insert/update",
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
  
  
    