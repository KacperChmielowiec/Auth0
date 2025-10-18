<template>
<nav class="relative bg-gray-800">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button type="button" command="--toggle" commandfor="mobile-menu" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
          <span class="absolute -inset-0.5"></span>
          <span class="sr-only">Open main menu</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 in-aria-expanded:hidden">
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 not-in-aria-expanded:hidden">
            <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex shrink-0 items-center">
          <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" class="h-8 w-auto" />
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
            <a href="#" aria-current="page" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Dashboard</a>
            <RouterLink to="/profile" :class="{ 'pointer-events-none opacity-50': !isAuthenticated }" class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/5 hover:text-white">Profile</RouterLink>
            <RouterLink to="/posts" :class="{ 'pointer-events-none opacity-50': !isAuthenticated }" class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/5 hover:text-white">Posts</RouterLink>
            <RouterLink to="/docs" :class="{ 'pointer-events-none opacity-50': !isAuthenticated }" class="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/5 hover:text-white">Docs</RouterLink>
          </div>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <el-dropdown class="relative ml-3">
          <div v-if="isAuthenticated" class="flex gap-x-8 items-center">
          <span class="text-white font-semibold">{{ user?.name }}</span>
          <div class="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            <span class="absolute -inset-1.5"></span>
            <span class="sr-only">Open user menu</span>
            <img width="50" :src="user?.picture"/>
          </div>
          <button @click.prevent="logout" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <span>Logout</span>
          </button>
          </div>
          <div v-else class="flex gap-2">
            <button @click.prevent="login" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <span>Login</span>
            </button>
            <button @click.prevent="signup" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <span>Sign in</span>
            </button>
          </div>

          <el-menu anchor="bottom end" popover class="w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
            <RouterLink to="/profile" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:outline-hidden">Your profile</RouterLink>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:outline-hidden">Settings</a>
            <a href="#" @click.prevent="logout" class="block px-4 py-2 text-sm text-gray-700 focus:bg-gray-100 focus:outline-hidden">Sign out</a>
          </el-menu>
        </el-dropdown>
      </div>
    </div>
  </div>

  <el-disclosure id="mobile-menu" hidden class="block sm:hidden">
    <div class="space-y-1 px-2 pt-2 pb-3">
      <a href="#" aria-current="page" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">Dashboard</a>
    </div>
  </el-disclosure>
</nav>
</template>

<script lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import { RouterLink } from 'vue-router';
export default {
  name: "NavBar",
  setup() {
    const { 
      loginWithRedirect,
      isAuthenticated,
      user,
      logout,
    } = useAuth0();
    
    return {
      isAuthenticated: isAuthenticated,
      user: user,
      login() {
        loginWithRedirect();
      },
      logout() {
        logout({
          logoutParams: {
            returnTo: window.location.origin
          }
        });
      },
      signup() {
        loginWithRedirect({
          authorizationParams: {
            screen_hint: 'signup'
          }
        });
      },
    }
  }
};
</script>

