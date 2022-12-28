<template>
  <div>
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
    <v-card v-if="!loading">
      <div class="container">
        <v-row>
          <v-col cols="12" lg="4" sm="12" md="12">
            <div class="img">
              <img src="/images/groups/g1.png" alt="" />
            </div>
          </v-col>
          <v-col class="group-infor" cols="12" lg="8" sm="12">
            <h4 style="mar">{{ group.subject }}</h4>
            <p><span>Khoa:</span> {{ group.faculty }}</p>
            <p class="title">
              <span> Tóm tắt thông tin: </span>
              {{ group.topic }}
            </p>
            <p class="information">
              <span>Thông tin chi tiết</span>
              {{ group.information }}
            </p>
            <p class="information">
              <span>Phòng học</span>
              {{ group.location_study }}
            </p>
            <p class="information">
              <span>Thời gian dự kiến</span>
              {{ group.time_study }}
            </p>
            <p class="information">
              <span>Loại nhóm học</span>
              {{
                group.self_study == 0 ? "Nhóm tìm kiếm mentor" : "Nhóm tự học"
              }}
            </p>
            <div class="information">
              <div>
                <span>trạng thái : </span>
                <h4 style="display: inline">Đã Đóng</h4>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row class="mt-3">
          <v-col cols="12" sm="4"> </v-col>
        </v-row>
        <v-row class="mt-3" v-if="!loading">
          <v-col cols="12">
            <h3>Thông tin member:</h3>
            <div class="header_fixed">
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Họ và tên</th>
                    <th>Khoa</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(user, index) in group.membersAccepted"
                    :key="index"
                  >
                    <td>{{ user.id }}</td>

                    <td>
                      {{ user.full_name }}
                    </td>
                    <td>
                      {{ user.faculty }}
                    </td>
                    <td>
                      {{
                        user.status == 0 ? "Khóa tài khoản" : "Đang hoạt động"
                      }}
                    </td>
                    <td>
                      <button @click="navigateTo(`/users/${user.id}`)">
                        <v-icon class="pr-3" style="color: #fff">mdi-eye</v-icon
                        >Xem
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </v-col>
          <v-col cols="12">
            <h3>Thông tin mentor:</h3>
            <div class="header_fixed" v-if="group.mentorAccepted != null">
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Họ và tên</th>
                    <th>Khoa</th>
                    <th>Rating</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ group.mentorAccepted.id }}</td>

                    <td>
                      {{ group.mentorAccepted.full_name }}
                    </td>
                    <td>
                      {{ group.mentorAccepted.faculty }}
                    </td>
                    <td>
                      {{ group.mentorAccepted.rating }}
                    </td>
                    <td>
                      <button
                        @click="
                          navigateTo(`/mentors/${group.mentorAccepted.id}`)
                        "
                      >
                        <v-icon class="pr-3" style="color: #fff">mdi-eye</v-icon
                        >Xem
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "authenticated",
});
definePageMeta({
  layout: false,
});
const loading = ref(true);
const route = useRoute();
const tab = ref("option-1");
let allChat = ref([]);
const {
  database: databaseFirebase,
  ref: firebaseRef,
  push,
  set,
  onValue,
} = useFirebase();

const bb = () => {
  allChat.value = [];
  onValue(
    firebaseRef(databaseFirebase, `groups/${route.params.id}`),
    (data) => {
      allChat.value = [];
      data.forEach((d) => {
        allChat.value.push(d.val());
      });
    }
  );
};
onMounted(() => {
  bb();
});
const groupId = ref({
  group_id: "",
});
const group = ref({
  id: "",
  faculty: "",
  subject: "",
  title: "",
  information: "",
  topic: "",
  self_study: "",
  time_study: "",
  quantity: "",
  mentorAccepted: [
    {
      full_name: "",
      faculty: "",
      id: 0,
    },
  ],
  members: [
    {
      full_name: "",
      faculty: "",
      id: 0,
    },
  ],
});

const {
  data: dataGetGroup,
  get: getGroup,
  onFetchResponse: getGroupRes,
  onFetchError: getGroupErr,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(`groups/${route.params.id}`, { immediate: false });
getGroup().json().execute();
getGroupRes(() => {
  group.value = dataGetGroup.value.data.data;
  groupId.value.group_id = group.value.id;
  loading.value = false;
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
})(`/groups/${route.params.id}`, { immediate: false });
// Trả về khi put thông tin cá nhân
resPut(() => {
  // myUsers.value = dataPut.value.data.data;
  // console.log("ok");
});
errPut(() => {
  if (codePut.value === getConfig("constants.statusCodes.validation")) {
    validationErrorMessages.value = dataPut.value.meta.error_message;
  }
  return false;
});
</script>

<style scoped>
* {
  color: black;
}

.full {
  /* background-color: #efefef; */
  min-height: 100vh;
  position: relative;
  padding-bottom: 70px !important;
  text-decoration: none;
}
.replyMess {
  padding: 0 0 0 40px;
}
.replyMess button {
  display: inline-block;
  width: auto;
}
.replyMess input {
  display: inline-block;
  width: 88%;
}
.qa > div > p {
  color: rgb(1, 1, 118);
}

.reply > div {
  padding-left: 40px;
  padding-top: 0px;
}

.reply > div > div:first-child {
  padding-top: 5px;
}

.reply > div > div {
  padding: 0px;
}

.qa .true {
  display: block;
}

.qa .false {
  display: none;
}

button {
  border: none;
  background-color: transparent;
}

.qa .arrow-reply:hover {
  color: rgb(17, 17, 190);
}

.qa .arrow-reply:hover svg {
  color: rgb(17, 17, 190);
}

.qa {
  background-color: rgb(241, 241, 241);
  padding-bottom: 10px;
  border-radius: 5px;
  -webkit-box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  -moz-box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.qa .name {
  font-weight: 600;
  padding: 10px;
  font-size: 15px;
  padding-bottom: 0;
}

.qa .name span,
.qa .arrow-reply {
  font-size: 14px;
  font-weight: 200;
  color: rgb(93, 93, 93);
  padding-left: 10px;
}

.qa .mess {
  padding: 10px;
  padding-top: 0;
}

p {
  margin-bottom: 0 !important;
}

.newMess {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 79%;
  padding: 20px;
  padding-left: 65px;
  background-color: #efefef;
  padding-top: 20px;
  border-top: 0.5px solid rgb(235, 235, 235);
}

.user-image {
  width: 35px;
  height: 35px;
  margin-left: 5px;
  margin-right: 5px;
  display: inline-block;
}

.user-image img {
  width: 100%;
  border-radius: 60px;
}
* {
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto Slab", "Times New Roman", serif;
}
.img {
  /* background-color: red; */
  height: 250px;
  max-width: 300px;
  border-radius: 3px;
  border: 0.5px solid rgb(172, 172, 172);
}

img {
  width: 100%;
  height: 100%;
}

h4 {
  font-size: 25px;
  font-weight: 700;
  color: rgb(0, 13, 154);
}
h5 {
  font-size: 17px;
  /* color: rgb(0, 85, 119); */
}
.group-infor span {
  color: rgb(0, 16, 192);
  display: inline-block;
  width: 160px;
}
.control-btn {
  display: flex;
  padding-top: 20px;
  align-items: center;
  justify-content: space-around;
}
.v-btn {
  width: 200px;
}
.v-toolbar {
  padding-top: 20px;
  height: 90px;
  background-color: #fff;
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
  width: 15%;
}
thead th:nth-child(5) {
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
table {
  width: 100%;
}
</style>
