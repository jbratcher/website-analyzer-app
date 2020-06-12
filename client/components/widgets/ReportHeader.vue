<template>
  <v-container class="pa-0" fluid>
    <!-- Report Score Header View-->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-container class="pa-0">
            <v-row>
              <v-col class="d-flex">
                <v-card class="px-3" flat
                  ><b>Report:</b> {{ rawReport.name }}</v-card
                >
                <v-card class="px-3" flat
                  ><b>Url:</b> {{ rawReport.requestedUrl }}</v-card
                >
                <v-card class="px-3" flat
                  ><b>Created:</b> {{ formattedDateTime }}</v-card
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card
                  v-if="rawReport && rawReport.userAgent"
                  class="px-3 caption"
                  flat
                  ><b>Browsers:</b> {{ formattedUserAgent }}</v-card
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { titleCase, unhyphenate } from "../../utils/str-utils";
export default {
  name: "ReportHeader",
  props: {
    rawReport: {
      type: Object,
      default: () => {}
    },
    rawReportMeta: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    formattedDateTime() {
      if (this.rawReportMeta && this.rawReportMeta.created_at) {
        const rawDateTime = new Date(
          this.rawReportMeta.created_at
        ).toLocaleString();
        const convertedDateTime = rawDateTime.replace(/\([^()]*\)/g, "");
        return convertedDateTime;
      }
    },
    formattedUserAgent() {
      if (this.rawReport && this.rawReport.userAgent) {
        return this.rawReport.userAgent
          .replace(/\([^()]*\)/g, "")
          .replace(/\s+/g, ", ");
      }
    }
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

<style lang="scss"></style>
