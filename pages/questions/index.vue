<template>
  <div>
    <v-row align-item="center" class="list px-3 mx-auto">
      <v-col cols="12" sm="12" align-item="center" class="col-cus">
        <v-row>
          <v-col cols="12" sm="6" md="6" lg="3">
            <lable>Tìm kiếm câu hỏi: </lable>
            <div class="input-group search" id="search">
              <input
                v-model="filter.a.search"
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
          <v-col cols="12" sm="6" md="6" lg="3"></v-col>
          <v-col cols="12" sm="6" md="6" lg="3">
            <v-dialog v-model="dialog" persistent>
              <v-btn
                icon="mdi-close-thick"
                @click="dialog = false"
                style="
                  position: absolute;
                  right: 10px;
                  top: 10px;
                  z-index: 10;
                  background-color: blue;
                  color: #fff;
                  box-shadow: none;
                  border-radius: 50% !important;
                "
              ></v-btn>
              <template v-slot:activator="{ props }">
                <v-btn
                  tile
                  class="mt-4 btn-cus1"
                  v-bind="props"
                  @click="handleLimit"
                >
                  <v-icon left> mdi-pencil </v-icon>
                  Tạo câu hỏi
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
                  <span class="text-h5"> câu hỏi mới :</span>
                </v-card-title>
                <form @submit.prevent="submit">
                  <div style="text-align: center; padding: 16px">
                    <v-text-field
                      label="Câu hỏi"
                      background-color="light-blue"
                      prepend-icon="mdi-comment"
                      v-model="newQuestion.content"
                      variant="outlined"
                    ></v-text-field>
                    <div class="d-flex flex-wrap gap-2 flex-row-reverse"></div>
                  </div>
                  <v-card-actions style="background-color: #ddd">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="black"
                      text
                      @click="dialog = false"
                      variant="outlined"
                      style="background-color: #fff"
                    >
                      Đóng
                    </v-btn>
                    <v-btn
                      text
                      @click="dialog = false"
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr v-for="(question, index) in questions" :key="index">
                <td>{{ index + 1 }}</td>
                <td class="td-cus">
                  <p>
                    {{ question.content }}
                  </p>
                </td>
                <td style="display: flex; justify-content: center">
                  <DiaLogForm :question="question" />
                  <DeleteQuestionForm
                    :question="question"
                    :callback="handleReload"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
import DiaLogForm from "../../components/dialogForm/QuestionForm.vue";
import DeleteQuestionForm from "../../components/dialogForm/DeleteQuestionForm.vue";

definePageMeta({
  layout: "default",
  middleware: "authenticated",
});
const { $toast } = useNuxtApp();
const page = ref(1);
const router = useRouter();
const route = useRoute();
const dialog = ref(false);
const loading = ref(true);
const isDisable = ref(false);
const questions = ref([]);
const newQuestion = ref({
  id: "",
  content: "",
});
const filter = ref({
  a: {
    search: route.query.search === undefined ? "" : route.query.search,
  },
});
const newPost = ref({
  title: "",
  content: "",
});
const { url: url1 } = useUrl({
  path: "/mentor-questions",
  queryParams: {
    page: page,
  },
});

const {
  data: dataGetQuestions,
  get: getQuestions,
  onFetchResponse: getQuestionsResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(url1, { immediate: false });
getQuestions().json().execute();
getQuestionsResponse(() => {
  questions.value = dataGetQuestions.value.data.data;
  loading.value = false;
});

const search = () => {
  router.replace({
    path: "/questions",
    query: filter.value.a,
  });
  questions.value = [];
  getQuestions().json().execute();
};

const {
  data: dataQuestion,
  onFetchResponse: resQuestion,
  onFetchError: errQuestion,
  statusCode: codeQuestion,
  post,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})("/mentor-questions", { immediate: false });
// Trả về khi put thông tin cá nhân
resQuestion(() => {
  // myUsers.value = dataPut.value.data.data;
  $toast("Tạo câu hỏi thành công", "success", 1500);
});
errQuestion(() => {
  if (codeQuestion.value === getConfig("constants.statusCodes.validation")) {
    validationErrorMessages.value = dataQuestion.value.meta.error_message;
  }
  return false;
});

const {
  data: dataPost,
  onFetchResponse: resPost,
  onFetchError: errPost,
  statusCode: codePost,
  post: post1,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})("/mentor-questions", { immediate: false });
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

const submit = async () => {
  if (questions.value.length >= 5) {
    $toast(
      "Số câu hỏi đã đạt giới hạn, vui lòng xóa câu hỏi cũ nếu muốn tạo câu hỏi mới",
      "warning",
      1500
    );
    newQuestion.value.content = "";
  }else{

    loading.value = true;
  
    await post(newQuestion.value).json().execute();
    newQuestion.value.content = "";
    await getQuestions().json().execute();
    
    newPost.value.title = "Thông báo câu hỏi cho mentor";
    newPost.value.content = `Câu hỏi mentor đã thay đổi, các bạn cần chú ý!`;
    await post1(newPost.value).json().execute();
    newPost.value.title = "";
    newPost.value.content = "";
  }
};
const handleReload = async () => {
  loading.value = true;
  if (questions.value.length == 1) {
    page.value -= 1;
    await getQuestions().json().execute();
    console.log(page.value);
  } else {
    await getQuestions().json().execute();
  }
  $toast("Xóa câu hỏi thành công", "success", 1500);
};
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
</style>
