<template>
  <v-container>
    <v-row>
      <v-col>
        <h1
          class="my-3"
          :class="$breakpoint.mdAndUp ? 'display-2 text-center' : 'display-1'"
        >
          About Website Analyzer
        </h1>
        <h2
          class="my-3"
          :class="$breakpoint.mdAndUp ? 'headline text-center' : 'title'"
        >
          Full control of your Google Lighthouse reports
        </h2>
        <p class="body-1 my-3">
          View and manage your website analysis reports all in one place. Get
          low-tech action step description for how to fix issues.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss"></style>
