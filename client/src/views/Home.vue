<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref } from 'vue'

import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const images = ref([])



const modules = [Navigation, Pagination];
</script>

<template>
  <div>
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      navigation
      pagination
      class="mySwiper"
    >
      <SwiperSlide class="bg-blue-100 flex items-center justify-center text-lg font-semibold">
        Slide 1
      </SwiperSlide>
      <SwiperSlide class="bg-green-100 flex items-center justify-center text-lg font-semibold">
        Slide 2
      </SwiperSlide>
      <SwiperSlide class="bg-pink-100 flex items-center justify-center text-lg font-semibold">
        Slide 3
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.mySwiper {
  width: 100%;
  height: 600px;
}
</style>
