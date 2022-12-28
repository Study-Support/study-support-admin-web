<template>
  <div class="wrap">
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
    <div v-else>
      <h4 class="fw-bold py-3 mb-4">
        <span class="text-muted fw-light">Quản lý sinh viên /</span> Tài khoản
      </h4>
      <div class="profile-user">
        <div class="col-md-12 col-cus">
          <v-card>
            <v-toolbar>
              <v-toolbar-title class="pl-3 pb-3">
                <v-tabs v-model="tab" color="primary">
                  <v-tab value="option-1" class="option-btn">
                    <v-icon start> mdi-account </v-icon>
                    Thông tin sinh viên :
                  </v-tab>
                  <v-tab value="option-2" class="option-btn">
                    <v-icon start> mdi-access-point </v-icon>
                    Nhóm học :
                  </v-tab>
                  <v-tab value="option-3" class="option-btn">
                    <v-icon start> mdi-text-box </v-icon>
                    Đánh giá :
                  </v-tab>
                </v-tabs>
              </v-toolbar-title>
            </v-toolbar>
            <div class="flex-row">
              <v-window v-model="tab">
                <v-window-item value="option-1">
                  <v-card flat>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="card mb-4">
                          <h5 class="card-header">Profile Details</h5>
                          <!-- Account -->
                          <div class="card-body">
                            <div
                              class="d-flex align-items-start align-items-sm-center gap-4"
                            >
                              <img
                                v-if="myUsers.avatar_url !== null"
                                :src="`${myUsers.avatar_url}`"
                                alt="user-avatar"
                                class="d-block rounded"
                                height="120"
                                width="120"
                                id="uploadedAvatar"
                              />
                              <img
                                v-if="myUsers.avatar_url === null"
                                src="/images/user.png"
                                alt="user-avatar"
                                class="d-block rounded"
                                height="120"
                                width="120"
                                id="uploadedAvatar"
                              />
                              <div>
                                <div>
                                  <h2 style="padding-bottom: 10px">
                                    {{ myUsers.full_name }}
                                  </h2>
                                </div>
                                <div class="button-wrapper">
                                  <EditUserForm
                                    :user="myUsers"
                                    :faculties="faculties"
                                  />
                                  <LockUserForm
                                    :user="myUsers"
                                    :callback="handlePut"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr class="my-0" />
                          <div class="card-body">
                            <form>
                              <div class="row">
                                <div class="mb-3 col-md-12">
                                  <label for="firstName" class="form-label"
                                    >Họ và tên</label
                                  >
                                  <input
                                    class="form-control"
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    v-model="myUsers.full_name"
                                    autofocus=""
                                    disabled
                                  />
                                </div>
                                <div class="mb-3 col-md-12">
                                  <label for="firstName" class="form-label"
                                    >Trạng thái</label
                                  >
                                  <select
                                    id="country"
                                    class="select2 form-select"
                                    disabled
                                  >
                                    <option value="1">
                                      {{
                                        myUsers.is_active == 0
                                          ? "Đã khóa"
                                          : "Đang hoạt động"
                                      }}
                                    </option>
                                  </select>
                                </div>
                                <div class="mb-3 col-md-12">
                                  <label for="email" class="form-label"
                                    >E-mail</label
                                  >
                                  <input
                                    class="form-control"
                                    type="text"
                                    id="email"
                                    name="email"
                                    v-model="myUsers.email"
                                    placeholder="john.doe@example.com"
                                    disabled
                                  />
                                </div>
                                <div class="mb-3 col-md-12">
                                  <label class="form-label" for="phoneNumber"
                                    >Phone Number</label
                                  >
                                  <div class="input-group input-group-merge">
                                    <span class="input-group-text"
                                      >VI (+84)</span
                                    >
                                    <input
                                      type="text"
                                      id="phoneNumber"
                                      name="phoneNumber"
                                      class="form-control"
                                      v-model="myUsers.phone_number"
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div class="mb-3 col-md-12">
                                  <label for="address" class="form-label"
                                    >Address</label
                                  >
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="address"
                                    name="address"
                                    v-model="myUsers.address"
                                    disabled
                                  />
                                </div>
                                <div class="mb-3 col-md-12">
                                  <label for="address" class="form-label"
                                    >Sinh Nhật</label
                                  >
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="address"
                                    name="address"
                                    v-model="myUsers.birthday"
                                    disabled
                                  />
                                </div>
                                <div class="mb-3 col-md-6">
                                  <label class="form-label" for="country"
                                    >Giới tính</label
                                  >
                                  <select
                                    id="country"
                                    class="select2 form-select"
                                    disabled
                                  >
                                    <option value="1">
                                      {{ myUsers.gender == 0 ? "Nữ" : "Nam" }}
                                    </option>
                                  </select>
                                </div>
                                <div class="mb-3 col-md-6">
                                  <label for="language" class="form-label"
                                    >Khoa</label
                                  >
                                  <select
                                    id="language"
                                    class="select2 form-select"
                                    disabled
                                  >
                                    <option value="">
                                      {{ myUsers.faculty }}
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </form>
                          </div>
                          <!-- /Account -->
                        </div>
                      </div>
                    </div>
                  </v-card>
                </v-window-item>
                <v-window-item value="option-2">
                  <v-card flat>
                    <v-toolbar>
                      <v-card-title class="text-center justify-center">
                        <h3 class="h3-cus">Danh sách nhóm học sinh viên :</h3>
                      </v-card-title>
                    </v-toolbar>
                    <v-card-text>
                      <div class="header_fixed">
                        <table class="table-group">
                          <thead>
                            <tr>
                              <th>No.</th>

                              <th>Môn học</th>
                              <th>Khoa</th>
                              <th>Phân Loại</th>
                              <th>Topic</th>
                              <th>Trạng thái</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(group, index) in groupsUser"
                              :key="index"
                              @click="
                                navigateTo(
                                  `/groups/${group.id}/${
                                    messages1[group.status]
                                  }`
                                )
                              "
                            >
                              <td>{{ index + 1 }}</td>

                              <td>
                                {{ group.subject }}
                              </td>
                              <td>{{ group.faculty }}</td>
                              <td>
                                {{
                                  group.self_study == 1
                                    ? "Nhóm tự học"
                                    : "Nhóm tìm mentor"
                                }}
                              </td>
                              <td>
                                {{ group.topic }}
                              </td>
                              <td>{{ messages[group.status] }}</td>
                            </tr>
                          </tbody>
                        </table>
                        <v-pagination
                          v-model="page"
                          :length="totalPages"
                          total-visible="7"
                          color="purple"
                        ></v-pagination>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-window-item>
                <v-window-item value="option-3">
                  <v-card flat>
                    <v-toolbar>
                      <v-card-title class="text-center justify-center">
                        <h3 class="h3-cus">Chi tiết đánh giá :</h3>
                      </v-card-title>
                    </v-toolbar>
                    <v-card-text>
                      <div class="header_fixed">
                        <table>
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Tên người đánh giá</th>
                              <th>Group</th>
                              <th>điểm</th>
                              <th>Nhận xét</th>
                              <!-- <th>thời gian</th> -->
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(rating, index) in ratings" :key="index">
                              <td>{{ index + 1 }}</td>
                              <td>{{ rating.account_from }}</td>
                              <td>
                                {{ rating.group_id == 1 ? "CNTT" : "KHMT" }}
                              </td>
                              <td>{{ rating.rating }}/10</td>
                              <td>{{ rating.comment }}</td>
                              <!-- <td>{{ rating.created_at }}</td> -->
                            </tr>
                          </tbody>
                        </table>
                        <v-pagination
                          v-model="page"
                          :length="totalPages"
                          total-visible="7"
                          color="purple"
                        ></v-pagination>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-window-item>
              </v-window>
            </div>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import EditUserForm from "../../components/dialogForm/EditUserForm.vue";
import LockUserForm from "../../components/dialogForm/LockUserForm.vue";
const { $toast } = useNuxtApp();
const groupsUser = ref([]);
const ratings = ref([]);
const tab = ref("option-1");
const loading = ref(true);
const route = useRoute();
const faculties = ref({});

const myUsers = ref({
  // id: "",
  avatar_url: "",
  full_name: "",
  email: "",
  phone_number: "",
  address: "",
  gender: "",
  birthday: "",
  faculty: "",
  faculty_id: "",
  is_active: 0,
});
const messages = {
  0: "Đang chờ duyệt",
  1: "tìm kiếm bạn học",
  2: "tìm kiếm mentor",
  3: "đang hoạt động",
  4: "đã đóng",
};
var messages1 = {
  0: "create",
  1: "recruit-member",
  2: "recruit-mentor",
  3: "is-active",
  4: "is-close",
};
const { url: url2 } = useUrl({
  path: `/users/${route.params.id}`,
  queryParams: {
    // isAccept: "true",
  },
});

const {
  data: dataGetUsers,
  get: getUsers,
  onFetchResponse: getUsersResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(url2, { immediate: false });
getUsers().json().execute();
getUsersResponse(() => {
  myUsers.value = dataGetUsers.value.data.data;
  ratings.value = dataGetUsers.value.data.data.ratings;
  groupsUser.value = dataGetUsers.value.data.data.groups;
  loading.value = false;
});

const {
  data: dataGetFaculty,
  get: getFaculty,
  onFetchResponse: getFacultyResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})("/faculties", { immediate: false });
// Lấy tất cả khoa
getFaculty().json().execute();
getFacultyResponse(() => {
  faculties.value = dataGetFaculty.value.data.data;
});

const {
  data: dataPut,
  onFetchResponse: resPut,
  onFetchError: errPut,
  statusCode: codePut,
  put,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(`/users/${route.params.id}`, { immediate: false });
// Trả về khi put thông tin cá nhân
resPut(() => {
  $toast("Cập nhật thông tin thành công", "success", 1500);
  loading.value = false;
});
errPut(() => {
  $toast("Hệ thống gặp sự cố, bạn vui lòng thử lại sau", "error", 1500);
  loading.value = false;
});
const handlePut = () => {
  put(myUsers.value).json().execute();
};
// const handleLockAccount = () => {
//   loading.value = true;
//   if (myUsers.value.is_active == 1) {
//     myUsers.value.is_active = 0;
//     put(myUsers.value).json().execute();
//   } else {
//     myUsers.value.is_active = 1;
//     put(myUsers.value).json().execute();
//   }
//   dialog1.value = false;
// };
</script>
<style scoped>
.wrap {
  font-family: "Roboto Slab", "Times New Roman", serif !important;
}
.profile-user {
  margin: 20px auto;
  background-color: #fff;
  width: 100%;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.12),
    0 7px 10px -5px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
}
.control-btn {
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
}
.control-btn .v-btn {
  min-width: 180px;
  margin-right: 10px;
}
.card-cus {
  min-width: 80vw;
  min-height: 90vh;
  align-content: center;
}
.profile-head h3 {
  margin-top: 30px;
  min-height: 32px;
  color: #3c4858;
  font-weight: 700;
  font-family: "Roboto Slab", "Times New Roman", serif;
}
.v-tabs .v-btn {
  text-align: center;
}
.v-toolbar {
  background-color: #fff;
}
.col-md-6 {
  padding: 10px;
}
.bor-col {
  border-right: 3px solid #0062cc;
}
.profile-rating span {
  color: #495057;
  font-size: 15px;
  font-weight: 600;
}
.profile-head .nav-tabs {
  margin-bottom: 5%;
}
.profile-head .nav-tabs .nav-link {
  font-weight: 600;
  border: none;
}
.profile-head .nav-tabs .nav-link.active {
  border: none;
  border-bottom: 2px solid #0062cc;
}
.profile-work {
  padding: 14%;
  margin-top: -15%;
}
.profile-work p {
  font-size: 12px;
  color: #818182;
  font-weight: 600;
  margin-top: 10%;
}
.v-input__details {
  display: none;
}
.profile-work a {
  text-decoration: none;
  color: #495057;
  font-weight: 600;
  font-size: 14px;
}
.profile-work ul {
  list-style: none;
}
.profile-tab label {
  font-weight: 600;
}
.profile-tab p {
  font-weight: 600;
  color: #0062cc;
}
.v-window {
  width: 100%;
}
.container {
  max-width: 1318px;
  border: 1px solid #ddd;
}
.v3dp__datepicker {
  padding: 10px 20px;
  outline: none;
  background-color: #f6f6f6;
  border-bottom: 1px solid #ccc;
  margin-top: 5px;
  margin-bottom: 20px;
}
.v3dp__datepicker:hover {
  cursor: pointer;
  background-color: #eeeeee;
}
.v3dp__input_wrapper {
  width: 100%;
  outline: none;
}
.v3dp__input_wrapper > input {
  width: 100%;
  border: none;
  outline: none;
}

input[type="date"] {
  padding: 10px 20px;
  outline: none;
  background-color: #f6f6f6;
  border-bottom: 1px solid #ccc;
  margin-top: 5px;
  margin-bottom: 20px;
  font-family: "Roboto Mono", monospace;
  color: rgb(58, 58, 58);
  font-size: 18px;
  border: none;
  border-bottom: 1px solid #a5a5a5;
  width: 100%;
}
::-webkit-calendar-picker-indicator {
  background-color: #ffffff;
  padding: 5px;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid #ddd;
}

.v-expansion-panel-title--active {
  background-color: #00ff00;
}
.v-expansion-panel {
  padding-top: 20px;
}
.full {
  text-decoration: none;
}
.mentor-review {
  padding: 10px;
  font-weight: 600;
}
.text-h3 {
  margin: 5px auto;
}
.mentor-review h5 {
  text-align: center;
}
.name {
  margin-bottom: 0;
}
.select-cus {
  padding: 15px 20px;
  outline: none;
  background-color: #f6f6f6;
  font-family: "Roboto Mono", monospace;
  color: rgb(58, 58, 58);
  font-size: 18px;
  border: none;
  border-bottom: 1px solid #a5a5a5;
  width: 100%;
}
.content {
  padding-left: 20px;
  margin-bottom: 20px;
  font-weight: 500;
}
.button-wrapper {
  display: flex;
}
.mentor-review {
  padding: 10px;
  font-weight: 600;
}
.mentor-review h3 {
  /* text-align: center; */
  padding: 20px;
}
.mentor-review h3:after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  background: #ee2c74;
  margin-top: 5px;
}
.h3-cus {
  padding-top: 0 !important;
}
.h3-cus:after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  background: #ee2c74;
  margin-top: 5px;
}
.bg-basil {
  background-color: #fffbe6 !important;
}
.text-basil {
  color: #356859 !important;
}

.header_fixed {
  width: 100%;
  overflow: auto;
  border-top: 3px solid red;
}
table {
  width: 100%;
}

.header_fixed thead th {
  background-color: #023e73;
  color: #fff;
  font-size: 15px;
}
th {
  border-bottom: 1px solid #ccc;
  padding: 10px 0px;
  font-size: 14px;
  text-align: center;
}
td {
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
  font-size: 14px;
  text-align: center;
}
tr:nth-child(even) {
  background-color: #efefef;
}

tr:nth-child(odd) {
  background-color: #fff;
}
tr:hover td {
  cursor: pointer;
}
thead th:nth-child(1) {
  width: 5%;
}

thead th:nth-child(2) {
  width: 20%;
}

thead th:nth-child(3) {
  width: 10%;
}

thead th:nth-child(4) {
  width: 10%;
}
thead th:nth-child(5) {
  width: 20%;
}
thead th:nth-child(6) {
  width: 30%;
}
.table-group {
  width: 100%;
}

.table-group thead th:nth-child(1) {
  width: 5%;
}

.table-group thead th:nth-child(2) {
  width: 20%;
}

.table-group thead th:nth-child(3) {
  width: 20%;
}

.table-group thead th:nth-child(4) {
  width: 15%;
}
.table-group thead th:nth-child(5) {
  width: 20%;
}
.table-group thead th:nth-child(6) {
  width: 20%;
}

td button {
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #023e73;
  color: #fff;
  font-size: 16px;
}
td button:hover {
  opacity: 0.8;
}
.form-select .form-control {
  background-color: rgb(161, 161, 161) !important;
}
.card-header {
  background-color: #fff !important;
  border-top: none !important;
}
</style>
