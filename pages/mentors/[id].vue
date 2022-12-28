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
        <span class="text-muted fw-light">Quản lý Mentor /</span> Tài khoản
      </h4>
      <div class="profile-user">
        <div class="col-md-12 col-cus">
          <v-card>
            <v-toolbar class="toolbar-cus">
              <v-toolbar-title>
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
                                src="/images/user.png"
                                alt="user-avatar"
                                class="d-block rounded"
                                height="100"
                                width="100"
                                id="uploadedAvatar"
                              />
                              <div class="button-wrapper">
                                <h2 style="padding-bottom: 10px">
                                  {{ myMentors.full_name }}
                                </h2>
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
                                    v-model="myMentors.full_name"
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
                                        myMentors.is_active == 0
                                          ? "Đã khóa"
                                          : "Đang hoạt động"
                                      }}
                                    </option>
                                  </select>
                                </div>
                                <div class="mb-3 col-md-6">
                                  <label class="form-label" for="country"
                                    >Số môn học đã nhận</label
                                  >
                                  <input
                                    class="form-control"
                                    type="text"
                                    v-model="myMentors.number_of_subjects"
                                    autofocus=""
                                    disabled
                                  />
                                </div>
                                <div class="mb-3 col-md-6">
                                  <label for="language" class="form-label"
                                    >Rating</label
                                  >
                                  <!-- type="number" -->
                                  {{ myMentors.rating_score }}
                                  <input
                                    class="form-control"
                                    v-model="myMentors.rating_score"
                                    autofocus=""
                                    disabled
                                  />
                                </div>
                                <div class="mb-3 col-md-6">
                                  <label class="form-label" for="country"
                                    >Banking</label
                                  >
                                  <input
                                    class="form-control"
                                    type="text"
                                    v-model="myMentors.smart_banking"
                                    autofocus=""
                                    disabled
                                  />
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
                                      {{ myMentors.faculty }}
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
                    <h3 class="h3-cus" style="padding-left: 10px">
                      Thông tin hồ sơ môn học :
                    </h3>
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
                        <tbody v-if="!loading1">
                          <tr
                            v-for="(group, index) in subject_list"
                            :key="index"
                          >
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
                              <div
                                style="display: flex; justify-content: center"
                              >
                                <v-btn
                                  @click="handlePut(group.subject_id)"
                                  color="success"
                                  v-if="group.status == 0"
                                >
                                  <v-icon>mdi-check</v-icon>
                                </v-btn>
                                <v-btn
                                  color="success"
                                  v-if="group.status == 1"
                                  disabled
                                >
                                  <v-icon>mdi-check</v-icon>
                                </v-btn>
                              </div>
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
                        v-if="loading1"
                      ></v-progress-circular>
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
                        <h3 class="h3-cus">Danh sách nhóm học của Mentor :</h3>
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
                              v-for="(group, index) in groupsMentor"
                              :key="index"
                              @click="
                                navigateTo(
                                  `/groups/${group.id}/${
                                    messages1[group.status]
                                  }`
                                )
                              "
                            >
                              <td>{{ group.id }}</td>

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
                              <tr
                                v-for="(rating, index) in ratings"
                                :key="index"
                              >
                                <td>{{ index + 1 }}</td>
                                <td>{{ rating.account_from }}</td>
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
  </div>
</template>
<script setup>
const tab = ref("option-1");
const route = useRoute();
const faculties = ref({});
const loading = ref(true);
const loading1 = ref(false);
const ratings = ref([]);
const subject_list = ref([]);
const subject = ref({
  subject_id: 0,
});
const groupsMentor = ref([]);
const myMentors = ref({
  id: "",
  avatar_url: "",
  full_name: "",
  faculty: "",
  number_of_subjects: "",
  rating_score: null,
});
onMounted(() => {
  onTop();
});
const onTop = () => {
  window.scrollTo(0, 0);
};
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
  loading.value = false;
  loading1.value = false;
  if (myMentors.value.rating_score == null) {
    myMentors.value.rating_score = "Mentor chưa được đánh giá";
  }
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
})(`/mentors/${route.params.id}`, {});
// Trả về khi put thông tin cá nhân
resPut(() => {
  console.log("put thanh cong");
  // loading1.value = false;
});
errPut(() => {
  console.log("Loi put");
});
const handlePut = (id) => {
  subject.value.subject_id = id;
  loading1.value = true;
  put(subject.value).json().execute();
  getMentors().json().execute();
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
