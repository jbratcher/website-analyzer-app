<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          v-for="(actionStep, index) in actionStepsList"
          :key="`${actionStep.title.substring(0, 8)}${index}`"
        >
          <v-card-title>{{ actionStep.title }}</v-card-title>
          <v-card-subtitle>{{ actionStep.description }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState("reports", ["actionStepsList"])
  },
  methods: {
    ...mapActions("reports", ["fetchActionStepsList"]),
    ...mapMutations("reports", ["setActionStepsList"])
  },
  created() {
    this.fetchActionStepsList(this.$route.params.name);
  }
};
</script>

<style lang="scss"></style>
