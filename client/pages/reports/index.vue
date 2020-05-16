<template>
  <v-container>
    <v-row>
      <!-- Main -->
      <v-col class="pb-0">
        <!-- Create Report -->
        <h2 class="headline mb-3">Create a new report</h2>
        <CreateNewReport />
        <!-- Generated Reports -->
        <h2 v-if="isAuthenticated" class="headline mt-9 mb-3">
          Websites analyzed
        </h2>
        <h2 v-else class="headline mt-9 mb-0">Please login for reports</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <template>
          <v-data-table
            @click:row="logEvent"
            :headers="headers"
            :items="ownedReports"
            sort-by="name"
            class="elevation-1"
          >
            <template v-slot:item.report.totalScore="{ item }">
              <v-progress-circular
                :color="calcScoreColor(item.report.totalScore)"
                :value="normalizedScore(item.report.totalScore)"
                size="36"
                width="2"
                >{{ item.report.totalScore }}</v-progress-circular
              >
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon large @click="deleteReport(item.name)">
                {{ trashCanIcon }}
              </v-icon>
            </template>
            <template v-slot:no-data>
              <p>No reports available</p>
            </template>
          </v-data-table>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { mdiTrashCan } from "@mdi/js";
import CreateNewReport from "../../components/widgets/CreateNewReport";
import scoresMixin from "../../mixins/scoresMixin";
export default {
  components: {
    CreateNewReport
  },
  middleware: "auth",
  mixins: [scoresMixin],
  data() {
    return {
      trashCanIcon: mdiTrashCan,
      dialog: false,
      headers: [
        {
          text: "Website Name",
          align: "start",
          value: "name"
        },
        { text: "URL", value: "report.url" },
        { text: "Score", value: "report.totalScore" },
        { text: "Date", value: "created_at" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState("reports", ["ownedReports"])
  },
  methods: {
    ...mapActions("reports", ["deleteReports", "fetchOwnedReports"]),
    ...mapMutations("reports", ["setOwnedReports"]),
    deleteReport(reportName) {
      if (confirm("Are you sure you want to delete this report?")) {
        this.deleteReports(reportName);
      }
    },
    logEvent(event) {
      this.$router.replace(`/reports/${event.name}`);
    }
  },
  mounted() {
    this.fetchOwnedReports();
  }
};
</script>

<style lang="scss"></style>
