<template>
  <v-container>
    <v-row>
      <v-col>
        <h1
          class="pt-6 pb-3"
          :class="$breakpoint.mdAndUp ? 'display-1 text-center' : 'headline'"
        >
          About Website Analyzer
        </h1>
        <h2
          class="pb-6"
          :class="$breakpoint.mdAndUp ? 'title text-center' : 'subtitle-1'"
        >
          Full control of your Google Lighthouse reports
        </h2>
        <p class="body-1 pb-6 text-center">
          View and manage your website analysis reports all in one place. Get an
          easy-to-understand report with detailed action steps. Each action step
          is linked ot the official Google documentation on how to fix the
          issue.
        </p>
      </v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col>
        <v-container fluid>
          <v-row align="center" justify="center">
            <v-col cols="5">
              <p class="title align-self-center">
                <span class="primary--text">Step 1:</span> Sign Up For Free
              </p>
            </v-col>
            <v-col cols="5">
              <v-img
                src="/images/sign-up.svg"
                alt="Sign up"
                height="160"
                contain
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col>
        <v-container fluid>
          <v-row align="center" justify="center">
            <v-col cols="5">
              <p class="title">
                <span class="primary--text">Step 2:</span> Choose a website to
                analyze
              </p>
            </v-col>
            <v-col cols="5">
              <v-img
                src="/images/lighthouse.svg"
                alt="Analyze Website"
                height="160"
                contain
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col>
        <v-container fluid>
          <v-row align="center" justify="center">
            <v-col cols="5">
              <p class="title">
                <span class="primary--text">Step 3:</span> Get your detailed
                report
              </p>
            </v-col>
            <v-col cols="5">
              <v-img
                src="/images/report.svg"
                alt="Get Report"
                height="160"
                contain
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss"></style>
