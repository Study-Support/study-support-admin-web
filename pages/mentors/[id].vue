<template>
  <div class="wrap">
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
              <h3>{{ myMentors.full_name }}</h3>
              <p class="proile-status">Status : <span>Active</span></p>
            </div>
            <div class="control-btn">
              <v-dialog v-model="dialog1" persistent>
                <template v-slot:activator="{ props }">
                  <v-btn
                    dark
                    v-bind="props"
                    @click="dialog1 = true"
                    variant="flat"
                    color="error"
                  >
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
                      >Tài khoản sau khi khóa sẽ không thể sử dụng các chức năng
                      của ứng dụng cho đến khi được mở lại.</span
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
              <h5>Quản lý thông tin mentor :</h5>
              <v-tabs v-model="tab" color="primary">
                <v-tab value="option-1" class="option-btn">
                  <v-icon start> mdi-account </v-icon>
                  Thông tin mentor :
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
                          <div class="col-md-5">
                            <label>Họ và tên:</label>
                          </div>
                          <div class="col-md-7">
                            <p>{{ myMentors.full_name }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-5">
                            <label>Khoa:</label>
                          </div>
                          <div class="col-md-7">
                            <p>{{ myMentors.faculty }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-5">
                            <label>Tài khoản :</label>
                          </div>
                          <div class="col-md-7">
                            <p>{{ myMentors.smart_banking }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-5">
                            <label>Điểm đánh giá :</label>
                          </div>
                          <div class="col-md-7">
                            <p>{{ myMentors.rating_score.slice(0, 3) }}/10</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 class="h3-cus" style="padding-left:10px;">Thông tin hồ sơ môn học :</h3>
                  <div class="header_fixed">
                    <table>
                      <thead>
                        <tr>
                          <th>No.</th>

                          <th>Môn học</th>
                          <th>Hồ sơ</th>
                          <th>Trạng thái</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(group, index) in subject_list" :key="index">
                          <td>{{ index + 1 }}</td>

                          <td>
                            {{ group.subject }}
                          </td>
                          <td>
                            <nuxt-link
                              :to="group.cv_link"
                              style="text-decoration: none; color: #000"
                              >{{ group.cv_link }}</nuxt-link
                            >
                          </td>
                          <td>
                            {{ group.status == 0 ? "Chờ duyệt" : "Đã duyệt" }}
                          </td>
                          <td>
                            <button @click="handleAccept(group.id)">
                              <v-icon class="pr-3">mdi-eye</v-icon>Xem
                            </button>

                            
                          </td>
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
                </v-card>
              </v-window-item>
              <v-window-item value="option-2">
                <v-card flat>
                  <v-toolbar>
                    <v-card-title class="text-center justify-center">
                      <h3 class="h3-cus">Danh sách nhóm học mentor :</h3>
                    </v-card-title>
                  </v-toolbar>
                  <div class="d-flex flex-row">
                    <v-tabs v-model="tab1" direction="vertical" color="primary">
                      <v-tab value="option-1"> Đăng ký </v-tab>
                      <v-tab value="option-2"> Đang học </v-tab>
                      <v-tab value="option-3"> Hoàn thành </v-tab>
                    </v-tabs>
                    <v-window v-model="tab1">
                      <v-window-item value="option-1">
                        <v-card flat>
                          <v-card-text>
                            <div class="header_fixed">
                              <table>
                                <thead>
                                  <tr>
                                    <th>No.</th>

                                    <th>Môn học</th>
                                    <th>Khoa</th>
                                    <th>Thành viên</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="(group, index) in groupsMentor"
                                    :key="index"
                                  >
                                    <td>{{ group.id }}</td>

                                    <td>
                                      {{ group.subject }}
                                    </td>
                                    <td>{{ group.faculty }}</td>
                                    <td>{{ group.quantity }} người</td>
                                    <td>{{ group.status }}</td>
                                    <td>
                                      <button
                                        @click="
                                          navigateTo(`/groups/${group.id}`)
                                        "
                                      >
                                        <v-icon class="pr-3">mdi-eye</v-icon>Xem
                                      </button>
                                    </td>
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
                      <v-window-item value="option-2">
                        <v-card flat>
                          <v-card-text>
                            <div class="header_fixed">
                              <table>
                                <thead>
                                  <tr>
                                    <th>No.</th>

                                    <th>Môn học</th>
                                    <th>Khoa</th>
                                    <th>Thành viên</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="(group, index) in groupsMentor"
                                    :key="index"
                                  >
                                    <td>{{ group.id }}</td>

                                    <td>
                                      {{ group.subject }}
                                    </td>
                                    <td>{{ group.faculty }}</td>
                                    <td>{{ group.quantity }} người</td>
                                    <td>{{ group.status }}</td>
                                    <td>
                                      <button
                                        @click="
                                          navigateTo(`/groups/${group.id}`)
                                        "
                                      >
                                        <v-icon class="pr-3">mdi-eye</v-icon>Xem
                                      </button>
                                    </td>
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
                          <v-card-text>
                            <div class="header_fixed">
                              <table>
                                <thead>
                                  <tr>
                                    <th>No.</th>

                                    <th>Môn học</th>
                                    <th>Khoa</th>
                                    <th>Thành viên</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="(group, index) in groupsMentor"
                                    :key="index"
                                  >
                                    <td>{{ group.id }}</td>

                                    <td>
                                      {{ group.subject }}
                                    </td>
                                    <td>{{ group.faculty }}</td>
                                    <td>{{ group.quantity }} người</td>
                                    <td>{{ group.status }}</td>
                                    <td>
                                      <button
                                        @click="
                                          navigateTo(`/groups/${group.id}`)
                                        "
                                      >
                                        <v-icon class="pr-3">mdi-eye</v-icon>Xem
                                      </button>
                                    </td>
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
              </v-window-item>
              <v-window-item value="option-3">
                <v-card flat>
                  <div class="mentor-review">
                    <h3>Đánh giá từ mentor :</h3>
                    <v-col cols="12" class="cus-table">
                      <div class="header_fixed">
                        <table>
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Tên người đánh giá</th>
                              <th>Group</th>
                              <th>điểm</th>
                              <th>Nhận xét</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(rating, index) in ratings" :key="index">
                              <td>{{ index + 1 }}</td>
                              <td>{{ rating.account_name }}</td>
                              <td>
                                {{ rating.group_id == 1 ? "CNTT" : "KHMT" }}
                              </td>
                              <td>{{ rating.rating }} / 10</td>
                              <td>{{ rating.comment }}</td>
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
                    </v-col>
                  </div>
                </v-card>
              </v-window-item>
            </v-window>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script setup>
const tab = ref("option-1");
const dialog1 = ref(false);
const tab1 = ref("option-1");
const route = useRoute();
const faculties = ref({});
const ratings = ref([]);
const subject_list = ref([]);
const groupsMentor = ref([]);
const myMentors = ref({
  id: "",
  avatar_url: "",
  full_name: "",
  faculty: "",
  number_of_subjects: "",
  rating_score: "",
});
const { url: url2 } = useUrl({
  path: `/mentors/${route.params.id}`,
  queryParams: {
    // isAccept: "true",
  },
});

const {
  data: dataGetMentors,
  get: getMentors,
  onFetchResponse: getMentorsResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(url2, { immediate: false });
getMentors().json().execute();
getMentorsResponse(() => {
  myMentors.value = dataGetMentors.value.data.data;
  ratings.value = dataGetMentors.value.data.data.ratings;
  subject_list.value = dataGetMentors.value.data.data.subject_list;
  groupsMentor.value = dataGetMentors.value.data.data.groups;
  console.log(subject_list.value);
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

// Tạo url lấy groups user đang tham gia học
// const { url: urlgroupMentor } = useUrl({
//   path: "mentors/groups",
//   queryParams: {
//     is_mentor: 1,
//     is_active: 1,
//   },
// });

// Lấy groups của user đang đăng nhập
// const {
//   data: dataGetgroupsMentor,
//   get: getgroupsMentor,
//   onFetchResponse: getgroupsMentorResponse,
//   onFetchError: getgroupsMentorError,
// } = useFetchApi({
//   requireAuth: true,
//   disableHandleErrorUnauthorized: true,
// })(urlgroupMentor, { immediate: false });

// getgroupsMentor().json().execute();
// getgroupsMentorResponse(() => {
//   groupsMentor.value = dataGetgroupsMentor.value.data.data;
// });
// const {
//   data: dataMentorInfor,
//   get: getMentorInfor,
//   onFetchResponse: getMentorInforResponse,
//   onFetchError: getMentorInforError,
// } = useFetchApi({
//   requireAuth: true,
//   disableHandleErrorUnauthorized: true,
// })("/mentors/mentor-infor", { immediate: false });
// getMentorInfor().json().execute();
// getMentorInforResponse(() => {
//   infor.value = dataMentorInfor.value.data;
// });
const {
  data: dataPut,
  onFetchResponse: resPut,
  onFetchError: errPut,
  statusCode: codePut,
  put,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(`/groups/${route.params.id}/acceptMentor`, { immediate: false });
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
const handleAccept = (num) => {
  put(num).json().execute();
};
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
  width: 90%;
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
  /* display: inline-block; */
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

.header_fixed thead th {
  background-color: #023e73;
  color: #fff;
  font-size: 15px;
}
th,
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
  width: 15%;
}

thead th:nth-child(4) {
  width: 10%;
}
thead th:nth-child(5) {
  width: 20%;
}
thead th:nth-child(6) {
  width: 15%;
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
