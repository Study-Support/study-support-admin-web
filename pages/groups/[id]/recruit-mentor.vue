<template>
  <div class="container">
    <v-row>
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
    <v-row class="mt-3">
      <v-col cols="12" sm="12">
        <p><span>Thành viên hiện có:</span> {{ group.quantity }} thành viên</p>
        <div v-for="(member, index) in group.membersAccepted" :key="member.id">
          <p class="mb-0">
            <NuxtLink :to="{ path: `/users/${member.id}` }" class="full">
              {{ index + 1 }}. {{ member.full_name }} _ Khoa:
              {{ member.faculty }}
            </NuxtLink>
          </p>
        </div>
        <p><span>Mentor đã duyệt:</span></p>
        {{ group.mentorAccepted.id }}
        <NuxtLink
          :to="{ path: `/mentors/${group.mentorAccepted.id}` }"
          class="full"
        >
          {{ group.mentorAccepted.full_name }} _ Khoa:
          {{ group.mentorAccepted.faculty }}
        </NuxtLink>
        <h3 class="h3-cus" style="padding-left: 10px; padding-top: 20px">
          Thông tin Mentor đăng ký :
        </h3>
        <div class="header_fixed">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Họ và tên</th>
                <th>Khoa</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in group.mentorWaiting" :key="index">
                <td>{{ user.id }}</td>

                <td>
                  {{ user.full_name }}
                </td>
                <td>
                  {{ user.faculty }}
                </td>
                <td>
                  <button @click="submitMentor(user.id)">
                    <v-icon class="pr-3">mdi-check</v-icon>Duyệt
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
const route = useRoute();
const groupId = ref({
  group_id: "",
});
const mentorAccept = ref({
  account_id: "",
});
const group = ref({
  id: "",
  faculty: "",
  subject: "",
  title: "",
  information: "",
  topic: "",
  mentorAccepted: [
    {
      full_name: "",
      faculty: "",
      id: 0,
    },
  ],
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
  mentorWaiting: [
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
const submit = () => {
  put().json().execute();
  $toast("Nhóm bắt đầu hoạt động", "success", 1500);
  navigateTo("/groups");
};

const {
  data: dataPutMentor,
  onFetchResponse: resPutMentor,
  onFetchError: errPutMentor,
  statusCode: codePutMentor,
  put: put1,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(`/groups/${route.params.id}/acceptMentor`, { immediate: false });
// })(`/groups/2/acceptMentor`, { immediate: false });
// Trả về khi put thông tin cá nhân
resPutMentor(() => {
  // myUsers.value = dataPut.value.data.data;
  console.log("ok");
});
const submitMentor = (id) => {
  mentorAccept.value.account_id = id;
  console.log(id);
  put1(mentorAccept.value).json().execute();
  $toast("Duyệt Mentor thành công", "success", 1500);
  navigateTo("/groups");
  $toast("Nhóm bắt đầu hoạt động", "success", 1500);
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
  align-items: center;
}
.v-btn {
  /* width: 200px; */
}
.header_fixed {
  width: 100%;
  overflow: auto;
  border-top: 3px solid red;
}
.container {
  max-width: 1318px;
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
