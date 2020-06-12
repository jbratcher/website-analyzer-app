i<template>
  <v-app>
    <!-- Header Area -->
    <!-- Main Navigation Bar -->
    <v-app-bar
      app
      color="white"
      elevation="1"
      hide-on-scroll
      light
      scroll-threshold="100"
    >
      <nuxt-link
        class="d-flex align-center"
        :class="$breakpoint.mdAndUp ? 'ml-6' : 'ml-2'"
        to="/"
      >
        <v-img
          alt="future lighthouse logo"
          src="/images/logo.svg"
          :max-width="$breakpoint.mdAndUp ? '1.67rem' : '2.75rem'"
        />
        <h1
          class="black--text d-flex font-weight-regular ml-2 compact-text"
          :class="
            $breakpoint.mdAndUp ? 'display-1 my-0' : 'display-2 mt-2 mb-0'
          "
        >
          <span class="primary--text">W</span>
          <span class="complimentary-color">A</span>
        </h1>
      </nuxt-link>
      <v-app-bar-nav-icon
        class="hidden-md-and-up ml-auto"
        @click.stop="drawer = !drawer"
        name="menu-open"
        x-large
      >
        <i aria-hidden="true" class="v-icon notranslate theme--dark">
          <v-icon>{{ menuIcon }}</v-icon>
        </i>
      </v-app-bar-nav-icon>
      <MenuLinks
        :general-links="generalLinks"
        :logged-out-links="loggedOutLinks"
        list-class="d-md-flex justify-end hidden-md-and-down ml-auto"
        list-item-class="mx-1"
      />
    </v-app-bar>
    <!-- Mobile Navigation -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      color="rgba(0,0,0,0.8)"
      dark
      fixed
      right
    >
      <MenuLinks
        :general-links="generalLinks"
        :logged-out-links="loggedOutLinks"
        list-class="d-flex flex-column my-6 mx-3"
        list-item-class="my-3"
        listItemTitleClass="title"
      />
    </v-navigation-drawer>
    <!-- Nuxt content -->
    <v-content>
      <nuxt />
    </v-content>
    <!-- Footer Area -->
    <v-divider />
    <v-lazy>
      <v-footer
        class="d-flex flex-column align-center my-12 pt-12 py-6 px-5"
        color="transparent"
      >
        <h2
          class="mb-3"
          :class="{
            headline: $breakpoint.mdAndUp,
            title: $breakpoint.smAndDown
          }"
        >
          {{ appTitle }}
        </h2>
        <p
          class="px-6 text-center"
          :class="{
            'subtitle-1': $breakpoint.mdAndUp,
            'subtitle-2': $breakpoint.smAndDown
          }"
        >
          {{ appDescription }}
        </p>
        <nav>
          <ul class="d-flex flex-wrap py-3 px-0">
            <li v-for="(link, i) in generalLinks" :key="i + link.title">
              <v-btn :href="link.to" :name="link.title" text rounded>
                {{ link.title }}
              </v-btn>
            </li>
          </ul>
        </nav>
        <v-container class="text-center">
          {{ new Date().getFullYear() }}&nbsp;-&nbsp;
          <strong>{{ appTitle }}</strong>
        </v-container>
      </v-footer>
    </v-lazy>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import MenuLinks from "../components/MenuLinks.vue";
import {
  mdiAccountPlus,
  mdiArrowExpandLeft,
  mdiArrowExpandRight,
  mdiFolderPlus,
  mdiLogin,
  mdiMenu,
  mdiMenuOpen,
  mdiViewDashboard
} from "@mdi/js";
export default {
  components: {
    MenuLinks
  },
  data() {
    return {
      appTitle: process.env.title,
      appDescription: process.env.description,
      arrowExpandRight: mdiArrowExpandRight,
      arrowExpandLeft: mdiArrowExpandLeft,
      dashboardLinks: [
        { title: "Dashboard", icon: mdiViewDashboard, to: "/reports" }
      ],
      drawer: false,
      generalLinks: [
        {
          title: "Dashboard",
          to: "/reports"
        },
        {
          title: "About",
          to: "/about"
        }
      ],
      loggedOutLinks: [
        {
          icon: mdiLogin,
          title: "Login",
          to: "/login"
        },
        {
          icon: mdiAccountPlus,
          title: "Register",
          to: "/register"
        }
      ],
      navBelowFold: false,
      menuIcon: mdiMenu,
      mini: true,
      miniVariant: false,
      right: null,
      sidedrawer: true
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
    formattedAppTitle() {
      if (this.appTitle.length > 10) {
        return this.appTitle.substring(0, 10) + "...";
      } else {
        return this.appTitle;
      }
    }
  }
};
</script>

<style lang="scss">
// global

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body,
.v-application {
  color: #525f7f;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
  box-sizing: border-box;
  min-height: 100vh;
  overflow-x: hidden;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  word-break: keep-all;
  word-spacing: 1px;
}

a {
  text-decoration: none;
}

ol,
ul {
  list-style-type: none;
}

// main nav

.v-toolbar__content {
  flex: 1 1 auto;
}

.v-toolbar.v-toolbar--prominent {
  transition: background-color 0.5s ease;
  .v-toolbar__content {
    align-content: baseline;
    padding: 0.25rem 0.75rem;
  }
}

// side menu
.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

// footer

.v-footer {
  ul {
    list-style-type: none;
  }
}

.v-application {
  .v-card__title,
  .v-card__subtitle,
  .v-card__text {
    word-break: keep-all;
  }

  article > * + * {
    margin-top: 1rem;
  }

  // global overrides
  .brand-margin {
    margin-left: 4rem;
  }

  .complimentary-color {
    color: #b5b13f;
  }

  .compact-text {
    letter-spacing: 1px;
  }
}

/* Remove all animations and transitions for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

// global classes
.full-height {
  min-height: 100%;
  height: 100%;
}
</style>
