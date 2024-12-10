<template>
  <div class="loyel-erp-department mt-10 ml-10 mr-10">
    <div class="card w-full bg-white p-6">
      <div class="p-2 mb-4 flex justify-between">
        <div class="bg-customCyan hover:bg-hoverCyan p-2 w-60 cursor-pointer">
          <span class="inline-flex items-center text-white">
            <icon name="list" size="15px" style="margin-right: 8px" />
            My Leave Applications
          </span>
        </div>
        <div
          class="bg-customCyan hover:bg-hoverCyan p-2 w-60 cursor-pointer"
          @click="openModal"
        >
          <span class="inline-flex items-center text-white">
            Add new Leave Applications
            <icon name="plus" size="15px" style="margin-left: 8px" />
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
                  <th class="border border-slate-300">Days</th>
                  <th class="border border-slate-300">Type</th>
                  <th class="border border-slate-300">Reason</th>
                  <th class="border border-slate-300">Applied On</th>
                  <th class="border border-slate-300">Status</th>
                  <th class="border border-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(dataInfo, index) in dataList" :key="dataInfo.id">
                  <td class="border border-slate-300 pl-4 h-16 text-sm">
                    {{ index + 1 }}
                  </td>
                  <td class="border border-slate-300 pl-4 text-sm">
                
                    {{ $filters.formatDate(dataInfo.start_date) }} <span v-if="dataInfo.end_date != null">to {{ $filters.formatDate(dataInfo.end_date) }}</span>
                  </td>
                  <td class="border border-slate-300 pl-4 text-sm">
                    {{ dataInfo.days }}
                  </td>
                  <td class="border border-slate-300 pl-4 text-sm">
                    {{ dataInfo.leave_type.leaveType }}
                  </td>
                  <td class="border border-slate-300 pl-4 text-sm">
                    {{ dataInfo.reason }}
                  </td>
                  <td class="border border-slate-300 pl-4 text-sm">
                    {{ $filters.formatDateWithDayMonth(dataInfo.created_at) }}
                  </td>
                  <td class="border border-slate-300 pl-4 text-sm">
                    <span :class="color[dataInfo.application_status]" class="p-2"> {{ dataInfo.application_status }}</span>
                   
                  </td>
                  <td class="border border-slate-300 pl-4">
                    <span class="inline-flex items-center">
                      <span
                        class="p-2 cursor-pointer mr-6 inline-flex items-center text-xs bg-purpoleCus hover:bg-purpoleCusHover text-white"
                        @click="leaveDataInfo(dataInfo)"
                      >
                        <icon
                          name="eye"
                          size="15px"
                          style="margin-right: 10px"
                        />
                        View
                      </span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="card w-full mt-4 bg-white p-6">
      <div class=" mb-4 flex justify-between">
        <div class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer">
          <span class="inline-flex items-center text-white">
            
            Leaves Left
          </span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <div class="flex space-x-4">
          <div class="w-full">
            <table
              class=" w-full min-w-max"
            >
             
              <tbody>
                <tr v-for="leaveType in leaveTypesData" :key="leaveType.id">
          <td><span class="primary-link">{{ capitalize(leaveType.leaveType) }}</span></td>
          <td>
            <!-- {{ takenLeaves[takenLeaveTypes.indexOf(String(leaveType.id))] }} -->
          
          </td>
          <td v-if="isAnnualLeave(leaveType.leaveType)">
        {{ employee.annual_leave }}
      </td>
      <td v-else-if="takenLeaveTypes.indexOf(String(leaveType.id))!== -1">
        {{ leaveType.num_of_leave - takenLeaves[takenLeaveTypes.indexOf(String(leaveType.id))] }}
      </td>
      <td v-else>
        {{ leaveType.num_of_leave }}
      </td>
        </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Backdrop -->
    <div
      v-if="isModalOpen"
      ref="modalBackdrop"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start max-h-screen overflow-y-auto justify-center pt-20"
      @click="handleBackdropClick"
    >
      <!-- Modal -->
      <div class="bg-white shadow-2xl w-full max-w-4xl" @click.stop>
        <div
          class="flex justify-between items-center p-6 mb-4 border-b border-gray-200 modal-header"
        >
          <h2 class="text-xl inline-flex items-center font-semibold">
            <span v-if="editMode">
              <icon name="pencil" size="15px" style="margin-right: 8px" /></span
            ><span v-else>
              <icon name="plus" size="15px" style="margin-right: 8px"
            /></span>
            {{ editMode ? "Edit Holydays" : "Add New Holydays" }}
          </h2>
          <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200"
          >
            &times;
          </button>
        </div>
        <div class="flex items-left justify-left border border-b-red-200 space-x-4 mt-5">
            <span v-bind:class="[ activetab === '1' ? 'active-margin' : '' ]" class="ml-4">
                <h5 
                v-on:click="activetab='1'" v-bind:class="[ activetab === '1' ? 'activeLeave' : '' ]"
                class="p-2 cursor-pointer">
             Single Leave Dates
                </h5>
           </span>
           <span v-bind:class="[ activetab === '2' ? 'active-margin' : '' ]">
                <h5 
                v-on:click="activetab='2'" v-bind:class="[ activetab === '2' ? 'activeLeave' : '' ]"
                style="margin-left: 10px;" class="p-2 cursor-pointer">
               Multiple Leave Dates
                </h5>
              </span>
           
          </div>
        <form @submit.prevent="submitForm" v-if="activetab==1">
          <div class="pl-6 pr-6 modal-body">
            <table>
              <!-- <thead>
                  <tr>
                    <th class="text-start">Date</th>
                    <th class="text-start mr-4">Occasion</th>
                    <th>Action</th>
                  </tr>
                </thead> -->
              <tbody>
                <tr v-for="(field, index) in fields" :key="index" class="mb-4">
                  <td class="pr-4">
                    <input
                      v-model="field.date"
                      type="date"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      :placeholder="'Date # ' + (index + 1)"
                      :style="{
                        border: dateError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="validateHolydays(index)"
                    />

                    <div v-if="field.error" class="text-red-500 text-xs mt-1">
                      {{ field.error }}
                    </div>
                  </td>
                  <td class="pr-2">
                    <select
                      v-model="field.leaveType"
                      class="block h-9 w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Select Leave Type</option>
                      <option v-for="(dataInfo, index) in leaveType" :value="dataInfo.id" :key="index">{{dataInfo.leaveType}}</option>

                    </select>
                  </td>
                  <td class="pr-2">
                    <input
                      type="checkbox"
                      class="form-checkbox h-4 w-4 text-black transition duration-150 ease-in-out"
                      id="halfleaveType"
                      name="halfleaveType"
                      v-model="field.halfleaveType"
                      value="yes"
                    />
                    <label for="halfleaveType"> Half Day</label><br />
                  </td>
                  <td>
                    <input
                      v-model="field.reason"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      :placeholder="'Reason # ' + (index + 1)"
                      :style="{
                        border: occasionError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="validateHolydaysOccasion(index)"
                    />
                  </td>
                  <td>
                  
                      <button
                        v-if="index === 0"
                        @click="addField"
                        type="button"
                        class="bg-customCyan 500 ml-4 mt-4 hover:bg-hoverCyan text-white font-bold py-2 px-4 mb-4"
                      >
                        <span class="inline-flex items-center text-white">
                          Add Field
                          <icon
                            name="plus"
                            size="15px"
                            style="margin-left: 8px"
                        /></span>
                      </button>
                      <button
                        v-else
                        @click="removeField(index)"
                        type="button"
                        class="bg-red-500 ml-4 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 mb-4"
                      >
                        <span class="inline-flex items-center text-white">
                          Remove
                          <icon
                            name="minus"
                            size="15px"
                            style="margin-left: 8px"
                        /></span>
                      </button>
                   
                   
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="border-t border-gray-200 modal-footer">
            <div class="p-6 flex items-end justify-end space-x-4">
              <button
                @click="closeModal"
                class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right"
                type="button"
              >
                Cancel
              </button>
              <button
                class="bg-customCyan hover:bg-hoverCyan text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline text-right"
                type="submit"
              >
                <span class="inline-flex items-center text-white">
                 
                    <icon name="check" size="15px" style="margin-right: 8px"
                  />

                Submit
                </span>
              </button>
            </div>
          </div>
        </form>
        <form @submit.prevent="submitMultipleDateForm" v-if="activetab==2">

          <div class="flex flex-col md:flex-row p-6">
            <div class="basis-1/2 mr-4">
              <div class="border-solid  p-4">
                
                <div class="flex flex-col sm:flex-row gap-4 mb-1">
                  <div class="w-full sm:w-5/12 flex items-center">
                    Date Range <span class="text-3xl text-red-500 mt-2 ml-2">*</span>
                  </div>
                  <div class="flex-grow">
                    <input
                      type="date"
                      v-model="startDate"
                      :style="{
                        border: startDateError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="formValidation('startDate')"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Employee  Name"
                    />
                    <div class="text-red-500 text-xs mt-1">
                      {{ startDateErrorMessage }}
                    </div>
                  </div>
                  <br />
                </div>

              </div>
            
            </div>

            <!-- Right Section -->
            <div class="basis-1/4">
              <div class="border-solid   p-4">
        

                <!-- Employee ID Section -->
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  
                  <div class="flex-grow">
                    <input
                      type="date"
                      v-model="endDate"
                      :style="{
                        border: endDateError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="formValidation('endDate')"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      @input="validateInput($event)"
                    
                    />
                    <div class="text-red-500 text-xs mt-1">
                      {{ endDateErrorMessage }}
                    </div>
                  </div>
                </div>
               
              </div>
             

              
            </div>
          </div>
          <div class="basis-1/2 ml-8">
              <div class="border-solid  p-1">
                

                <!-- Name Section -->
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-1/3 flex items-center">
                    Selected Days 
                  </div>
                  <div class="flex-grow">
                    <span class="p-2 text-white bg-red-700 rounded-full">{{ dayDiference }}</span>
                    
                  </div>
                  <br />
                </div>

                
              </div>
              <!-- Image Section -->

            
            </div>
          <div class="basis-1/2 ml-6">
              <div class="border-solid  p-1">
                

                <!-- Name Section -->
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-1/3 flex items-center">
                    Leave Types <span class="text-3xl text-red-500 mt-2 ml-2">*</span>
                  </div>
                  <div class="flex-grow">
                    <select
                      v-model="leaveTypeMul"
                      :style="{ border: leaveTypeMulError ? '1px solid red' : '1px solid #CED4DA' }"
                       @keyup="formValidation('leaveTypeMul')"
                      class="block h-9 w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Select Leave Type</option>
                      <option v-for="(dataInfo, index) in leaveType" :value="dataInfo.id" :key="index">{{dataInfo.leaveType}}</option>

                    </select>
                    <div class="text-red-500 text-xs mt-1">
                      {{ leaveTypeMulErrorMessage }}
                    </div>
                  </div>
                  <br />
                </div>

                
              </div>
              <!-- Image Section -->

            
            </div>
            <div class="basis-1/2 ml-6">
              <div class="border-solid  p-1">
                

                <!-- Name Section -->
                <div class="flex flex-col sm:flex-row gap-4 mb-1">
                  <div class="w-full sm:w-1/3 flex items-center">
                   Reasone 
                  </div>
                  <div class="flex-grow">
                    <textarea
                      v-model="reason"
                      :style="{
                        border: reasonError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="formValidation('reason')"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Reason  "
                     
                  
                    ></textarea>
                    <div class="text-red-500 text-xs mt-1">
                      {{ reasonErrorMessage }}
                    </div>
                  </div>
                  <br />
                </div>

                
              </div>
              <!-- Image Section -->

            
            </div>
       

          <div class="border-t border-gray-200 modal-footer">
            <div class="p-6 flex items-end justify-end space-x-4">
              <button
                @click="closeModal"
                class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right"
                type="button"
              >
                Cancel
              </button>
              <button
                class="bg-customCyan hover:bg-hoverCyan text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline text-right"
                type="submit"
              >
                <span class="inline-flex items-center text-white">
                 
                    <icon name="check" size="15px" style="margin-right: 8px"
                  />

                Submit
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Modal -->
    <div
      v-if="isModalOpenDelete"
      ref="modalBackdrop"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start justify-center pt-20"
      @click="handleBackdropClick"
    >
      <!-- Modal -->
      <div class="bg-white shadow-lg w-full max-w-2xl" @click.stop>
        <div
          class="flex justify-between items-center p-6  border-b border-gray-200"
        >
          <h2 class="text-xl font-semibold">Leave Application</h2>
          <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200"
          >
            &times;
          </button>
        </div>
       
          <div class="modal-body p-6">
            <div class="overflow-x-auto">
              <div class="flex space-x-4">
                <div class="w-full">
                  <table class="w-full min-w-max">
                    <tbody>
                     
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                           Leave Type
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12" >
                          {{leaveType }}
                        </td>
                      </tr>
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                           Date
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ $filters.formatDateWithDayMonth(date) }}
                        </td>
                      </tr>
                      <tr >
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                         Reason
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                         {{ reasone }}
                        </td>
                      </tr>
                     
                      <tr >
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                           Applied On
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ $filters.formatDateWithDayMonth(appliedDate) }}
                        </td>
                      </tr>
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
      
      </div>
    </div>
    <!-- Designation Delete -->
  </div>
</template>
    
  <script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const isModalOpen = ref(false);
const isModalOpenDelete = ref(false);
const modalBackdrop = ref(null);
const fields = ref([
  {
    date: "",
    leaveType: "",
    halfleaveType: "",
    reason: "",
    error: "",
    erro1: "",
  },
]);
const startDate=ref("");
const endDate=ref("");
const dataList = ref([]);
const dataId = ref(null);
const date = ref("");
const appliedDate=ref("");
const reason=ref("");
const reasone=ref("");
const leaveTypeMul=ref("");
const editMode = ref(false);
const nameError = ref(false);
const dateError = ref(false);
const occasionError = ref(false);
const startDateError=ref(false);
const startDateErrorMessage=ref("");
const endDateError=ref(false);
const endDateErrorMessage = ref("");
const reasonError=ref(false);
const reasonErrorMessage=ref("");
const leaveTypeMulError=ref(false);
const leaveTypeMulErrorMessage=ref("");
const leaveType=ref([]);
const leaveTypesData =ref([]);
const activetab=ref('1');
const takenLeaveTypes=ref([]);
const takenLeaves=ref([]);
const color=ref([]);

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
function openModal() {
  editMode.value = false;
  isModalOpen.value = true;
}const isAnnualLeave = (leaveType) => {
  return leaveType.toLowerCase() === "annual";
};


const dayDiference= computed(()=>{
  if(startDate.value && endDate.value){
    const start=new Date(startDate.value);
  const end = new Date(endDate.value);
  const diffTime = end -start;
  const diffDay = diffTime/(1000*60*60*24);
  return diffDay >=0 ? diffDay:0;
  }
  return 0;
});
function leaveDataInfo(dataInfo) {
  dataId.value = dataInfo.id;
  leaveType.value= dataInfo.leave_type.leaveType;
  appliedDate.value=dataInfo.created_at;
 reasone.value=dataInfo.reason;
 date.value=dataInfo.start_date;
  isModalOpenDelete.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  isModalOpenDelete.value = false;

  fields.value = [
    {
      date: "",
      leaveType: "",
      halfleaveType: "",
      reason: "",
      error: "",
      error1: "",
    },
  ];
  dataId.value = null;
  editMode.value = false;
  nameError.value = false;
  dateError.value = false;
  occasionError.value = false;
}

function handleBackdropClick(event) {
  if (event.target === modalBackdrop.value) {
    closeModal();
  }
}

function addField() {
  fields.value.push({ date: "", leaveType: "", halfleaveType: "", reason: "" });
}

function removeField(index) {
  fields.value.splice(index, 1);
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
    const response = await axios.get("/employee/v1/erp/leave/get/list", config);
    dataList.value = response.data.dataList;
    leaveTypesData .value=response.data.leaveList;
    takenLeaveTypes.value=response.data.takenLeaveTypes;
    takenLeaves.value=response.data.takenLeaves;
    color.value = response.data.color;
  } catch (error) {
    console.error("Error fetching leave data:", error);
  }
};
const getLeaveTypeList=async()=>{
  try{
  const token = window.localStorage.getItem("token");
  if(!token){
    console.error("Authentication token is missing.");
    return;
  }
  const config ={
    headers:{
      Authorization : "Bearer " +token,
    }
  };
  const response = await axios.get("/employee/v1/erp/leave/get/leaveType/list", config);
  leaveType.value= response.data;
 
  }catch(error){
    console.error("Error Fetching Leave Type data:", error);
  }
}

function validateHolydays(index) {
  if (
    !fields.value[index].date ||
    fields.value[index].date.trim().length === 0
  ) {
    fields.value[index].error = "Date cannot be empty";
    dateError.value = true;
  } else {
    dateError.value = false;
    fields.value[index].error = "";
  }
}

function validateHolydaysOccasion(index) {
  if (
    !fields.value[index].reason ||
    fields.value[index].reason.trim().length === 0
  ) {
    fields.value[index].error1 = "Occasion cannot be empty";
    occasionError.value = true;
  } else {
    occasionError.value = false;
    fields.value[index].error1 = "";
  }
}

async function submitForm() {
  let isValid = true;

  fields.value.forEach((field, index) => {
    validateHolydays(index);
    validateHolydaysOccasion(index);

    if (field.error || field.error1) {
      isValid = false;
    }
  });

  if (!isValid) {
    return;
  }

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

    const formData = new FormData();
    const dataIdValue = dataId.value || null;
    if (dataIdValue !== null) {
      formData.append("dataId", dataIdValue);
    }
    fields.value.forEach((field) => {
      formData.append("date[]", field.date);
      formData.append("leaveType[]", field.leaveType);
      formData.append("halfleaveType[]", field.halfleaveType);
      formData.append("reason[]", field.reason);
    });

    const response = await axios.post(
      "/employee/v1/erp/leave/insert/update",
      formData,
      config
    );

    if (response.data.msgFlag) {
      toast.success(response.data.msg);
      await fetchDataList();
      closeModal();
    } else {
      toast.error(response.data.errMsg);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("An error occurred while submitting the form.");
  }
}
async function submitMultipleDateForm() {
  if (formValidation("submit")) {

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

    const formData = new FormData();
    const dataIdValue = dataId.value || null;
    if (dataIdValue !== null) {
      formData.append("dataId", dataIdValue);
    }
 
      formData.append("startDate", startDate.value);
      formData.append("endDate", endDate.value);
      formData.append("leaveType", leaveTypeMul.value);
      formData.append("reason", reason.value);
      formData.append("days", dayDiference.value);
   

    const response = await axios.post(
      "/employee/v1/erp/leave/multiple/insert/update",
      formData,
      config
    );

    if (response.data.msgFlag) {
      toast.success(response.data.msg);
      await fetchDataList();
      closeModal();
    } else {
      toast.error(response.data.errMsg);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("An error occurred while submitting the form.");
  }
}
}

function validateStartDate() {
    if (!startDate.value || startDate.value.length === 0) {
      startDateError.value = true;
      startDateErrorMessage.value = " Start Date Field cannot be empty";
      return false;
    } else {
      startDateError.value = false;
      startDateErrorMessage.value = "";
      return true;
    }
  }

  function validateEndDate() {
    if (!endDate.value || endDate.value.length === 0) {
      endDateError.value = true;
      endDateErrorMessage.value = " End Date Field cannot be empty";
      return false;
    } else {
      endDateError.value = false;
      endDateErrorMessage.value = "";
      return true;
    }
  }
  function validateleaveTypeMule() {
    if (!leaveTypeMul.value || leaveTypeMul.value.length === 0) {
      leaveTypeMulError.value = true;
      leaveTypeMulErrorMessage.value = " Leave Type Field cannot be empty";
      return false;
    } else {
      leaveTypeMulError.value = false;
      leaveTypeMulErrorMessage.value = "";
      return true;
    }
  }

  function validateReasone() {
    if (!reason.value || reason.value.length === 0) {
      reasonError.value = true;
      reasonErrorMessage.value = "Reasone Field cannot be empty";
      return false;
    } else {
      reasonError.value = false;
      reasonErrorMessage.value = "";
      return true;
    }
  }
  
  function formValidation(fieldName) {
    if (fieldName === "submit") {
      const isStartDateValid = validateStartDate();
      const isEndDateValid = validateEndDate();
      const isReasoneValid = validateReasone();
      const isMulTypeValid = validateleaveTypeMule();
      return isStartDateValid && isEndDateValid && isMulTypeValid && isReasoneValid;
    } else if (fieldName === "startDate") {
      validateStartDate();
    }else if (fieldName === "endDate") {
      validateEndDate();
    }else if (fieldName === "reason") {
      validateReasone();
    }
    else if (fieldName === "leaveTypeMul") {
      validateleaveTypeMule();
    }
  }
const fetchAllData= async()=>{
  await fetchDataList();
  await getLeaveTypeList();
}

onMounted(fetchAllData);
</script>
  
  <style>

.activeLeave{
  background: #4765a0;
  color:#fff;
  padding: 7px 15px 9px;
 
    border-bottom: 1px solid #4765a0 ; 
}

</style>
  
  
    