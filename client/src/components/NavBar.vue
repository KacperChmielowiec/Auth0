<template>
  <div class="nav-container mb-3">
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="container">
        <div class="navbar-brand logo"></div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
          </ul>
          <ul class="navbar-nav d-none d-md-block">
            <li v-if="!isAuthenticated && !isLoading" class="nav-item">
              <button
                id="qsLoginBtn"
                class="btn btn-primary btn-margin"
                @click.prevent="login"
              >Login</button>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <button
                id="fetchbtn"
                class="btn btn-primary btn-margin"
                @click.prevent="fetchPost"
              >Authorize</button>
            </li>
            <li class="nav-item dropdown" v-if="isAuthenticated">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="profileDropDown"
                data-toggle="dropdown"
              >
                <img
                  :src="user.picture"
                  alt="User's profile picture"
                  class="nav-user-profile rounded-circle"
                  width="50"
                />
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <div class="dropdown-header">{{ user.name }}</div>
                <router-link to="/profile" class="dropdown-item dropdown-profile">
                  <font-awesome-icon class="mr-3" icon="user" />Profile
                </router-link>
                <a id="qsLogoutBtn" href="#" class="dropdown-item" @click.prevent="logout">
                  <font-awesome-icon class="mr-3" icon="power-off" />Log out
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
export default {
  name: "NavBar",
  setup() {
    const { 
      getAccessTokenSilently, 
      loginWithRedirect,
      isAuthenticated,
      isLoading,
      user,
      logout,
    } = useAuth0();
    
    return {
      isAuthenticated: isAuthenticated,
      isLoading: false,
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
      async fetchPost() {
        const token = await getAccessTokenSilently({
          audience: "node-api"
          });
        const response = await fetch("http://localhost:8080/posts", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json()
        console.log(data)
      }
    }
  }
};
</script>

