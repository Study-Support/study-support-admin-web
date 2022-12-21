<template>
  <div class="container">
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
    <v-row v-if="!loading">
      <v-col cols="12" lg="4" sm="12">
        <div class="img">
          <img src="/images/groups/g1.png" alt="" />
        </div>
      </v-col>
      <v-col class="group-infor" cols="12" lg="8" sm="12">
        <h4 class="pt-3 pb-4">{{ group.subject }}</h4>
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
          {{ group.self_study == 0 ? "Nhóm tìm kiếm mentor" : "Nhóm tự học" }}
        </p>
      </v-col>
    </v-row>
    <v-row class="mt-3" v-if="!loading">
      <v-col cols="12" sm="8">
        <p><span>Người tạo nhóm :</span></p>
        <p class="mb-0">
          <NuxtLink
            :to="{ path: `/users/${group.membersAccepted[0].id}` }"
            class="full"
          >
            {{ group.membersAccepted[0].full_name }} - Khoa
            {{ group.membersAccepted[0].faculty }}
          </NuxtLink>
        </p>
        <p><span>Thành viên hiện có:</span> {{ group.quantity }} thành viên</p>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="control-btn">
          <v-btn color="success" @click="submit(group.quantity,group.subject,group.faculty)">
            {{ group.self_study == 0 ? "Tìm kiếm mentor" : "Tạo nhóm học" }}
          </v-btn>
        </div>
      </v-col>
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
              <tr v-for="(user, index) in group.membersAccepted" :key="index">
                <td>{{ user.id }}</td>

                <td>
                  {{ user.full_name }}
                </td>
                <td>
                  {{ user.faculty }}
                </td>
                <td>
                  {{ user.status == 0 ? "Khóa tài khoản" : "Đang hoạt động" }}
                </td>
                <td>
                  <button @click="navigateTo(`/users/${user.id}`)">
                    <v-icon class="pr-3">mdi-eye</v-icon>Xem
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "default",
  middleware: "authenticated",
});
const { $toast } = useNuxtApp();
const loading = ref(true);
const route = useRoute();
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
  membersAccepted: [
    {
      full_name: "",
      faculty: "",
      id: 0,
    },
  ],
});
const newPost = ref({
  title: "",
  content: "",
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
  console.log("ok");
});
errPut(() => {
  if (codePut.value === getConfig("constants.statusCodes.validation")) {
    validationErrorMessages.value = dataPut.value.meta.error_message;
  }
  return false;
});

const {
  data: dataPost,
  onFetchResponse: resPost,
  onFetchError: errPost,
  statusCode: codePost,
  post,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})("/notifications", { immediate: false });
// Trả về khi put thông tin cá nhân
resPost(() => {
  // myUsers.value = dataPut.value.data.data;
  $toast("Tạo thông báo thành công", "success", 1500);
});
errPost(() => {
  if (codePost.value === getConfig("constants.statusCodes.validation")) {
    validationErrorMessages.value = dataPost.value.meta.error_message;
  }
  return false;
});

const submit = (quantity,subject,faculty) => {
  if (quantity < 3) {
    $toast("số lượng thành viên quá ít", "error", 1500);
    $toast(`Nhóm ${route.params.id} đã được tạo`, "success", 1500);
    newPost.value.title = "Thông báo tuyển mentor hướng dẫn";
    newPost.value.content = `Nhóm học số ${route.params.id} bộ môn ${subject} thuộc khoa ${faculty} bắt đầu tìm kiếm mentor, các bạn có thể vào đăng ký`;
    post(newPost.value).json().execute();
    newPost.value.title = "";
    newPost.value.content = "";
  } else {
    $toast("Nhóm bắt đầu tìm mentor", "success", 1500);
    put().json().execute();
    navigateTo("/groups");
  }
};
</script>
<style scoped>
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
.container {
  max-width: 1318px;
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
.full {
  text-decoration: none;
  /* color:#fff; */
}
.group-infor span {
  color: rgb(0, 16, 192);
  display: inline-block;
  width: 160px;
}
.full {
  text-decoration: none;
}
.control-btn {
  display: flex;
  padding-top: 20px;
  align-items: center;
  justify-content: right;
}
.v-btn {
  width: 200px;
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
