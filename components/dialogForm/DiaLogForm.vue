<template>
  <v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ props }">
      <v-btn
        tile
        v-bind="props"
        @click="dialog = true"
        style="float: right"
        color="success"
      >
        <v-icon left> mdi-pencil </v-icon>
        Edit
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
            text
            @click="dialog = false"
            type="submit"
            variant="flat"
            color="error"
          >
          <v-icon>mdi-trash-can-outline</v-icon>Xoá
          </v-btn>
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
</script>
<style scoped>
.v-card {
    width: 80vw;
  }
</style>
