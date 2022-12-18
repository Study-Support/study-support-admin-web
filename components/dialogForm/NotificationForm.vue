<template>
  <v-dialog v-model="dialog" persistent>
    <v-btn
      icon="mdi-close-thick"
      @click="handleClose"
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
        v-bind="props"
        @click="dialog = true"
        style="margin-bottom:10px;margin:auto;color:#fff;background-color: blue; border-radius: 50% !important;"
        icon="mdi-clipboard-edit-outline"
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
        <span class="text-h5"> Thông báo mới :</span>
      </v-card-title>
      <form @submit.prevent="submit">
        <div style="text-align: center; padding: 16px">
          <v-text-field
            label="Tiêu đề"
            variant="underlined"
            background-color="light-blue"
            prepend-icon="mdi-account"
            v-model="notify.title"
          ></v-text-field>
          <v-textarea
            color="black"
            label="Thông báo"
            variant="underlined"
            prepend-icon="mdi-comment"
            v-model="notify.content"
          ></v-textarea>
          <div class="d-flex flex-wrap gap-2 flex-row-reverse"></div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="black"
            text
            @click="handleClose"
            variant="outlined"
            style="background-color: #fff; border: 1px solid blue"
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
</template>
<script setup>
const props = defineProps({
  notify: {
    type: Object,
  },
});
const dialog = ref(false);
const {
  data: dataPost,
  onFetchResponse: resPost,
  onFetchError: errPost,
  statusCode: codePost,
  put,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(`/notifications/${props.notify.id}`, { immediate: false });
// })(`/notifications/`, { immediate: false });
resPost(() => {
  // myUsers.value = dataPut.value.data.data;
});
errPost(() => {
//   if (codePost.value === getConfig("constants.statusCodes.validation")) {
//     validationErrorMessages.value = dataPost.value.meta.error_message;
//   }
//   return false;

console.log("loi");
});

const submit = () => {
 console.log(props.notify.content);

  put(props.notify).json().execute();
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
</style>
