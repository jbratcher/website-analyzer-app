<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>{{ allReports[1].name }}</h2>
        <p>{{ allReports[1].url }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState("reports", ["allReports"])
  },
  methods: {
    ...mapActions("reports", ["fetchAllReports"]),
    ...mapMutations("reports", ["setAllReports"])
  },
  created() {
    console.log(this.$route.params.name);
    this.fetchAllReports(this.$route.params.name);
  }
};
</script>

<style lang="scss"></style>
