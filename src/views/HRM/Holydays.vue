<template>
  <div class="loyel-erp-department mt-10 ml-10 mr-10 bg-white p-6">
    <div class="card w-full">
      <div class="p-2 mb-4">
        <div
          class="bg-customCyan hover:bg-hoverCyan p-2 w-44 cursor-pointer"
          @click="openModal"
        >
          <span class="inline-flex items-center text-white">
            Add New Holydays
            <icon name="plus" size="15px" style="margin-left: 8px" />
          </span>
        </div>
      </div>
      <div class="overflow-x-auto">
        <div class="flex space-x-4">
          <div class="w-64">
            <div class="inline-flex items-center bg-customCyan mb-2">
              <icon name="calendar-days" size="15px" class="mr-1 ml-4" style="background: #e0eaf0 !important" />
              <select id="year" v-model="year" @change="fetchDataList()" class="w-56 pl-1 text-white bg-customCyan border-customCyan h-10">
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>
            <ul>
              <li
                v-for="month in months"
                :key="month"
                :class="['h-10 py-2 border-b-2 border-white-500 cursor-pointer', showHolyday === month ? 'bg-selected-month text-selected-color' : 'bg-holybg text-holyColor hover:bg-holyHoverColor']"
                @click="showHoliday(month)"
              >
                <span class="ml-4 inline-flex items-center">
                  <icon name="calendar-days" size="15px" class="mt-1 mr-2" style="background: #e0eaf0 !important" />
                  <span>{{ month }}</span>
                </span>
              </li>
            </ul>
          </div>
          <div class="w-full">
            <div v-if="holidaysByMonth[showHolyday]">
              <h1 class="text-2xl mb-4 bg-blue-600 h-10 "><span class="ml-2">{{ showHolyday }} {{ year }}</span></h1>
              <table class="border-collapse border border-slate-400 w-full min-w-max">
                <thead>
                  <tr>
                    <th class="border border-slate-300 h-10">Sr No.</th>
                    <th class="border border-slate-300">Date</th>
                    <th class="border border-slate-300">Occasion</th>
                    <th class="border border-slate-300">Day</th>
                    <th class="border border-slate-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(holiday, index) in holidaysByMonth[showHolyday].date" :key="index">
                    <td class="border border-slate-300 pl-4 h-16 text-sm">{{ index + 1 }}</td>
                    <td class="border border-slate-300 pl-4 text-sm">{{ holiday }}</td>
                    <td class="border border-slate-300 pl-4 text-sm">{{ holidaysByMonth[showHolyday].ocassion[index] }}</td>
                    <td class="border border-slate-300 pl-4 text-sm">{{ holidaysByMonth[showHolyday].day[index] }}</td>
                    <td class="border border-slate-300 pl-4">
                      <span class="inline-flex items-center">
                        <span class="p-2 cursor-pointer inline-flex items-center text-xs bg-red-500 ml-4 hover:bg-red-700 text-white" @click="openModalDelete(holidaysByMonth[showHolyday].id[index], holiday)">
                          <icon name="trash" size="15px" class="mr-2" />
                          Delete
                        </span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>
              <h1 class="text-2xl mb-4 bg-blue-600 h-10 "><span class="ml-2">{{ showHolyday }} {{ year }}</span></h1>
              <p>No holidays for {{ showHolyday }} &nbsp;{{ year }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isModalOpen"
      ref="modalBackdrop"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start max-h-screen overflow-y-auto justify-center pt-20"
      @click="handleBackdropClick"
    >
      <!-- Modal -->
      <div class="bg-white shadow-2xl w-full max-w-2xl" @click.stop>
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
        <form @submit.prevent="submitForm">
          <div class="pl-6 pr-6 modal-body">
            <!-- <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="departmentName">
                  <span :class="{ 'text-red-500': nameError }">Department</span>
                </label>
                <input
                  v-model="departmentName"
                  type="text"
                  class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Department Name"
                  :style="{ border: nameError ? '1px solid red' : '1px solid #CED4DA' }"
                  @keyup="formValidation('departmentName')"
                />
                <div class="text-red-500 text-xs mt-1">{{ nameErrorMessage }}</div>
              </div> -->
            <table>
              <thead>
                <tr>
                  <th class="text-start">Date</th>
                  <th class="text-start mr-4">Occasion</th>
                  <th>Action</th>
                </tr>
              </thead>
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
                  <td>
                    <input
                      v-model="field.occassion"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      :placeholder="'Occasion # ' + (index + 1)"
                      :style="{
                        border: occasionError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="validateHolydaysOccasion(index)"
                    />

                    <div v-if="field.error1" class="text-red-500 text-xs mt-1">
                      {{ field.error1 }}
                    </div>
                  </td>
                  <td>
                    <span v-if="editMode">
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
                        v-else-if="!field.designationId"
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
                          />
                        </span>
                      </button>
                      <button
                        v-else
                        @click="openModalDeleteDesignation(field)"
                        type="button"
                        class="bg-red-500 ml-4 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 mb-4"
                      >
                        <span class="inline-flex items-center text-white">
                          Delete
                          <icon
                            name="trash"
                            size="15px"
                            style="margin-left: 8px"
                          />
                        </span>
                      </button>
                    </span>
                    <span v-else>
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
                    </span>
                    <div v-if="field.error" class="text-red-500 text-xs mt-1">
                      &nbsp;
                    </div>
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
            <span>
              Are you sure you want to remove holiday on following date:<span class="font-bold">{{ holiday }}</span> &nbsp;?
              <span class="font-bold">{{ date }}</span>
            </span>
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
  </div>
</template>


<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const isModalOpen = ref(false);
const isModalOpenDelete = ref(false);
const modalBackdrop = ref(null);
const holiday = ref(null);
const showHolyday = ref(null);
const fields = ref([{ date: "", occassion: "", error: "", error1: "" }]);
const dataList = ref([]);
const dataId = ref(null);
const date = ref("");
const editMode = ref(false);
const nameError = ref(false);
const dateError = ref(false);
const occasionError = ref(false);
const year = ref(new Date().getFullYear());
const holidaysByMonth = ref({});

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const showHoliday = (month) => {
  showHolyday.value = month;
};

const currentYear = new Date().getFullYear() + 1;
const years = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => currentYear - i);
function openModal() {
  editMode.value = false;
  isModalOpen.value = true;
}

function openModalDelete(dataInfo,holidayName) {

  dataId.value = dataInfo;
  holiday.value=holidayName;
  isModalOpenDelete.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  isModalOpenDelete.value = false;

  fields.value = [{ date: "", occassion: "", error: "", error1: "" }];
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
  fields.value.push({ date: "", occassion: "" });
}

function removeField(index) {
  fields.value.splice(index, 1);
}
async function fetchDataList() {
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
    const response = await axios.get(`/staff/v1/erp/holydays/get/list?year=${year.value}`, config);
    holidaysByMonth.value = response.data.holidays;

    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    showHoliday(currentMonth);
  } catch (error) {
    console.error("Error fetching holydays data:", error);
  }
}

function validateHolydays(index) {
  if (!fields.value[index].date || fields.value[index].date.trim().length === 0) {
    fields.value[index].error = "Date cannot be empty";
    dateError.value = true;
  } else {
    dateError.value = false;
    fields.value[index].error = "";
  }
}

function validateHolydaysOccasion(index) {
  if (!fields.value[index].occassion || fields.value[index].occassion.trim().length === 0) {
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
    fields.value.forEach((field) => {
      formData.append("date[]", field.date);
      formData.append("occassion[]", field.occassion);
    });

    const response = await axios.post("/staff/v1/erp/holydays/insert/update", formData, config);

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
    const payload = { dataId: dataId.value || null };
    const response = await axios.post("/staff/v1/erp/holydays/delete", payload, config);
    if (response.data.msgFlag) {
      toast.success(response.data.msg);
      await fetchDataList();
      closeModal();
    } else {
      toast.error(response.data.errMsg);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
    toast.error("An error occurred while deleting data.");
  }
}

onMounted(() => {
  fetchDataList();
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
