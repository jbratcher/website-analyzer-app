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
      let scoreColor = "black";
      let normalizedScore = this.normalizedScore(score);
      if (normalizedScore === 100) {
        scoreColor = "green darken-1";
      } else if (normalizedScore < 100 && normalizedScore >= 95) {
        scoreColor = "green";
      } else if (normalizedScore < 95 && normalizedScore >= 90) {
        scoreColor = "light-green darken-1";
      } else if (normalizedScore < 90 && normalizedScore >= 85) {
        scoreColor = "light-green";
      } else if (normalizedScore < 85 && normalizedScore >= 80) {
        scoreColor = "lime darken-1";
      } else if (normalizedScore < 80 && normalizedScore >= 75) {
        scoreColor = "lime";
      } else if (normalizedScore < 75 && normalizedScore >= 70) {
        scoreColor = "yellow darken-1";
      } else if (normalizedScore < 70 && normalizedScore >= 65) {
        scoreColor = "yellow";
      } else if (normalizedScore < 65 && normalizedScore >= 60) {
        scoreColor = "amber darken-1";
      } else if (normalizedScore < 60 && normalizedScore >= 55) {
        scoreColor = "amber";
      } else if (normalizedScore < 55 && normalizedScore >= 50) {
        scoreColor = "orange darken-1";
      } else if (normalizedScore < 50 && normalizedScore >= 45) {
        scoreColor = "orange";
      } else if (normalizedScore < 45 && normalizedScore >= 40) {
        scoreColor = "deep-orange darken-1";
      } else if (normalizedScore < 55 && normalizedScore >= 50) {
        scoreColor = "deep-orange";
      } else {
        scoreColor = "red";
      }
      return scoreColor;
    }
  }
};
