<script setup>
definePageMeta({
  layout: "default",
  middleware: "authenticated",
});

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
  quantity: "",
  members: [
    {
      full_name: "",
      faculty: "",
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
</script>
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
          {{ group.title }}
        </p>
        <span>Thông tin chi tiết</span>
        <p class="information">
          {{ group.information }}
        </p>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <v-col cols="12" sm="4">
        <p><span>Thành viên hiện có:</span> {{ group.quantity }} thành viên</p>
        <div v-for="(member, index) in group.members" :key="member.id">
          <p class="mb-0">
            <NuxtLink :to="{ path: `/users/${index + 1}` }" class="full">
              {{ index + 1 }}. {{ member.full_name }} _ Khoa:
              {{ member.faculty }}
            </NuxtLink>
          </p>
        </div>
      </v-col>
      <v-col cols="12" sm="8">
        <h5>Chức năng :</h5>
        <div class="control-btn">
          <v-btn color="success">
            Tìm kiếm mentors
          </v-btn>
          <v-btn color="secondary"> Bắt đầu hoạt động </v-btn>
          <v-btn color="error"> Khóa nhóm </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

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
  padding-top: 20px;
  align-items: center;
  justify-content: space-around;
}
.v-btn {
  width: 200px;
}
</style>
