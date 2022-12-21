<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import Sidebar from "~~/components/layoutComponents/sidebar/Sidebar.vue";
import Header from "~~/components/layoutComponents/header/Header.vue";
import "@fontsource/love-ya-like-a-sister";
useMeta({
  title: "Study Support",
});
const drawer = ref(undefined || false);
const innerW = window.innerWidth;
const { mdAndUp, mdAndDown } = useDisplay();
onMounted(() => {
  if (innerW < 950) {
    drawer.value = !drawer.value;
  }
});
</script>
<template>
  <div>
    <v-app>
      <v-app-bar elevation="0" color="primary">
        <div class="pe-5">
          <NuxtLink to="/" class="d-flex text-decoration-none">
            <img src="/images/logos/white-logo-icon.svg" />
            <h1 class="Logo">Study With Us</h1>
          </NuxtLink>
        </div>
        <v-app-bar-nav-icon class="" @click="drawer = !drawer" />
        <v-spacer />
        <!-- ---------------------------------------------- -->
        <!-- User Profile -->
        <!-- ---------------------------------------------- -->
        <Header />
      </v-app-bar>
      <v-main>
        <!-- ---------------------------------------------- -->
        <!---Sidebar -->
        <!-- ---------------------------------------------- -->
        <v-navigation-drawer
          left
          :permanent="mdAndUp"
          elevation="10"
          app
          :temporary="mdAndDown"
          v-model="drawer"
          expand-on-hover
        >
          <Sidebar />
        </v-navigation-drawer>
        <v-container fluid class="page-wrapper">
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<style scoped>
.Logo{
  font-family: "Love Ya Like A Sister";
  text-decoration: none;
  color: #fff;
  padding-left:20px;
}
.NuxtLink{
  text-decoration: none;
}
</style>
