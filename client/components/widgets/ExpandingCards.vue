<template>
  <!-- Expanding Cards -->
  <v-row align="stretch">
    <v-col
      v-for="(data, index) in data"
      :key="`${data.title}${index}`"
      :class="`${index}`"
      align-self="stretch"
      cols="12"
      sm="6"
      md="3"
    >
      <v-expansion-panels class="full-height">
        <v-expansion-panel>
          <v-expansion-panel-header
            class="flex-column icon-center"
            :expandIcon="chevronDown"
          >
            <h3 class="mb-3">
              {{ titleCaseString(data.id) }}
            </h3>
            <v-progress-circular
              class="title"
              :color="calcScoreColor(data.score)"
              :value="normalizedScore(data.score)"
              size="64"
              width="6"
              >{{ normalizedScore(data.score) }}</v-progress-circular
            >
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p class="font-weight-bold">
              {{ data.title }}
            </p>
            <p>{{ data.description }}</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
import { titleCase, unhyphenate } from "../../utils/str-utils";
import { mdiChevronDown } from "@mdi/js";
import scoreMixin from "../../mixins/scoresMixin";

export default {
  name: "ExpandingCards",
  props: {
    data: {
      type: [Object, Array]
    }
  },
  mixins: [scoreMixin],
  data() {
    return {
      chevronDown: mdiChevronDown
    };
  },
  methods: {
    titleCaseString(string) {
      string = unhyphenate(string);
      string = titleCase(string);
      return string;
    }
  }
};
</script>

<style>
.v-expansion-panel-header.icon-center > .v-expansion-panel-header__icon {
  margin: 0;
}
</style>
