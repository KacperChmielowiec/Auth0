<template>
  <div class="flex justify-center mt-10">
    <div class="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
      
      <!-- Profile Header -->
      <div class="flex flex-col md:flex-row items-center md:items-start mb-6">
        <img
          :src="user?.picture"
          alt="User's profile picture"
          class="rounded-full w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-0 md:mr-6 object-cover"
        />
        <div class="text-center md:text-left">
          <h2 class="text-2xl font-semibold">{{ user?.name }}</h2>
          <p class="text-gray-500">{{ user?.email }}</p>
        </div>
      </div>

      <!-- User Details Table -->
      <table class="w-full table-auto border-collapse border border-gray-200">
        <tbody>
          <tr v-for="(value, key) in user" :key="key" class="border-b border-gray-200 hover:bg-gray-50">
            <th class="text-left px-4 py-2 font-medium text-gray-700">{{ key }}</th>
            <td class="px-4 py-2 text-gray-800 break-words">{{ value }}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: "ProfileView",
  setup() {
    const auth0 = useAuth0();
    
    return {
      user: auth0.user,
    };
  }
};
</script>

<style>
/* opcjonalnie możesz dodać responsywne dopasowanie */
</style>
