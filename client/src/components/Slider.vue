<template>
  <div class="relative w-full flex justify-center items-center">
    <div v-if="isLoading" class="w-full h-[600px] bg-gray-400 flex items-center justify-center">
      <div class="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <Swiper
      v-else
      :modules="modules"
      :slides-per-view="1"
      :space-between="30"
      navigation
      pagination
      class="mySwiper"
    >
      <SwiperSlide
        v-for="img in images"
        :key="img.id"
        class="flex items-center justify-center"
      >
        <img
          :src="img.url"
          :alt="img.author"
          class="object-cover w-full h-full shadow"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = [Navigation, Pagination];

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  }
})

</script>
<style>
.mySwiper {
  width: 100%;
  height: 600px;
}
</style>