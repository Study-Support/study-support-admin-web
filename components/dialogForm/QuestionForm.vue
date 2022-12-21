<template>
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
</template>
<script setup>
const props = defineProps({
  question: {
    type: Object,
  },
});
const dialog = ref(false);
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
// })(`/notifications/`, { immediate: false });
resQuestions(() => {
  // myUsers.value = dataPut.value.data.data;
});
errQuestions(() => {
  //   if (codeQuestions.value === getConfig("constants.statusCodes.validation")) {
  //     validationErrorMessages.value = dataQuestions.value.meta.error_message;
  //   }
  //   return false;

  console.log("loi");
});

const submit = () => {
  console.log(props.question.content);

  put(props.question).json().execute();
};
</script>
<style scoped>
.v-card {
  width: 80vw;
}
</style>
