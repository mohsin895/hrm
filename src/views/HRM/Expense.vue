<template>
  <div class="loyel-erp-award mt-10 ml-10 mr-10 bg-white p-6">
    <div class="card w-full">
      <div class="p-2 mb-4">
        <div
          class="bg-customCyan hover:bg-hoverCyan p-2 w-44 cursor-pointer"
          @click="openModal"
        >
          <span class="inline-flex items-center text-white">
            Add New Expense
            <icon name="plus" size="15px" style="margin-left: 8px" />
          </span>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="border-collapse border border-slate-400 w-full min-w-max">
        <thead>
          <tr>
            <th class="border border-slate-300 h-10">Sr No.</th>
            <th class="border border-slate-300">Item</th>
            <th class="border border-slate-300">Purches From</th>
            <th class="border border-slate-300">Date</th>
            <th class="border border-slate-300">Employee</th>
            <th class="border border-slate-300">Price</th>
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
              {{ dataInfo.item_name }}
            </td>

            <td class="border border-slate-300 pl-4 text-sm">
              {{ dataInfo.purchase_from }}
            </td>
            <td class="border border-slate-300 pl-4 text-sm">
              {{ dataInfo.purchase_date }}
            </td>
            <td class="border border-slate-300 pl-4 text-sm">
                {{ dataInfo.employee.full_name }}
            </td>
            <td class="border border-slate-300 pl-4 text-sm">
              {{ dataInfo.price }} 
            </td>
            <td class="border border-slate-300 pl-4 text-sm">
              {{ dataInfo.month }} &nbsp; {{ dataInfo.year }}
            </td>

            <td class="border border-slate-300 pl-4">
              <span class="inline-flex items-center">
                <span
                  class="p-2 cursor-pointer mr-6 inline-flex items-center text-xs bg-purpoleCus hover:bg-purpoleCusHover text-white"
                  @click="openModalEdit(dataInfo)"
                >
                  <icon name="pencil" size="15px" style="margin-right: 10px" />
                  View/Edit
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
            <span v-if="editMode">
              <icon name="pencil" size="15px" style="margin-right: 8px" /></span
            ><span v-else>
              <icon name="plus" size="15px" style="margin-right: 8px"
            /></span>
            {{ editMode ? "Edit Award" : "Add New Award" }}
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
                <span :class="{ 'text-red-500': nameError }">Item Name</span>
              </label>
              <input
                v-model="item_name"
                type="text"
                class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="Item Name"
                :style="{
                  border: nameError ? '1px solid red' : '1px solid #CED4DA',
                }"
                @keyup="formValidation('item_name')"
              />
              <div class="text-red-500 text-xs mt-1">
                {{ nameErrorMessage }}
              </div>
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="giftName"
              >
                <span :class="{ 'text-red-500': purchaseFromError }">Purches From</span>
              </label>
              <input
                v-model="purchase_from"
                type="text"
                class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="Purches From"
                :style="{
                  border: purchaseFromError ? '1px solid red' : '1px solid #CED4DA',
                }"
                @keyup="formValidation('purchase_from')"
              />
              <div class="text-red-500 text-xs mt-1">
                {{ purchaseFromErrorMessage }}
              </div>
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="giftName"
              >
                <span :class="{ 'text-red-500': dateError }">Date</span>
              </label>
              <input
                v-model="purchase_date"
                type="date"
                class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="Purches From"
                :style="{
                  border: dateError ? '1px solid red' : '1px solid #CED4DA',
                }"
                @change="handleDateChange"
                @keyup="formValidation('purchase_date')"
              />
              <div class="text-red-500 text-xs mt-1">
                {{ dateErrorMessage }}
              </div>
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="cashPrize"
              >
                <span :class="{ 'text-red-500': priceError }"> Price</span>
              </label>
              <input
                v-model="price"
                type="text"
                class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="Price"
                :style="{
                  border: priceError ? '1px solid red' : '1px solid #CED4DA',
                }"
                @keyup="formValidation('price')"
              />
              <div class="text-red-500 text-xs mt-1">
                {{ priceErrorMessage }}
              </div>
            </div>

            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="departmentName"
              >
                <span :class="{ 'text-red-500': employeeError }">Paid By</span>
              </label>
              <select
                v-model="employee_id"
                :style="{
                  border: employeeError ? '1px solid red' : '1px solid #CED4DA',
                }"
                @keyup="formValidation('employee_id')"
                @change="handleEmployeeChange"
                class="block h-9 w-full border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              >
                <option
                  v-for="employee in employeeList"
                  :key="employee.id"
                  :value="employee.id"
                >
                  {{ employee.full_name }}&nbsp;(EmpId:{{
                    employee.employeeID
                  }})
                </option>
              </select>
              <div class="text-red-500 text-xs mt-1">
                {{ employeeErrorMessage }}
              </div>
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="departmentName"
              >
                <span :class="{ 'text-red-500': nameError }">Attach Bill:</span>
              </label>

              <input
                type="file"
                @change="handleFileChange()"
                class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                placeholder="Department Name"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="departmentName"
              >
                <span :class="{ 'text-red-500': statusError }">Status</span>
              </label>

              <div class="col-md-6">
                <div class="radio-list">
                  <label class="radio-inline">
                    <input
                      type="radio"
                      v-model="status"
                   @change="handleStatusChange"
                      :value="1"
                      
                      @keyup="formValidation('status')"/>
                    Approved</label
                  >
                  &nbsp;&nbsp;
                  <label class="radio-inline"
                    ><input
                      type="radio"
                      v-model="status"
                     @keyup="formValidation('status')"
                      :value="2"
                     @change="handleStatusChange"
                    />
                    Pending
                  </label>
                </div>
              </div>

              <div class="text-red-500 text-xs mt-1">
                {{ statusErrorMessage }}
              </div>
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
              >
                <span class="inline-flex items-center text-white">
                  <span v-if="editMode">
                    <icon
                      name="pencil"
                      size="15px"
                      style="margin-right: 8px" /></span
                  ><span v-else>
                    <icon name="check" size="15px" style="margin-right: 8px"
                  /></span>

                  {{ editMode ? "Update" : "Submit" }}
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
            <span> Are you sure you want to delete this Expense: </span>
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
const item_name = ref("");
const employee_id = ref("");
const purchase_from=ref("");
const purchase_date = ref("");
const price = ref("");
const status= ref('')
const dataList = ref([]);
const employeeList = ref([]);
const dataId = ref(null);
const editMode = ref(false);
const nameError = ref(false);
const purchaseFromError=ref(false);
const dateError =ref(false);
const nameErrorMessage = ref("");
const purchaseFromErrorMessage=ref("");
const dateErrorMessage=ref("");
const priceError= ref(false);
const priceErrorMessage= ref(" ");
const employeeError= ref(false);
const employeeErrorMessage= ref(" ");
const statusError= ref(false);
const statusErrorMessage= ref(" ");

const attachedBill = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    attachedBill.value = file;
    nameError.value = false;
  } else {
    attachedBill.value = null;
  }
};
function openModal() {
  editMode.value = false;
  isModalOpen.value = true;
}

function openModalEdit(dataInfo) {
  editMode.value = true;
  dataId.value = dataInfo.id;
  item_name.value = dataInfo.item_name;
  price.value = dataInfo.price;
  purchase_from.value = dataInfo.purchase_from;
  employee_id.value = dataInfo.employee_id;
 purchase_date.value = dataInfo.	purchase_date;
  status.value = dataInfo.status;

  isModalOpen.value = true;
}

function openModalDelete(dataInfo) {
  dataId.value = dataInfo.id;

  isModalOpenDelete.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  isModalOpenDelete.value = false;
  item_name.value = "";
  price.value = "";
  status.value = "";
  employee_id.value = "";
  purchase_from.value = "";
  purchase_date.value = "";

  dataId.value = null;
  editMode.value = false;
  nameError.value = false;
  nameErrorMessage.value = "";
  purchaseFromError.value = false;
  purchaseFromErrorMessage.value = "";
  dateError.value = false;
  dateErrorMessage.value = "";
  priceError.value = false;
  priceErrorMessage.value = "";
  employeeError.value = false;
  employeeErrorMessage.value = "";
  statusError.value = false;
  statusErrorMessage.value = "";
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
    const response = await axios.get("/staff/v1/erp/expense/get/list", config);
    dataList.value = response.data;
  } catch (error) {
    console.error("Error fetching expense data:", error);
  }
};

function validateName() {
  if (!item_name.value || item_name.value.length === 0) {
    nameError.value = true;
    nameErrorMessage.value = "Item Name Field cannot be empty";
    return false;
  } else {
    nameError.value = false;
    nameErrorMessage.value = "";
    return true;
  }
}
function validatePurchaseFrom() {
  if (!purchase_from.value || purchase_from.value.length === 0) {
    purchaseFromError.value = true;
    purchaseFromErrorMessage.value = "Item Purchase Field cannot be empty";
    return false;
  } else {
    purchaseFromError.value = false;
    purchaseFromErrorMessage.value = "";
    return true;
  }
}
function validateDate() {
  if (!purchase_date.value || purchase_date.value.length === 0) {
    dateError.value = true;
    dateErrorMessage.value = "Item Purchase Date Field cannot be empty";
    return false;
  } else {
    dateError.value = false;
    dateErrorMessage.value = "";
    return true;
  }
}
function handleDateChange() {
  dateError.value = false;
  dateErrorMessage.value = "";
}
function validatePrice() {
  if (!price.value || price.value.length === 0) {
    priceError.value = true;
    priceErrorMessage.value = "Item Purchase price Field cannot be empty";
    return false;
  } else {
    priceError.value = false;
    priceErrorMessage.value = "";
    return true;
  }
}
function validateEmployee() {
  if (!employee_id.value || employee_id.value.length === 0) {
    employeeError.value = true;
    employeeErrorMessage.value = "Employee Field cannot be empty";
    return false;
  } else {
    employeeError.value = false;
    employeeErrorMessage.value = "";
    return true;
  }
}
function handleEmployeeChange() {
  employeeError.value = false;
  employeeErrorMessage.value = "";
}
function validateStatus() {
  if (!status.value) {
    statusError.value = true;
    statusErrorMessage.value = "Status Field cannot be empty";
    return false;
  } else {
    statusError.value = false;
    statusErrorMessage.value = "";
    return true;
  }
}
function handleStatusChange() {
  statusError.value = false;
  statusErrorMessage.value = "";
}
function formValidation(fieldName) {
  if (fieldName === "submit") {
    const isNameValid = validateName();
    const isPurchaseFromValid = validatePurchaseFrom();
    const isDateValid = validateDate();
    const isPriceValid = validatePrice();
    const isEmployeeValid = validateEmployee();
    const isStatusValid = validateStatus();
    return isNameValid && isPurchaseFromValid && isDateValid && isPriceValid && isEmployeeValid && isStatusValid;
  } else if (fieldName === "item_name") {
    validateName();
  }
  else if (fieldName === "purchase_from") {
    validatePurchaseFrom();
  }else if (fieldName === "purchase_date") {
    validateDate();
  }else if (fieldName === "price") {
    validatePrice();
  }else if (fieldName === "employee_id") {
    validateEmployee();
  }else if (fieldName === "status") {
    validateStatus();
  }
}

async function submitForm() {
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
      const payload = {
        item_name: item_name.value,
        purchase_from: purchase_from.value,
        purchase_date: purchase_date.value,
        employee_id: employee_id.value,
        price: price.value,
        status: status.value,
        bill:attachedBill.value,
        dataId: dataId.value || null,
      };
      const response = await axios.post(
        "/staff/v1/erp/expense/insert/update",
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
      toast.error("An error occurred while submitting the form.");
    }
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
    const response = await axios.post("/staff/v1/erp/expense/delete", payload, config);
    if (response.data.msgFlag) {
      toast.success(response.data.msg);
      await fetchDataList();
      closeModal();
    } else {
      toast.error(response.data.errMsg);
    }
  } catch (error) {
    console.error("Error deleting expense:", error);
    toast.error("An error occurred while deleting the expense.");
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
};
onBeforeMount(fetchAllData);
</script>
  
  <style scoped>
.helper-text-product-add {
  color: red;
}
</style>
  