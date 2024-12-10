<template>
  <div class="loyel-erp-award mt-10 ml-10 mr-10 p-6">
    <div class="flex flex-col md:flex-row gap-2">
      <!-- Login Details Form -->
      <div class="p-2 mb-4 basis-1/2 bg-white">
        <div class="border-b-2 border-borderBottom h-10">
          <span class="ml-4">Login Details</span>
        </div>
        <form @submit.prevent="emailChange()">
          <div class="flex flex-col sm:flex-row gap-4 mb-4 mt-4 p-4">
            <div class="w-full sm:w-3/12 flex items-center">
              Login Email<span class="text-3xl text-red-500 ml-2">*</span>
            </div>
            <div class="flex-grow">
              <input
                type="email"
                v-model="myForm.email"
                class="appearance-none border border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                @keyup="formEmailValidation('email')"
              />
              <div class="text-red-500 text-xs mt-1">{{ myForm.emailErrorMessage }}</div>
            </div>
          </div>
          <div class="border-t border-gray-200 modal-footer">
            <div class="p-6 flex items-end justify-end space-x-4">
              <button
                class="bg-customCyan flex hover:bg-hoverCyan text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                <icon name="check" size="15px" class="mr-2" /> Update
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Change Password Form -->
      <div class="p-2 mb-4 basis-1/2 bg-white">
        <div class="border-b-2 border-borderBottom h-10">
          <span class="ml-4">Change Password</span>
        </div>
        <form @submit.prevent="changePassword()">
          <div class="flex flex-col sm:flex-row gap-4 mb-4 mt-4 p-4">
            <div class="w-full sm:w-5/12 flex items-center">
              Password<span class="text-3xl text-red-500 ml-2">*</span>
            </div>
            <div class="flex-grow">
              <input
                type="password"
                v-model="myForm.password"
                class="appearance-none border border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
              <div class="text-red-500 text-xs mt-1">{{ myForm.passwordErrorMessage }}</div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 mb-4 mt-4 p-4">
            <div class="w-full sm:w-5/12 flex items-center">
              Confirm Password<span class="text-3xl text-red-500 ml-2">*</span>
            </div>
            <div class="flex-grow">
              <input
                type="password"
                v-model="myForm.confirmPassword"
                class="appearance-none border border-gray-700 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
              <div class="text-red-500 text-xs mt-1">{{ myForm.confirmPasswordErrorMessage }}</div>
            </div>
          </div>
          <div class="border-t border-gray-200 modal-footer">
            <div class="p-6 flex items-end justify-end space-x-4">
              <button
                class="bg-customCyan flex hover:bg-hoverCyan text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                <icon name="check" size="15px" class="mr-2" /> Update
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
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useGlobalStore } from "@/store/global.js";
import { eventBus } from "@/eventBus.js";

const toast = useToast();
const globalStore = useGlobalStore();
const staffInfo = globalStore.staffInfo;

const myForm = ref({
  email: staffInfo?.email || "",
  password: "",
  confirmPassword: "",
  emailErrorMessage: "",
  passwordErrorMessage: "",
  confirmPasswordErrorMessage: "",
  dataId: staffInfo?.id,
});

function validateEmail() {
  if (!myForm.value.email) {
    myForm.value.emailErrorMessage = "Email field cannot be empty";
    return false;
  }
  myForm.value.emailErrorMessage = "";
  return true;
}

function validatePassword() {
  if (!myForm.value.password || myForm.value.password.length < 6) {
    myForm.value.passwordErrorMessage = "Password must be at least 6 characters";
    return false;
  }
  myForm.value.passwordErrorMessage = "";
  return true;
}

function validateConfirmPassword() {
  if (myForm.value.confirmPassword !== myForm.value.password) {
    myForm.value.confirmPasswordErrorMessage = "Passwords do not match";
    return false;
  }
  myForm.value.confirmPasswordErrorMessage = "";
  return true;
}

function formEmailValidation() {
  validateEmail();
}

async function emailChange() {
  if (!validateEmail()) return;

  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "/staff/v1/erp/update/email",
      { email: myForm.value.email, dataId: myForm.value.dataId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.data.msgFlag) {
      toast.success(response.data.msg);
      eventBus.emit("staffInfo", response.data.staffInfo);
      localStorage.setItem("staffInfo", JSON.stringify(response.data.staffInfo));
    } else {
      toast.error(response.data.errMsg);
    }
  } catch (error) {
    toast.error("Something went wrong. Please try again.");
  }
}

async function changePassword() {
  if (!validatePassword() || !validateConfirmPassword()) return;
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "/staff/v1/erp/update/password",
      {
        newPassword: myForm.value.password,
        conPassword: myForm.value.confirmPassword,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.data.msgFlag) {
      toast.success(response.data.msg);
    } else {
      toast.error(response.data.errMsg);
    }
  } catch (error) {
    toast.error("Something went wrong. Please try again.");
  }
}

</script>

<style scoped>
/* Add your scoped CSS styles */
</style>
