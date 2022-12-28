<template>
  <NuxtLink :to="{ path: `/mentors/${mentor.id}` }" class="full">
    <!-- <NuxtLink :to="{ path: `/manage-groups/${group.id}` }" class="full"> -->
    <div class="box">
      <img :src="`${mentor.avatar_url}`" alt="" class="img" />
      <div class="info">
        <div class="title">
          {{ mentor.full_name }}
        </div>
        <span class="desc">Khoa:{{ mentor.faculty }}</span>
        <div class="share">
          <span v-if="mentor.rating_score != null"
            >{{ mentor.rating_score }}/10</span
          >
          <span v-if="mentor.rating_score == null"
            >Mentor chưa được đánh giá</span
          >
          <!-- <span>{{ mentor.rating_score.slice(0, 3) }}/10</span> -->
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
const props = defineProps({
  mentor: {
    type: Object,
  },
});
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: all 0.2s linear;
  font-family: Arial, Helvetica, sans-serif;
}
.full {
  text-decoration: none;
}
.box {
  height: 360px;
  width: 100%;
  border: 8px solid #fff;
  box-shadow: 0 3px 5px #000;
  overflow: hidden;
}

.box:hover .info {
  bottom: 127px;
  background: #fff;
}

.box:hover .img {
  transform: scale(1.05);
}

.img {
  height: 100%;
  width: 100%;
  object-fit: center;
}

.info {
  text-align: center;
  background-color: #fff;
  position: relative;
  bottom: 40px;
}

.title {
  padding: 10px 0;
  font-size: 20px;
  color: #333;
  text-transform: capitalize;
}

.desc {
  font-size: 14px;
  color: #000;
}

.share {
  margin-top: 14px;
  border-top: 1px solid #4444;
  padding: 7px;
}
</style>
