<template>
  <v-container>
    <v-row>
      <v-col class="pa-0">
        <h1 v-if="this.$auth.user" class="display-1 mb-3">
          Website Reports for {{ this.$auth.user.full_name }}
        </h1>
        <h1 v-else>Please login for reports</h1>
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
                  router
                  exact
                  width="100%"
                  >{{ report.name }}</v-btn
                >
              </v-list-item-content>

              <v-list-item-action>
                <v-btn @click="deleteReport(report.name)" icon>
                  <v-icon large>{{ trashCanIcon }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { mdiTrashCan } from "@mdi/js";
export default {
  data() {
    return {
      trashCanIcon: mdiTrashCan
    };
  },
  computed: {
    ...mapState("reports", ["ownedReports"])
  },
  methods: {
    ...mapActions("reports", ["deleteReports", "fetchOwnedReports"]),
    ...mapMutations("reports", ["setOwnedReports"]),
    deleteReport(reportName) {
      if (confirm("Are you sure you want to delete this report?")) {
        this.deleteReports(reportName);
      }
    }
  },
  created() {
    this.fetchOwnedReports();
  }
};
</script>

<style lang="scss"></style>
