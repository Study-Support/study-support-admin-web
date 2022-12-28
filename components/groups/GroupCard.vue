<template>
  <NuxtLink
    :to="{ path: `/groups/${group.id}/${messages[group.status]}` }"
    class="full"
  >
    <div class="image">
      <img :src="`${group.image_url}`" alt="" />
      <!-- <img :src="`${group.img}`" alt=""/> -->
    </div>
    <span v-if="group.self_study === 1" class="statusTag">Tự học</span>
    <span v-if="group.self_study === 0" class="statusTag">Tìm Mentor</span>
    <div class="content m-3">
      <p class="">Khoa {{ group.faculty }}</p>
      <h5>{{ group.subject }}</h5>
      <p class="">{{ group.topic }}</p>
      <div style="display: flex; justify-content: space-between">
        <p class="quantity">{{ group.quantity }} Thành viên</p>
        <p class="quantity1" v-if="group.status === 2">
          {{ group.mentorWaiting.length }} mentor chờ duyệt
        </p>
      </div>
    </div>
    {{}}
  </NuxtLink>
</template>
<script setup>
const props = defineProps({
  group: {
    type: Object,
  },
});
var messages = {
  1: "recruit-member",
  2: "recruit-mentor",
  3: "is-active",
  4: "is-close",
};
</script>
<style scoped>
* {
  color: black;
  font-family: "Roboto Slab", "Times New Roman", serif;
}
.full {
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  display: block;
  height: 100%;
  /* padding-bottom: 40px; */
  text-decoration: none;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;
}

.full:hover img {
  transform: scale(1.05);
  border-radius: 10px 10px 0 0;
}
.image {
  height: 200px;
  overflow: hidden;
}
.image img {
  width: 100%;
  transition: 0.3s ease;
  height: 100%;
}
.statusTag {
  position: absolute;
  top: 0;
  right: 0;
  color: #e0e0e0;
  background-color: rgb(1, 104, 177);
  padding: 4px 5px 4px 5px;
  font-size: 14px;
}
.content > p:first-child {
  margin: 0 0 5px;
  color: #aaa;
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.quantity {
  padding: 8px 0 0;
  /* margin-right: 15px; */
  border-top: 1px solid #e0e0e0;
  font-size: 13px;
  align-self: center;
  display: block;
  width: 90%;
  /* margin-bottom: 13px; */
}
.quantity1 {
  padding: 8px 0 0;
  border-top: 1px solid #e0e0e0;
  font-size: 13px;
  align-self: center;
  display: block;
  width: 90%;
  text-align: right;
}
h5 {
  font-size: 18px;
  line-height: 20px;
  /* height: 40px; */
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
