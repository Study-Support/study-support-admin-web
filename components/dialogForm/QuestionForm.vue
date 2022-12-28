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
        style="float: right; border-radius: 50% !important"
        color="success"
        icon="mdi-pencil"
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
        <span class="text-h5"> Chỉnh sửa câu hỏi :</span>
      </v-card-title>
      <form @submit.prevent="submit">
        <div style="text-align: center; padding: 16px">
          <v-text-field
            label="Câu hỏi"
            background-color="light-blue"
            prepend-icon="mdi-comment"
            v-model="question.content"
            variant="outlined"
            :rules="contentRules"
            :counter="500"
          ></v-text-field>
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
      </form>
    </v-card>
  </v-dialog>
</template>
<script setup>
const props = defineProps({
  question: {
    type: Object,
  },
});
const { $toast } = useNuxtApp();
const dialog = ref(false);
const contentRules = ref([
  (v) => !!v || "Nội dung thông báo là bắt buộc",
  (v) => v.length <= 500 || "Nội dung thông báo chỉ có tối đa 500 ký tự",
]);
const {
  data: dataQuestions,
  onFetchResponse: resQuestions,
  onFetchError: errQuestions,
  statusCode: codeQuestions,
  put,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(`/mentor-questions/${props.question.id}`, { immediate: false });

resQuestions(() => {
  $toast("Cập nhật câu hỏi thành công", "success", 1500);
});
errQuestions(() => {
  $toast("Cập nhật câu hỏi thất bại", "error", 1500);
});

const submit = () => {
  // console.log(props.question.content);
  if (props.question.content == "") {
    return;
  } else {
    handleClose();
    put(props.question).json().execute();
  }
};
const handleClose = () => {
  dialog.value = false;
};
</script>
<style scoped>
.v-card {
  width: 80vw;
}
</style>
