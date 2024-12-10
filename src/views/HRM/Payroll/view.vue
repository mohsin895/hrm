<template>
    <div class="loyel-erp-department">
      <div class="bg-white h-12 pl-5 py-1 flex justify-between">
       <div>
        <span class="text-black flex"
          ><router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
          <span class="inline-flex items-center text-cyneColor"
            ><icon name="circle" size="10px" class="ml-2 mr-2"
          /></span>
          <span><router-link :to="{ name: 'PayrollList' }">Payroll List</router-link> </span
          ><span class="inline-flex items-center text-cyneColor"
            ><icon name="circle" size="10px" class="ml-2 mr-2"
          /></span>
          <span> <router-link :to="{name:'PayrollCreate'}">Add New Payroll</router-link></span></span
        >
       </div>
      
        <div class=" inline-block text-left pr-5"  @mouseover="showDropdown"  @mouseleave="hideDropdown" >
    <!-- Dropdown Button -->
        <button class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium cursor-pointer  items-center  bg-red-500 ml-4  hover:bg-red-700 text-white focus:outline-none">
        Action <icon name="angle-down" size="15px" style="margin-left: 10px" />
        </button>

    <!-- Dropdown Menu -->
    <div v-if="isDropdownOpen" class="absolute right-0  w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <a href="#" @click="printPayslip" class="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"><icon name="print" size="15px" style="margin-right: 10px" /> Print</a>
        <router-link :to="{ name: 'PayrollEdit', params: { dataId: dataId }, }" class="flex  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"> <icon name="pencil" size="15px" style="margin-right: 10px" />Edit</router-link>
        <a :href="`${baseUrl}/payroll/download/${dataId}`" @click.prevent="downloadAndRedirect"  class="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"><icon name="download" size="15px" style="margin-right: 10px" /> Download PDF</a>
      </div>
    </div>
  </div>
      </div>
    
    <div class="w-full mx-auto p-5">

    <div class="flex justify-between items-start">
        <div></div>
        <div class="text-right">
            <p class="text-right">
            <img :src="baseUrl + globalData.shop_logo" class="ml-auto h-8" />
        </p>
            <p style="text-align: right;">

            <b>{{globalData.shop_name}}</b><br/>
            {{globalData.shop_address}}<br/>
            <b>Contact</b>: {{globalData.shop_phone}}
            {{globalData.office_email}}

            </p>
        </div>
    </div>

    <table class="w-full mt-6 text-sm emp" >
        <tr>
        <td colspan="3" class="text-center text-lg font-bold">Payslip<br>
            Salary Month:{{ payrollInfo.month }}, {{ payrollInfo.year }}
        </td>
        </tr>
        <tr >
        <td><strong>EmployeeID:{{ payrollInfo.employee_info.employeeID }}</strong> </td>
        <td><strong>Name:{{ payrollInfo.employee_info.full_name }}</strong> </td>
        <td><strong>Payslip No:</strong> </td>
        </tr>
        <tr>
            <td><strong>Department:{{ payrollInfo.employee_info.employeeID }}</strong> </td>
        <td><strong>Designation:{{ payrollInfo.employee_info.full_name }}</strong> </td>
        <td><strong>Joining Date:</strong> </td>
        </tr>
    </table>
    <table class="details">

    <tr>
    
        <td>
            <table class="w-full bg-white shadow rounded-md payment_details">
          <thead>
            <tr>
            <th colspan="2" class="text-left bg-gray-100 p-2">
                Payment Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td><strong>Pay Type</strong></td>

            <td><strong>Amount</strong></td>
            </tr>
            <tr>
                <td>Basic</td>
                <td> {{payrollInfo.basic}} </td>
            </tr>
            <tr>
                <td>Hourly Payment</td>
                <td> {{payrollInfo.overtime_pay}} </td>
            </tr>
            <tr>
                <td>Expense Claim</td>
                <td>  </td>
            </tr>
        
        
                <tr v-for="(allowance, index) in fieldsAllowance" :key="index">
                <td class="p-2">{{ allowance.allowanceTitle }}</td>
                <td class="p-2">{{ allowance.allowance  }}</td> 
            </tr>
            
    
        </tbody>
        </table>
            </td>
            <td>
                <table class="w-full bg-white shadow rounded-md payment_details">
        <thead>
            <tr>
            <th colspan="2" class="text-left bg-gray-100 p-2">Deductions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td class="p-2"><strong>Pay Type</strong></td>
            <td class="p-2"><strong>Amount</strong></td>
            </tr>
        
            <tr v-for="(deduction, index) in fields" :key="index">
                <td class="p-2">{{ deduction.deductionTitle }}</td>
                <td class="p-2">{{ deduction.deduction  }}</td> 
            </tr>
        
        </tbody>
        </table>
            </td>


            </tr>

    </table>
    <hr>
    <table class=" payment_total">
        <tr>
        <td><strong>&nbsp;</strong></td>

        <td>
            <table class="w-full bg-white shadow rounded-md payment_details">
                <thead>
            <tr>
               
                    <th colspan="2" class="text-left bg-gray-100 p-2">Total</th>
                </tr>
          </thead>
          <tbody>
                
                <tr>
                    <td>Total Allowances</td>

                    <td> {{payrollInfo.total_allowance}}  </td>
                </tr>

                <tr>
                    <td>Total Deductions</td>

                    <td> {{payrollInfo.total_deduction}} </td>
                </tr>
                <tr class="print_bg">
                    <td><b>Net Salary</b></td>

                    <td>  {{payrollInfo.net_salary}} </td>
                </tr>
                </tbody>
            </table>

        </td>
    </tr>
    </table>
  
    </div>
      
    </div>
  </template>
<script setup>
  import axios from "axios";
  import { ref, onBeforeMount, inject, computed,onMounted } from "vue";
  import { useToast } from "vue-toastification";
  import { useRoute, useRouter } from 'vue-router';
  import { useGlobalStore } from '@/store/global'; 
  const route = useRoute();
  const router = useRouter()
  const toast = useToast();
  const baseUrl = inject('$baseUrl');
  const fieldsAllowance = ref([]);
  const fields = ref([]);

  const dataId = ref(route.params.dataId);

  const payrollInfo = ref({
  employee_info: {
    employeeID: "",
    full_name: "",
    profile_image :"",
  },
  month: "",
  year: ""
});
const globalData = computed(() => {
  const storedData = sessionStorage.getItem("globalData");
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return globalStore.globalData;
  }
});

onMounted(() => {
  const storedData = sessionStorage.getItem("globalData");
  if (!storedData) {
    globalStore.fetchGlobalData().then(() => {
      sessionStorage.setItem("globalData", JSON.stringify(globalStore.globalData));
    });
  }
});
   function  printPayslip() {
      window.print();
    }
    const downloadAndRedirect = () => {
    const url = `${baseUrl}/payroll/download/${dataId.value}`;
    
    // Open the PDF download in a new tab
    window.open(url, '_blank');

    // Redirect back after a short delay
    setTimeout(() => {
        router.push({ name: 'PayrollList' }); // Change to your target route
    }, 1000); // Adjust the delay as needed
};
  
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
   
      const monthNumber = parseInt(dataInfo.dataList.month); 
     const monthName = new Date(0, monthNumber - 1).toLocaleString('default', { month: 'long' }); // e.g., "October"
      payrollInfo.value.month = monthName;
      fieldsAllowance.value = dataInfo.dataList.allowances && dataInfo.dataList.allowances !== "[]"
  ? Object.entries(JSON.parse(dataInfo.dataList.allowances)).map(([key, value]) => ({
      allowanceTitle: key, 
      allowance: value 
    }))
  : [];

   fields.value = dataInfo.dataList.deductions && dataInfo.dataList.deductions !== "[]"
  ? Object.entries(JSON.parse(dataInfo.dataList.deductions)).map(([key, value]) => ({
      deductionTitle: key, 
      deduction: value 
    }))
  : [];
      
    }catch(error){
      console.log("Erro Payrole ", error);
   
    }
  }
  

 
const isDropdownOpen = ref(false)

const showDropdown = () => {
  isDropdownOpen.value = true
}

const hideDropdown = () => {
  isDropdownOpen.value = false
}
  
  const fetchAllData = async () => {
    await getPayrollInfo();
  
  };

  onBeforeMount(fetchAllData);
  </script>
  <style lang="css" scoped>


@media print {
    /* Hide everything except the desired section */
    body * {
        display: none !important;
    }

    .w-full.mx-auto.p-5 {
        display: block !important; /* Show the main content */
    }

    .bg-white.h-12.pl-5.py-1.flex.justify-between {
        display: none; /* Hide the header */
    }

    /* Other specific styles for printing */
    table {
        width: 100%; /* Ensure tables are full width */
        border-collapse: collapse; /* Collapse borders for cleaner look */
    }

    th, td {
       
        padding: 5px; /* Add padding for readability */
    }

    /* Adjust font sizes for print */
    body {
        font-size: 12px; /* Slightly smaller for printing */
        color: #000; /* Ensure text is black */
        background: none !important; /* Remove background colors */
    }

    /* Additional styles as needed */
}


table.details, table.payment_total {
    margin: 10px 0; /* Add space between tables */
}

table.emp tr td {
    width: auto; /* Allow cells to size based on content */
    padding: 8px; /* Add padding */
}

table.details tr th {
    background-color: #F2F2F2 !important; /* Ensure headers are distinct */
    font-weight: bold; /* Make headers stand out */
}

/* Hide unnecessary elements */
.logo-default {
    display: none; /* Optionally hide the logo in print */
}

table.emp {
            width: 100%;
            margin-bottom: 10px;
            padding: 40px;
        }

        table.details, table.payment_details {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        table.payment_total {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 10px;
        }

        table.emp tr td {
            width: 30%;
            padding: 10px
        }

        table.details tr th {
            border: 1px solid #000000;
            background-color: #F2F2F2;
            font-size: 15px;
            padding: 10px
        }

        table.details tr td {
            vertical-align: top;
            width: 30%;
            padding: 3px
        }

        table.payment_details > tbody > tr > td {
            border: 1px solid #000000;
            padding: 5px;
        }

        table.payment_total  > tr > td {
            padding: 5px;
            width: 60%
        }
    
</style>
      