<template>
  <div>
    <v-dialog v-model="dialog1" persistent >
      <template v-slot:activator="{ props }">
        <v-btn
          dark
          v-bind="props"
          @click="handleOpen"
          variant="flat"
          color="error"
          style="width: 180px; margin-top: 4px"
          v-if="user.is_active == 1"
        >
          <v-icon>mdi-lock</v-icon>
          Khóa tài khoản
        </v-btn>
        <v-btn
          dark
          v-bind="props"
          @click="handleOpen"
          variant="flat"
          color="primary"
          style="width: 180px; margin-top: 4px"
          v-if="user.is_active == 0"
        >
          <v-icon>mdi-lock</v-icon>
          Mở tài khoản
        </v-btn>
      </template>
      <v-card style="margin: auto">
        <v-card-title
          style="
            text-align: center;
            padding: 16px 0;
            background-color: red;
            color: #fff;
          "
          class="text-h5"
        >
          Khoá Tài Khoản
        </v-card-title>
        <v-card-text style="display: flex; align-item: center">
          <v-icon style="font-size: 60px; color: red; margin-right: 10px"
            >mdi-account-lock</v-icon
          >
          <span v-if="user.is_active == 1"
            >Tài khoản sau khi khóa sẽ không thể sử dụng các chức năng của ứng
            dụng cho đến khi được mở lại.<br />
            Bạn có chắc chắn muốn khóa tài khoản này không ?</span
          >
          <span v-if="user.is_active == 0"
            >Tài khoản sau khi khóa sẽ không thể sử dụng các chức năng của ứng
            dụng cho đến khi được mở lại. <br />
            Bạn có chắc chắn muốn mở lại tài khoản này không ?</span>
          </v-card-text
        >
        <v-card-actions style="background-color: #ddd">
          <v-spacer></v-spacer>
          <v-btn color="secondary" variant="flat" @click="dialog1 = false">
            Hủy
          </v-btn>
          <v-btn color="error" variant="flat" @click="handleToggle">
            Đồng ý
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
const props = defineProps({
  user: {
    type: Object,
  },
  callback: {
    type: Function,
  },
});

const dialog1 = ref(false);
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
const handleOpen = () =>{
  dialog1.value = true;
    
}
const handleToggle = () =>{
    if (props.user.is_active == 1) {
      props.user.is_active = 0;
    } else {
      props.user.is_active = 1;
  }
  props.callback();
  dialog1.value = false;
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
