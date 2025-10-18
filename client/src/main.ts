import App from "./App.vue";
import { createApp } from "vue";
import { createRouter } from "./router";
import { createAuth0 } from "@auth0/auth0-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faUser, faPowerOff, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import authConfig from "../auth_config.json";

const app = createApp(App);

library.add(faLink, faUser, faPowerOff, faDownload);


app
  .use(createRouter(app))
  .use(
    createAuth0({
      domain: authConfig.domain,
      clientId: authConfig.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'node-api', // 👈 to jest IDENTIFIER z panelu API Auth0
        scope: 'openid profile email', // 👈 opcjonalne, ale zalecane,
        cacheLocation: "localstorage",
        useRefreshTokens: true, // automatyczne odświeżanie
      }
    })
  )
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
