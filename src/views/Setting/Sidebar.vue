<template>
  <div class="loyel-erp-award mt-10 ml-10 mr-10 bg-white p-6">
    <div class="erp-body flex min-h-screen pt-11">
      <div class="right-side hidden lg:block bg-rightBarColor email-sidebar">
        <div class="right-nav w-52  text-white mt-5">
          <ul>
            <li
              class="h-10 py-2 border-b-2 border-gray-500 cursor-pointer"
              v-on:click="activetab = '1'"
              v-bind:class="[activetab === '1' ? 'active' : '']"
            >
              <span class="ml-4"> General Setting </span>
            </li>
            <li
              class="h-10 py-2 border-b-2 border-gray-500 cursor-pointer"
              v-on:click="activetab = '2'"
              v-bind:class="[activetab === '2' ? 'active' : '']"
            >
              <span class="ml-4"> Attendance Setting </span>
            </li>
            <li
              class="h-10 py-2 border-b-2 border-gray-500 cursor-pointer"
              v-on:click="activetab = '3'"
              v-bind:class="[activetab === '3' ? 'active' : '']"
            >
              <span class="ml-4"> Notification Setting </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="left-side bg-bodyColor w-full">
        <GeneralSetting v-if="activetab === '1'" />
        <Attendance v-if="activetab === '2'" />
        <Notification v-if="activetab === '3'" />
      </div>
    </div>

    <!-- Modal Backdrop -->

    <!-- Designation Delete -->
  </div>
</template>
    
    <script setup>
import Attendance from "./Attendance.vue";
import GeneralSetting  from "./GeneralSetting.vue";
import Notification from "./Notification.vue";
import axios from "axios";
import { ref, onBeforeMount } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const activetab = ref("1");
const description = ref("");
const dataList = ref([]);
const employeeList = ref([]);
const dataId = ref(null);

const nameError = ref(false);

const nameErrorMessage = ref("");

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
      "/staff/v1/erp/noticeboard/get/list",
      config
    );
    dataList.value = response.data;
  } catch (error) {
    console.error("Error fetching noticeboard data:", error);
  }
};

function validateName() {
  if (!title.value || title.value.length === 0) {
    nameError.value = true;
    nameErrorMessage.value = "Department Name Field cannot be empty";
    return false;
  } else {
    nameError.value = false;
    nameErrorMessage.value = "";
    return true;
  }
}

function formValidation(fieldName) {
  if (fieldName === "submit") {
    const isNameValid = validateName();
    return isNameValid;
  } else if (fieldName === "title") {
    validateName();
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
        title: title.value,
        description: description.value,

        dataId: dataId.value || null,
      };
      const response = await axios.post(
        "/staff/v1/erp/noticeboard/insert/update",
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
}

const fetchAllData = async () => {
  await fetchDataList();
};
onBeforeMount(fetchAllData);
</script>
    
    <style scoped>
.helper-text-product-add {
  color: red;
}
.active {
  background: red;
}
.email-sidebar {


    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1);
    position: relative;
    z-index: 6;
    padding: 15px;
    height: calc(100% - 3.9375rem);
}
</style>
    