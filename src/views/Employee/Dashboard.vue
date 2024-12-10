<template>
  <div class="bg-dark">
    <div class="sm:ml-2 sm:mr-2 md:ml-1 md:mr-1">
      <div class="card w-full bg-profilebgColor mt-5">
        <div class="grid grid-cols-2 gap-4 p-4">
          <div class="col-6 bg-white mr-4 place-self-auto">
            <div class="mb-4 flex justify-between">
              <div
                class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer"
              >
                <span class="inline-flex items-center text-white">
                  <icon name="user" size="15px" style="margin-right: 8px" />
                  Personal Details
                </span>
              </div>
            </div>
            <div class="overflow-x-auto">
              <div class="flex space-x-4">
                <div class="w-full">
                  <table class="w-full min-w-max">
                    <tbody>
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-10">
                          Name
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-10">
                          {{ employeeInfo.full_name }}
                        </td>
                      </tr>
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          Father's Name
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ employeeInfo.father_name }}
                        </td>
                      </tr>
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          Dath of Birth
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{
                            $filters.formatDateWithDayMonth(
                              employeeInfo.date_of_birth
                            )
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          Gender
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ employeeInfo.gender }}
                        </td>
                      </tr>
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          Email
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ employeeInfo.email }}
                        </td>
                      </tr>
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          Phone
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ employeeInfo.mobile_number }}
                        </td>
                      </tr>
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          Local Address
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ employeeInfo.local_address }}
                        </td>
                      </tr>
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          Permanent Address
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ employeeInfo.permanent_address }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Section -->
          <div class="col-6 bg-white">
            <div class="mb-4 flex justify-between">
              <div
                class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer"
              >
                <span class="inline-flex items-center text-white">
                  Notice Board
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row p-4">
          <div class="basis-1/2 bg-white mr-4">
            <div class="mb-4 flex justify-between">
              <div
                class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer"
              >
                <span class="inline-flex items-center text-white">
                  <icon name="briefcase" size="15px" style="margin-right: 8px" />
                  Company Details
                </span>
              </div>
            </div>
            <div class="overflow-x-auto">
              <div class="flex space-x-4">
                <div class="w-full">
                  <table class="w-full min-w-max">
                    <tbody>
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          Employee ID
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ employeeInfo.employeeID }}
                        </td>
                      </tr>
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          Department
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ employeeInfo.father_name }}
                        </td>
                      </tr>
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          Designation
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          <span v-if="employeeInfo.get_designation != null">
                          {{ employeeInfo.get_designation.designation }}
                      </span>
                        </td>
                      </tr>
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          Date of Joining
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ employeeInfo.gender }}
                        </td>
                      </tr>
                      <tr>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          Salary
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          <span
                            v-for="(salary, index) in employeeInfo.salaries"
                            :key="index"
                          >
                            <p>{{ salary.remarks }} : {{ salary.salary }}</p>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Section -->
          <div class="basis-1/2 bg-white">
            <div class="mb-4 flex justify-between">
              <div
                class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer"
              >
                <span class="inline-flex items-center text-white">
                  Upcoming Holidays
                </span>
              </div>
            </div>
            <div class="overflow-auto h-72">
        <div class="flex space-x-4">
          <div class="w-full">
            <table class="w-full min-w-max">
    <tr v-for="(dataInfo, index) in HolydayList" :key="index">
      <td>
        <div :class="`alert-blocks alert-blocks-${holiday_color[dataInfo.id % holiday_color.length]}`">
          <div class="overflow-h">
            <strong :class="`color-${holiday_font_color[dataInfo.id % holiday_font_color.length]}`">
              {{ dataInfo.occassion }}
              <small class="pull-right">
                <em>{{ dataInfo.date }}</em>
              </small>
            </strong>
          </div>
        </div>
      </td>
    </tr>
  </table>
          </div>
        </div>
      </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row p-4">
          <div class="basis-1/2 bg-white mr-4">
            <div class="mb-4 flex justify-between">
              <div
                class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer"
              >
                <span class="inline-flex items-center text-white">
                  Bank Details
                </span>
              </div>
            </div>
            <div class="overflow-x-auto">
              <div class="flex space-x-4">
                <div class="w-full">
                  <table class="w-full min-w-max">
                    <tbody>
                     
                      <tr v-if="employeeInfo.bank_details != null">
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                            Account Holder Name
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12" >
                          {{ employeeInfo.bank_details.account_name }}
                        </td>
                      </tr>
                      <tr v-if="employeeInfo.bank_details != null">
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                            Account Number
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{
                           
                              employeeInfo.bank_details.account_number
                            
                          }}
                        </td>
                      </tr>
                      <tr v-if="employeeInfo.bank_details != null">
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                            Bank Name
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ employeeInfo.bank_details.bank }}
                        </td>
                      </tr>
                     
                      <tr v-if="employeeInfo.bank_details != null">
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                            Tax Payer Id
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ employeeInfo.bank_details.ifsc }}
                        </td>
                      </tr>
                      <tr v-if="employeeInfo.bank_details != null">
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                            Bank Identifier Code
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ employeeInfo.bank_details.bin }}
                        </td>
                      </tr>
                      <tr v-if="employeeInfo.bank_details != null">
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                            Branch Location
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-12">
                          {{ employeeInfo.bank_details.branch }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Section -->
          <div class="basis-1/2 bg-white">
            <div class="mb-4 flex justify-between">
              <div
                class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer"
              >
                <span class="inline-flex items-center text-white">
                  Awards
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";


const employeeInfo = ref([]);
const HolydayList = ref([]);
const holiday_font_color=ref([]);
const holiday_color =ref([]);
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
    const response = await axios.get("/employee/v1/erp/dashboard/info", config);
    employeeInfo.value = response.data.employeeInfo;
    HolydayList.value = response.data.holidays;
    holiday_font_color.value=response.data.holiday_font_color;
    holiday_color.value = response.data.holiday_color;
  } catch (error) {
    console.error("Error fetching leave data:", error);
  }
};

onMounted(fetchDataList);
</script>
  
<style scoped>
.alert-blocks:first-child {
    margin-top: 15px;
}


.alert-blocks {
    margin: 0 15px 5px;
    background: #f7f7f7;
    padding: 10px 10px 13px;
}

.color-blue {
    color: #3498db;
}

b, strong {
    font-weight: 700;
}
.color-red {
    color: #e74c3c;
}
.alert-blocks-success {
    background: #e1febc;
}
.alert-blocks-info {
    background: #e0f3fe;
}
.alert-blocks-error {
    background: #fee0e0;
}
.color-green {
    color: #4765a0;
}
.alert-blocks strong small {
    color: #a3a3a3;
    font-weight: 200;
    margin-top: 3px;
}

.pull-right {
    float: right;
}
.pull-right {
    float: right !important;
}
small, .small {
    font-size: 85%;
}
/* Your styles here */
</style>