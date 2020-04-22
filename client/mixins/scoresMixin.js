export default {
  methods: {
    normalizedScore(score) {
      if (score === 1) {
        score = 100;
      }
      let stringifiedScore = String(score);
      if (stringifiedScore.substring(0, 2) === "0.") {
        score = stringifiedScore.substring(2);
      }
      return score;
    },
    calcScoreColor(score) {
      let scoreColor = "white";
      let normalizedScore = this.normalizedScore(score);
      if (normalizedScore === 100) {
        scoreColor = "green";
      } else if (normalizedScore < 100 && normalizedScore >= 95) {
        scoreColor = "light-green";
      } else if (normalizedScore < 95 && normalizedScore >= 90) {
        scoreColor = "lime";
      } else if (normalizedScore < 90 && normalizedScore >= 85) {
        scoreColor = "yellow";
      } else if (normalizedScore < 85 && normalizedScore >= 80) {
        scoreColor = "amber";
      } else if (normalizedScore < 80 && normalizedScore >= 75) {
        scoreColor = "orange";
      } else if (normalizedScore < 75 && normalizedScore >= 70) {
        scoreColor = "deep-orange";
      } else if (normalizedScore < 70 && normalizedScore >= 65) {
        scoreColor = "red";
      } else {
        scoreColor = "white";
      }
      return scoreColor;
    }
  }
};
