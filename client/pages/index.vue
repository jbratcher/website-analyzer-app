<template>
  <v-container>
    <v-row>
      <v-col class="pa-0">
        <h1 class="display-1 mb-3">
          Website Reports for
          <span v-if="this.$auth.user">{{ this.$auth.user.full_name }}</span>
        </h1>
        <template v-if="ownedReports">
          <v-list
            flat
            :width="$breakpoint.mdAndUp ? '200px' : '100%'"
            :max-width="$breakpoint.mdAndUp ? '300px' : '100%'"
          >
            <v-list-item
              v-for="(report, index) in ownedReports"
              :key="`${report.name}-${index}`"
            >
              <v-list-item-content>
                <v-btn
                  class="my-3"
                  color="primary lighten-1"
                  :to="`/reports/${report.name}`"
                  width="100%"
                  >{{ report.name }}</v-btn
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState("reports", ["ownedReports"])
  },
  methods: {
    ...mapActions("reports", ["fetchOwnedReports"]),
    ...mapMutations("reports", ["setOwnedReports"])
  },
  created() {
    this.fetchOwnedReports();
  }
};
</script>

<style lang="scss"></style>
