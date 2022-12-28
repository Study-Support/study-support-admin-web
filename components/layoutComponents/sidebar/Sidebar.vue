<script setup lang="ts">
import { ref, watch } from "vue";
import sidebarItems from "./sidebarItems";

const sidebarMenu = ref(sidebarItems);

const { deleteToken } = useToken();
const { onFetchResponse, post } = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})("/logout", { immediate: false });

onFetchResponse(() => {
  deleteToken();
  return navigateTo({ name: "login" });
});

const logout = () => {
  post().json().execute();
};
</script>

<template>
  <div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div class="scrollnavbar">
      <div class="profile">
        <div class="profile-pic">
          <v-avatar size="50" color="black">
            <span class="text-h6">SA</span>
          </v-avatar>
        </div>
        <div class="profile-name">
          <h5>SystemAdmin</h5>
        </div>
      </div>
      <v-list class="pa-4">
        <!-- ---------------------------------------------- -->
        <!---Menu Loop -->
        <!-- ---------------------------------------------- -->
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!-- ---------------------------------------------- -->
          <!---Single Item-->
          <!-- ---------------------------------------------- -->
          <v-list-item :to="item.to" rounded="lg" class="mb-1">
            <v-list-item-avatar start class="v-list-item-avatar--start">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
      <v-btn @click="logout" style="width: 90%; margin: auto" color="success">
        <v-icon>mdi-logout</v-icon>Đăng xuất</v-btn
      >
    </div>
  </div>
</template>
<style scoped>
.profile-pic {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
