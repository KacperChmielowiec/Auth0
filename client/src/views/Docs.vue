<template>
  <div  class="flex w-full justify-center items-start min-h-screen bg-gray-100 p-6">
    <div v-if="!isForbidden && !error" class="max-w-5xl bg-white rounded-2xl shadow-lg p-6">
      <h1 class="text-2xl font-semibold text-center mb-6">
        Lista dokumentów PDF
      </h1>

      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="py-3 px-4 text-left rounded-tl-lg">Nazwa dokumentu</th>
            <th class="py-3 px-4 text-left">Autor</th>
            <th class="py-3 px-4 text-left">Data utworzenia</th>
            <th class="py-3 px-4 text-center rounded-tr-lg">Pobierz</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(doc, index) in docs"
            :key="index"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="py-3 px-4 text-sm text-gray-800">
              {{ doc.name }}
            </td>
            <td class="py-3 px-4 text-sm text-gray-600">
              {{ doc.author }}
            </td>
            <td class="py-3 px-4 text-sm text-gray-600">
              {{ doc.createdAt }}
            </td>
            <td class="py-3 px-4 text-center">
              <button
                class="text-blue-600 hover:text-blue-800 transition"
                title="Pobierz PDF"
              >
                <font-awesome-icon :icon="['fas', 'download']" size="lg" class="text-gray-800 cursor-pointer" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center w-full">
            <p class="text-red-500 mt-4 text-xl" v-if="isForbidden && !error" >You have no permission to this page</p>
            <p class="text-red-500 mt-4 text-xl" v-if="error" >Application could not fetch posts.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue';
import { useApi } from '../api/api';
const docs = ref([])
const isForbidden = ref(false)
const error = ref(false)
const { getAccessTokenSilently } = useAuth0()

onMounted(async () => {

    const token = await getAccessTokenSilently({aduience: "node-api"})
    const response = await useApi(token).getAuthDocs()

    if(response.status < 300)
    {   
        docs.value = response.data
    }
    else{
        if(response.status == 401 || response.status == 403) {
            isForbidden.value = true
        }
        else { 
            error.value = true 
        }
    }



})

</script>