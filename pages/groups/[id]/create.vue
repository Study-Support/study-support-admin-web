<template>
  <div class="wrap">
    <div>
      <div class="tabs-container">
        <div>Phần 1/2</div>
      </div>
      <div class="container emp-profile tab1">
        <div class="profile-tab">
          <h3>Thông tin đăng ký tạo mới group</h3>
          <h4>1. Thông tin cơ bản</h4>
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
          <div class="row" style="padding: 5px 10px 20px 10px" v-if="!loading">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-6">
                  <div class="row" style="justify-content: center">
                    <div class="col-md-12">
                      <label>Sinh viên đăng ký: </label>
                    </div>
                    <div class="col-md-9">
                      <input
                        class="border-bottom"
                        type="text"
                        disabled
                        v-model="data.membersAccepted[0].full_name"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row" style="justify-content: center">
                    <div class="col-md-12">
                      <label>Khoa đang theo học:</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        class="border-bottom"
                        type="text"
                        disabled
                        v-model="data.faculty"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="row" style="justify-content: center">
                    <div class="col-md-12">
                      <label>Môn học đăng ký:</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        class="border-bottom"
                        type="text"
                        disabled
                        v-model="data.subject"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row" style="justify-content: center">
                    <div class="col-md-12">
                      <label>Phân loại nhóm học:</label>
                    </div>
                    <div class="col-md-9">
                      <input
                        class="border-bottom"
                        type="text"
                        disabled
                        v-model="array[data.self_study]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cus-tab">
      <div class="tabs-container">
        <div>Phần 2/2</div>
      </div>
      <div class="container emp-profile">
        <div class="profile-tab">
          <h4>2. Thông tin nhóm học</h4>
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
          <div class="row" style="padding: 5px 10px 20px 10px" v-if="!loading">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <label>Ảnh đại diện tạo nhóm học:</label>
                </div>
                <div
                  class="col-md-12"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <img
                    :src="`${data.image_url}`"
                    alt=""
                    style="
                      max-width: 100%;
                      object-fit: contain;
                      max-height: 240px;
                    "
                  />
                </div>
                <div class="col-md-12">
                  <label>Mục đích tạo nhóm học:</label>
                </div>
                <div class="col-md-12">
                  <input
                    class="border-bottom"
                    type="text"
                    disabled
                    v-model="data.topic"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label
                    >Thông tin cụ thể về những gì mà bạn muốn học, mục tiêu sau
                    khi kết thúc khóa học?</label
                  >
                </div>
                <div class="col-md-12">
                  <textarea
                    class="border-bottom"
                    disabled
                    v-model="data.information"
                  ></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label>Thông tin mô tả địa điểm học:</label>
                </div>
                <div class="col-md-12">
                  <textarea
                    class="border-bottom"
                    disabled
                    v-model="data.location_study"
                  ></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label>Thông tin mô tả thời gian học:</label>
                </div>
                <div class="col-md-12">
                  <textarea
                    class="border-bottom"
                    disabled
                    v-model="data.time_study"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="control-btn">
          <v-btn variant="flat" color="error" @click="deleteGroup()"
            >Xoá
          </v-btn>
          <v-btn
            variant="flat"
            color="success"
            @click="submit(data.subject, data.faculty)"
            >Duyệt</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
var array = {
  0: "Nhóm có mentor",
  1: "Nhóm tự học",
};
const { $toast } = useNuxtApp();
const route = useRoute();
const loading = ref(true);
const data = ref({
  answers: [],
  faculty: "",
  information: "",
  location_study: "",
  membersAccepted: [
    {
      id: "",
      full_name: "",
      faculty: "",
    },
  ],
  self_study: 0,
  subject: "",
  time_study: "",
  topic: "",
});
const newPost = ref({
  title: "",
  content: "",
});
// const data = ref({});

const { url: url1 } = useUrl({
  path: `groups/${route.params.id}`,
  queryParams: {
    // isAccept: "true",
  },
});

const {
  data: dataGetGroupsCreate,
  get: getGroupsCreate,
  onFetchResponse: getGroupsCreateResponse,
} = useFetchApi({
  requireAuth: true,
  disabledHandleErrorUnauthorized: true,
})(url1, { immediate: false });
getGroupsCreate().json().execute();
getGroupsCreateResponse(() => {
  data.value = dataGetGroupsCreate.value.data.data;
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

const submit = (subject, faculty) => {
  put().json().execute();
  $toast(`Nhóm ${route.params.id} đã được tạo`, "success", 1500);
  newPost.value.title = "Thông báo tuyển thành viên";
  newPost.value.content = `Nhóm học số ${route.params.id} bộ môn ${subject} thuộc khoa ${faculty} được tạo, các bạn có thể vào đăng ký`;
  navigateTo("/groups");
  post(newPost.value).json().execute();
  newPost.value.title = "";
  newPost.value.content = "";
};

const {
  data: dataDeleteGroups,
  onFetchResponse: resDeleteGroups,
  onFetchError: errDeleteGroups,
  delete: delGroups,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(`/groups/${route.params.id}`, { immediate: false });
resDeleteGroups(() => {
  $toast(`Nhóm ${route.params.id} đã được xoá`, "success", 1500);
});
errDeleteGroups(() => {
  $toast(`Hệ thống gặp trục trặc, bạn vui lòng thử lại sau`, "error", 1500);
});

const deleteGroup = () => {
  delGroups().json().execute();
  navigateTo("/groups");
};
</script>

<style scoped>
.emp-profile {
  border-radius: 0px 0.5rem 0.5rem 0.5rem;
  background: #fff;
  width: 80%;
  border: 1px solid #ddd;
  border-top: 10px solid #1261a6;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
}
.emp-profile h3 {
  text-align: center;
}
.profile-tab h4 {
  margin: 0;
}
input {
  /* padding: 10px; */
  width: 100%;
  outline: none;
}
label {
  font-size: 14px;
  color: rgba(48, 48, 48, 0.886);
  padding-left: 2px;
  padding-bottom: 3px;
  margin-top: 15px;
}
textarea {
  width: 100%;
}
.control-btn {
  padding: 20px 0;
  display: flex;
  justify-content: right;
}
.v-btn {
  padding: 7px 20px;
  margin-right: 10px;
  min-width: 70px;
}
.tabs-container {
  width: 80%;
  margin: auto;
  /* margin-left:3px; */
}
.tabs-container div {
  border-radius: 0.5rem 0.5rem 0px 0px;

  background-color: #1261a6;
  width: 10%;
  text-align: center;
  padding: 5px 10px;
  color: #fff;
}
.cus-tab {
  margin-top: 20px;
}
.tab1 label {
  padding-left: 10%;
}
</style>
