<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref, onMounted } from 'vue'

import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const images = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('https://picsum.photos/v2/list?page=1&limit=5');
    const data = await res.json();
    images.value = data;
  } catch (error) {
    console.error('Błąd pobierania zdjęć:', error);
  } finally {
    loading.value = false;
  }
});

const modules = [Navigation, Pagination];
</script>

<template>
  <div class="relative w-full flex justify-center items-center">
    <!-- 🔄 Loader -->
    <div v-if="loading" class="w-full h-[600px] bg-gray-400 flex items-center justify-center">
      <!-- prosty spinner Tailwind -->
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
          :src="img.download_url"
          :alt="img.author"
          class="object-cover w-full h-full shadow"
        />
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
