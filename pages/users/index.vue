<template>
  <v-window>
    <v-window-item>
      <v-row align-item="center" class="list px-3 mx-auto cus-row">
        <v-col cols="12" align-item="center" class="col-cus">
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="3">
              <div class="input-group search" id="search">
                <input
                  v-model="filter.a.full_name"
                  class="form-control border input-cus"
                  type="search"
                  placeholder="Sinh viên"
                />
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="3">
              <div>
                <select
                  v-model="filter.a.is_active"
                  class="form-select select-cus"
                  id="type"
                  required
                >
                  <option value="" selected>Tất cả</option>
                  <option :value="1">đang hoạt động</option>
                  <option :value="0">khóa tài khoản</option>
                </select>
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="3">
              <div>
                <select
                  v-model="filter.a.faculty_id"
                  class="form-select select-cus"
                  required
                >
                  <option value="" disabled selected>Chọn khoa</option>
                  <option
                    v-for="faculty in faculties"
                    :key="faculty.id"
                    :value="faculty.id"
                  >
                    {{ faculty.name }}
                  </option>
                </select>
              </div>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="3">
              <v-btn @click.prevent="search" width="100%">
                <v-icon>mid-camera</v-icon>
                <v-icon>mdi-magnify</v-icon>Tìm Kiếm
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="cus-table">
          <v-row>
            <div class="header_fixed">
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <!-- <th>Ảnh</th> -->
                    <th>Họ & tên sinh viên</th>
                    <th>Email</th>
                    <th>Khoa</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in myUsers" :key="user.id">
                    <td>{{ index + 1 }}</td>
                    <!-- <td><img :src="`${user.img}`" /></td> -->
                    <td>{{ user.full_name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.faculty }}</td>
                    <td>
                      <button @click="navigateTo(`/users/${user.id}`)">
                        <v-icon class="pr-3">mdi-eye</v-icon>Xem
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <v-progress-circular
                indeterminate
                color="primary"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin: auto;
                "
                v-if="loading"
              ></v-progress-circular>
              <v-pagination
                v-model="page"
                :length="pagination.total_page"
                color="purple"
                @click="handleChangePage"
              ></v-pagination>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-window-item>
  </v-window>
</template>
<script setup>
definePageMeta({
  layout: "default",
  middleware: "authenticated",
});

const route = useRoute();
const page = ref(1);
const pagination = ref({
  current_page: 0,
  total_page: 0,
  total_rows: 0,
});
const router = useRouter();
const faculties = ref({});
const loading = ref(true);
const myUsers = ref([]);
const filter = ref({
  a: {
    full_name: route.query.full_name === undefined ? "" : route.query.full_name,
    faculty_id:
      route.query.faculty_id === undefined ? "" : route.query.faculty_id,
    is_active: route.query.is_active === undefined ? "" : route.query.is_active,
    page: page,
  },
});
const handleChangePage = () => {
  loading.value = true;
  getFilterUsers().json().execute();
};
const { url: urlUser } = useUrl({
  path: "/users",
  queryParams: filter.value.a,
});

const {
  data: dataGetFilterUsers,
  get: getFilterUsers,
  onFetchResponse: getFilterUsersResponse,
  onFetchError: getFilterUsersError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(urlUser, { immediate: false });

getFilterUsers().json().execute();

getFilterUsersResponse(() => {
  myUsers.value = dataGetFilterUsers.value.data.data;
  pagination.value = dataGetFilterUsers.value.data.pagination;

  loading.value = false;
  // myUsers.value = dataGetUsers.value.data.data;
  // console.log(myUsers.value);
});

const {
  data: dataFaculty,
  get: getFaculty,
  onFetchResponse: getFacultyResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})("/faculties", { immediate: false });
getFaculty().json().execute();
getFacultyResponse(() => {
  faculties.value = dataFaculty.value.data.data;
});

const search = () => {
  router.replace({
    path: "/users",
    query: filter.value.a,
  });
  myUsers.value = [];
  console.log(filter.value.a);
  getFilterUsers().json().execute();
};
</script>

<style scoped>
* {
  margin: 0;
  /* padding: 0; */
  box-sizing: border-box;
}

body {
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Roboto Slab", "Times New Roman", serif;
  background-color: #adacac;
}
.cus-row {
  position: relative;
}
.col-cus {
  background-color: #d5e7f2;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 20px;
  border-radius: 10px;
}
.cus-table {
  padding: 0;
}
table {
  width: 100%;
  border-collapse: collapse;
}

.header_fixed {
  width: 100%;
  overflow: auto;
  border: 1px solid #bbb;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.header_fixed thead th {
  background-color: #023e73;
  color: #fff;
  font-size: 15px;
}

th,
td {
  border-bottom: 1px solid #dddddd;
  padding: 10px 20px;
  font-size: 14px;
  text-align: center;
}

td img {
  height: 60px;
  width: 60px;
  border-radius: 100%;
  border: 5px solid #e6e7e8;
}

tr:nth-child(even) {
  background-color: #efefef;
}

tr:nth-child(odd) {
  background-color: #fff;
}
td,
th {
  border: 1px solid #dbdada;
}

tr:hover td {
  cursor: pointer;
}

td button {
  border: none;
  padding: 7px 20px;
  border-radius: 10px;
  background-color: #023e73;
  color: #fff;
}
td button:hover {
  opacity: 0.8;
}
thead th:nth-child(1) {
  width: 5%;
}

thead th:nth-child(2) {
  width: 20%;
}

thead th:nth-child(3) {
  width: 20%;
}

thead th:nth-child(4) {
  width: 20%;
}
thead th:nth-child(5) {
  width: 15%;
}
.input-cus {
  padding: 10px;
}
.v-btn {
  background-color: #126da6;
  color: #fff;
  margin-left: 40px;
  padding: 28px;
  display: flex;
  float: right;
}
.search {
  display: inline-block;
  color: black;
  text-align: center;
}
.search input {
  margin: 0px;
  margin-right: 0;
  width: 100%;
  display: inline-block;
  border-radius: 4px !important;
  padding: 16px;
}

.select-cus {
  padding: 16px;
}
.search button:hover svg {
  color: rgb(7, 30, 95);
}
.loading >>> div {
  margin: auto;
  margin-top: 10px;
}
.loader {
  width: 90%;
  margin: auto;
}
.register button {
  color: rgb(0, 0, 0);
  border: none;
  font-size: 16px;
  background-color: transparent;
  padding: 5px 10px 5px 0px;
  text-decoration: underline;
}
</style>
