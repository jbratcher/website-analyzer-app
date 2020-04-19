i<template>
  <v-app>
    <!-- Header Area -->
    <!-- Main Navigation Bar -->
    <v-app-bar app color="white" elevation="1" light short>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
        name="menuopen"
        x-large
      />
      <MenuLinks
        :general-links="generalLinks"
        list-class="d-md-flex hidden-md-and-down"
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
        list-class="d-flex flex-column my-6 mx-3"
        list-item-class="my-3"
        listItemTitleClass="title"
      />
    </v-navigation-drawer>
    <!-- Main Dashboard Navigation -->
    <v-navigation-drawer app :permanent="$breakpoint.smAndUp ? true : false">
      <v-list-item id="dashboard" class="py-1" to="/">
        <v-list-item-content>
          <v-list-item-title class="black--text">Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in dashboardLinks"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
            'display-1': $breakpoint.mdAndUp,
            headline: $breakpoint.smAndDown
          }"
        >
          {{ appTitle }}
        </h2>
        <p
          class="px-6 text-align-center"
          :class="{
            headline: $breakpoint.mdAndUp,
            'subtitle-1': $breakpoint.smAndDown
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
import MenuLinks from "../components/MenuLinks.vue";

export default {
  components: {
    MenuLinks
  },
  data() {
    return {
      dashboardLinks: [
        { title: "All Reports", icon: "mdi-view-dashboard", to: "/reports" },
        { title: "Raw", icon: "mdi-format-list-bulleted", to: "/reports/raw" },
        { title: "Analyzed", icon: "mdi-magnify", to: "/reports/analyzed" },
        {
          title: "Action Steps",
          icon: "mdi-clipboard-list",
          to: "/reports/action-steps"
        }
      ],
      right: null,
      appTitle: process.env.title,
      appDescription: process.env.description,
      drawer: false,
      generalLinks: [
        {
          title: "Reports",
          to: "/reports"
        },
        {
          title: "Raw",
          to: "/reports/raw"
        },
        {
          title: "Analyzed",
          to: "/reports/analyzed"
        },
        {
          title: "Action Steps",
          to: "/reports/action-steps"
        },
        {
          title: "About",
          to: "/about"
        }
      ],
      miniVariant: false,
      navBelowFold: false
    };
  },
  computed: {
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

// main nav
#brand {
  text-decoration: none;
}

.v-toolbar.v-toolbar--prominent {
  transition: background-color 0.5s ease;
  .v-toolbar__content {
    align-content: baseline;
    padding: 0.25rem 0.75rem;
  }
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
}

#dashboard.v-list-item--link:before {
  background-color: transparent;
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

// global shaped sections

.diagonal-upper-right {
  position: relative;
  background-color: transparent;

  &::before {
    content: "";
    background-color: #f6f9fc;
    position: absolute;
    top: -50px;
    left: 0;
    width: 100%;
    height: calc(100% + 100px);
    clip-path: polygon(0 5%, 100% 0, 100% 95%, 0 100%);
  }

  & > .row {
    position: relative;
    z-index: 1;
  }
}
</style>
