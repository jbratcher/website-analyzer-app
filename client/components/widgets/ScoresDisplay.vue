<template>
  <!-- Categories Score -->
  <v-card height="100%">
    <v-container class="pa-0">
      <v-row>
        <v-col v-for="(data, index) in data" :key="`${data.title}${index}`">
          <v-card
            class="d-flex flex-column align-center text-center"
            flat
            height="100%"
          >
            <v-card-text class="body-1">
              {{ data.title }}
            </v-card-text>
            <v-progress-circular
              class="display-1 mt-auto"
              :color="calcScoreColor(data.score)"
              :value="normalizedScore(data.score)"
              size="96"
              width="9"
              >{{ normalizedScore(data.score) }}</v-progress-circular
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import scoreMixin from "../../mixins/scoresMixin";
export default {
  name: "ScoresDisplay",
  props: {
    data: {
      type: [Object, Array]
    }
  },
  mixins: [scoreMixin]
};
</script>

<style></style>
