<template>
  <v-container>
    <v-row>
      <!-- Main -->
      <v-col class="pb-0">
        <!-- Landing Page -->
        <v-card flat>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-card-title class="display-1 mb-6"
                  >Website Analyzer App</v-card-title
                >
                <v-card-subtitle class="headline"
                  >Easily create and manage your website
                  reports</v-card-subtitle
                >
                <v-card-text class="title font-weight-regular"
                  >Automate Google Lighthouse reports with full analysis. Paired
                  with clear action steps for each failing audit. Guided website
                  optimization that offers results.</v-card-text
                >
              </v-col>
              <v-col cols="12" sm="6">
                <v-img src="/images/reporting.svg" height="250" contain />
              </v-col>
            </v-row>
            <v-row>
              <v-col align="center">
                <v-card flat>
                  <v-btn class="my-12" color="secondary" to="/register" x-large
                    >Get Started For Free</v-btn
                  >
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "landing"
};
</script>

<style lang="scss"></style>
