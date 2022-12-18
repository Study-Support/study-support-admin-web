<template>
  <v-card>
    <v-toolbar color="">
      <v-toolbar-title>
        <v-tabs v-model="tab" color="primary">
          <v-tab value="option-1" class="option-btn">
            <v-icon start> mdi-account-group </v-icon>
            Thông tin Nhóm học
          </v-tab>
          <v-tab value="option-2" class="option-btn">
            <v-icon start> mdi-access-point </v-icon>
            Hoạt động của nhóm
          </v-tab>
        </v-tabs>
      </v-toolbar-title>
    </v-toolbar>
    <div class="flex-row">
      <v-window v-model="tab">
        <v-window-item value="option-1">
          <v-card flat>
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
                    {{
                      group.self_study == 0
                        ? "Nhóm tìm kiếm mentor"
                        : "Nhóm tự học"
                    }}
                  </p>
                </v-col>
              </v-row>
              <v-row class="mt-3">
                <v-col cols="12" sm="4">
                  <p>
                    <span>Thành viên hiện có:</span>{{ group.quantity }} thành
                    viên
                  </p>
                  <div
                    v-for="(member, index) in group.membersAccepted"
                    :key="member.id"
                  >
                    <p class="mb-0">
                      <NuxtLink
                        :to="{ path: `/users/${member.id}` }"
                        class="full"
                      >
                        {{ index + 1 }}. {{ member.full_name }} _ Khoa:
                        {{ member.faculty }}
                      </NuxtLink>
                    </p>
                  </div>
                  <p><span>Mentor đã duyệt:</span></p>
                  <NuxtLink
                    :to="{ path: `/mentors/${group.mentorAccepted.id}` }"
                    class="full"
                  >
                    {{ group.mentorAccepted.full_name }} _ Khoa:
                    {{ group.mentorAccepted.faculty }}
                  </NuxtLink>
                </v-col>
                <v-col cols="12" sm="4">
                  <h5>trạng thái :</h5>
                  <h4>Đang hoạt động</h4>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-window-item>
        <v-window-item value="option-2">
          <v-card flat>
            <div class="full p-4">
              <div>
                <v-row
                  v-for="data in allChat"
                  :key="data.time"
                  class="mb-4 pb-2"
                >
                  <v-col class="col-auto mt-2" cols="12" sm="1" md="1" lg="1">
                    <div class="user-image">
                      <img src="/images/user.png" alt="" />
                    </div>
                  </v-col>
                  <v-col class="qa" cols="12" sm="11" md="11" lg="11">
                    <div>
                      <p class="name">
                        {{ data.name }} <span>{{ data.time }}</span>
                      </p>
                      <p class="mess">
                        {{ data.message }}
                      </p>
                      <div class="reply">
                        <v-row v-for="reply in data.replies" :key="reply.id">
                          <v-col
                            class="col-auto"
                            cols="12"
                            sm="1"
                            md="1"
                            lg="1"
                          >
                            <v-icon>mdi-arrow-right-bold</v-icon>
                          </v-col>
                          <v-col cols="12" sm="11" md="11" lg="11">
                            <p class="name">
                              {{ reply.name }} <span>{{ reply.time }}</span>
                            </p>
                            <p class="mess">
                              {{ reply.message }}
                            </p>
                          </v-col>
                        </v-row>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </v-card>
</template>

<script setup>
definePageMeta({
  layout: "default",
  middleware: "authenticated",
});
definePageMeta({
  layout: false,
});
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
  onValue(firebaseRef(databaseFirebase, `groups/1`), (data) => {
    allChat.value = [];
    data.forEach((d) => {
      allChat.value.push(d.val());
    });
  });
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
const submit = () => {
  put().json().execute();
  navigateTo("/groups");
};
</script>

<style scoped>
* {
  color: black;
}

.full {
  background-color: #efefef;
  min-height: 100vh;
  position: relative;
  padding-bottom: 70px !important;
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
  background-color: white;
  padding-bottom: 10px;
  border-radius: 5px;
  -webkit-box-shadow: 9px 9px 14px -13px rgba(110, 110, 110, 1);
  -moz-box-shadow: 9px 9px 14px -13px rgba(110, 110, 110, 1);
  box-shadow: 9px 9px 14px -13px rgba(110, 110, 110, 1);
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
  justify-content: space-around;
}
.v-btn {
  width: 200px;
}
</style>
