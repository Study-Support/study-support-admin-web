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
        style="margin-left:auto;margin-right:auto;margin-top:10px;color:#fff;background-color: red; border-radius: 50% !important;"
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
        Xóa thông báo
      </v-card-title>
      <v-card-text style="display: flex; align-item: center">
        <!-- <v-icon style="font-size: 60px; color: red; margin-right: 10px"
          >mdi-account-lock</v-icon
        > -->
        <div
          style="
            padding: 16px 20px;
            border: 1px solid #ea9595;
            width: 100%;
            background-color: #f2dede;
            color: red;
            margin-bottom: 40px;
            margin-top: 20px;
            border-radius: 3px;
            font-size: 16px;
            font-weight: 600;
          "
        >
          <span>Bạn có chắc chắn muốn xóa thông báo này chứ ? </span>
        </div>
      </v-card-text>
      <v-card-actions style="border-top: 1px solid #ddd; padding: 16px">
        <v-spacer></v-spacer>
        <v-btn color="secondary" variant="flat" @click="dialog1 = false">
          Hủy
        </v-btn>
        <v-btn color="error" variant="flat" @click="deleteNotify"> Xóa </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
const props = defineProps({
  notify: {
    type: Object,
  },
  callback:{
    type: Function,
  }
});
const dialog1 = ref(false);
const {
  data: dataDeletePost,
  onFetchResponse: resDeletePost,
  onFetchError: errDeletePost,
  delete: delPost,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(`/notifications/${props.notify.id}`, { immediate: false });
resDeletePost(() => {});
errDeletePost(() => {});
const deleteNotify = () => {
  delPost().json().execute();
  props.callback();
  dialog1.value = false;
};
</script>

<style scoped>
.v-card {
  width: 60vw;
}
</style>
