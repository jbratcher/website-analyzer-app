/* eslint-disable */
<template>
  <!-- Links Wrapper -->
  <v-list class="py-0" :class="listClass" color="transparent" rounded>
    <!-- General links -->
    <v-list-item
      v-for="(item, i) in generalLinks"
      :key="i + `-${item.title}`"
      class="mb-0"
      :class="listItemClass"
      :to="item.to"
      router
      exact
    >
      <v-list-item-action v-if="item.icon" class="mr-2">
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="item.title" :class="listItemTitleClass" />
      </v-list-item-content>
    </v-list-item>

    <!-- login/register links -->
    <template v-if="!isLoggedIn">
      <v-list-item
        v-for="(item, j) in loggedOutLinks"
        :key="j + `-${item.title}`"
        :to="item.to"
        class="mb-0"
        :class="listItemClass"
        router
        exact
      >
        <v-list-item-action v-if="item.icon" class="mr-2">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" :class="listItemTitleClass" />
        </v-list-item-content>
      </v-list-item>
    </template>

    <!-- logout link -->
    <v-list-item
      v-if="isLoggedIn"
      class="mb-0"
      :class="listItemClass"
      @click="logout"
    >
      <v-list-item-action class="mr-2">
        <v-icon>{{ logoutIcon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title :class="listItemTitleClass"
          >Logout</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>

    <!-- Profile link -->
    <v-list-item
      v-if="isLoggedIn && user"
      :to="`/users/${user.id}`"
      class="mb-0"
      :class="listItemClass"
      dark
      router
      exact
    >
      <v-list-item-action class="mr-2">
        <v-icon>{{ accountIcon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title :class="listItemTitleClass"
          >Profile</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { mdiAccount, mdiLogout } from "@mdi/js";
export default {
  name: "MenuLinks",
  props: {
    generalLinks: {
      type: Array,
      default() {
        return [];
      }
    },
    loggedOutLinks: {
      type: Array,
      default() {
        return [];
      }
    },
    listClass: {
      type: String,
      default: ""
    },
    listItemClass: {
      type: String,
      default: ""
    },
    listItemTitleClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      accountIcon: mdiAccount,
      logoutIcon: mdiLogout
    };
  },
  computed: {
    ...mapState("authentication", ["isLoggedIn", "user"])
  },
  methods: {
    ...mapActions("authentication", ["logout", "setLoggedIn", "setUser"])
  }
};
</script>

<style lang="scss"></style>
