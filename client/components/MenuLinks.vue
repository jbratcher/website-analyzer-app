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
  </v-list>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "MenuLinks",
  props: {
    generalLinks: {
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
  }
};
</script>

<style lang="scss">
</style>
