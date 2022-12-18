<template>
  <v-card>
    <div>
      <div class="cus-header">
        <v-row align-item="center">
          <v-col cols="3">
            <input
              v-model="filter.a.search"
              class="form-control border input-cus"
              type="search"
              placeholder="Search"
            />
          </v-col>
          <v-col cols="3">
            <div>
              <select
                v-model="filter.a.type"
                class="form-select select-cus"
                id="type"
                required
              >
                <option value="" disabled selected>Trạng thái</option>
                <option :value="getConfig('constants.typeOfUser.all')">
                  Tất cả
                </option>
                <option :value="getConfig('constants.typeOfUser.active')">
                  đang hoạt động
                </option>
                <option :value="getConfig('constants.typeOfUser.block')">
                  khóa tài khoản
                </option>
              </select>
            </div>
          </v-col>
          <v-col cols="3">
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
          <v-col cols="3">
            <v-btn @click.prevent="search1" width="100%" class="">
              Search
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
          v-model="model"
          :length="1"
          rounded="circle"
        ></v-pagination>
      </div>
    </div>
  </v-card>
</template>
<script setup>
import MentorCard from "../../components/mentors/MentorCard.vue";
definePageMeta({
  layout: "default",
  middleware: "authenticated",
});
const route = useRoute();
const router = useRouter();
const { getConfig } = useConfig();
const subjects = ref([]);
const faculties = ref({});
const loading = ref(true);
const model = ref(1);
const totalPages = ref(6);

const tab = ref("option-1");
const myMentors = ref([]);
const faculty = ref({
  faculty_id: "",
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

// getFilterMentors().json().execute();

getFilterMentorsResponse(() => {
  console.log(dataGetFilterMentors.value.data.data);
  console.log("ok");
  if (dataGetFilterMentors.value.data.data.length !== 0) {
    myMentors.value = myMentors.value.concat(
      dataGetFilterMentors.value.data.data
    );
    console.log("tesst cua mentors");
  }
  console.log(dataGetFilterMentors.value.data.data.length);
  if (
    dataGetFilterMentors.value.data.data.length <
    getConfig("constants.pagination")
  ) {
    loading1.value = false;
  }
  // myMentors.value = dataGetMentors.value.data.data;
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

const search = () => {
  filter.value.a.page = 1;
  router.replace({
    path: "/mentors",
    query: filter.value.a,
  });
  myMentors.value = [];
  console.log("Ok :", loading1);
};
const search1 = () => {
  filter.value.a.page = 10;
  router.replace({
    path: "/mentors",
    query: filter.value.a,
  });
  // myMentors.value = [];
  console.log("Ok :1", loading1);
};

getFilterMentors().json().execute();

getFaculty().json().execute();
getFacultyResponse(() => {
  faculties.value = dataFaculty.value.data.data;
});
getSubjectResponse(() => {
  subjects.value = dataSubject.value.data;
  console.log("subject");
  console.log(subjects.value);
});

watch(faculty.value, () => {
  getSubject().json().execute();
  filter.value.a.faculty_id = faculty.value.faculty_id;
});
</script>

<style scoped>
tr:nth-child(even) {
  background-color: #dddddd;
}

tr:nth-child(odd) {
  background-color: #edeef1;
}
th:nth-child(1),
.td:nth-child(1) {
  width: 5%;
}
th:nth-child(2),
.td:nth-child(1) {
  width: 5%;
}
th:nth-child(3),
.td:nth-child(2) {
  width: 20%;
}
.th:nth-child(4),
.td:nth-child(3) {
  width: 20%;
}
.th:nth-child(5),
.td:nth-child(4) {
  width: 20%;
}
.th:nth-child(6),
.td:nth-child(5) {
  width: 10%;
}

tr:hover td {
  cursor: pointer;
}

.v-btn {
  background-color: #126da6;
  color: #fff;
  margin-left: 40px;
  padding: 28px;
  display: flex;
  float: right;
}
.loading >>> div {
  margin: auto;
  margin-top: 10px;
}
.loader {
  width: 90%;
  margin: auto;
}

.cus-header {
  width: 80%;
  margin: 20px auto;
  background-color: #d5e7f2;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}
.text-center {
  padding-top: 20px;
}
.v-card {
  min-height: 100vh;
}
.v-tabs .v-btn {
  background-color: #3c195b;
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
  color: #fefb00 !important;
}

* {
  margin: 0;
  /* padding: 0; */
  box-sizing: border-box;
}

body {
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: "Roboto Slab", "Times New Roman", serif;
  background-color: #adacac;
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
.cus-table {
  padding: 0;
}
table {
  width: 100%;
  border-collapse: collapse;
}

.header_fixed {
  width: 100%;
  overflow: auto;
  border: 1px solid #bbb;
}
.header_fixed thead th {
  background-color: #023e73;
  color: #fff;
  font-size: 15px;
}

th,
td {
  border-bottom: 1px solid #dddddd;
  padding: 10px 20px;
  font-size: 14px;
  text-align: center;
}

td img {
  height: 60px;
  width: 60px;
  border-radius: 100%;
  border: 5px solid #e6e7e8;
}

tr:nth-child(even) {
  background-color: #efefef;
}

tr:nth-child(odd) {
  background-color: #fff;
}
td,
th {
  border: 1px solid #dbdada;
}
tr:hover td {
  cursor: pointer;
}

td button {
  border: none;
  padding: 7px 20px;
  border-radius: 10px;
  background-color: #023e73;
  color: #fff;
}
td button:hover {
  opacity: 0.8;
}
th:nth-child(1),
.td:nth-child(1) {
  width: 5%;
}
th:nth-child(2),
.td:nth-child(1) {
  width: 10%;
}
th:nth-child(3),
.td:nth-child(2) {
  width: 20%;
}
.th:nth-child(4),
.td:nth-child(3) {
  width: 20%;
}
.th:nth-child(5),
.td:nth-child(4) {
  width: 25%;
}
.th:nth-child(6),
.td:nth-child(5) {
  width: 20%;
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
</style>
