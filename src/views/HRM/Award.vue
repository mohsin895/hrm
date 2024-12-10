<template>
    <div class="loyel-erp-award mt-10 ml-10 mr-10 bg-white p-6">
      <div class="card w-full">



        <div class="p-2 mb-4">
          <div class="bg-customCyan hover:bg-hoverCyan p-2 w-40 cursor-pointer" @click="openModal">
            <span class="inline-flex items-center text-white">
              Add New Award
              <icon name="plus" size="15px" style="margin-left: 8px" />
            </span>
          </div>
        </div>

        <div class="flex justify-between mb-4">

<!-- Records per Page Dropdown -->
          <select v-model="perPage" @change="fetchDataList(1)" class="border border-gray-300 p-2 focus:outline-none">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="all">All</option>
          </select>

            <!-- Search Input -->
            <input
            type="text"
            v-model="searchTerm"
            @input="fetchDataList(1)"
            placeholder="Search employees..."
            class="border border-gray-300 p-2 focus:outline-none w-64 mr-4"
          />

          </div>
        <div class="overflow-x-auto">
            <table class="border-collapse border border-slate-400 w-full min-w-max">
          <thead>
            <tr>
              <th class="border border-slate-300 h-10">Sr No.</th>
              <th class="border border-slate-300">Employee ID</th>
              <th class="border border-slate-300">Awardee Name</th>
              <th class="border border-slate-300">Award</th>
              <th class="border border-slate-300">Gift</th>
              <th class="border border-slate-300">Month</th>
              <th class="border border-slate-300">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dataInfo, index) in dataList" :key="dataInfo.id">
              <td class="border border-slate-300 pl-4 h-16 text-sm">{{ index + 1 }}</td>
              <td class="border border-slate-300 pl-4 text-sm">
                {{ dataInfo.employee?.employeeID }}
              </td>
            
              <td class="border border-slate-300 pl-4 text-sm">
                {{ dataInfo.employee?.full_name }}
              </td>
              <td class="border border-slate-300 pl-4 text-sm">
                {{ dataInfo.award_name }}
              </td>
              <td class="border border-slate-300 pl-4 text-sm">
                {{ dataInfo.gift }}
              </td>
              <td class="border border-slate-300 pl-4 text-sm">
                {{ dataInfo.month }} &nbsp; {{ dataInfo.year }}
              </td>
              <td class="border border-slate-300 pl-4">
                <span class="inline-flex items-center">
                  <span class="p-2 cursor-pointer mr-6 inline-flex items-center text-xs bg-purpoleCus hover:bg-purpoleCusHover text-white" @click="openModalEdit(dataInfo)">
                    <icon name="pencil" size="15px" style="margin-right: 10px" />
                    View/Edit
                  </span>
                  <span class="p-2 cursor-pointer inline-flex items-center text-xs bg-red-500 ml-4 hover:bg-red-700 text-white" @click="openModalDelete(dataInfo)">
                    <icon name="trash" size="15px" class="mr-2" />
                    Delete
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination-controls mt-4">
          <button :disabled="pagination.current_page === 1" @click="fetchDataList(1)">First</button>
          <button :disabled="pagination.current_page === 1" @click="fetchDataList(pagination.current_page - 1)">Previous</button>

          <button v-for="page in visiblePages" :key="page" @click="fetchDataList(page)" :class="{ 'active': pagination.current_page === page }">
            {{ page }}
          </button>

          <button :disabled="pagination.current_page === pagination.last_page" @click="fetchDataList(pagination.current_page + 1)">Next</button>
          <button :disabled="pagination.current_page === pagination.last_page" @click="fetchDataList(pagination.last_page)">Last</button>
        </div>
        </div>
      </div>
  
      <!-- Modal Backdrop -->
      <div v-if="isModalOpen" ref="modalBackdrop" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start max-h-screen overflow-y-auto justify-center pt-20" @click="handleBackdropClick">
        <!-- Modal -->
        <div class="bg-white shadow-lg w-full max-w-lg " @click.stop>
          <div class="flex justify-between items-center p-6 mb-4 border-b border-gray-200 modal-header">
            <h2 class="text-xl inline-flex items-center font-semibold">
              <span v-if="editMode"> <icon name="pencil" size="15px" style="margin-right: 8px" /></span><span v-else> <icon name="plus" size="15px" style="margin-right: 8px" /></span>
              {{ editMode ? 'Edit Award' : 'Add New Award' }}
            </h2>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200">
              &times;
            </button>
          </div>
          <form @submit.prevent="submitForm">
            <div class="pl-6 pr-6 modal-body">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="awardName">
                  <span :class="{ 'text-red-500': nameError }">Award Name</span>
                </label>
                <input
                  v-model="award_name"
                  type="text"
                  class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Award Name"
                  :style="{ border: nameError ? '1px solid red' : '1px solid #CED4DA' }"
                  @keyup="formValidation('award_name')"
                />
                <div class="text-red-500 text-xs mt-1">{{ nameErrorMessage }}</div>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="giftName">
                  <span :class="{ 'text-red-500': giftError }">Gift</span>
                </label>
                <input
                  v-model="gift"
                  type="text"
                  class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Gift Name"
                  :style="{ border: giftError ? '1px solid red' : '1px solid #CED4DA' }"
                  @keyup="formValidation('gift')"
                />
                <div class="text-red-500 text-xs mt-1">{{ giftErrorMessage }}</div>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="cashPrize">
                  <span :class="{ 'text-red-500': cashPriceError }">Cash Prize</span>
                </label>
                <input
                  v-model="cash_price"
                  type="text"
                  class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Cash Prize"
                  :style="{ border: cashPriceError ? '1px solid red' : '1px solid #CED4DA' }"
                  @keyup="formValidation('cash_price')"
                />
                <div class="text-red-500 text-xs mt-1">{{ cashPriceErrorMessage }}</div>
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="departmentName">
                  <span :class="{ 'text-red-500': employeeError }">Employee Name</span>
                </label>
                <select v-model="employee_id"   :style="{ border: employeeError ? '1px solid red' : '1px solid #CED4DA' }"
                @keyup="formValidation('employee_id')" class="block h-9 w-full border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"  >
           
           <option v-for="employee in employeeList" :key="employee.id" :value="employee.id" >{{ employee.full_name }}&nbsp;(EmpId:{{employee.employeeID  }})</option>
         
         </select>
                <div class="text-red-500 text-xs mt-1">{{ employeeErrorMessage }}</div>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="departmentName">
                  <span :class="{ 'text-red-500': monthError }">Month</span>
                </label>
                <select v-model="month" :style="{ border: monthError ? '1px solid red' : '1px solid #CED4DA' }"
                @keyup="formValidation('month')"  class="block h-9 w-full  border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2   sm:text-sm sm:leading-6">
                    <option v-for="month in months" :key="month.name" :value="month.name">{{ month.name }}</option>
          </select>
      
                <div class="text-red-500 text-xs mt-1">{{ monthErrorMessage }}</div>
              </div>
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="departmentName">
                  <span :class="{ 'text-red-500': yearError }">Year</span>
                </label>
             
     
     
          <select v-model="year" :style="{ border: yearError ? '1px solid red' : '1px solid #CED4DA' }"
          @keyup="formValidation('year')"  class="block h-9 w-full  border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2   sm:text-sm sm:leading-6">
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
      
      
                <div class="text-red-500 text-xs mt-1">{{ yearErrorMessage }}</div>
              </div>
          
            </div>
  
            <div class="border-t border-gray-200 modal-footer">
              <div class="p-6 flex items-end justify-end space-x-4">
                <button @click="closeModal" class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right" type="button">
                  Cancel
                </button>
                <button class="bg-customCyan hover:bg-hoverCyan text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline text-right" type="submit">
                  <span class="inline-flex items-center text-white">
                    <span v-if="editMode"> <icon name="pencil" size="15px" style="margin-right: 8px" /></span><span v-else> <icon name="check" size="15px" style="margin-right: 8px" /></span>
                   
                    {{ editMode ? 'Update' : 'Submit' }}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Delete Modal -->
      <div v-if="isModalOpenDelete" ref="modalBackdrop" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start justify-center pt-20" @click="handleBackdropClick">
        <!-- Modal -->
        <div class="bg-white shadow-lg w-full max-w-2xl " @click.stop>
          <div class="flex justify-between items-center p-6 mb-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold">Confirmation</h2>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200">
              &times;
            </button>
          </div>
          <form @submit.prevent="deleteInfo">
            <div class="modal-body p-6">
              <span>
                Are you sure you want to delete this Award:
             
              </span>
              
            </div>
            <div class="border-t border-gray-200">
              <div class="flex items-end justify-end space-x-4 p-6">
                <button @click="closeModal" class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right" type="button">
                  Cancel
                </button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline" type="submit">
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
  import axios from 'axios';
  import { ref, onBeforeMount, computed } from "vue";
  import { useToast } from 'vue-toastification';
  
  const toast = useToast();
  const isModalOpen = ref(false);
  const isModalOpenDelete = ref(false);
  const modalBackdrop = ref(null);

  const award_name = ref('');
  const gift = ref('');
  const cash_price = ref('');
  const employee_id = ref('');
  const month = ref('');
  const year = ref('');
 

  const dataList = ref([]);
  const employeeList = ref([]);
  const dataId = ref(null);
  const editMode = ref(false);
  const nameError = ref(false);
  const giftError = ref(false);
  const cashPriceError = ref(false);
  const employeeError = ref(false);
  const monthError = ref(false);
  const yearError = ref(false);
  const nameErrorMessage = ref('');
  const giftErrorMessage = ref('');
  const cashPriceErrorMessage = ref('');
  const employeeErrorMessage = ref('');
  const monthErrorMessage = ref('');
  const yearErrorMessage = ref('');
  const pagination = ref({});
    const searchTerm = ref("");
    const perPage = ref(10);

    const visiblePages = computed(() => {
  const { current_page, last_page } = pagination.value;
  const pagesToShow = 5;
  let startPage = Math.max(current_page - Math.floor(pagesToShow / 2), 1);
  let endPage = Math.min(startPage + pagesToShow - 1, last_page);

  if (endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(endPage - pagesToShow + 1, 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});
  const months = [
  { name: 'January', value: 1 },
  { name: 'February', value: 2 },
  { name: 'March', value: 3 },
  { name: 'April', value: 4 },
  { name: 'May', value: 5 },
  { name: 'June', value: 6 },
  { name: 'July', value: 7 },
  { name: 'August', value: 8 },
  { name: 'September', value: 9 },
  { name: 'October', value: 10 },
  { name: 'November', value: 11 },
  { name: 'December', value: 12 }
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2015 + 2 }, (_, i) => currentYear - i + 1); // Create an array of years from currentYear to 1970

  function openModal() {
    editMode.value = false;
    isModalOpen.value = true;
  }
  
  function openModalEdit(dataInfo) {
    editMode.value = true;
    dataId.value = dataInfo.id;
    award_name.value = dataInfo.award_name;
    gift.value = dataInfo.gift;
    cash_price.value = dataInfo.cash_price;
    employee_id.value = dataInfo.employee_id;
    month.value = dataInfo.month;
    year.value = dataInfo.year;
   
    isModalOpen.value = true;
  }
  
  function openModalDelete(dataInfo) {
    dataId.value = dataInfo.id;
  
    isModalOpenDelete.value = true;
  }
  
 
  function closeModal() {
    isModalOpen.value = false;
    isModalOpenDelete.value = false;
    award_name.value = '';
    gift.value = '';
    cash_price.value = '';
    employee_id.value = '';
    month.value = '';
    year.value = '';

    dataId.value = null;
    editMode.value = false;
    nameError.value = false;
    nameErrorMessage.value = '';
    giftError.value = false;
    giftErrorMessage.value = '';
    cashPriceError.value = false;
    cashPriceErrorMessage.value = '';
   employeeError.value = false;
   employeeErrorMessage.value = '';
   monthError.value = false;
   monthErrorMessage.value = '';
   yearError.value = false;
   yearErrorMessage.value = '';
  }
  
 
  
  function handleBackdropClick(event) {
    if (event.target === modalBackdrop.value) {
      closeModal();
    }
  }
  
  async function fetchDataList(page = 1) {
  try {
    const token = window.localStorage.getItem("token");
    const config = { headers: { Authorization: "Bearer " + token } };
    const response = await axios.get(`/staff/v1/erp/award/get/list`, {
      params: { page, perPage: perPage.value, search: searchTerm.value },
      ...config,
    });
 if(perPage.value == 'all'){
  dataList.value = response.data;
 }else{
  dataList.value = response.data.data;
 }
   
    pagination.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
  
 
  
  function validateName() {
    if (!award_name.value || award_name.value.length === 0) {
      nameError.value = true;
      nameErrorMessage.value = 'Award Name Field cannot be empty';
      return false;
    } else {
      nameError.value = false;
      nameErrorMessage.value = '';
      return true;
    }
  }
  function validateGift() {
    if (!gift.value || gift.value.length === 0) {
      giftError.value = true;
      giftErrorMessage.value = 'Award gift Field cannot be empty';
      return false;
    } else {
      giftError.value = false;
      giftErrorMessage.value = '';
      return true;
    }
  }
  function validateCashPrice() {
    if (!cash_price.value || cash_price.value.length === 0) {
      cashPriceError.value = true;
      cashPriceErrorMessage.value = 'Award Cash Price Field cannot be empty';
      return false;
    } else {
      cashPriceError.value = false;
      cashPriceErrorMessage.value = '';
      return true;
    }
  }
  function validateEmployee() {
    if (!employee_id.value || employee_id.value.length === 0) {
      employeeError.value = true;
      employeeErrorMessage.value = 'Award employee Field cannot be empty';
      return false;
    } else {
      employeeError.value = false;
      employeeErrorMessage.value = '';
      return true;
    }
  }
  function validateMonth() {
    if (!month.value || month.value.length === 0) {
      monthError.value = true;
      monthErrorMessage.value = 'Award Month Field cannot be empty';
      return false;
    } else {
      monthError.value = false;
      monthErrorMessage.value = '';
      return true;
    }
  }
  function validateYear() {
    if (!year.value || year.value.length === 0) {
      yearError.value = true;
      yearErrorMessage.value = 'Award year Field cannot be empty';
      return false;
    } else {
      yearError.value = false;
      yearErrorMessage.value = '';
      return true;
    }
  }
 
  function formValidation(fieldName) {
    if (fieldName === 'submit') {
      const isNameValid = validateName();
      const isGiftValid = validateGift();
      const isCashPriceValid = validateCashPrice();
      const isEmployeeValid = validateEmployee();
      const isYearValid = validateYear();
      const isMonthValid = validateMonth();
      return isNameValid && isGiftValid && isCashPriceValid && isEmployeeValid && isMonthValid && isYearValid;
    } else if (fieldName === 'award_name') {
      validateName();
    }else if (fieldName === 'gift') {
      validateGift();
    }else if (fieldName === 'cash_price') {
      validateCashPrice();
    }else if (fieldName === 'employee_id') {
      validateEmployee();
    }
    else if (fieldName === 'month') {
      validateMonth();
    }else if (fieldName === 'year') {
      validateYear();
    }
  }
  
  async function submitForm() {
  if (formValidation('submit')) {
  
      const token = window.localStorage.getItem('token');
      if (!token) {
        console.error('Authentication token is missing.');
        // Optionally redirect to login or handle the missing token case
        toast.error('Authentication required. Please log in.');
        return;
      }
      const config = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      const payload = {
        award_name: award_name.value,
        gift: gift.value,
        cash_price: cash_price.value,
        employee_id: employee_id.value,
        month: month.value,
        year: year.value,
        dataId: dataId.value || null
      };
      const response = await axios.post('/staff/v1/erp/award/insert/update', payload, config);
      if (response.data.msgFlag) {
        toast.success(response.data.msg);
        await fetchDataList();
        closeModal();
      } else {
        toast.error(response.data.errMsg);
      }
   
  }
}

  
  async function deleteInfo() {
  
      const token = window.localStorage.getItem('token');
      if (!token) {
        console.error('Authentication token is missing.');
        return;
      }
      const config = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      const payload = {
        dataId: dataId.value || null
      };
      const response = await axios.post('/staff/v1/erp/award/delete', payload, config);
      if (response.data.msgFlag) {
        toast.success(response.data.msg);
        await fetchDataList();
        closeModal();
      } else {
        toast.error(response.data.errMsg);
      }
    
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
      };
      const response = await axios.get("/staff/v1/erp/award/get/employee/list", config);
      employeeList.value = response.data;
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };
  const fetchAllData = async () => {
  await fetchDataList();
  await fetchEmployeeList();
}
  onBeforeMount(fetchAllData);
  </script>
  
 
  <style scoped>
  .helper-text-product-add {
    color: red;
  }
  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    gap: 0.5rem;
  }
  
  button {
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    background-color: white;
    cursor: pointer;
  }
  
  button.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }
  
  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* span {
    padding: 0.5rem;
  } */
  
  </style>