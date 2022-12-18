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
      <div class="container emp-profile">
        <div class="user-infor">
          <v-row>
            <v-col sm="12" md="12" lg="4">
              <div class="file">
                <div class="avatar">
                  <img cover src="/images/user.png" alt="" />
                  <div>
                    <v-icon>mdi-image-multiple </v-icon>
                    <!-- <input type="file" name="file" /> -->
                  </div>
                </div>
              </div>
            </v-col>
            <v-col sm="12" md="12" lg="8">
              <div class="profile-head">
                <h3>{{ myUsers.full_name }}</h3>
                <p class="proile-status">
                  Status :
                  <span>{{
                    myUsers.is_active == 0 ? "Đang khóa" : "Đang hoạt động"
                  }}</span>
                </p>
              </div>
              <div class="control-btn">
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      color="secondary"
                      dark
                      v-bind="props"
                      @click="dialog = true"
                      variant="flat"
                    >
                      <v-icon style="font-size: 18px">mdi-account-edit</v-icon>
                      <span>Chỉnh sửa thông tin</span>
                    </v-btn>
                  </template>
                  <v-card class="card-cus">
                    <v-card-title
                      color="secondary"
                      style="
                        text-align: center;
                        padding: 16px 0;
                        background-color: blue;
                        color: #fff;
                      "
                    >
                      <span class="text-h3">Cập nhật thông tin sinh viên</span>
                    </v-card-title>
                    <form @submit.prevent="submit">
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                label="Full name*"
                                required
                                v-model="myUsers.full_name"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <v-text-field
                                label="Email*"
                                required
                                v-model="myUsers.email"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="Phone number*"
                                required
                                type="number"
                                v-model="myUsers.phone_number"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="Address*"
                                required
                                type="text"
                                v-model="myUsers.address"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                label="is_active*"
                                required
                                type="text"
                                v-model="myUsers.is_active"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <!-- <Datepicker v-model="myUsers.birthday" /> -->
                              <input type="date" v-model="myUsers.birthday" />
                            </v-col>
                            <v-col cols="12" sm="6">
                              <v-select
                                :items="['male', 'female']"
                                label="Gender*"
                                required
                                v-model="myUsers.gender"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <select
                                id="faculty"
                                v-model="myUsers.faculty"
                                class="form-select select-cus"
                                required
                              >
                                <option
                                  v-for="faculty in faculties"
                                  :key="faculty.id"
                                  :value="myUsers.faculty"
                                >
                                  {{ faculty.name }}
                                </option>
                              </select>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>* Các trường bắt buộc nhập thông tin</small>
                      </v-card-text>
                      <v-card-actions style="background-color: #ddd">
                        <v-spacer></v-spacer>
                        <v-btn
                          color="black"
                          text
                          @click="dialog = false"
                          variant="outlined"
                        >
                          Đóng
                        </v-btn>
                        <v-btn
                          text
                          @click="submit, (dialog = false)"
                          type="submit"
                          variant="flat"
                          color="secondary"
                        >
                          Lưu
                        </v-btn>
                      </v-card-actions>
                    </form>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog1" persistent>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      dark
                      v-bind="props"
                      @click="dialog1 = true"
                      variant="flat"
                      color="error"
                    >
                      <v-icon>mdi-lock</v-icon>
                      Khóa tài khoản
                    </v-btn>
                  </template>
                  <v-card style="width: 50%; margin: auto">
                    <v-card-title
                      style="
                        text-align: center;
                        padding: 16px 0;
                        background-color: red;
                        color: #fff;
                      "
                      class="text-h5"
                    >
                      Khoá Tài Khoản
                    </v-card-title>
                    <v-card-text style="display: flex; align-item: center">
                      <v-icon
                        style="font-size: 60px; color: red; margin-right: 10px"
                        >mdi-account-lock</v-icon
                      >
                      <span
                        >Tài khoản sau khi khóa sẽ không thể sử dụng các chức
                        năng của ứng dụng cho đến khi được mở lại.</span
                      ></v-card-text
                    >
                    <v-card-actions style="background-color: #ddd">
                      <v-spacer></v-spacer>
                      <v-btn
                        color="secondary"
                        variant="flat"
                        @click="dialog1 = false"
                      >
                        Hủy
                      </v-btn>
                      <v-btn
                        color="error"
                        variant="flat"
                        @click="dialog1 = false"
                      >
                        Đồng ý
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="profile-user">
        <div class="col-md-12 col-cus">
          <v-card>
            <v-toolbar class="toolbar-cus">
              <v-toolbar-title class="pl-3 pt-3 pb-3">
                <h5>Quản lý thông tin sinh viên :</h5>
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
                    <div class="profile-tab pl-5 pt-3">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="row">
                            <div class="col-md-3">
                              <label>Name</label>
                            </div>
                            <div class="col-md-9">
                              <p>{{ myUsers.full_name }}</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="row">
                            <div class="col-md-3">
                              <label>Email</label>
                            </div>
                            <div class="col-md-9">
                              <p>{{ myUsers.email }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="row">
                            <div class="col-md-3">
                              <label>Phone</label>
                            </div>
                            <div class="col-md-9">
                              <p>{{ myUsers.phone_number }}</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="row">
                            <div class="col-md-3">
                              <label>Address</label>
                            </div>
                            <div class="col-md-9">
                              <p>{{ myUsers.address }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="row">
                            <div class="col-md-3">
                              <label>Gender</label>
                            </div>
                            <div class="col-md-9">
                              <p>{{ myUsers.gender == 1 ? "Nam" : "Nữ" }}</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="row">
                            <div class="col-md-3">
                              <label>BirthDay</label>
                            </div>
                            <div class="col-md-9">
                              <p>{{ myUsers.birthday }}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <label>Faculty</label>
                        </div>
                        <div class="col-md-6">
                          <p>{{ myUsers.faculty }}</p>
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
                              @click="navigateTo(`/groups/${group.id}/${messages1[group.status]}`)"
                            >
                              <td>{{ group.id }}</td>

                              <td>
                                {{ group.subject }}
                              </td>
                              <td>{{ group.faculty }}</td>
                              <td>{{ group.self_study == 1 ? "Nhóm tự học" : "Nhóm tìm mentor" }}</td>
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
                              <td>{{ rating.account_name }}</td>
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
const v = new Date();
const dialog = ref(false);
const dialog1 = ref(false);
const groupsUser = ref([]);
const ratings = ref([]);
const tab = ref("option-1");
const tab1 = ref("option-1");
const tab2 = ref("option-1");
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
  '0': 'Đang chờ duyệt',
  '1':'tìm kiếm bạn học',
  '2': 'tìm kiếm mentor',
  '3': 'đang hoạt động',
  '4': 'đã đóng',
}
var messages1 = {
  '0':'create',
  '1':'recruit-member',
  '2': 'recruit-mentor',
  '3': 'is-active',
  '4': 'is-close'
}
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
  console.log("put thanh cong");
});
errPut(() => {
  // if (codePut.value === getConfig("constants.statusCodes.validation")) {
  //   validationErrorMessages.value = dataPut.value.meta.error_message;
  // }
  // return false;
  console.log("Loi put");
});
const submit = () => {
  console.log(myUsers.value);
  put(myUsers.value).json().execute();
};

// Tạo url lấy groups user đang tham gia học
// const { url: urlgroupUser } = useUrl({
//   path: "users/groups",
//   queryParams: {

//   },
// });

// Lấy groups của user đang đăng nhập
// const {
//   data: dataGetgroupsUser,
//   get: getgroupsUser,
//   onFetchResponse: getgroupsUserResponse,
//   onFetchError: getgroupsUserError,
// } = useFetchApi({
//   requireAuth: true,
//   disableHandleErrorUnauthorized: true,
// })(urlgroupUser, { immediate: false });
// getgroupsUser().json().execute();
// getgroupsUserResponse(() => {
//   groupsUser.value = dataGetgroupsUser.value.data.data;
//   console.log(dataGetgroupsUser.value.data.data);
// });
</script>
<style scoped>
.wrap {
  min-height: 150vh;
  font-family: "Roboto Slab", "Times New Roman", serif !important;
}
.emp-profile {
  border-radius: 0.5rem;
  background: #b3b5f2;
  max-width: 1318px;
  border: 1px solid #ddd;
}
.emp-profile h3 {
  font-family: "Roboto Slab", "Times New Roman", serif;
  color: #a652;
}
.user-infor {
  background-color: #fff;
  width: 70%;
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.12),
    0 7px 10px -5px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  margin: 20px auto;
  padding: 20px;
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
.file {
  z-index: -1000;
}
.avatar {
  width: 180px;
  height: 180px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 100px;
  overflow: hidden;
  position: relative;
}
.avatar > div {
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(200, 200, 200, 0.477);
  width: 100%;
  height: 100%;
}
.avatar:hover div {
  display: inline-block;
}
.avatar img {
  width: 100%;
  border-radius: 50%;
}
.avatar input {
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
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
  /* background-color: #6c7ee1; */
  /* color: #fff; */
  text-align: center;
}
.v-toolbar {
  padding-top: 20px;
  height: 100px;
  background-color: #fff;
}
.v-slide-group-item--active {
  /* color: #ffc4a4 !important; */
}
.col-md-6 {
  padding: 10px;
}
.bor-col {
  border-right: 3px solid #0062cc;
}
.proile-rating span {
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
</style>
