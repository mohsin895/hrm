<template>
  <div class="loyel-erp-department mt-10 ml-10 mr-10 bg-white p-6">
    <div class="card w-full">
      <div class="p-2 mb-4">
        <div class="bg-customCyan hover:bg-hoverCyan p-2 w-48 cursor-pointer" @click="openModal">
          <span class="inline-flex items-center text-white">
            Add New Department
            <icon name="plus" size="15px" style="margin-left: 8px" />
          </span>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="border-collapse border border-slate-400 w-full min-w-max">
        <thead>
          <tr>
            <th class="border border-slate-300 h-10">Sr No.</th>
            <th class="border border-slate-300">Department Name</th>
            <th class="border border-slate-300">Designation</th>
            <th class="border border-slate-300">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dataInfo, index) in dataList" :key="dataInfo.id">
            <td class="border border-slate-300 pl-4 h-16 text-sm">{{ index + 1 }}</td>
            <td class="border border-slate-300 pl-4 text-sm">
              {{ dataInfo.deparmentName }}
            </td>
            <td class="border border-slate-300 pl-4 text-sm">
              <ul>
                <li v-for="(designation, idx) in dataInfo.designation_info" :key="designation.id">
                  {{ idx + 1 }}. {{ designation.designation }}
                </li>
              </ul>
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
      </div>
    </div>

    <!-- Modal Backdrop -->
    <div v-if="isModalOpen" ref="modalBackdrop" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start max-h-screen overflow-y-auto justify-center pt-20" @click="handleBackdropClick">
      <!-- Modal -->
      <div class="bg-white shadow-lg w-full max-w-lg " @click.stop>
        <div class="flex justify-between items-center p-6 mb-4 border-b border-gray-200 modal-header">
          <h2 class="text-xl inline-flex items-center font-semibold">
            <span v-if="editMode"> <icon name="pencil" size="15px" style="margin-right: 8px" /></span><span v-else> <icon name="plus" size="15px" style="margin-right: 8px" /></span>
            {{ editMode ? 'Edit Department' : 'Add New Department' }}
          </h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200">
            &times;
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="pl-6 pr-6 modal-body">
            <div class="mb-4">
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
            </div>
            <table>
              <thead>
                <tr>
                  <th class="text-start">  <span :class="{ 'text-red-500': designationError }">Designation</span></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(field, index) in fields" :key="index" class="mb-4">
                  <td>
                    <input
                      v-model="field.designation"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      :placeholder="'Designation # ' + (index + 1)"
                      :style="{ border: designationError ? '1px solid red' : '1px solid #CED4DA' }"
                      @keyup="validateDesignation(index)"/>
                    <input v-model="field.designationId" type="hidden" />

                    <div v-if="field.error" class="text-red-500 text-xs mt-1">{{ field.error }}</div>
                  </td>
                  <td>


                    <span v-if="editMode">
                 

                    <button
                    v-if="index === 0"
                    @click="addField"
                    type="button"
                    class="bg-customCyan 500 ml-4 mt-4 hover:bg-hoverCyan text-white font-bold py-2 px-4  mb-4"
                  >

                  <span class="inline-flex items-center text-white">  Add Field <icon
                          name="plus"
                          size="15px"
                          style="margin-left: 8px"
                        /></span>
                  
                  </button>
                  <button
            v-else-if="!field.designationId "
            @click="removeField(index)"
            type="button"
            class="bg-red-500 ml-4 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 mb-4"
          >
            <span class="inline-flex items-center text-white">
              Remove
              <icon name="minus" size="15px" style="margin-left: 8px" />
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
              <icon name="trash" size="15px" style="margin-left: 8px" />
            </span>
          </button>
                  </span>
                  <span v-else>
                    <button
                    v-if="index === 0"
                    @click="addField"
                    type="button"
                    class="bg-customCyan 500 ml-4 mt-4 hover:bg-hoverCyan text-white font-bold py-2 px-4  mb-4"
                  >

                  <span class="inline-flex items-center text-white">  Add Field <icon
                          name="plus"
                          size="15px"
                          style="margin-left: 8px"
                        /></span>
                  
                  </button>
                  <button
                    v-else
                    @click="removeField(index)"
                    type="button"
                    class="bg-red-500 ml-4 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4  mb-4"
                  >
                  <span class="inline-flex items-center text-white">  Remove <icon
                          name="minus"
                          size="15px"
                          style="margin-left: 8px"
                        /></span>
                  </button>
                  
                  </span>
                    <div v-if="field.error" class="text-red-500 text-xs mt-1"> &nbsp;</div>
                  </td>
                </tr>
              </tbody>
            </table>
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
              Are you sure you want to delete this department:
              <span class="font-bold">{{ departmentName }}?</span>
            </span>
            <div class="bg-deleteColor p-4 border-l-8 border-borderColor">
              <span class="font-bold ">Note:</span> All the
              <span class="font-bold">employees</span> associated with this department will also be deleted.
            </div>
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
    <div v-if="isModalOpenDeleteDesignation" ref="modalBackdropDesignation" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start justify-center pt-20" @click="handleBackdropClickDesignation">
      <!-- Modal -->
      <div class="bg-white shadow-lg w-full max-w-2xl" @click.stop>
        <div class="flex justify-between items-center p-6 mb-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold">Confirmation</h2>
          <button @click="closeModalDesignation" class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200">
            &times;
          </button>
        </div>
        <form @submit.prevent="deleteInfoDesignation">
          <div class="modal-body p-6">
            <span>
              Are you sure you want to delete this Designation:
              <span class="font-bold">{{ designation }}?</span>
              <input type="text" v-model="designationId" />
            </span>
            <div class="bg-deleteColor p-4 border-l-8 border-borderColor">
              <span class="font-bold ">Note:</span> All the
              <span class="font-bold">employees</span> associated with this Designation will also be deleted.
            </div>
          </div>
          <div class="border-t border-gray-200">
            <div class="flex items-end justify-end space-x-4 p-6">
              <button @click="closeModalDesignation" class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right" type="button">
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
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const isModalOpen = ref(false);
const isModalOpenDelete = ref(false);
const modalBackdrop = ref(null);
const isModalOpenDeleteDesignation =ref(false);
const modalBackdropDesignation = ref(null);
const departmentName = ref('');
const fields = ref([{ designation: '', designationId: '', error: '' }]);
const dataList = ref([]);
const dataId = ref(null);
const designationId = ref(null);
const designation=ref(null);
const editMode = ref(false);
const nameError = ref(false);
const designationError = ref(false);
const nameErrorMessage = ref('');

function openModal() {
  editMode.value = false;
  isModalOpen.value = true;
}

function openModalEdit(dataInfo) {
  editMode.value = true;
  dataId.value = dataInfo.id;
  departmentName.value = dataInfo.deparmentName;
  fields.value = dataInfo.designation_info.map(designation => ({
    designation: designation.designation,
    designationId: designation.id
  }));
  isModalOpen.value = true;
}

function openModalDelete(dataInfo) {
  dataId.value = dataInfo.id;
  departmentName.value = dataInfo.deparmentName;
  isModalOpenDelete.value = true;
}

function openModalDeleteDesignation(dataInfo){
  // console.log(dataInfo);
  designationId.value=dataInfo.designationId;
  designation.value=dataInfo.designation;
  isModalOpenDeleteDesignation.value=true;
}
function closeModal() {
  isModalOpen.value = false;
  isModalOpenDelete.value = false;
 
  departmentName.value = '';
  fields.value = [{ designation: '', designationId: '',error: '' }];
  dataId.value = null;
  editMode.value = false;
  nameError.value = false;
  designationError.value = false;
  nameErrorMessage.value = '';
}

 function closeModalDesignation(){
  isModalOpenDeleteDesignation.value=false;
 }

function handleBackdropClick(event) {
  if (event.target === modalBackdrop.value) {
    closeModal();
  }
}

function handleBackdropClickDesignation(event) {
  if (event.target === modalBackdropDesignation.value) {
    closeModalDesignation();
  }
}
function addField() {
  fields.value.push({ designation: '', designationId: '' });
}

function removeField(index) {
  fields.value.splice(index, 1);
}

const fetchDataList = async () => {
  try {
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
    const response = await axios.get('/staff/v1/erp/department/get/list', config);
    dataList.value = response.data;
  } catch (error) {
    console.error('Error fetching department data:', error);
  }
};

function validateName() {
  if (!departmentName.value || departmentName.value.length === 0) {
    nameError.value = true;
    nameErrorMessage.value = 'Department Name Field cannot be empty';
    return false;
  } else {
    nameError.value = false;
    nameErrorMessage.value = '';
    return true;
  }
}
function validateDesignation(index) {
  if (!fields.value[index].designation || fields.value[index].designation.trim().length === 0) {
    fields.value[index].error = 'Designation cannot be empty';
    designationError.value = true;
  } else {
    designationError.value = false;
    fields.value[index].error = '';
  }
}
function formValidation(fieldName) {
  if (fieldName === 'submit') {
    const isNameValid = validateName();
    return isNameValid;
  } else if (fieldName === 'departmentName') {
    validateName();
  }
}

async function submitForm() {
  let isValid = true;

fields.value.forEach((field, index) => {
  validateDesignation(index);
  if (field.error) {
    isValid = false;
  }
});
  if (formValidation('submit') && isValid) {

    try {
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
        departmentName: departmentName.value,
        designations: fields.value.map(field => field.designation),
        designationId: fields.value.map(field => field.designationId),
        dataId: dataId.value || null
      };
      const response = await axios.post('/staff/v1/erp/department/insert/update', payload, config);
      if (response.data.msgFlag) {
        toast.success(response.data.msg);
        await fetchDataList();
        closeModal();
      } else {
        toast.error(response.data.errMsg);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting the form.');
    }
  }
}

async function deleteInfo() {
  try {
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
    const response = await axios.post('/staff/v1/erp/department/delete', payload, config);
    if (response.data.msgFlag) {
      toast.success(response.data.msg);
      await fetchDataList();
      closeModal();
    } else {
      toast.error(response.data.errMsg);
    }
  } catch (error) {
    console.error('Error deleting department:', error);
    toast.error('An error occurred while deleting the department.');
  }
}


async function deleteInfoDesignation() {
  try {
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
      dataId: designationId.value || null
    };
    const response = await axios.post('/staff/v1/erp/department/designation/delete', payload, config);
    if (response.data.msgFlag) {
      toast.success(response.data.msg);

      fields.value = fields.value.filter(field => field.designationId !== designationId.value);
      await fetchDataList();
      closeModalDesignation();
    } else {
      toast.error(response.data.errMsg);
    }
  } catch (error) {
    console.error('Error deleting designation:', error);
    toast.error('An error occurred while deleting the designation.');
  }
}
onMounted(fetchDataList);
</script>

<style scoped>
.helper-text-product-add {
  color: red;
}
</style>
