<template>
  <div>
    <v-row align-item="center" class="list px-3 mx-auto">
      <v-col cols="12" sm="12" align-item="center" class="col-cus">
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="3">
            <lable>Tìm kiếm thông báo: </lable>
            <div class="input-group search" id="search">
              <input
                v-model="filter.a.title"
                class="form-control border input-cus"
                type="search"
                placeholder="Search"
              />
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="3">
            <v-btn @click.prevent="search" width="100%" class="mt-4 btn-cus1">
              <v-icon>mdi-magnify</v-icon>
              Search
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3"></v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <v-dialog v-model="dialog" persistent>
              <template v-slot:activator="{ props }">
                <v-btn
                  tile
                  v-bind="props"
                  @click="dialog = true"
                  class="mt-4 btn-cus1"
                  style="float: right"
                >
                  <v-icon left> mdi-pencil </v-icon>
                  Tạo thông báo
                </v-btn>
              </template>
              <v-card>
                <v-card-title
                  class="mb-3"
                  style="
                    text-align: center;
                    padding: 16px 0;
                    background-color: blue;
                    color: #fff;
                  "
                >
                  <span class="text-h5"> Thông báo mới :</span>
                </v-card-title>

                <v-form
                  ref="form"
                  @submit.prevent="submit"
                  v-model="valid"
                  lazy-validation
                >
                  <div style="text-align: center; padding: 16px">
                    <v-text-field
                      label="Title"
                      background-color="light-blue"
                      prepend-icon="mdi-account"
                      v-model="newPost.title"
                      :rules="titleRules"
                      :counter="100"
                      required
                    ></v-text-field>
                    <v-textarea
                      color="black"
                      label="Label"
                      prepend-icon="mdi-comment"
                      v-model="newPost.content"
                      :rules="contentRules"
                      :counter="500"
                      required
                    ></v-textarea>
                    <div class="d-flex flex-wrap gap-2 flex-row-reverse"></div>
                  </div>
                  <v-card-actions style="background-color: #ddd">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="black"
                      text
                      @click="handleClose"
                      variant="outlined"
                      style="background-color: #fff"
                    >
                      Đóng
                    </v-btn>
                    <v-btn text type="submit" variant="flat" color="secondary">
                      Lưu
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-col>
      <v-row>
        <div class="header_fixed">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Content</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr v-for="(post, index) in posts" :key="index">
                <td>{{ index + 1 }}</td>
                <td class="td-cus">
                  <h3 class="title">
                    {{ post.title }}
                  </h3>
                  <p class="content">
                    {{ post.content }}
                  </p>
                </td>
                <td>{{ post.created_at.slice(0, 10) }}</td>
                <!-- <td>{{ post.created_at.slice(0, 10) }}</td> -->
                <td>
                  <div style="display: flex; justify-content: center">
                    <NotificationForm :notify="post" />
                    <DeleteNotifyForm :notify="post" :callback="handleReload" />
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
            v-if="loading"
          ></v-progress-circular>

          <v-pagination
            v-model="page"
            :length="pagination.total_page"
            color="purple"
            @click="handleChangePage"
            show-first-last-page
          ></v-pagination>
        </div>
      </v-row>
    </v-row>
    <v-row
      align-content="center"
      justify="space-around"
      style="margin-bottom: 20px"
    >
    </v-row>
  </div>
</template>

<script setup>
import NotificationForm from "../../components/dialogForm/NotificationForm.vue";
import DeleteNotifyForm from "../../components/dialogForm/DeleteNotifyForm.vue";
definePageMeta({
  layout: "default",
  middleware: "authenticated",
});

const { $toast } = useNuxtApp();

const page = ref(1);
const router = useRouter();
const route = useRoute();
const valid = ref(true);
const dialog = ref(false);
const loading = ref(true);
const posts = ref([]);
const newPost = ref({
  title: "",
  content: "",
});
const titleRules = ref([
  (v) => !!v || "Tiêu đề thông báo là bắt buộc",
  (v) => v.length <= 100 || "Tiêu đề thông báo chỉ có tối đa 100 ký tự",
]);
const contentRules = ref([
  (v) => !!v || "Nội dung thông báo là bắt buộc",
  (v) => v.length <= 500 || "Nội dung thông báo chỉ có tối đa 500 ký tự",
]);
const pagination = ref({
  current_page: 0,
  total_page: 0,
  total_rows: 0,
});
const filter = ref({
  a: {
    title: route.query.title === undefined ? "" : route.query.title,
    page: page,
  },
});

const { url: url1 } = useUrl({
  path: "/notifications",
  queryParams: filter.value.a,
});

const {
  data: dataGetPosts,
  get: getPosts,
  onFetchResponse: getPostsResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(url1, { immediate: false });
getPosts().json().execute();
getPostsResponse(() => {
  posts.value = dataGetPosts.value.data.data;
  pagination.value = dataGetPosts.value.data.pagination;
  loading.value = false;
});

const search = () => {
  router.replace({
    path: "/notifications",
    query: filter.value.a,
  });
  posts.value = [];
  getPosts().json().execute();
};

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
  $toast("Tạo thông báo thất bại, bạn vui lòng thử lại sau !", "error", 1500);
});

const submit = async () => {
  if (
    newPost.value.title == "" ||
    newPost.value.content == "" ||
    newPost.value.title.length > 100 ||
    newPost.value.title.length > 500
  ) {
    return;
  } else {
    handleSubmit();
    loading.value = true;
    await post(newPost.value).json().execute();
    newPost.value.title = "";
    newPost.value.content = "";
    await getPosts().json().execute();
  }
};

const handleChangePage = () => {
  loading.value = true;
  getPosts().json().execute();
};
const handleClose = () => {
  dialog.value = false;
  newPost.value.title = "";
  newPost.value.content = "";
};
const handleReload = async () => {
  loading.value = true;
  if (posts.value.length == 1) {
    page.value -= 1;
    await getPosts().json().execute();
    // console.log(page.value);
  } else {
    await getPosts().json().execute();
  }
  $toast("Xóa thông báo thành công", "success", 1500);
};
const handleSubmit = () => {
  // if (newPost.value.title == "" || newPost.value.content == "") {
  //   return;
  // } else {

  // }
  //
  dialog.value = false;
};

// const {
//   database: databaseFirebase,
//   ref: firebaseRef,
//   push,
//   onValue,
// } = useFirebase1();
// let result = ref([]);
// const a = () => {
//   result.value = [];
//   push(firebaseRef(databaseFirebase, "notification"), {
//     title: "thunhu",
//     content: "aaaaa",
//   });
// };
// const bb = () => {
//   result.value = [];
//   console.log(result.value);
//   onValue(firebaseRef(databaseFirebase, "notification"), (data) => {
//     result.value = [];
//     data.forEach((d) => {
//       result.value.push(d.val());
//     });
//   });
// };
// onMounted(() => {
//   bb();
// });
</script>
<style lang="scss" scoped>
.v-card {
  width: 80vw;
}

* {
  margin: 0;
  box-sizing: border-box;
  font-family: "Roboto Slab", "Times New Roman", serif;
}

body {
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  background-color: #adacac;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.btn-cus {
  padding: 0px !important;
  margin: 0px !important;
}

.header_fixed {
  width: 100%;
  overflow: auto;
  border: 1px solid #dddddd;
}

.header_fixed thead th {
  position: sticky;
  top: 0;
  background-color: #023e73;
  color: #e6e7e8;
  font-size: 15px;
}

th,
td {
  border-bottom: 1px solid #dddddd;
  padding: 10px 20px;
  font-size: 14px;
  text-align: center;
}

.td-cus {
  text-align: left;
}
.td-cus h3 {
  color: blue;
}
.input-cus {
  padding: 15px;
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

td button {
  border: none;
  padding: 7px 20px;
  border-radius: 5px;
  background-color: #023e73;
  color: #e6e7e8;
}
td button:hover {
  opacity: 0.8;
}

.btn-cus1 {
  background-color: #126da6;
  color: #fff;
  padding: 28px;
  display: flex;
}

th:nth-child(1),
.td:nth-child(1) {
  width: 5%;
}
th:nth-child(2),
.td:nth-child(1) {
  width: 60%;
}
th:nth-child(3),
.td:nth-child(2) {
  width: 20%;
}
.th:nth-child(4),
.td:nth-child(3) {
  width: 10%;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
}
td,
th {
  border: 1px solid #dbdada;
}
th {
  text-align: center;
  color: white;
}

td:nth-child(1) {
  color: rgb(0, 119, 128);
}
.col-cus {
  background-color: #f6f8fc;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}
.v-dialog .v-overlay__content > .v-card {
  border-radius: 5px;
}
.title {
  display: -webkit-box;
  overflow: hidden;
  box-sizing: border-box;
  word-break: break-all;
  white-space: pre-line;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.content {
  display: -webkit-box;
  overflow: hidden;
  box-sizing: border-box;
  word-break: break-all;
  white-space: pre-line;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
