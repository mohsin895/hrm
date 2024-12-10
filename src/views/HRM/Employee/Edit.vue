<template>
    <div class="loyel-erp-department ">
      <div class="bg-white h-8 pl-5 py-1">  
      <span class="text-black flex"
        ><router-link :to="{name:'Dashboard'}" >Dashboard</router-link> <span class="inline-flex items-center text-cyneColor"><icon name="circle" size="10px" class="ml-2 mr-2" /></span> <span> <router-link :to="{ name: 'EmployeeList' }">Employees</router-link></span><span class="inline-flex items-center text-cyneColor"><icon name="circle" size="10px"  class=" ml-2 mr-2" /></span> <span>Edit Employee</span></span
      ></div>
     <div class=" sm:ml-2 sm:mr-2 md:ml-10 md:mr-10">
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
          <div class="w-full sm:w-3/12">Name</div>
          <div class="flex-grow">
            <input type="text" v-model="full_name" class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" placeholder="Employee  Name" />
          </div>
        </div>
  
             <!-- Father's Name Section -->
             <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <div class="w-full sm:w-3/12">Father's Name</div>
          <div class="flex-grow">
            <input type="text" v-model="father_name" class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" placeholder="Father's  Name" />
          </div>
        </div>
  
             <!-- Date of Birth Section -->
             <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <div class="w-full sm:w-3/12">Date of Birth</div>
          <div class="flex-grow">
            <input type="date" v-model="dob" class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" />
          </div>
        </div>
              <!-- Gender Section -->
        <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <div class="w-full sm:w-3/12">Gender</div>
          <div class="flex-grow">
            <select v-model="gender" class="block h-9 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              <option value="male">Male</option>
              <option value="female" >Female</option>
              <option value="other" >Other</option>
            </select>
          </div>
        </div>
               <!-- Phone Section -->
        <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <div class="w-full sm:w-3/12">Phone</div>
          <div class="flex-grow">
            <input type="text" v-model="mobile_number" class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" placeholder="Phone Number" />
          </div>
        </div>
  
        <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <div class="w-full sm:w-3/12">Local Address</div>
          <div class="flex-grow">
            <textarea id="local-address" v-model="local_address" rows="3" class="block w-full border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
          </div>
        </div>
  
        <!-- Permanent Address Section -->
        <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <div class="w-full sm:w-3/12">Permanent Address</div>
          <div class="flex-grow">
            <textarea id="permanent-address" v-model="permanent_address" rows="3" class="block w-full border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
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
         <div class="basis-1/2 ">
           <div class="border-solid border-2 border-indigo-600 p-4">
             <div><span>Company Details</span></div>
             
        <!-- Employee ID Section -->
        <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <div class="w-full sm:w-3/12">Employee ID</div>
          <div class="flex-grow">
            <input type="text" v-model="employeeID" class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" placeholder="Employee ID" />
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <div class="w-full sm:w-3/12">Branch</div>
          <div class="flex-grow">
            <select class="block h-9 w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"  >
             
              <option v-for="branch in branchList" :key="branch.id" :value="branch.id" >{{ branch.branchName }}</option>
            
            </select>
          </div>
        </div>
  
             <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <div class="w-full sm:w-3/12">Department</div>
          <div class="flex-grow">
            <select class="block h-9 w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"  @change="handleDepartmentChange">
              <option>Please Select Department</option>
              <option v-for="dept in departmentList" :key="dept.id" :value="dept.id" >{{ dept.deparmentName }}</option>
            
            </select>
          </div>
        </div>
  
              <!-- Designation Section -->
        <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <div class="w-full sm:w-3/12">Designation</div>
          <div class="flex-grow">
            <select v-model="designation" class="block h-9 w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              <option v-for="(dataInfo, index) in designationListData" :value="dataInfo.id" :key="index">{{dataInfo.designation}}</option>
  
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
               <div class="w-full sm:w-3/12">Exit Date</div>
               <div class="flex-grow">
                 <input
                   v-model="exit_date"
                   type="date"
                   class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  
                 />
               </div>
             </div>
             <!-- <div class="flex flex-col sm:flex-row gap-4 mb-4 items-center">
            <div class="w-full sm:w-3/12">Basic Salary</div>
            <div class="flex-grow">
              <input
                v-model="basicSalary"
                type="text"
                class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
            </div> -->

            <!-- Hourly Rate -->
            <!-- <div class="flex flex-col sm:flex-row gap-4 mb-4 items-center">
              <div class="w-full sm:w-3/12">Hourly Rate</div>
              <div class="flex-grow">
                <input
                  v-model="hourlyRate"
                  type="text"
                  class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                />
              </div>
              <div class="flex-grow">
            <button
              type="button"
              @click="openModalDelete(salary)"
              class="btn btn-sm red flex items-center p-1 bg-red-600 text-white"
            >
              <icon name="trash" size="15px" />
            </button>
          </div>
            </div> -->

            <!-- Other Salaries (dynamic fields) -->
            <div v-for="salary in salaries" :key="salary.id" class="flex mt-1 flex-col sm:flex-row gap-4 mb-4 items-center">
              <div v-if="salary.type =='basic' || salary.type=='hourly_rate'" class="w-full sm:w-3/12">
                <div class="w-full sm:w-3/12">{{ capitalizeFirstLetter(salary.type)  }}</div>
                <input
                  v-model="salary.type"
                  type="hidden"
                  class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                />
              </div>
              <div v-else class="w-full sm:w-3/12">
                <input
                  v-model="salary.type"
                  type="text"
                  class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                />
               
              </div>
             
              <div class="flex-grow">
                <input
                  v-model="salary.salary"
                  type="text"
                  class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                />
                <input
                  v-model="salary.remarks"
                  type="hidden"
                  class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                />
              </div>
              <div class="flex-grow">
            <button
              type="button"
              @click="openModalDelete(salary)"
              class="btn btn-sm red flex items-center p-1 bg-red-600 text-white"
            >
              <icon name="trash" size="15px" />
            </button>
          </div>

            </div>
            <div class="p-2 mb-4">
        <div class="bg-customCyan hover:bg-hoverCyan p-2 w-32 cursor-pointer" @click="openModal">
          <span class="inline-flex items-center text-white">
            Add Salary
            <icon name="plus" size="15px" style="margin-left: 8px" />
          </span>
        </div>
      </div>
             <!-- Date of Birth Section -->
           
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
               <div class="w-full sm:w-3/12">Email</div>
               <div class="flex-grow">
                 <input
                   v-model="email"
                   type="email"
                   
                   class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                   placeholder="Enter your Email"
                 />
               </div>
             </div>
             <div class="flex flex-col sm:flex-row gap-4 mb-4">
               <div class="w-full sm:w-3/12">Password</div>
               <div class="flex-grow">
                 <input
                   v-model="password"
                   type="password"
                   class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                   placeholder="Enter Password"
                 />
               </div>
             </div>
             
           </div>
         </div>
       </div>
  
           <div class="border-t border-gray-200 modal-footer">
              <div class="p-6 flex items-end justify-end space-x-4">
                <button @click="closeModal" class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right" type="button">
                  Cancel
                </button>
                <button class="bg-customCyan hover:bg-hoverCyan text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline text-right" type="submit">
                  <span class="inline-flex items-center text-white">
                    <icon name="pencil" size="15px" style="margin-right: 8px" /></span>
                 Update
                  
                </button>
              </div>
            </div>
          </form>
   </div>
     </div>
   
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
                Are you sure you want to delete <span>{{ salaryType }}</span> Salary:
             
              </span>
              <input type="hidden" v-model="salariyId" />
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

      <div v-if="isModalOpen" ref="modalBackdrop" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start max-h-screen overflow-y-auto justify-center pt-20" @click="handleBackdropClick">
      <!-- Modal -->
      <div class="bg-white shadow-lg w-full max-w-2xl " @click.stop>
        <div class="flex justify-between items-center p-6 mb-4 border-b border-gray-200 modal-header">
          <h2 class="text-xl inline-flex items-center font-semibold">
            <span > 
              <icon name="plus" size="15px" style="margin-right: 8px" /></span>
           Add Salary
          </h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200">
            &times;
          </button>
        </div>
        <form @submit.prevent="addSalary">
          <div class="pl-6 pr-6 modal-body">
           
            <table>
              <thead>
                <tr>
                  <th class="text-start">  <span :class="{ 'text-red-500': designationError }">Type</span></th>
                  <th class="text-start">  <span :class="{ 'text-red-500': designationError }">Salary</span></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(field, index) in fields" :key="index" class="mb-4">
                  <td>
                    <input
                      v-model="field.type"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      :placeholder="'Type # ' + (index + 1)"
                      :style="{ border: designationError ? '1px solid red' : '1px solid #CED4DA' }"
                      @keyup="validateDesignation(index)"/>
               

                    <div v-if="field.error" class="text-red-500 text-xs mt-1">{{ field.error }}</div>
                  </td>
                  <td>
                    <input
                      v-model="field.salary"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      :placeholder="'Salary # ' + (index + 1)"
                      :style="{ border: designationError ? '1px solid red' : '1px solid #CED4DA' }"
                      @keyup="validateDesignation(index)"/>
               

                    <div v-if="field.error" class="text-red-500 text-xs mt-1">{{ field.error }}</div>
                  </td>
                  <td>


                   
                  <span >
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
                  
                      <icon name="check" size="15px" style="margin-right: 8px" />
                 
                  Submit
                </span>
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
  import { ref, onBeforeMount,inject } from "vue";
  import { useToast } from "vue-toastification";
  import { useRoute, useRouter } from 'vue-router';
  const toast = useToast();
  const route = useRoute();
  const router = useRouter();
  const departmentName = ref("");
  
  const departmentList =ref([]);
  const full_name =ref("");
  const father_name=ref("");
  const dob =ref("");
  const gender=ref("");
  const mobile_number=ref("");
  const imagePreview = ref(null);
  const imageFile = ref(null);
  const email=ref("");
  const password=ref("");
  const employeeID=ref("");
  const designation=ref("");
  const joining_date=ref("");
  const exit_date =ref("");
  const salaries = ref([]);
  const account_name=ref("");
  const account_number=ref("");
  const local_address=ref("");
  const permanent_address=ref("");
  const bank=ref("");
  const bin=ref("");
  const branch=ref("");
  const tax_payer_id=ref("");
  const resume = ref(null);
  const offerLetter = ref(null);
  const joiningLetter = ref(null);
  const agreement = ref(null);
  const idProof = ref(null);
  const branchList =ref([]);
  const designationListData =ref([]);
  const selectedDepartmentId = ref(null);
  const dataId = ref(route.params.dataId);
  const baseUrl = inject('$baseUrl');
  const isModalOpenDelete = ref(false);
  const modalBackdrop = ref(null);
  const isModalOpen = ref(false);
  const salariyId = ref("");
  const salaryType = ref("");
  const remarks = ref("");
  const fields = ref([{ type: '', salary: '', error: '' }]);
//   const removeSalary = (id) => {
//   salaries.value = salaries.value.filter(salary => salary.id !== id);
// };
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
const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

function removeImage() {
  imagePreview.value = null;
  imageFile.value = null;
}

  function handleFileChange(event, fileType) {
    const file = event.target.files[0];
    switch (fileType) {
      case 'resume':
        resume.value = file;
        break;
      case 'offerLetter':
        offerLetter.value = file;
        break;
      case 'joiningLetter':
        joiningLetter.value = file;
        break;
      case 'agreement':
        agreement.value = file;
        break;
      case 'idProof':
        idProof.value = file;
        break;
    }
  }
  function addField() {
    fields.value.push({ type: "", salary:"" });
  }
  
  function removeField(index) {
    fields.value.splice(index, 1);
  }
  
  function openModal() {

  isModalOpen.value = true;
}
  function closeModal() {
    isModalOpen.value = false;
    isModalOpenDelete.value = false;
    fields.value = [{ type: '', salary: '',error: '' }];
 
   
  }
  
  function handleBackdropClick(event) {
    if (event.target === modalBackdrop.value) {
      closeModal();
    }
  }

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
  
    
      const formData = new FormData();
      formData.append('dataId', dataId.value);
      formData.append('full_name', full_name.value);
      formData.append('father_name', father_name.value);
      formData.append('dob', dob.value);
      formData.append('gender', gender.value);
      formData.append('mobile_number', mobile_number.value);
      formData.append('email', email.value);
      formData.append('password', password.value);
      formData.append('employeeID', employeeID.value);
      formData.append('designation', designation.value);
      formData.append('joining_date', joining_date.value);
      formData.append('exit_date', exit_date.value);
      formData.append('account_name', account_name.value);
      formData.append('account_number', account_number.value);
      formData.append('local_address', local_address.value);
      formData.append('permanent_address', permanent_address.value);
      formData.append('bank', bank.value);
      formData.append('bin', bin.value);
      formData.append('branch', branch.value);
      formData.append('tax_payer_id', tax_payer_id.value);
      salaries.value.forEach((salary, index) => {
      formData.append(`salaries[${index}][type]`, salary.type);
      formData.append(`salaries[${index}][salary]`, salary.salary);
      formData.append(`salaries[${index}][remarks]`, salary.remarks);
    });
      if (imageFile.value) formData.append("profileImage", imageFile.value);
    if (resume.value) formData.append('resume', resume.value);
    if (offerLetter.value) formData.append('offerLetter', offerLetter.value);
    if (joiningLetter.value) formData.append('joiningLetter', joiningLetter.value);
    if (agreement.value) formData.append('agreement', agreement.value);
    if (idProof.value) formData.append('idProof', idProof.value);
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

  async function addSalary() {
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
    
        type: fields.value.map(field => field.type),
        salary: fields.value.map(field => field.salary),
        dataId: dataId.value || null
      };
    
      const response = await axios.post(
        "/staff/v1/erp/employee/add/salary",
        payload,
        config
      );
  
      if (response.data.msgFlag) {
        toast.success(response.data.msg);
        salaries.value = [];
        await fetchDataInfoList();
        closeModal();
      
      } else {
        toast.error(response.data.errMsg);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }
 
  const handleDepartmentChange = async (event) => {
    selectedDepartmentId.value = event.target.value;
    await designationList(selectedDepartmentId.value);
  };
  
  const designationList = async (dataId) => {
 
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
      const response = await axios.get(`/staff/v1/erp/employee/get/designation/list/${dataId}`, config);
     designationListData.value=response.data;
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
        const response = await axios.get("/staff/v1/erp/employee/get/department/list", config);
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
        const response = await axios.get("/staff/v1/erp/employee/get/branch/list", config);
        branchList.value = response.data;
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    };

    const fetchDataInfoList = async () => {
  
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
      const response = await axios.get("/staff/v1/erp/employee/get/info", {
        params: { dataId: dataId.value }, // Use params object to pass query parameters
        headers: config.headers
      });
      let dataInfo = response.data.dataInfo;
      full_name.value=dataInfo.full_name;
      father_name.value = dataInfo.father_name;
      dob.value= dataInfo.date_of_birth;
      gender.value = dataInfo.gender;
      mobile_number.value= dataInfo.mobile_number;
      local_address.value = dataInfo.local_address;
      permanent_address.value = dataInfo.permanent_address;
      employeeID.value= dataInfo.employeeID;
      imagePreview.value= baseUrl + dataInfo.profile_image;
      email.value = dataInfo.email;
      joining_date.value = dataInfo.joining_date;
      exit_date.value = dataInfo.exit_date;
      account_name.value = dataInfo.bank_details.account_name;
      account_number.value = dataInfo.bank_details.account_number;
      bank.value = dataInfo.bank_details.bank;
      bin.value = dataInfo.bank_details.bin;
      branch.value = dataInfo.bank_details.branch;
      tax_payer_id.value = dataInfo.bank_details.ifsc;
     
      dataInfo.salaries.forEach((salary) => {
        salaries.value.push({
          id: salary.id,
          type: salary.type,
          salary: salary.salary,
          remarks:salary.remarks

        });

      // if (salary.type === 'basic') {
      //   basicSalary.value = salary.salary;
      // } else if (salary.type === 'hourly_rate') {
      //   hourlyRate.value = salary.salary;
      // } else {
       
      // }
    });
     
    } catch (error) {
      console.error("Error fetching designation data:", error);
    }
  };
  function openModalDelete(dataInfo) {
    salariyId.value = dataInfo.id;
      salaryType.value = dataInfo.type;
    isModalOpenDelete.value = true;
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
        dataId: salariyId.value || null
      };
      const response = await axios.post('/staff/v1/erp/employee/salary/delete', payload, config);
      if (response.data.msgFlag) {
        toast.success(response.data.msg);
        salaries.value = [];
        await fetchDataInfoList();
        closeModal();
      } else {
        toast.error(response.data.errMsg);
      }

    }
    const fetchAllData = async () => {
        await fetchDataInfoList();
    await fetchDepartmentList();
    await fetchBranchList();
    
  };
    onBeforeMount(fetchAllData);
  </script>
    