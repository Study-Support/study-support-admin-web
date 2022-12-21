<template>
    <v-dialog v-model="dialog1" persistent>
      <v-btn
        icon="mdi-close-thick"
        @click="dialog1 = false"
        style="
          position: absolute;
          right: 10px;
          top: 10px;
          z-index: 10;
          background-color: #fff;
          color: red;
          box-shadow: none;
          border-radius: 50% !important;
        "
      ></v-btn>
      <template v-slot:activator="{ props }">
        <v-btn
          dark
          v-bind="props"
          @click="dialog1 = true"
          variant="flat"
          color="error"
          style="margin-left:14px;color:#fff;background-color: red; border-radius: 50% !important;"
          icon="mdi-delete-outline"
        >
        </v-btn>
      </template>
      <v-card style="margin: auto">
        <v-card-title
          style="padding: 16px 0 16px 16px; border-bottom: 1px solid #ddd"
          class="text-h5"
        >
          <v-icon>mdi-trash-can-outline</v-icon>
          Xóa câu hỏi
        </v-card-title>
        <v-card-text style="display: flex; align-item: center">
          <!-- <v-icon style="font-size: 60px; color: red; margin-right: 10px"
            >mdi-account-lock</v-icon
          > -->
          <div class="mb-3 col-12 mb-0">
          <div class="alert alert-warning">
            <h6 class="alert-heading fw-bold mb-1">
              Bạn có chắc rằng bạn muốn xóa câu hỏi này?
            </h6>
            <p class="mb-0">
              Sau khi bạn xóa câu hỏi này, bạn sẽ không thể quay lại. Hãy đảm
              bảo rằng bạn đã chắc chắn.
            </p>
          </div>
        </div>
        </v-card-text>
        <v-card-actions style="border-top: 1px solid #ddd; padding: 16px">
          <v-spacer></v-spacer>
          <v-btn color="secondary" variant="flat" @click="dialog1 = false">
            Hủy
          </v-btn>
          <v-btn color="error" variant="flat" @click="deleteQuestion"> Xóa </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  <script setup>
  const props = defineProps({
    question: {
      type: Object,
    },
    callback:{
      type: Function,
    }
  });
  const dialog1 = ref(false);
  const {
    data: dataDeleteQuestion,
    onFetchResponse: resDeleteQuestion,
    onFetchError: errDeleteQuestion,
    delete: delQuestion,
  } = useFetchApi({
    requireAuth: true,
    disableHandleErrorUnauthorized: true,
  })(`/mentor-questions/${props.question.id}`, { immediate: false });
  resDeleteQuestion(() => {});
  errDeleteQuestion(() => {});
  const deleteQuestion = async () => {
    dialog1.value = false;
    await delQuestion().json().execute();
    await props.callback();
  };
  </script>
  
  <style scoped>
  .v-card {
    width: 60vw;
  }
  </style>
  