<template>
    <div class="loyel-erp-award mt-10 ml-10 mr-10 bg-white p-6">
      <div class="card w-full">
        <div class="p-2 mb-4">
          <div
            class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer"
           
          >
            <span class="inline-flex items-center text-white">
              <icon name="list" size="15px" style="margin-right: 8px" />
              Leave Applications
           
            </span>
          </div>
        </div>
        <div class="overflow-x-auto">
  <table class="border-collapse border border-slate-400 w-full min-w-max">
    <thead>
      <tr>
        <th class="border border-slate-300 h-10">Sr No.</th>
        <th class="border border-slate-300">Name</th>
        <th class="border border-slate-300">Dates</th>
        <th class="border border-slate-300">Days</th>
        <th class="border border-slate-300">Leave Types</th>
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
          {{ dataInfo.employee.full_name }}
        </td>
        <td class="border border-slate-300 pl-4 text-sm">
            {{ $filters.formatDate(dataInfo.start_date) }} <span v-if="dataInfo.end_date != null">to {{ $filters.formatDate(dataInfo.end_date) }}</span>
        </td>
        <td class="border border-slate-300 pl-4 text-sm">
          {{ dataInfo.days }}
        </td>
        <td class="border border-slate-300 pl-4 text-sm">
          <span v-if="dataInfo.leave_type != null"> {{ dataInfo.leave_type.leaveType }}</span>
         
        </td>
        <td class="border border-slate-300 pl-4 text-sm">
          {{ dataInfo.reason }}
        </td>
        <td class="border border-slate-300 pl-4 text-sm">
          {{ $filters.formatDate(dataInfo.created_at) }}
        </td>
        <td class="border border-slate-300 pl-4 text-sm ">
    
          <span  :class="color[dataInfo.application_status]" class="p-2 text-white ">{{capitalizeFirstLetter(dataInfo.application_status)}}</span>
        </td>
        <td class="border border-slate-300 pl-4">
          <span class="inline-flex items-center">
            <div v-if="dataInfo.application_status == 'pending'">
            
            <span
              class="p-2 cursor-pointer  inline-flex items-center text-xs bg-rightActiveColor  hover:bg-purple-700 text-white"
              @click="openModalEdit(dataInfo,1)"
            >
          
              Approved
            </span>
            <span
              class="p-2 cursor-pointer mr-6 inline-flex items-center text-xs bg-bgDanger  hover:bg-purple-700 text-white"
              @click="openModalEdit(dataInfo,3)"
            >
             
              Rejected
            </span>
            </div>
            <div v-else-if="dataInfo.application_status == 'approved'">
              <span
              class="p-2 cursor-pointer  inline-flex items-center text-xs bg-deleteColor  hover:bg-purple-700 text-white"
              @click="openModalEdit(dataInfo,2)"
            >
          
              Pending
            </span>
         
            <span
              class="p-2 cursor-pointer mr-6 inline-flex items-center text-xs bg-bgDanger  hover:bg-purple-700 text-white"
              @click="openModalEdit(dataInfo,3)"
            >
             
              Rejected
            </span>
            </div>
            <div v-else-if="dataInfo.application_status == 'rejected'">
              <span
              class="p-2 cursor-pointer  inline-flex items-center text-xs bg-deleteColor  hover:bg-purple-700 text-white"
              @click="openModalEdit(dataInfo,2)"
            >
          
              Pending
            </span>
            <span
              class="p-2 cursor-pointer mr-6  inline-flex items-center text-xs bg-rightActiveColor  hover:bg-purple-700 text-white"
              @click="openModalEdit(dataInfo,1)"
            >
          
              Approved
            </span>
          
            </div>
           
            <span
              class="p-2 cursor-pointer mr-6 inline-flex items-center text-xs bg-purple-600 hover:bg-purple-700 text-white"
              @click="openModalEdit(dataInfo)"
            >
              <icon name="eye" size="15px" style="margin-right: 10px" />
              View
            </span>
            <span
              class="p-2 cursor-pointer inline-flex items-center text-xs bg-red-500 ml-4 hover:bg-red-700 text-white"
              @click="openModalDelete(dataInfo)"
            >
              <icon name="trash" size="15px" class="mr-2" />
              Delete
            </span>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
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
        <div class="bg-white shadow-lg w-full max-w-lg" @click.stop>
          <div
            class="flex justify-between items-center p-6 mb-4 border-b border-gray-200 modal-header"
          >
            <h2 class="text-xl inline-flex items-center font-semibold">
              Confirm
            </h2>
            <button
              @click="closeModal"
              class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200"
            >
              &times;
            </button>
          </div>
          <form @submit.prevent="submitForm">
            <div class="pl-6 pr-6 modal-body">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="itemName"
                >
                Are you sure you want to <span v-if="status== 1">approve</span> <span v-if="status== 2">pending</span><span v-if="status== 3">rejected</span>? You will not be able to  leave after this action.
                </label>
              
              </div>
            
              
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
                  v-if="status== 1">
                  <span class="inline-flex items-center text-white" >
                   
  
                    Approved
                  </span>
                </button>
                <button
                  class="bg-deleteColor hover:bg-hoverCyan text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline text-right"
                  type="submit"
                  v-if="status== 2">
                  <span class="inline-flex items-center text-white" >
                   
  
                   Pending
                  </span>
                </button>
                <button
                  class="bg-bgDanger hover:bg-hoverCyan text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline text-right"
                  type="submit"
                  v-if="status== 3">
                  <span class="inline-flex items-center text-white" >
                   
  
                    Rejected
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
            class="flex justify-between items-center p-6 mb-4 border-b border-gray-200"
          >
            <h2 class="text-xl font-semibold">Confirmation</h2>
            <button
              @click="closeModal"
              class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200"
            >
              &times;
            </button>
          </div>
          <form @submit.prevent="deleteInfo">
            <div class="modal-body p-6">
              <span> Are you sure you want to delete this leaveType: </span>
            </div>
            <div class="border-t border-gray-200">
              <div class="flex items-end justify-end space-x-4 p-6">
                <button
                  @click="closeModal"
                  class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- Designation Delete -->
    </div>
  </template>
    
    <script setup>
  import axios from "axios";
  import { ref, onBeforeMount } from "vue";
  import { useToast } from "vue-toastification";
  
  const toast = useToast();
  const isModalOpen = ref(false);
  const isModalOpenDelete = ref(false);
  const modalBackdrop = ref(null);
  const leaveType = ref("");
  const num_of_leave=ref("");
  const dataList = ref([]);
  const employeeList = ref([]);
  const dataId = ref(null);
  const editMode = ref(false);
  const color=ref("");
  const application_status=ref("");
  const status=ref("");
 
  function openModal() {
    editMode.value = false;
    isModalOpen.value = true;
  }
  
  function openModalEdit(dataInfo,value) {
    editMode.value = true;
    dataId.value = dataInfo.id;

    status.value=value;
  
    application_status.value = dataInfo.application_status;

   
  
    isModalOpen.value = true;
  }
  
  function openModalDelete(dataInfo) {
    dataId.value = dataInfo.id;
  
    isModalOpenDelete.value = true;
  }
  
  function closeModal() {
    isModalOpen.value = false;
    isModalOpenDelete.value = false;
    leaveType.value = "";

    num_of_leave.value = "";
  
    dataId.value = null;
    editMode.value = false;
  
  }
  
  function handleBackdropClick(event) {
    if (event.target === modalBackdrop.value) {
      closeModal();
    }
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
      const response = await axios.get("/staff/v1/erp/leaveApplication/get/list", config);
      dataList.value = response.data.dataList;
      color.value=response.data.color;
    } catch (error) {
      console.error("Error fetching leaveType data:", error);
    }
  };
  
 
  
  async function submitForm() {
 
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
        const payload = {
         
          status: status.value,
         
          dataId: dataId.value || null,
        };
        const response = await axios.post(
          "/staff/v1/erp/leaveApplication/status/update",
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
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Something went wrong. Please try again.");
      }
    
  }
  
  async function deleteInfo() {
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
      const payload = {
        dataId: dataId.value || null,
      };
      const response = await axios.post("/staff/v1/erp/leaveApplication/delete", payload, config);
      if (response.data.msgFlag) {
        toast.success(response.data.msg);
        await fetchDataList();
        closeModal();
      } else {
        toast.error(response.data.errMsg);
      }
    } catch (error) {
      console.error("Error deleting leaveApplication:", error);
      toast.error("An error occurred while deleting the leaveApplication.");
    }
  }
  
  const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
  const fetchAllData = async () => {
    await fetchDataList();
   
  };
  onBeforeMount(fetchAllData);
  </script>
    
    <style scoped>
  .helper-text-product-add {
    color: red;
  }
  </style>
    