<template>
    <div class="loyel-erp-department mt-10 ml-10 mr-10 bg-white p-6">
      <div class="card w-full">
        <div class="p-2 mb-4">
          <div class="bg-customCyan hover:bg-hoverCyan p-2 w-40 cursor-pointer" >
            <span class="inline-flex items-center text-white">  
               <router-link :to="{name:'PayrollCreate'}"> Add New Payroll</router-link> 
               <icon name="plus" size="15px" style="margin-left: 8px" /></span>
          
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="border-collapse border border-slate-400 w-full min-w-max">
          <thead>
            <tr>
                <th class="border border-slate-300 h-10">#</th>
              <th class="border border-slate-300 h-10">Employee ID</th>
              <th class="border border-slate-300 h-10">Name</th>
              <th class="border border-slate-300 h-10">Month - Year</th>
              <th class="border border-slate-300">Net Salary</th>
              <th class="border border-slate-300 h-10">Created On</th>
              <th class="border border-slate-300">Status</th>
              <th class="border border-slate-300">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dataInfo, index) in dataList" :key="index">
              <td class="border border-slate-300 pl-4 h-16 text-sm">{{ index + 1 }}</td>
              <td class="border border-slate-300 pl-4 h-16 text-sm">{{ dataInfo.employee_info.employeeID }}</td>
              <td class="border border-slate-300 pl-4 text-sm">
                {{ dataInfo.employee_info.full_name }}
              </td>
              <td class="border border-slate-300 pl-4 text-sm">
                {{ dataInfo.month }}-{{ dataInfo.year}}
              </td>
            
             
              <td class="border border-slate-300 pl-4 text-sm">
                {{ dataInfo.net_salary }}
              </td>
              <td class="border border-slate-300 pl-4 text-sm">
                {{ $filters.formatDateWithDayMonth(dataInfo.created_at) }}
              </td>
              <td class="border border-slate-300 pl-4 text-sm">
                <span v-if="dataInfo.status == 'paid'" class="bg-customCyan p-2 text-white"> Paid</span>
                <span v-else class="bg-red-500 p-2 text-white">Unpaid</span>
                
              </td>
              <td class="border border-slate-300 pl-4 ">
                <span class="inline-flex items-center">
                  
                  
                  <router-link :to="{ name: 'PayrollView', params: { dataId: dataInfo.id }, }" >
                  <span class=" p-2 cursor-pointer mr-6 inline-flex items-center text-xs bg-purpoleCus hover:bg-purpoleCusHover text-white" >  
                      <icon name="eye" size="15px" style="margin-right: 10px" /> View
           
                </span>
                </router-link>
                <router-link :to="{ name: 'PayrollEdit', params: { dataId: dataInfo.id }, }" >
                  <span class=" p-2 cursor-pointer mr-6 inline-flex items-center text-xs bg-purpoleCus hover:bg-purpoleCusHover text-white" >  
                      <icon name="pencil" size="15px" style="margin-right: 10px" /> Edit
           
                </span>
               
                </router-link>
                <a :href="`${baseUrl}/payroll/download/${dataInfo.id}`"  @click.prevent="downloadAndRedirect(dataInfo.id)"> 
                  <span class=" p-2 cursor-pointer mr-6 inline-flex items-center text-xs bg-black hover:bg-black text-white" >
                  <icon name="download" size="15px" style="margin-right: 10px" />
                   Download PDF
                   </span>

                  </a>
                <span
                  class=" p-2  cursor-pointer inline-flex items-center text-xs bg-red-500 mr-4  hover:bg-red-700 text-white "
                  @click="openModalDelete(dataInfo)"
                >
                <icon name="trash" size="15px" class="mr-2" /> Delete
              
                </span></span>
               
              </td>
            </tr>
          </tbody>
        </table>
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
        <div class="bg-white  shadow-lg w-full max-w-2xl" @click.stop>
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
          <form @submit.prevent="DeleteInfo">
            <div class="modal-body p-6">
              <span
                >Are you sure you want to this department :
               <span class="font-bold"> ?</span> </span
              >
  
              <div class="bg-orange-500 p-4">
                <span class="font-bold">Note:</span> All the<span class="font-bold">employees</span>  associated with this
                department will also be deleted
              </div>
            </div>
            <div class="border-t border-gray-200">
              <div class="flex items-end justify-end space-x-4 p-6">
                <button
                  @click="closeModal"
                  class="bg-white-500 hover:bg-black hover:text-white text-black font-bold  py-2 px-4  border border-black focus:outline-none focus:shadow-outline text-right"
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
    </div>
  </template>
  <script setup>
  import axios from "axios";
  import { ref, onMounted, computed,inject  } from "vue";
  import { useToast } from "vue-toastification";
  
  const toast = useToast();
  const isModalOpenDelete = ref(false);
  const dataList = ref([]);
  const dataId = ref(null);
  const baseUrl = inject('$baseUrl');
  
  
  
  function openModalDelete(dataInfo) {
    dataId.value = dataInfo.id;
  
    isModalOpenDelete.value = true;
  }
  
  function closeModal() {
   
    isModalOpenDelete.value = false;
   
   
    dataId.value = null;
  
  }
  
  function handleBackdropClick(event) {
    if (event.target === modalBackdrop.value) {
      closeModal();
    }
  }
  function addField() {
    fields.value.push({ designation: "",designationId:"" });
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
      const response = await axios.get("/staff/v1/erp/payroll/get/list", config);
      dataList.value = response.data;
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };
  
  
  
  async function DeleteInfo() {
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
  
      const response = await axios.post("/staff/v1/erp/employee/delete", payload, config);
  
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
  
  const calculateCountdown = (dataInfo) => {
    const joiningDate = new Date(dataInfo.joining_date);
    const now = new Date();
  
    // Calculate the difference in milliseconds
    let timeDiff = Math.abs(now.getTime() - joiningDate.getTime());
  
    // Calculate years
    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    timeDiff -= years * (1000 * 60 * 60 * 24 * 365);
  
    // Calculate months
    const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
    timeDiff -= months * (1000 * 60 * 60 * 24 * 30);
  
    // Calculate days
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
    return {
      countdownText: `${years} years, ${months} months, ${days} days`,
    };
  };
  
  const countdownInfo = computed(() => {
    const countdownInfo = {};
    for (const dataInfo of dataList.value) {
      countdownInfo[dataInfo.id] = calculateCountdown(dataInfo);
    }
    return countdownInfo;
  });
  onMounted(fetchDataList);

  const downloadAndRedirect = (dataId) => {
    const url = `${baseUrl}/payroll/download/${dataId}`;
    
   
    window.open(url, '_blank');


    setTimeout(() => {
        router.push({ name: 'PayrollList' }); 
    }, 1000); 
};
  </script>
  <style scoped>
  
  </style>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  