<template>
  <div class="loyel-erp-department mt-10 ml-10 mr-10 bg-white p-6">
    <!-- Search Input -->
   

          <div class="p-2 mb-4">
        <router-link :to="{ name: 'EmployeeCreate' }">
          <div class="bg-customCyan hover:bg-hoverCyan p-2 w-48 cursor-pointer">
            <span class="inline-flex items-center text-white">
              Add New Employee <icon name="plus" size="15px" style="margin-left: 8px" />
            </span>
          </div>
        </router-link>
      </div>

    <div class="card w-full">
     
      <div class="flex justify-between mb-4">

        <!-- Records per Page Dropdown -->
        <select v-model="perPage" @change="fetchDataList(1)" class="border border-gray-300 p-2 focus:outline-none">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="all">All</option>
        </select>

          <!-- Search Input -->
          <input
          type="text"
          v-model="searchTerm"
          @input="fetchDataList(1)"
          placeholder="Search employees..."
          class="border border-gray-300 p-2 focus:outline-none w-64 mr-4"
        />

        </div>

          
      <div class="overflow-x-auto">
        <!-- Table -->
        <table class="border-collapse border border-slate-400 w-full min-w-max">
          <thead>
            <tr>
              <th class="border border-slate-300 h-10">Employee ID</th>
              <th class="border border-slate-300 h-10">Image</th>
              <th class="border border-slate-300 h-10">Name</th>
              <th class="border border-slate-300 h-10">Department</th>
              <th class="border border-slate-300 h-10">Designation</th>
              <th class="border border-slate-300 h-10">At Work</th>
              <th class="border border-slate-300 h-10">Status</th>
              <th class="border border-slate-300 h-10">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dataInfo, index) in dataList" :key="index">
              <td class="border border-slate-300 pl-4 h-16 text-sm">{{ dataInfo.employeeID }}</td>
              <td class="border border-slate-300 pl-4 text-sm">
                <img :src="baseUrl + dataInfo.profile_image" class="h-20 w-20" />
              </td>
              <td class="border border-slate-300 pl-4 text-sm">{{ dataInfo.full_name }}</td>
              <td class="border border-slate-300 pl-4 text-sm">{{ dataInfo.department }}</td>
              <td class="border border-slate-300 pl-4 text-sm">{{ dataInfo.designation }}</td>
              <td class="border border-slate-300 pl-4 text-sm">{{ countdownInfo[dataInfo.id].countdownText }}</td>
              <td class="border border-slate-300 pl-4 text-sm">{{ dataInfo.status }}</td>
              <td class="border border-slate-300 pl-4">
                <span class="inline-flex items-center">
                  <router-link :to="{ name: 'EmployeeEdit', params: { dataId: dataInfo.id } }">
                    <span class="p-2 cursor-pointer mr-6 inline-flex items-center text-xs bg-purple-500 hover:bg-purple-700 text-white">
                      <icon name="pencil" size="15px" class="mr-2" /> View/Edit
                    </span>
                  </router-link>
                  <span class="p-2 cursor-pointer inline-flex items-center text-xs bg-red-500 ml-4 hover:bg-red-700 text-white" @click="openModalDelete(dataInfo)">
                    <icon name="trash" size="15px" class="mr-2" /> Delete
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination Controls -->
        <div class="pagination-controls mt-4">
          <button :disabled="pagination.current_page === 1" @click="fetchDataList(1)">First</button>
          <button :disabled="pagination.current_page === 1" @click="fetchDataList(pagination.current_page - 1)">Previous</button>

          <button v-for="page in visiblePages" :key="page" @click="fetchDataList(page)" :class="{ 'active': pagination.current_page === page }">
            {{ page }}
          </button>

          <button :disabled="pagination.current_page === pagination.last_page" @click="fetchDataList(pagination.current_page + 1)">Next</button>
          <button :disabled="pagination.current_page === pagination.last_page" @click="fetchDataList(pagination.last_page)">Last</button>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="isModalOpenDelete" ref="modalBackdrop" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start justify-center pt-20" @click="handleBackdropClick">
      <div class="bg-white shadow-lg w-full max-w-2xl" @click.stop>
        <div class="flex justify-between items-center p-6 mb-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold">Confirmation</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200">&times;</button>
        </div>
        <form @submit.prevent="DeleteInfo">
          <div class="modal-body p-6">
            <span>Are you sure you want to delete this employee?</span>
            <div class="bg-orange-500 p-4 mt-2">
              <span class="font-bold">Note:</span> All associated data will also be removed.
            </div>
          </div>
          <div class="border-t border-gray-200 p-6 flex justify-end">
            <button @click="closeModal" class="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 mr-2">Cancel</button>
            <button type="submit" class="bg-red-500 hover:bg-red-700 text-white py-2 px-4">Delete</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
    import axios from "axios";
    import { ref, onMounted, computed,inject } from "vue";
    import { useToast } from "vue-toastification";

    const toast = useToast();
    const isModalOpenDelete = ref(false);
    const dataList = ref([]);
    const dataId = ref(null);
    const baseUrl = inject('$baseUrl');
    const pagination = ref({});
    const searchTerm = ref("");
    const perPage = ref(10);

    const visiblePages = computed(() => {
  const { current_page, last_page } = pagination.value;
  const pagesToShow = 5;
  let startPage = Math.max(current_page - Math.floor(pagesToShow / 2), 1);
  let endPage = Math.min(startPage + pagesToShow - 1, last_page);

  if (endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(endPage - pagesToShow + 1, 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

async function fetchDataList(page = 1) {
  try {
    const token = window.localStorage.getItem("token");
    const config = { headers: { Authorization: "Bearer " + token } };
    const response = await axios.get(`/staff/v1/erp/employee/get/list`, {
      params: { page, perPage: perPage.value, search: searchTerm.value },
      ...config,
    });
 if(perPage.value == 'all'){
  dataList.value = response.data;
 }else{
  dataList.value = response.data.data;
 }
   
    pagination.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

    function openModalDelete(dataInfo) {
      dataId.value = dataInfo.id;

      isModalOpenDelete.value = true;
    }

    function closeModal() {
    
      isModalOpenDelete.value = false;
    
    
      dataId.value = null;

    }

    function handleBackdropClick(event) {
      if (event.target === modalBackdrop.value) {
        closeModal();
      }
    }


    async function DeleteInfo() {
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
          dataId: dataId.value || null,
        };

        const response = await axios.post("/staff/v1/erp/employee/delete", payload, config);

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

    const calculateCountdown = (dataInfo) => {
      const joiningDate = new Date(dataInfo.joining_date);
      const now = new Date();

      // Calculate the difference in milliseconds
      let timeDiff = Math.abs(now.getTime() - joiningDate.getTime());

      // Calculate years
      const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
      timeDiff -= years * (1000 * 60 * 60 * 24 * 365);

      // Calculate months
      const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
      timeDiff -= months * (1000 * 60 * 60 * 24 * 30);

      // Calculate days
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      return {
        countdownText: `${years} years, ${months} months, ${days} days`,
      };
    };

    const countdownInfo = computed(() => {
      const countdownInfo = {};
      for (const dataInfo of dataList.value) {
        countdownInfo[dataInfo.id] = calculateCountdown(dataInfo);
      }
      return countdownInfo;
    });
    onMounted(fetchDataList);
</script>
<style scoped>
.pagination-controls {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 0.5rem;
}

button {
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  background-color: white;
  cursor: pointer;
}

button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* span {
  padding: 0.5rem;
} */

</style>





























