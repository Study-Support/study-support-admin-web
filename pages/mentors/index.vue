<template>
  <v-card>
    <v-toolbar color="">
      <v-toolbar-title>
        <!-- Quản lý Mentor :  -->
        <v-tabs v-model="tab" color="primary">
          <v-tab value="option-1" class="option-btn">
            <v-icon start> mdi-account </v-icon>
            <span>Mentor</span>
          </v-tab>
          <v-tab value="option-2" class="option-btn">
            <v-icon start> mdi-access-point </v-icon>
            Question
          </v-tab>
        </v-tabs>
      </v-toolbar-title>
    </v-toolbar>
    <div class="flex-row">
      <v-window v-model="tab">
        <v-window-item value="option-1">
          <v-card flat>
            <div>
              <div class="cus-header">
                <v-row align-item="center">
                  <v-col cols="4">
                    <input
                      v-model="filter.a.search"
                      class="form-control border input-cus"
                      type="search"
                      placeholder="Search"
                    />
                  </v-col>
                  <v-col cols="4">
                    <div>
                      <select
                        v-model="filter.a.faculty"
                        class="form-select select-cus"
                        required
                      >
                        <option value="" disabled selected>Chọn khoa</option>
                        <option
                          v-for="faculty in faculties"
                          :key="faculty.id"
                          :value="faculty.id"
                        >
                          {{ faculty.name }}
                        </option>
                      </select>
                    </div>
                  </v-col>
                  <v-col cols="4">
                    <v-btn
                      @click.prevent="search1"
                      width="100%"
                      class="cus-btn"
                    >
                      Tìm kiếm
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                  lg="3"
                  v-for="mentor in myMentors"
                  :key="mentor.id"
                >
                  <MentorCard :mentor="mentor" />
                </v-col>
              </v-row>
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
              <div class="text-center">
                <v-pagination
                  v-model="page"
                  :length="pagination.total_page"
                  color="purple"
                  @click="handleChangePage"
                ></v-pagination>
              </div>
            </div>
          </v-card>
        </v-window-item>
        <v-window-item value="option-2">
          <v-card flat>
            <div>
              <v-row align-item="center" class="list px-3 mx-auto">
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
                      icon="mdi-plus-thick"
                      style="border-radius: 50% !important"
                    >
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
                      <span class="text-h5"> câu hỏi mới</span>
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
                        <div
                          class="d-flex flex-wrap gap-2 flex-row-reverse"
                        ></div>
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
              </v-row>
              <v-row
                align-content="center"
                justify="space-around"
                style="margin-bottom: 20px"
              >
              </v-row>
            </div>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </v-card>
</template>
<script setup>
import MentorCard from "../../components/mentors/MentorCard.vue";
import DiaLogForm from "../../components/dialogForm/QuestionForm.vue";
import DeleteQuestionForm from "../../components/dialogForm/DeleteQuestionForm.vue";

definePageMeta({
  layout: "default",
  middleware: "authenticated",
});
const route = useRoute();
const router = useRouter();
const page1 = ref(1);
const { getConfig } = useConfig();
const subjects = ref([]);
const faculties = ref({});
const loading = ref(true);
const loading1 = ref(true);
const model = ref(1);
const dialog = ref(false);
const { $toast } = useNuxtApp();
const tab = ref("option-1");
const myMentors = ref([]);
const faculty = ref({
  faculty_id: "",
});
const questions = ref([]);
const newQuestion = ref({
  id: "",
  content: "",
});
const newPost = ref({
  title: "",
  content: "",
});
const page = ref(1);
const pagination = ref({
  current_page: 0,
  total_page: 0,
  total_rows: 0,
});
const filter = ref({
  a: {
    search: route.query.search === undefined ? "" : route.query.search,
    faculty: route.query.faculty === undefined ? "" : route.query.faculty,
    subject_id:
      route.query.subject_id === undefined ? "" : route.query.subject_id,
    page: route.query.page === undefined ? 1 : route.query.page,
  },
});

const { url: urlMentor } = useUrl({
  path: "/mentors",
  queryParams: {
    // queryParams: filter.value.a,
  },
});

const {
  data: dataGetFilterMentors,
  get: getFilterMentors,
  onFetchResponse: getFilterMentorsResponse,
  onFetchError: getFilterMentorsError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(urlMentor, { immediate: false });
getFilterMentors().json().execute();

getFilterMentorsResponse(() => {
  myMentors.value = dataGetFilterMentors.value.data.data;
  pagination.value = dataGetFilterMentors.value.data.pagination;
  loading.value = false;
});

const {
  data: dataFaculty,
  get: getFaculty,
  onFetchResponse: getFacultyResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})("/faculties", { immediate: false });

const { url: url1 } = useUrl({
  path: "/subjects",
  queryParams: faculty.value,
});

const {
  data: dataSubject,
  get: getSubject,
  onFetchResponse: getSubjectResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(url1, { immediate: false });

const handleChangePage = () => {
  loading.value = true;
  getFilterMentors().json().execute();
};
const search = () => {
  filter.value.a.page = 1;
  router.replace({
    path: "/mentors",
    query: filter.value.a,
  });
  myMentors.value = [];
  // console.log("Ok :", loading1);
};
const search1 = () => {
  filter.value.a.page = 10;
  router.replace({
    path: "/mentors",
    query: filter.value.a,
  });
  // myMentors.value = [];
  // console.log("Ok :1", loading1);
};

getFaculty().json().execute();
getFacultyResponse(() => {
  faculties.value = dataFaculty.value.data.data;
});
getSubjectResponse(() => {
  subjects.value = dataSubject.value.data;
  // console.log("subject");
  // console.log(subjects.value);
});

watch(faculty.value, () => {
  getSubject().json().execute();
  filter.value.a.faculty_id = faculty.value.faculty_id;
});

const { url: url2 } = useUrl({
  path: "/mentor-questions",
  queryParams: {
    page: page1,
  },
});

const {
  data: dataGetQuestions,
  get: getQuestions,
  onFetchResponse: getQuestionsResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(url2, { immediate: false });
getQuestions().json().execute();
getQuestionsResponse(() => {
  questions.value = dataGetQuestions.value.data.data;
  loading1.value = false;
});
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

const submit = async () => {
  if (questions.value.length >= 5) {
    $toast(
      "Số câu hỏi đã đạt giới hạn, vui lòng xóa câu hỏi cũ nếu muốn tạo câu hỏi mới",
      "warning",
      1500
    );
    newQuestion.value.content = "";
  } else {
    loading1.value = true;

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
  loading1.value = true;
  if (questions.value.length == 1) {
    page.value -= 1;
    await getQuestions().json().execute();
    // console.log(page.value);
  } else {
    await getQuestions().json().execute();
  }
  $toast("Xóa câu hỏi thành công", "success", 1500);
};
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}
body {
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Roboto Slab", "Times New Roman", serif;
  background-color: #adacac;
}
.cus-header {
  width: 90%;
  margin: 20px auto;
  background-color: #d5e7f2;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}
.text-center {
  padding-top: 10px;
}

.v-tabs .v-btn {
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px !important;
}
.v-toolbar {
  padding-top: 20px;
  height: 90px;
  background-color: #fff;
}
.v-slide-group-item--active {
  color: #fff !important;
  background-color: #126da6;
}

.cus-row {
  position: relative;
}
.col-cus {
  background-color: #d5e7f2;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 20px;
  border-radius: 10px;
}
.input-cus {
  padding: 16px;
}
.search {
  display: inline-block;
  color: black;
  text-align: center;
}
.search input {
  margin: 0px;
  margin-right: 0;
  width: 100%;
  display: inline-block;
  border-radius: 4px !important;
  padding: 16px;
}

.select-cus {
  padding: 16px;
}
.search button:hover svg {
  color: rgb(7, 30, 95);
}

.v-overlay__content .v-card {
  width: 80vw;
}
.cus-btn {
  background-color: #126da6;
  color: #fff;
  margin-left: 40px;
  padding: 28px;
  display: flex;
  float: right;
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
