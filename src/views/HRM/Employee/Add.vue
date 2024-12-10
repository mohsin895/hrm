<template>
  <div class="loyel-erp-department">
    <div class="bg-white h-8 pl-5 py-1">
      <span class="text-black flex"
        ><router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
        <span class="inline-flex items-center text-cyneColor"
          ><icon name="circle" size="10px" class="ml-2 mr-2"
        /></span>
        <span><router-link :to="{ name: 'EmployeeList' }">Employees</router-link> </span
        ><span class="inline-flex items-center text-cyneColor"
          ><icon name="circle" size="10px" class="ml-2 mr-2"
        /></span>
        <span>Add Employee</span></span
      >
    </div>
    <div class="sm:ml-2 sm:mr-2 md:ml-10 md:mr-10">
      <div class="card w-full bg-white mt-4">
        <form @submit.prevent="submitForm">
          <div class="flex flex-col md:flex-row p-6">
            <div class="basis-1/2 mr-4">
              <div class="border-solid border-2 border-indigo-600 p-4">
                <div><span>Personal Details</span></div>
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Image</div>
                  <div class="flex-grow">
                    <!-- Image preview and file upload box -->
                    <div class="h-36 w-36 bg-black text-white flex items-center justify-center relative">
                      <!-- If no image is selected, show placeholder text -->
                      <span v-if="!imagePreview" class="text-center flex items-center justify-center h-full w-full">
                        Please Select Profile Image
                      </span>
                      
                      <!-- Show image preview if imagePreview exists -->
                      <img
                        v-if="imagePreview"
                        :src="imagePreview"
                        alt="Preview"
                        class="h-full w-full object-cover"
                      />

                      <!-- Delete button appears at the top right of the image -->
                      

                      <!-- Hidden file input -->
                      <input
                        type="file"
                        @change="handleFileChangeProfile"
                        class="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                    
                    <div class="mt-2">
                      <!-- Another delete button below the image -->
                      <button
                        v-if="imagePreview"
                        @click="removeImage"
                        class="bg-red-500 text-white px-3 py-1 rounded-md"
                      >
                        Delete Image
                      </button>
                    </div>
                  </div>

                </div>

                <!-- Name Section -->
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12 flex items-center">
                    Name <span class="text-3xl text-red-500 mt-2 ml-2">*</span>
                  </div>
                  <div class="flex-grow">
                    <input
                      type="text"
                      v-model="full_name"
                      :style="{
                        border: nameError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="formValidation('full_name')"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Employee  Name"
                    />
                    <div class="text-red-500 text-xs mt-1">
                      {{ nameErrorMessage }}
                    </div>
                  </div>
                  <br />
                </div>

                <!-- Father's Name Section -->
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12 flex items-center">
                    Father's Name<span class="text-3xl text-red-500 mt-2 ml-2">*</span>
                  </div>
                  <div class="flex-grow">
                    <input
                      type="text"
                      v-model="father_name"
                      :style="{
                        border: fatherNameError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="formValidation('father_name')"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Father's  Name"
                    />
                    <div class="text-red-500 text-xs mt-1">
                      {{ fatherNameErrorMessage }}
                    </div>
                  </div>
                </div>

                <!-- Date of Birth Section -->
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Date of Birth</div>
                  <div class="flex-grow">
                    <input
                      type="date"
                      v-model="dob"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    />
                  </div>
                </div>
                <!-- Gender Section -->
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Gender</div>
                  <div class="flex-grow">
                    <select
                      v-model="gender"
                      class="block h-9 w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <!-- Phone Section -->
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Phone<span class="text-3xl text-red-500 mt-2 ml-2">*</span></div>
                  <div class="flex-grow">
                    <input
                      type="text"
                      v-model="mobile_number"
                      :style="{
                        border: mobileNumberError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="formValidation('mobile_number')"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Phone Number"
                    />

                    <div class="text-red-500 text-xs mt-1">
                      {{ mobileNumberErrorMessage }}
                    </div>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Local Address</div>
                  <div class="flex-grow">
                    <textarea
                      id="local-address"
                      v-model="local_address"
                      rows="3"
                      class="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                </div>

                <!-- Permanent Address Section -->
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Permanent Address</div>
                  <div class="flex-grow">
                    <textarea
                      id="permanent-address"
                      v-model="permanent_address"
                      rows="3"
                      class="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                </div>
              </div>
              <!-- Image Section -->

              <div class="border-solid border-2 border-indigo-600 p-4 mt-4">
                <div><span>Documents</span></div>
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Resume</div>
                  <div class="flex-grow">
                    <input
                      type="file"
                      @change="handleFileChange($event, 'resume')"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Department Name"
                    />
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Offer Letter</div>
                  <div class="flex-grow">
                    <input
                      type="file"
                      @change="handleFileChange($event, 'offerLetter')"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Department Name"
                    />
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Joining Letter</div>
                  <div class="flex-grow">
                    <input
                      type="file"
                      @change="handleFileChange($event, 'joiningLetter')"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Department Name"
                    />
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Contract/Agreement</div>
                  <div class="flex-grow">
                    <input
                      type="file"
                      @change="handleFileChange($event, 'agreement')"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Department Name"
                    />
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">ID Proof</div>
                  <div class="flex-grow">
                    <input
                      type="file"
                      @change="handleFileChange($event, 'idProof')"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Department Name"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Section -->
            <div class="basis-1/2">
              <div class="border-solid border-2 border-indigo-600 p-4">
                <div><span>Company Details</span></div>

                <!-- Employee ID Section -->
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12 flex items-center">
                    Employee ID<span class="text-3xl text-red-500 mt-2 ml-2"
                      >*</span
                    >
                  </div>
                  <div class="flex-grow">
                    <input
                      type="text"
                      v-model="employeeID"
                      :style="{
                        border: employeeIdError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="formValidation('employeeID')"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      @input="validateInput($event)"
                      placeholder="Employee ID"
                    />
                    <div class="text-red-500 text-xs mt-1">
                      {{ employeeIdErrorMessage }}
                    </div>
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12 flex items-center">
                    Branch<span class="text-3xl text-red-500 mt-2 ml-2">*</span>
                  </div>
                  <div class="flex-grow">
                    <select
                      class="block h-9 w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        v-for="branch in branchList"
                        :key="branch.id"
                        :value="branch.id"
                      >
                        {{ branch.branchName }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12 flex items-center">
                    Department<span class="text-3xl text-red-500 mt-2 ml-2"
                      >*</span
                    >
                  </div>
                  <div class="flex-grow">
                    <select
                      class="block h-9 w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      @change="handleDepartmentChange"
                    >
                      <option>Please Select Department</option>
                      <option
                        v-for="dept in departmentList"
                        :key="dept.id"
                        :value="dept.id"
                      >
                        {{ dept.deparmentName }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Designation Section -->
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12 flex items-center">
                    Designation<span class="text-3xl text-red-500 mt-2 ml-2"
                      >*</span
                    >
                  </div>
                  <div class="flex-grow">
                    <select
                      v-model="designation"
                      :disabled="!selectedDepartment"
                      class="block h-9 w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option
                        v-for="(dataInfo, index) in designationListData"
                        :value="dataInfo.id"
                        :key="index"
                      >
                        {{ dataInfo.designation }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Date of Birth Section -->
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Date of Joining</div>
                  <div class="flex-grow">
                    <input
                      v-model="joining_date"
                      type="date"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    />
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Basic Salary</div>
                  <div class="flex-grow">
                    <input
                      v-model="basicSalary"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    />
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Hourly Rate</div>
                  <div class="flex-grow">
                    <input
                      v-model="hourlyRate"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    />
                  </div>
                </div>
                <!-- Date of Birth Section -->
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Exit Date</div>
                  <div class="flex-grow">
                    <input
                      v-model="exit_date"
                      type="date"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div class="border-solid border-2 border-indigo-600 p-4 mt-4">
                <div><span>Bank Details</span></div>
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Account Holder name</div>
                  <div class="flex-grow">
                    <input
                      v-model="account_name"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Write Account Holder Name"
                    />
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Account Number</div>
                  <div class="flex-grow">
                    <input
                      v-model="account_number"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Write Account Number"
                    />
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Bank Name</div>
                  <div class="flex-grow">
                    <input
                      v-model="bank"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Write Bank Name"
                    />
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Bank Identifier Code</div>
                  <div class="flex-grow">
                    <input
                      v-model="bin"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Write Bank Identifier Code"
                    />
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Branch Location</div>
                  <div class="flex-grow">
                    <input
                      v-model="branch"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Write Branch Location"
                    />
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12">Tax payer Id</div>
                  <div class="flex-grow">
                    <input
                      v-model="tax_payer_id"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Write Tax payer Id"
                    />
                  </div>
                </div>
              </div>

              <div class="border-solid border-2 border-indigo-600 p-4 mt-4">
                <div><span>Account Login</span></div>
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12 flex items-center">
                    Email<span class="text-3xl text-red-500 mt-2 ml-2">*</span>
                  </div>
                  <div class="flex-grow">
                    <input
                      v-model="email"
                      type="email"
                      :style="{
                        border: emailError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="formValidation('email')"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Enter Email"
                    />
                    <div class="text-red-500 text-xs mt-1">
                      {{ emailErrorMessage }}
                    </div>
                  </div>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 mb-4">
                  <div class="w-full sm:w-3/12 flex items-center">
                    Password
                    <span class="text-3xl text-red-500 mt-2 ml-2">*</span>
                  </div>
                  <div class="flex-grow">
                    <input
                      v-model="password"
                      type="password"
                      :style="{
                        border: passwordError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="formValidation('password')"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      placeholder="Enter Password"
                    />
                    <div class="text-red-500 text-xs mt-1">
                      {{ passwordErrorMessage }}
                    </div>
                  </div>
                </div>
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
                  <icon name="check" size="15px" style="margin-right: 8px"
                /></span>
                Submit
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
import { ref, onBeforeMount } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
const toast = useToast();

const router = useRouter();
const departmentName = ref("");
const selectedDepartment = ref("");
const departmentList = ref([]);
const full_name = ref("");
const father_name = ref("");
const dob = ref("");
const gender = ref("");
const mobile_number = ref("");
const email = ref("");
const password = ref("");
const employeeID = ref("");
const designation = ref("");
const joining_date = ref("");
const basicSalary = ref("");
const hourlyRate = ref("");
const account_name = ref("");
const account_number = ref("");
const local_address = ref("");
const permanent_address = ref("");
const profileImage=ref("");
const imagePreview = ref(null);
const imageFile = ref(null);
const bank = ref("");
const bin = ref("");
const branch = ref("");
const tax_payer_id = ref("");
const resume = ref(null);
const offerLetter = ref(null);
const joiningLetter = ref(null);
const agreement = ref(null);
const idProof = ref(null);
const exit_date =ref("");
const branchList = ref([]);
const designationListData = ref([]);
const selectedDepartmentId = ref(null);
const nameError = ref(false);
const employeeIdError = ref(false);
const emailError = ref(false);
const passwordError = ref(false);
const nameErrorMessage = ref("");
const employeeIdErrorMessage = ref("");
const emailErrorMessage = ref("");
const passwordErrorMessage = ref("");
const mobileNumberErrorMessage=ref("");
const mobileNumberError =ref(false);
const fatherNameErrorMessage=ref("");
const fatherNameError = ref(false);

function handleFileChangeProfile(event) {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Remove the image
function removeImage() {
  imagePreview.value = null;
  imageFile.value = null;
}
function handleFileChange(event, fileType) {
  const file = event.target.files[0];
  switch (fileType) {
    case "resume":
      resume.value = file;
      break;
    case "offerLetter":
      offerLetter.value = file;
      break;
    case "joiningLetter":
      joiningLetter.value = file;
      break;
    case "agreement":
      agreement.value = file;
      break;
    case "idProof":
      idProof.value = file;
      break;
  }
}
function validateInput(event) {
  const value = event.target.value;

  if (value.trim() === "") {
    return;
  }

  if (/[A-Za-z]/.test(value)) {
    alert("please write only number");
    setTimeout(() => {
      event.target.value = "";
    });
    return;
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

      const formData = new FormData();
      formData.append("full_name", full_name.value);
      formData.append("father_name", father_name.value);
      formData.append("dob", dob.value);
      formData.append("gender", gender.value);
      formData.append("mobile_number", mobile_number.value);
      formData.append("email", email.value);
      formData.append("password", password.value);
      formData.append("employeeID", employeeID.value);
      formData.append("designation", designation.value);
      formData.append("joining_date", joining_date.value);
      formData.append("exit_date" , exit_date.value);
      formData.append("basicSalary", basicSalary.value);
      formData.append("hourlyRate", hourlyRate.value);
      formData.append("account_name", account_name.value);
      formData.append("account_number", account_number.value);
      formData.append("local_address", local_address.value);
      formData.append("permanent_address", permanent_address.value);
      formData.append("bank", bank.value);
      formData.append("bin", bin.value);
      formData.append("branch", branch.value);
      formData.append("tax_payer_id", tax_payer_id.value);
      if (imageFile.value) formData.append("profileImage", imageFile.value);

      if (resume.value) formData.append("resume", resume.value);
      if (offerLetter.value) formData.append("offerLetter", offerLetter.value);
      if (joiningLetter.value)
        formData.append("joiningLetter", joiningLetter.value);
      if (agreement.value) formData.append("agreement", agreement.value);
      if (idProof.value) formData.append("idProof", idProof.value);
      const response = await axios.post(
        "/staff/v1/erp/employee/insert/update",
        formData,
        config
      );

      if (response.data.msgFlag) {
        toast.success(response.data.msg);
        router.push({ name: "EmployeeList" });
      } else {
        toast.error(response.data.errMsg);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }
}

function validateName() {
  if (!full_name.value || full_name.value.length === 0) {
    nameError.value = true;
    nameErrorMessage.value = " Name Field cannot be empty";
    return false;
  } else {
    nameError.value = false;
    nameErrorMessage.value = "";
    return true;
  }
}
function validateFatherName() {
  if (!father_name.value || father_name.value.length === 0) {
    fatherNameError.value = true;
    fatherNameErrorMessage.value = " Father Name Field cannot be empty";
    return false;
  } else {
    fatherNameError.value = false;
    fatherNameErrorMessage.value = "";
    return true;
  }
}
function validateMobileNumber() {
  if (!mobile_number.value || mobile_number.value.length === 0) {
   mobileNumberError.value = true;
   mobileNumberErrorMessage.value = "Mobile Number Field cannot be empty";
    return false;
  } else {
   mobileNumberError.value = false;
   mobileNumberErrorMessage.value = "";
    return true;
  }
}
function validateEmployeeId() {
  if (!employeeID.value || employeeID.value.length === 0) {
    employeeIdError.value = true;
    employeeIdErrorMessage.value = " Employee Id Field cannot be empty";
    return false;
  } else {
    employeeIdError.value = false;
    employeeIdErrorMessage.value = "";
    return true;
  }
}
function validateEmail() {
  if (!email.value || email.value.length === 0) {
    emailError.value = true;
    emailErrorMessage.value = " Email Field cannot be empty";
    return false;
  } else {
    emailError.value = false;
    emailErrorMessage.value = "";
    return true;
  }
}
function validatePassword() {
  if (!password.value || password.value.length === 0) {
    passwordError.value = true;
    passwordErrorMessage.value = " Password Field cannot be empty";
    return false;
  } else {
    passwordError.value = false;
    passwordErrorMessage.value = "";
    return true;
  }
}
function formValidation(fieldName) {
  if (fieldName === "submit") {
    const isNameValid = validateName();
    const isEmployeeIdValid = validateEmployeeId();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isMobileNumberVaild = validateMobileNumber();
    const isFatherNameValid = validateFatherName();
    return isNameValid && isEmployeeIdValid && isEmailValid && isPasswordValid && isMobileNumberVaild && isFatherNameValid ;
  } else if (fieldName === "full_name") {
    validateName();
  } else if (fieldName === "employeeID") {
    validateEmployeeId();
  } else if (fieldName === "email") {
    validateEmail();
  } else if (fieldName === "password") {
    validatePassword();
  } else if (fieldName === "mobile_number") {
    validateMobileNumber();
  }else if (fieldName === "father_name") {
    validateFatherName();
  }
}

const handleDepartmentChange = (event) => {
      selectedDepartment.value = event.target.value;
      if (selectedDepartment.value) {
        designationList(selectedDepartment.value);
      } else {
        designationListData.value = [];
      }
    };


const designationList = async (dataId) => {
  // console.log(dataId);
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

    // Fetch designations for the selected department using dataId
    const response = await axios.get(
      `/staff/v1/erp/employee/get/designation/list/${dataId}`,
      config
    );
    designationListData.value = response.data;
  } catch (error) {
    console.error("Error fetching designation data:", error);
  }
};

const fetchDepartmentList = async () => {
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
      "/staff/v1/erp/employee/get/department/list",
      config
    );
    departmentList.value = response.data;
  } catch (error) {
    console.error("Error fetching department data:", error);
  }
};
const fetchBranchList = async () => {
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
      "/staff/v1/erp/employee/get/branch/list",
      config
    );
    branchList.value = response.data;
  } catch (error) {
    console.error("Error fetching branch data:", error);
  }
};
const fetchAllData = async () => {
  await fetchDepartmentList();
  await fetchBranchList();
};
onBeforeMount(fetchAllData);
</script>
  