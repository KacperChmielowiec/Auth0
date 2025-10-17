<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref, onMounted, watch } from 'vue'
import { useApi } from '../api/api'
import { Navigation, Pagination } from 'swiper/modules';
import { useAuth0 } from '@auth0/auth0-vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const { getAccessTokenSilently, isAuthenticated } = useAuth0()

const images = ref([])
const loading = ref(true)


const postsPerPage = 3;

const posts = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const isLoading = ref(false);
const noMore = ref(false);
const isForbidden = ref(true)

onMounted(async () => {
    const response = await  useApi().getSliderPhoto()
    if(response.status < 300)
    {
       images.value = response.data
    }
    loading.value = false

});

watch(isAuthenticated, (val) => {
   if(isAuthenticated.value)
    fetchNews()
})
  // 🔹 Funkcje pomocnicze
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (post) => {
    const raw = post.excerpt?.replace(/<[^>]+>/g, '') || 'Brak opisu...';
    return raw.substring(0, 150) + '...';
  };

  // 🔹 Pobieranie postów
  const fetchNews = async () => {
    if (isLoading.value) return;
    isLoading.value = true;
    isForbidden.value = false
    try {
      const token = await getAccessTokenSilently({audience: "node-api"})
      const response = await useApi(token).fetchNewsApi(postsPerPage,currentPage)
      if (!response.status > 200) {
        if(response.status == 401)
        {
           isForbidden.value = true
        }
        throw new Error(`Błąd HTTP: ${response.status}`);
      }
      if (currentPage.value === 1) {
        totalPages.value = parseInt(response.data.totalPages) || 0;
      }
      console.log("data", response)
      isForbidden.value = false
      const data = response.data;
      posts.value.push(...data.news);

      if (currentPage.value >= totalPages.value) {
        noMore.value = true;
      }

    } catch (err) {
      console.error('Błąd:', err);
      isForbidden.value = true

    } finally {
      isLoading.value = false
    }
  };

  // 🔹 "Pokaż więcej"
  const loadMore = () => {
    currentPage.value++;
    fetchNews();
  };

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
          :src="img.url"
          :alt="img.author"
          class="object-cover w-full h-full shadow"
        />
      </SwiperSlide>
    </Swiper>
  </div>
  <div class="px-4 py-8 mx-12 color-primary-light-bg">
    <h1 class="text-3xl font-bold text-left mb-8 mx-4">Aktualności</h1>

    <!-- Grid z postami -->
    <div
      id="postsGrid"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-4"
    >
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
      >
        <div v-if="post.image">
          <img
            :src="post.image"
            :alt="post.title.rendered"
            class="w-full h-48 object-cover rounded-t-lg"
          />
        </div>
        <div v-else class="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center text-gray-400">
          Brak obrazka
        </div>

        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2 line-clamp-2" v-html="post.title.rendered"></h3>
          <div class="text-sm text-gray-500 mb-3">{{ formatDate(post.date) }}</div>
          <p class="text-gray-600 mb-4 line-clamp-3">
            {{ getExcerpt(post) }}
          </p>
          <a
            :href="post.link"
            class="inline-block text-blue-600 font-medium hover:text-blue-800 transition duration-200"
          >
            Czytaj więcej →
          </a>
        </div>
      </div>
    </div>

    <!-- Sekcja skeletonów -->
    <div
      v-if="isLoading && !isForbidden"
      id="loadingSection"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
    >
      <div
        v-for="n in 3"
        :key="n"
        class="blog-post o-media rounded-lg shadow-md p-4 bg-white"
      >
        <div class="o-media__figure">
          <span class="skeleton-box" style="width:100px;height:80px;"></span>
        </div>
        <div class="o-media__body">
          <div class="o-vertical-spacing">
            <h3 class="blog-post__headline">
              <span class="skeleton-box" style="width:55%;"></span>
            </h3>
            <p>
              <span class="skeleton-box" style="width:80%;"></span>
              <span class="skeleton-box" style="width:90%;"></span>
              <span class="skeleton-box" style="width:83%;"></span>
              <span class="skeleton-box" style="width:80%;"></span>
            </p>
            <div class="blog-post__meta">
              <span class="skeleton-box" style="width:70px;"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Przyciski / komunikaty -->
    <div class="text-center">
      <button
        v-if="!isLoading && !noMore && !isForbidden"
        @click="loadMore"
        class="btn-primary-ripple"
      >
        Pokaż więcej
      </button>

      <div v-if="isLoading" class="lds-ellipsis">
        <div></div><div></div><div></div><div></div>
      </div>

      <p
        v-if="noMore && !isForbidden"
        class="text-gray-500 mt-4"
      >
        To już wszystkie aktualności.
      </p>
      <p
        v-if="isForbidden"
        class="text-gray-500 mt-4 text-xl"
      >
        You have to login to get acces to this resources.
      </p>
    </div>
  </div>
</template>
<style scoped>
.mySwiper {
  width: 100%;
  height: 600px;
}

.skeleton-box {
  display: inline-block;
  height: 1em;
  position: relative;
  overflow: hidden;
  background-color: #DDDBDD;
}
.skeleton-box::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
	background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0) 100%
  );
    content: '';
	animation: shimmer 2s infinite;
}

.blog-post__headline
 {
    font-size: 1.25em;
    font-weight: bold;
}
.blog-post__meta{
    font-size: 0.85em;
    color: #6b6b6b;
}
.o-media {
  display: flex;

}
.o-media__body{
	flex-grow: 1;
    margin-left: 1em;
}
.o-vertical-spacing > * + * {
  margin-top: 0.75em;
}

.o-vertical-spacing--l > * + * {
  margin-top: 2em;
}
.color-primary-bg{
	background-color: #25524a;
}
.color-primary-light-bg{
	background-color: #F5F5F5
}
.btn-primary-ripple{
	background-position: center;
	border: none;
	border-radius: 2px;
	padding: 12px 18px;
	font-size: 16px;
	text-transform: uppercase;
	cursor: pointer;
	color: white;
	background-color: #25524a;
	box-shadow: 0 0 4px #999;
	outline: none;
	transition: background 0.8s;
	}
.btn-primary-ripple:hover {
  background: #0c6b5a radial-gradient(circle, transparent 1%, #5fa397 1%) center/15000%;
}
.btn-primary-ripple:active {
  background-size: 100%;
  transition: background 0s;
}
.gallery a:hover{ 
	transform: translateY(-2px); 
	box-shadow: 0 10px 28px rgba(0,0,0,.12); 
}
.gallery a {
  width: 100%;
}
.gallery img{
	object-fit: cover;
    filter: saturate(1.02); 
	transition: transform .3s ease;
	width: 100%;
	height: 100%;
	height: auto; /* zachowuje proporcje */
	display: block; /* usuwa spacje pod obrazkiem */
}


.gallery a:hover img{ 
	transform: scale(1.03); 
}

.caption{
    position:absolute; inset:auto 0 0 0; padding:10px 12px;
    background: linear-gradient(to top, rgba(0,0,0,.5), transparent 70%);
    color:#fff; font-size:.9rem; line-height:1.2;
    opacity:0; transition:opacity .2s ease; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    pointer-events:none;
}
.gallery a:hover .caption{ opacity:1; }

/* Accessibility focus */
.gallery a:focus-visible{
    outline: 3px solid #4f46e5; outline-offset: 2px;
}
.img-wrapper {
    position: relative;
    display: inline-block;
    overflow: hidden;
    background-color: #d1d1d1ff;
}
.img-wrapper:not(.loaded)::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.4) 60%,
    rgba(255, 255, 255, 0) 100%
    );
    content: '';
	animation: shimmer 2s infinite;
}
/* Gdy obrazek się załaduje, ukrywamy skeleton */
.img-wrapper img {
    display: block;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.img-wrapper.loaded img {
    opacity: 1;
}

@keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
}

.main{
	min-height: 100vh;
}

</style>
