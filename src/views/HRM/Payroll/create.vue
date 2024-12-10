<template>
  <div class="loyel-erp-department">
    <div class="bg-white h-8 pl-5 py-1">
      <span class="text-black flex"
        ><router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
        <span class="inline-flex items-center text-cyneColor"
          ><icon name="circle" size="10px" class="ml-2 mr-2"
        /></span>
        <span><router-link :to="{ name: 'PayrollList' }">Payroll</router-link> </span
        ></span
      >
    </div>
    <div class="sm:ml-2 sm:mr-2 md:ml-10 md:mr-10">
      <div class="card w-full bg-white mt-4 pb-4 pt-4">
        <span class="pl-4 pt-4 text-xl text-bold text-red-500"
          >Eployee Info</span
        >
        <hr class="mt-4" />
        <div class="flex p-4">
          <div class="flex-grow">
            <select
              v-model="employeeID"
              @change="employeeInfoCheck"
              class="block h-9 w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option
                v-for="employee in employeeList"
                :key="employee.id"
                :value="employee.id"
              >
                {{ employee.full_name }}(EmpId:{{ employee.employeeID }})
              </option>
            </select>
          </div>

          <div class="flex-grow mr-4">
            <select
              v-model="selectedMonth"
               @change="employeeInfoCheck"
              class="block h-9 w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option
                v-for="month in months"
                :key="month.value"
                :value="month.value"
              >
                {{ month.name }}
              </option>
            </select>
          </div>

          <!-- Designation Section -->

          <div class="flex-grow mr-2">
            <select
              v-model="year"
               @change="employeeInfoCheck"
              class="block h-9 w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>

          <div class="flex-grow">
            <button
              class="bg-white-500 bg-customCyan hover:bg-hoverCyan font-bold py-1 px-4 border text-white focus:outline-none focus:shadow-outline text-right"
              type="button"
              @click="getEmployeeInfo"
            >
              Go
            </button>
          </div>
          <!-- Date of Birth Section -->
        </div>
      </div>
    </div>
  
    <div v-if="employeeInfo != null">
      <div v-if="showPayroll === 2">
        <form @submit.prevent="submitForm" >
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
                  <div class="w-full sm:w-3/12 text-right">Status</div>
                  <div class="flex-grow">
                    <select
                      v-model="status"
                      class="block h-9 w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
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
          >Allowances</span
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
          >Deductions</span
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
      <div v-else-if="showPayroll === 1">
        <form @submit.prevent="updateForm">
        <div class="sm:ml-2 sm:mr-2 md:ml-10 md:mr-10">
        <div class="card w-full bg-white mt-4 pt-4">
          <span class="pl-4 pt-4 text-xl text-bold text-black"
            >Edit Salary Info</span
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
                    <div class="w-full sm:w-3/12 text-right">Status</div>
                    <div class="flex-grow">
                      <select
                        v-model="status"
                        class="block h-9 w-full border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
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
                  <tr v-for="(field, index) in fieldsAllowanceEdit" :key="index" class="mb-4">
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
                          @click="addFieldAllowanceEdit"
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
                          @click="removeFieldAllowanceEdit(index)"
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
                  <tr v-for="(field, index) in fieldsEdit" :key="index" class="mb-4">
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
                          @click="addFieldEdit"
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
                          @click="removeFieldEdit(index)"
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
                  v-model="totalAllowanceEdit"
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
                  v-model="totalDeductionEdit"
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
                  v-model="netSalaryEdit"
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
      <div v-else>

      </div>
      
    
    </div>
    <div v-else>

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
         
            <div class="modal-body p-6">
              <span>
                Salary Slip for the employee for selected month and year has already been created. Do you want modify it?

             
              </span>
              
            </div>
            <div class="border-t border-gray-200">
              <div class="flex items-end justify-end space-x-4 p-6">
                <button @click="closeModal" class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right" type="button">
                  Cancel
                </button>
             
                  <button  @click="showEditForm"
                class=" flex bg-customCyan hover:bg-hoverCyan hover:text-white text-white font-bold py-2 px-4 border  focus:outline-none focus:shadow-outline text-right"
               
              >  <icon name="pencil" size="15px" style="margin-right: 10px" /> Modify
         
               
              </button>
              
              </div>
            </div>
         
        </div>
      </div>
    
  </div>
</template>
 <script setup>
    import axios from "axios";
    import { ref, onBeforeMount, computed } from "vue";
    import { useToast } from "vue-toastification";
    import { useRouter } from "vue-router";
    const toast = useToast();
    const isModalOpenDelete = ref(false);
    const modalBackdrop = ref(null);
    const router = useRouter();
    const year = ref(new Date().getFullYear());
    const basicSalary = ref("");
    const hourly_rate = ref("");
    const employeeList = ref([]);
    const employeeInfo = ref(null);
    const overtime_hours = ref("");
    const employeeID =ref("");
    const payrolls = ref({});
    const status = ref('paid');
    const salaryId = ref("");
    const showPayroll = ref(0);
    // const fields = ref([{ deductionTitle: "", deduction: "" }]);
    // const fieldsAllowance = ref([{ allowanceTitle: "", allowance: "" }]);

    const fieldsAllowance = ref([{ allowanceTitle: "", allowance: "" }]);
    const fields = ref([{ deductionTitle: "", deduction: "" }]);

    const fieldsAllowanceEdit = ref([{ allowanceTitle: "", allowance: "" }]);
    const fieldsEdit = ref([{ deductionTitle: "", deduction: "" }]);

    
      function closeModal() {
       
        isModalOpenDelete.value = false;
        
      }
      
     function showEditForm(){
      closeModal();
      showPayroll.value = 1;
     }
      function employeeInfoCheck(){
        showPayroll.value = 0;
        overtime_hours.value = '';
      }
      function handleBackdropClick(event) {
        if (event.target === modalBackdrop.value) {
          closeModal();
        }
      }


    const months = [
      { name: "January", value: 1 },
      { name: "February", value: 2 },
      { name: "March", value: 3 },
      { name: "April", value: 4 },
      { name: "May", value: 5 },
      { name: "June", value: 6 },
      { name: "July", value: 7 },
      { name: "August", value: 8 },
      { name: "September", value: 9 },
      { name: "October", value: 10 },
      { name: "November", value: 11 },
      { name: "December", value: 12 },
    ];
    const selectedMonth = ref(new Date().getMonth());

    const currentYear = new Date().getFullYear() + 1;
    const years = Array.from(
      { length: currentYear - 1970 + 1 },
      (_, i) => currentYear - i
    ); 

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

    function addFieldEdit() {
      fieldsEdit.value.push({ deductionTitle: "", deduction:"" });
    }

    function removeFieldEdit(index) {
      fieldsEdit.value.splice(index, 1);
    }

    function addFieldAllowanceEdit() {
        fieldsAllowanceEdit.value.push({ allowanceTitle: "", allowance:"" });
    }

    function removeFieldAllowanceEdit(index) {
        fieldsAllowanceEdit.value.splice(index, 1);
    }

    const totalHourse = computed(() => {
      const hourse = overtime_hours.value;
      const amount = hourly_rate.value;
      
      const totalAmount = hourse * amount;
      
      const totalHourePayment = parseFloat(totalAmount) || 0;
      
      return totalHourePayment;
    });

    const totalAllowance = computed(() => {
      return fieldsAllowance.value.reduce((total, field) => {
        const allowanceValue = parseFloat(field.allowance) || 0;
        return total + allowanceValue;
      }, 0);
    });


    const totalDeduction = computed(() => {
      return fields.value.reduce((total, field) => {
        const deductionValue = parseFloat(field.deduction) || 0;
        return total + deductionValue;
      }, 0);
    });

    const totalAllowanceEdit = computed(() => {
      return fieldsAllowanceEdit.value.reduce((total, field) => {
        const allowanceValue = parseFloat(field.allowance) || 0;
        return total + allowanceValue;
      }, 0);
    });


    const totalDeductionEdit = computed(() => {
      return fieldsEdit.value.reduce((total, field) => {
        const deductionValue = parseFloat(field.deduction) || 0;
        return total + deductionValue;
      }, 0);
    });

    const netSalary = computed(() => {
      return (Number(totalHourse.value) + Number(totalAllowance.value) + Number(basicSalary.value)) - Number(totalDeduction.value);
    });

    const netSalaryEdit = computed(() => {
      return (Number(totalHourse.value) + Number(totalAllowanceEdit.value) + Number(basicSalary.value)) - Number(totalDeductionEdit.value);
    });

    async function getEmployeeInfo(){
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
        const response = await axios.get("/staff/v1/erp/payroll/get/employee/info",
        {
            params: {
              dataId: employeeID.value,
              month: selectedMonth.value,
              year : year.value

            }, 
            headers: config.headers
          });

          let dataInfo = response.data;
          
          if(dataInfo.payrolls != null){
            isModalOpenDelete.value = true;
          }else{
            showPayroll.value = 2;
          }
          employeeInfo.value = dataInfo.dataInfo;
          basicSalary.value = dataInfo.basicSalary;
          hourly_rate.value = dataInfo.hourly_rate; 
          payrolls.value = dataInfo.payrolls;
          overtime_hours.value = dataInfo.payrolls.overtime_hours;
          salaryId.value = dataInfo.payrolls.id;
          status.value = dataInfo.payrolls.status;
      
          fieldsAllowanceEdit.value = dataInfo.payrolls.allowances && dataInfo.payrolls.allowances !== "[]"
        ? Object.entries(JSON.parse(dataInfo.payrolls.allowances)).map(([key, value]) => ({
          allowanceTitle: key, 
          allowance: value 
        }))
        : [{ allowanceTitle: "", allowance: "" }];

        fieldsEdit.value = dataInfo.payrolls.deductions && dataInfo.payrolls.deductions !== "[]"
      ? Object.entries(JSON.parse(dataInfo.payrolls.deductions)).map(([key, value]) => ({
          deductionTitle: key, 
          deduction: value 
        }))
      : [{ deductionTitle: "", deduction: "" }];
        
      }catch(error){
        console.log("Erro Payrole ", error);
        
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
        formData.append("totalDeduction", totalDeduction.value);
        formData.append("netSalary", netSalary.value);
        formData.append("totalHourse", totalHourse.value);
        formData.append("totalAllowance", totalAllowance.value);
        formData.append("dataId", employeeID.value);
        formData.append("month", selectedMonth.value);
        formData.append("year", year.value);
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
          "/staff/v1/erp/payroll/insert",
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

    async function updateForm() {
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
          formData.append("dataId", salaryId.value);
          formData.append("totalDeduction", totalDeductionEdit.value);
          formData.append("netSalary", netSalaryEdit.value);
          formData.append("totalHourse", totalHourse.value);
          formData.append("totalAllowance", totalAllowanceEdit.value);
          formData.append("hourly_rate", hourly_rate.value);
          formData.append("overtime_hours", overtime_hours.value);
          formData.append("basicSalary", basicSalary.value);
          formData.append("status", status.value);
          fieldsAllowanceEdit.value.forEach((field, index) => {
            formData.append(`allowances[${index}][allowanceTitle]`, field.allowanceTitle);
            formData.append(`allowances[${index}][allowance]`, field.allowance);
          });
      
          fieldsEdit.value.forEach((field, index) => {
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
        const response = await axios.get("/staff/v1/erp/payroll/get/employee/list", config);
        employeeList.value = response.data;
        if (employeeList.value.length > 0) {
          employeeID.value = employeeList.value[0].id;
        }
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    };

    const fetchAllData = async () => {
      await fetchEmployeeList();
    };
    onBeforeMount(fetchAllData);
</script>
    