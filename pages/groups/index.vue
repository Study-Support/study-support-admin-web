<template>
  <v-card>
    <v-toolbar color="">
      <v-toolbar-title>
        <!-- Quản lý Nhóm học :  -->
        <v-tabs v-model="tab" color="primary">
          <v-tab value="option-1" class="option-btn">
            <v-icon start> mdi-account </v-icon>
            <span>Tạo Nhóm Mới</span>
          </v-tab>
          <v-tab value="option-2" class="option-btn">
            <v-icon start> mdi-lock </v-icon>
            Tuyển Thành viên
          </v-tab>
          <v-tab value="option-3" class="option-btn">
            <v-icon start> mdi-access-point </v-icon>
            Tìm Mentor
          </v-tab>
          <v-tab value="option-4" class="option-btn">
            <v-icon start> mdi-access-point </v-icon>
            Đang Hoạt Động
          </v-tab>
          <v-tab value="option-5" class="option-btn">
            <v-icon start> mdi-access-point </v-icon>
            Đã Đóng
          </v-tab>
        </v-tabs>
      </v-toolbar-title>
    </v-toolbar>
    <div class="flex-row">
      <v-window v-model="tab">
        <v-window-item value="option-1">
          <v-card flat>
            <v-card-text>
              <div class="header_fixed">
                <table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Môn học</th>
                      <th>Chủ đề</th>
                      <th>Phân Loại</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(group, index) in groupsCreate" :key="index">
                      <td>{{ index + 1 }}</td>
                      <!-- <td>{{ group.members[0].full_name }}</td> -->
                      <td>{{ group.subject }}</td>
                      <td>{{ group.topic }}</td>
                      <td>
                        {{
                          group.seft_study ? "Nhóm có mentor" : "Nhóm tự học"
                        }}
                      </td>
                      <td>
                        <button
                          @click="navigateTo(`/groups/${group.id}/create`)"
                        >
                          <v-icon class="pr-3">mdi-eye</v-icon>Xem
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <v-progress-circular
                  indeterminate
                  color="primary"
                  v-if="loading"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: auto;
                  "
                ></v-progress-circular>
                <v-pagination
                  v-model="page"
                  :length="pagination.total_page"
                  color="purple"
                  @click="handleChangePage"
                ></v-pagination>
              </div>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="option-2">
          <v-card flat>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
                lg="4"
                v-for="(group, index) in groups1"
                :key="index"
              >
                <GroupCard :group="group" />
              </v-col>
            </v-row>
            <v-progress-circular
              indeterminate
              color="primary"
              v-if="loading1"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                margin: auto;
                padding-top: 80px;
              "
            ></v-progress-circular>
            <div class="text-center">
              <v-pagination
                  v-model="page1"
                  :length="pagination1.total_page"
                  color="purple"
                  @click="handleChangePage1"
                ></v-pagination>
            </div>
          </v-card>
        </v-window-item>
        <v-window-item value="option-3">
          <v-card flat>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
                lg="4"
                v-for="(group, index) in groups2"
                :key="index"
              >
                <GroupCard :group="group" />
              </v-col>
            </v-row>
            <v-progress-circular
              indeterminate
              color="primary"
              v-if="loading2"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                margin: auto;
                padding-top: 80px;
              "
            ></v-progress-circular>
            <div class="text-center">
              <v-pagination
                  v-model="page2"
                  :length="pagination2.total_page"
                  color="purple"
                  @click="handleChangePage2"
                ></v-pagination>
            </div>
          </v-card>
        </v-window-item>
        <v-window-item value="option-4">
          <v-card flat>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
                lg="4"
                v-for="(group, index) in groups3"
                :key="index"
              >
                <GroupCard :group="group" />
              </v-col>
            </v-row>
            <v-progress-circular
              indeterminate
              color="primary"
              v-if="loading3"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                margin: auto;
                padding-top: 80px;
              "
            ></v-progress-circular>
            <div class="text-center">
              <v-pagination
                  v-model="page3"
                  :length="pagination3.total_page"
                  color="purple"
                  @click="handleChangePage3"
                ></v-pagination>
            </div>
          </v-card>
        </v-window-item>
        <v-window-item value="option-5">
          <v-card flat>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
                lg="4"
                v-for="(group, index) in groups4"
                :key="index"
              >
                <GroupCard :group="group" />
              </v-col>
            </v-row>
            <v-progress-circular
              indeterminate
              color="primary"
              v-if="loading4"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
                margin: auto;
                padding-top: 80px;
              "
            ></v-progress-circular>
            <div class="text-center">
              <v-pagination
                  v-model="page4"
                  :length="pagination4.total_page"
                  color="purple"
                  @click="handleChangePage4"
                ></v-pagination>
            </div>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </v-card>
</template>

<script setup>
import GroupCard from "../../components/groups/GroupCard.vue";
const tab = ref("option-1");
// const groups = ref([]);
const groupsCreate = ref([]);
const groups1 = ref([]);
const groups2 = ref([]);
const groups3 = ref([]);
const groups4 = ref([]);
const loading = ref(true);
const loading1 = ref(true);
const loading2 = ref(true);
const loading3 = ref(true);
const loading4 = ref(true);
const page = ref(1);
const page1 = ref(1);
const page2 = ref(1);
const page3 = ref(1);
const page4 = ref(1);
const pagination = ref({
  current_page: 0,
  total_page: 0,
  total_rows: 0,
});
const pagination1 = ref({
  current_page: 0,
  total_page: 0,
  total_rows: 0,
});
const pagination2 = ref({
  current_page: 0,
  total_page: 0,
  total_rows: 0,
});
const pagination3 = ref({
  current_page: 0,
  total_page: 0,
  total_rows: 0,
});
const pagination4 = ref({
  current_page: 0,
  total_page: 0,
  total_rows: 0,
});

const handleChangePage = () => {
  loading.value = true;
  getGroupsCreate().json().execute();
};
const handleChangePage1 = () => {
  loading1.value = true;
  getGroups1().json().execute();
};
const handleChangePage2 = () => {
  loading2.value = true;
  getGroups2().json().execute();
};
const handleChangePage3 = () => {
  loading3.value = true;
  getGroups3().json().execute();
};
const handleChangePage4 = () => {
  loading4.value = true;
  getGroups4().json().execute();
};

const { url: url0 } = useUrl({
  path: "/groups",
  queryParams: {
    status: 0,
    page: page,
  },
});
const { url: url1 } = useUrl({
  path: "/groups",
  queryParams: {
    status: 1,
    page: page1,
  },
});
const { url: url2 } = useUrl({
  path: "/groups",
  queryParams: {
    status: 2,
    page: page2,
  },
});
const { url: url3 } = useUrl({
  path: "/groups",
  queryParams: {
    status: 3,
    page: page3,
  },
});
const { url: url4 } = useUrl({
  path: "/groups",
  queryParams: {
    status: 4,
    page: page4,
  },
});

const {
  data: dataGetGroupsCreate,
  get: getGroupsCreate,
  onFetchResponse: getGroupsCreateResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(url0, { immediate: false });
getGroupsCreate().json().execute();
getGroupsCreateResponse(() => {
  groupsCreate.value = dataGetGroupsCreate.value.data.data;
  pagination.value = dataGetGroupsCreate.value.data.pagination;
  console.log(groupsCreate.value);
  loading.value = false;
});

// const { url: url2 } = useUrl({
//   path: "/groups",
//   queryParams: {
//     // isAccept: "true",
//   },
// });

const {
  data: dataGetGroups1,
  get: getGroups1,
  onFetchResponse: getGroupsResponse1,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(url1, { immediate: false });
getGroups1().json().execute();
getGroupsResponse1(() => {
  groups1.value = dataGetGroups1.value.data.data;
  pagination1.value = dataGetGroups1.value.data.pagination;
  loading1.value = false;
});

const {
  data: dataGetGroups2,
  get: getGroups2,
  onFetchResponse: getGroupsResponse2,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(url2, { immediate: false });
getGroups2().json().execute();
getGroupsResponse2(() => {
  groups2.value = dataGetGroups2.value.data.data;
  pagination2.value = dataGetGroups2.value.data.pagination;
  loading2.value = false;
});

const {
  data: dataGetGroups3,
  get: getGroups3,
  onFetchResponse: getGroupsResponse3,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(url3, { immediate: false });
getGroups3().json().execute();
getGroupsResponse3(() => {
  groups3.value = dataGetGroups3.value.data.data;
  pagination3.value = dataGetGroups3.value.data.pagination;
  loading3.value = false;
});

const {
  data: dataGetGroups4,
  get: getGroups4,
  onFetchResponse: getGroupsResponse4,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(url4, { immediate: false });
getGroups4().json().execute();
getGroupsResponse4(() => {
  groups4.value = dataGetGroups4.value.data.data;
  pagination4.value = dataGetGroups4.value.data.pagination;

  loading4.value = false;
});
</script>

<style scoped>
.v-btn {
  margin: 5px;
}
.v-btn__content {
  color: #fff;
}
.v-toolbar {
  padding-top: 20px;
  height: 90px;
  background-color: #fff;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.header_fixed {
  width: 100%;
  overflow: auto;
  border: 1px solid #bbb;
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
  width: 15%;
}

thead th:nth-child(3) {
  width: 15%;
}

thead th:nth-child(4) {
  width: 35%;
}
thead th:nth-child(5) {
  width: 15%;
}
thead th:nth-child(6) {
  width: 15%;
}
.v-tabs .v-btn {
  padding: 10px 20px;
  border-radius: 10px !important;
}

.v-slide-group-item--active {
  color: rgb(63, 80, 181) !important;
}
</style>
