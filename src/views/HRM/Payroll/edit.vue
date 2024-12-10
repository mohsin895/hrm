<template>
    <div class="loyel-erp-department">
      <div class="bg-white h-8 pl-5 py-1">
        <span class="text-black flex"
          ><router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
          <span class="inline-flex items-center text-cyneColor"
            ><icon name="circle" size="10px" class="ml-2 mr-2"
          /></span>
          <span> Payroll</span
          ><span class="inline-flex items-center text-cyneColor"
            ><icon name="circle" size="10px" class="ml-2 mr-2"
          /></span>
          <span>Add Payroll</span></span
        >
      </div>
      <div class="sm:ml-2 sm:mr-2 md:ml-10 md:mr-10">
        <div class="card w-full bg-white mt-4 pb-4 pt-4">
          <span class="pl-4 pt-4 text-xl text-bold text-red-500"
            >Eployee Info</span
          >
          <div class="p-6">
    <div class="flex flex-wrap -mx-4">
        <!-- Empty Column (Employee Info) -->
        <div class="w-full md:w-1/4 px-4">
            <div class="mb-6">
                <!-- Empty div for potential content -->
            </div>
        </div>
        
        <!-- Profile Image Column -->
        <div class="w-full md:w-1/6 px-4">
            <div class="mb-6">
                <!-- Employee profile image -->
                <img :src="baseUrl +  payrollInfo.employee_info.profile_image" alt="ProfileImage" class="h-24 w-24 object-cover rounded-full">
            </div>
        </div>
        
        <!-- Employee Details Column -->
        <div class="w-full md:w-1/3 px-4">
            <div class="mb-6">
                <ul>
                    <li><h4 class="text-lg font-semibold">Employee ID: {{ payrollInfo.employee_info.employeeID }}</h4></li>
                    <li><h4 class="text-lg font-semibold">Name:{{ payrollInfo.employee_info.full_name }} </h4></li>
                    <li><h4 class="text-lg font-semibold">Month: {{ payrollInfo.month }} </h4></li>
                    <li><h4 class="text-lg font-semibold">Year: {{ payrollInfo.year }} </h4></li>
                </ul>
            </div>
        </div>
        
        <!-- Empty Column (for future content) -->
        <div class="w-full md:w-1/6 px-4">
            <div class="mb-6">
                <!-- Empty div for potential content -->
            </div>
        </div>
    </div>
</div>

          <hr class="mt-4" />
         
        </div>
      </div>
     
        <form @submit.prevent="submitForm">
        <div class="sm:ml-2 sm:mr-2 md:ml-10 md:mr-10">
        <div class="card w-full bg-white mt-4 pt-4">
          <span class="pl-4 pt-4 text-xl text-bold text-black"
            >Salary Info</span
          >
          <hr class="mt-4 mb-4" />
          <div class="p-4">
            <!-- Name Section -->
            <div class="flex flex-col sm:flex-row gap-4 mb-4">
              <div class="w-full sm:w-3/12 text-right">Hourly Rate</div>
              <div class="flex-grow ">
                <input
                  type="text"
                  v-model="hourly_rate"
                  class="appearance-none border w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  disabled
                  placeholder="Hourly Rate"
                />
              </div>
            </div>
  
            <!-- Father's Name Section -->
            <div class="flex flex-col sm:flex-row gap-4 mb-4">
              <div class="w-full sm:w-3/12 text-right">Hours Clocked</div>
              <div class="flex-grow">
                <input
                  type="text"
                  v-model="overtime_hours"
                  class="appearance-none border w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Horse Clocked"
                />
              </div>
            </div>
  
            <!-- Date of Birth Section -->
            <div class="flex flex-col sm:flex-row gap-4 mb-4">
              <div class="w-full sm:w-3/12 text-right">Total Hours Payment</div>
              <div class="flex-grow">
                <input
                  type="text"
                  v-model="totalHourse"
                  class="appearance-none border w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                />
              </div>
            </div>
            <!-- Gender Section -->
  
            <!-- Phone Section -->
            <div class="flex flex-col sm:flex-row gap-4 mb-4">
              <div class="w-full sm:w-3/12 text-right">Basic Salary</div>
              <div class="flex-grow">
                <input
                  type="text"
                  v-model="basicSalary"
                  disabled
                  class="appearance-none border w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Basic Salary"
                />
              </div>
            </div>
  
            <div class="flex flex-col sm:flex-row gap-4 mb-4">
              <div class="w-full sm:w-3/12 text-right">Expense Claim</div>
              <div class="flex-grow">
                <input
                  type="text"
                  v-model="mobile_number"
                  class="appearance-none border w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Expense Claim"
                />
              </div>
            </div>
  
            <div class="flex flex-col sm:flex-row gap-4 mb-4">
                    <div class="w-full sm:w-3/12">Status</div>
                    <div class="flex-grow">
                      <select
                        v-model="status"
                        class="block h-9 w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="paid">Paid</option>
                        <option value="unpaid" >Unpaid</option>
                  
                      </select>
                    </div>
                  </div>
          </div>
        </div>
      </div>
  
      <div class="sm:ml-2 sm:mr-2 md:ml-10 md:mr-10">
        <div class="flex flex-col md:flex-row ">
          <div class="basis-1/2 mr-4">
            <div class="card w-full bg-white mt-4 p-4">
              <span class="pl-4 pt-4 text-xl text-bold text-black"
            >Edit Allowances</span
          >
          <hr class="mt-4 mb-4" />
          <div class="flex items-center justify-center  w-full pl-10 pr-10">
              <table class="w-full max-w-3xl">
                <thead>
                  <tr>
                    <th class="text-start">Allowance Title</th>
                    <th class="text-start mr-4">Allowance Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(field, index) in fieldsAllowance" :key="index" class="mb-4">
                    <td class="pr-4">
                      <input
                        v-model="field.allowanceTitle"
                        type="text"
                        class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        :placeholder="'Allowance # ' + (index + 1)"
                      
                      />
  
                   
                    </td>
                    <td>
                      <input
                        v-model="field.allowance"
                        type="text"
                        class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        :placeholder="'Value # ' + (index + 1)"
                      
                      
                      />
  
                    
                    </td>
                    <td>
                     
                        <button
                          v-if="index === 0"
                          @click="addFieldAllowance"
                          type="button"
                          class="bg-customCyan 500 ml-4 mt-4 hover:bg-hoverCyan text-white font-bold py-2 px-4 mb-4"
                        >
                          <span class="inline-flex items-center text-white">
                            Add 
                            <icon
                              name="plus"
                              size="15px"
                              style="margin-left: 8px"
                          /></span>
                        </button>
                        <button
                          v-else
                          @click="removeFieldAllowance(index)"
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
                 
                    
                    </td>
                  </tr>
                </tbody>
           </table>
          </div>
      
            </div>
            <!-- Image Section -->
          </div>
  
          <!-- Right Section -->
          <div class="basis-1/2">
            <div class="card w-full bg-white mt-4 p-4">
              <span class="pl-4 pt-4 text-xl text-bold text-black"
            >Edit Deductions</span
          >
          <hr class="mt-4 mb-4" />
          <div class="flex items-center justify-center pr-10 pl-10 w-full">
              <table class="w-full max-w-3xl">
  
  
                <thead>
                  <tr>
                    <th class="text-start">Deduction Title</th>
                    <th class="text-start mr-4">Deduction Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(field, index) in fields" :key="index" class="mb-4">
                    <td class="pr-4">
                      <input
                        v-model="field.deductionTitle"
                        type="text"
                        class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        :placeholder="'Deduction # ' + (index + 1)"
                      
                      />
  
                   
                    </td>
                    <td>
                      <input
                        v-model="field.deduction"
                        type="text"
                        class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        :placeholder="'Value # ' + (index + 1)"
                      
                      
                      />
  
                    
                    </td>
                    <td>
                     
                        <button
                          v-if="index === 0"
                          @click="addField"
                          type="button"
                          class="bg-customCyan 500 ml-4 mt-4 hover:bg-hoverCyan text-white font-bold py-2 px-4 mb-4"
                        >
                          <span class="inline-flex items-center text-white">
                            Add 
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
                 
                    
                    </td>
                  </tr>
                </tbody>
           </table>
  
            
          </div>
            
            </div>
          </div>
        </div>
      </div>
      <div class="sm:ml-2 sm:mr-2 md:ml-10 md:mr-10">
        <div class="card w-full bg-white mt-4 pt-4">
          <span class="pl-4 pt-4 text-xl text-bold text-black"
            >Gross Salary</span
          >
          <hr class="mt-4 mb-4" />
          <div class="p-4">
            <!-- Name Section -->
            <div class="flex flex-col sm:flex-row gap-4 mb-4">
              <div class="w-full sm:w-3/12 text-right">Total Allowances</div>
              <div class="flex-grow">
                <input
                  type="text"
                  v-model="totalAllowance"
                  class="appearance-none border w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  disabled
              
                />
              </div>
            </div>
  
            <!-- Father's Name Section -->
            <div class="flex flex-col sm:flex-row gap-4 mb-4">
              <div class="w-full sm:w-3/12 text-right">Total Deductions</div>
              <div class="flex-grow">
                <input
                  type="text"
                  v-model="totalDeduction"
                  class="appearance-none border w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              
                  disabled
                />
              </div>
            </div>
  
            <!-- Date of Birth Section -->
            <div class="flex flex-col sm:flex-row gap-4 mb-4">
              <div class="w-full sm:w-3/12 text-right">Net Salary</div>
              <div class="flex-grow">
                <input
                  type="text"
                  v-model="netSalary"
                  class="appearance-none border w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  disabled
                />
              </div>
            </div>
            <!-- Gender Section -->
  
            <!-- Phone Section -->
          </div>
        </div>
      </div>
      <div class=" sm:ml-2 sm:mr-2 md:ml-10 md:mr-10">
      <div class="card w-full bg-white mt-4 mb-8">
       
  
           <div class="border-t border-gray-200 modal-footer">
              <div class="p-6 flex items-center justify-center space-x-4">
                <button @click="closeModal" class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right" type="button">
                  Cancel
                </button>
                <button class="bg-customCyan hover:bg-hoverCyan text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline text-right" type="submit">
                  <span class="inline-flex items-center text-white">
                    <icon name="check" size="15px" style="margin-right: 8px" /></span>
                 Submit
                  
                </button>
              </div>
            </div>
       
   </div>
     </div>
     </form>
      
      
    </div>
  </template>
      <script setup>
  import axios from "axios";
  import { ref, onBeforeMount, computed, inject } from "vue";
  import { useToast } from "vue-toastification";
  import { useRoute, useRouter } from 'vue-router';
  const route = useRoute();
  const router = useRouter()
  const toast = useToast();
  const basicSalary = ref("");
  const hourly_rate = ref("");
  const baseUrl = inject('$baseUrl');
  const overtime_hours = ref("");
  const dataId = ref(route.params.dataId);
  const status = ref('paid');
  const fieldsAllowance = ref([{ allowanceTitle: "", allowance: "" }]);
  const fields = ref([{ deductionTitle: "", deduction: "" }]);
  const payrollInfo = ref({
  employee_info: {
    employeeID: "",
    full_name: "",
    profile_image :"",
  },
  month: "",
  year: ""
});
  
  function addField() {
    fields.value.push({ deductionTitle: "", deduction:"" });
  }
  
  function removeField(index) {
    fields.value.splice(index, 1);
  }
  
  function addFieldAllowance() {
      fieldsAllowance.value.push({ allowanceTitle: "", allowance:"" });
  }
  
  function removeFieldAllowance(index) {
      fieldsAllowance.value.splice(index, 1);
  }
  
  const totalAllowance = computed(() => {
    return fieldsAllowance.value.reduce((total, field) => {
      const allowanceValue = parseFloat(field.allowance) || 0;
      return total + allowanceValue;
    }, 0);
  });
  const totalHourse = computed(() => {
    const hourse = overtime_hours.value;
    const amount = hourly_rate.value;
    
    const totalAmount = hourse * amount;
    
    const totalHourePayment = parseFloat(totalAmount) || 0;
    
    return totalHourePayment;
  });
  const netSalary = computed(() => {
  return (Number(totalHourse.value) + Number(totalAllowance.value) + Number(basicSalary.value)) - Number(totalDeduction.value);
});
  
  const totalDeduction = computed(() => {
    return fields.value.reduce((total, field) => {
      const deductionValue = parseFloat(field.deduction) || 0;
      return total + deductionValue;
    }, 0);
  });
  
  async function getPayrollInfo(){
    try{
      const token = window.localStorage.getItem("token");
      if(!token){
        console.error("Authentication token is missing.");
        return;
      }
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await axios.get("/staff/v1/erp/payroll/get/info",
      {
          params: {
             dataId: dataId.value,
  
           }, 
          headers: config.headers
        });

       
      let dataInfo = response.data;
      payrollInfo.value = dataInfo.dataList;
      hourly_rate.value = dataInfo.hourly_rate;
      overtime_hours.value = dataInfo.dataList.overtime_hours;
      totalHourse.value = dataInfo.dataList
      basicSalary.value = dataInfo.dataList.basic;
      status.value = dataInfo.dataList.status;
      const monthNumber = parseInt(dataInfo.dataList.month); 
      const monthName = new Date(0, monthNumber - 1).toLocaleString('default', { month: 'long' }); // e.g., "October"
      payrollInfo.value.month = monthName;
      fieldsAllowance.value = dataInfo.dataList.allowances && dataInfo.dataList.allowances !== "[]"
  ? Object.entries(JSON.parse(dataInfo.dataList.allowances)).map(([key, value]) => ({
      allowanceTitle: key, 
      allowance: value 
    }))
  : [{ allowanceTitle: "", allowance: "" }];

fields.value = dataInfo.dataList.deductions && dataInfo.dataList.deductions !== "[]"
  ? Object.entries(JSON.parse(dataInfo.dataList.deductions)).map(([key, value]) => ({
      deductionTitle: key, 
      deduction: value 
    }))
  : [{ deductionTitle: "", deduction: "" }];
      
    }catch(error){
      console.log("Erro Payrole ", error);
      toast.error("Something went wrong. Please try again.");
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
      formData.append("dataId", dataId.value);
      formData.append("totalDeduction", totalDeduction.value);
      formData.append("netSalary", netSalary.value);
      formData.append("totalHourse", totalHourse.value);
      formData.append("totalAllowance", totalAllowance.value);
      formData.append("hourly_rate", hourly_rate.value);
      formData.append("overtime_hours", overtime_hours.value);
      formData.append("basicSalary", basicSalary.value);
      formData.append("status", status.value);
      fieldsAllowance.value.forEach((field, index) => {
        formData.append(`allowances[${index}][allowanceTitle]`, field.allowanceTitle);
        formData.append(`allowances[${index}][allowance]`, field.allowance);
      });
  
      fields.value.forEach((field, index) => {
        formData.append(`deductions[${index}][deductionTitle]`, field.deductionTitle);
        formData.append(`deductions[${index}][deduction]`, field.deduction);
      });
  
      const response = await axios.post(
        "/staff/v1/erp/payroll/update",
        formData,
        config
      );
  
      if (response.data.msgFlag) {
        toast.success(response.data.msg);
        router.push({ name: "PayrollList" });
      } else {
        toast.error(response.data.errMsg);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }
 
  
  const fetchAllData = async () => {
    await getPayrollInfo();
  };
  onBeforeMount(fetchAllData);
  </script>
      