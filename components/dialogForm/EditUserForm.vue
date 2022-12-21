<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ props }">
      <v-btn
        color="secondary"
        dark
        v-bind="props"
        @click="dialog = true"
        variant="flat"
        style="width: 180px"
      >
        <v-icon style="font-size: 18px">mdi-account-edit</v-icon>
        <span>Chỉnh sửa thông tin</span>
      </v-btn>
    </template>
    <v-card class="card-cus">
      <v-card-title
        color="secondary"
        style="
          text-align: center;
          padding: 16px 0;
          background-color: blue;
          color: #fff;
        "
      >
        <span class="text-h3">Cập nhật thông tin sinh viên</span>
      </v-card-title>
      <form @submit.prevent="submit">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Full name*"
                  required
                  v-model="user.full_name"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                  v-model="user.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Phone number*"
                  required
                  type="number"
                  v-model="user.phone_number"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Address*"
                  required
                  type="text"
                  v-model="user.address"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <input type="date" v-model="user.birthday" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['male', 'female']"
                  label="Gender*"
                  required
                  v-model="user.gender"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <select
                  id="faculty"
                  v-model="user.faculty"
                  class="form-select select-cus"
                  required
                >
                  <option
                    v-for="faculty in faculties"
                    :key="faculty.id"
                    :value="user.faculty"
                  >
                    {{ faculty.name }}
                  </option>
                </select>
              </v-col>
            </v-row>
          </v-container>
          <small>* Các trường bắt buộc nhập thông tin</small>
        </v-card-text>
        <v-card-actions style="background-color: #ddd">
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="dialog = false" variant="outlined">
            Đóng
          </v-btn>
          <v-btn
            text
            @click="submit, (dialog = false)"
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
</template>
<script setup>
const props = defineProps({
  user: {
    type: Object,
  },
  faculties: {
    type: Object,
  },
});

const dialog = ref(false);
const { $toast } = useNuxtApp();
const {
  data: dataPut,
  onFetchResponse: resPut,
  onFetchError: errPut,
  statusCode: codePut,
  put,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(`/users/${props.user.id}`, { immediate: false });
// Trả về khi put thông tin cá nhân
resPut(() => {
  $toast("Cập nhật thông tin thành công", "success", 1500);
});
errPut(() => {
  $toast("Hệ thống gặp sự cố, bạn vui lòng thử lại sau", "error", 1500);
});
const submit = () => {
  console.log(props.user);
  put(props.user).json().execute();
};
const handleClose = () => {
  dialog.value = false;
  //   notify.value.title = "";
  //   notify.value.content = "";
};

</script>
<style scoped>
.v-card {
  width: 80vw;
}
.select-cus {
  padding: 15px 20px;
  outline: none;
  background-color: #f6f6f6;
  font-family: "Roboto Mono", monospace;
  color: rgb(58, 58, 58);
  font-size: 18px;
  border: none;
  border-bottom: 1px solid #a5a5a5;
  width: 100%;
}
input[type="date"] {
  padding: 10px 20px;
  outline: none;
  background-color: #f6f6f6;
  border-bottom: 1px solid #ccc;
  margin-top: 5px;
  margin-bottom: 20px;
  font-family: "Roboto Mono", monospace;
  color: rgb(58, 58, 58);
  font-size: 18px;
  border: none;
  border-bottom: 1px solid #a5a5a5;
  width: 100%;
}
::-webkit-calendar-picker-indicator {
  background-color: #ffffff;
  padding: 5px;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid #ddd;
}
</style>
