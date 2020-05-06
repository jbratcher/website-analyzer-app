<template>
  <!-- Easy Circular Progress - adapted from https://github.com/dreambo8563/easy-circular-progress -->
  <div class="vue-circular-progress">
    <div class="circle">
      <svg :width="circleSize" :height="circleSize" class="circle__svg">
        <circle
          :cx="perimeter"
          :cy="perimeter"
          :r="radius"
          :style="{ 'stroke-width': strokeWidth, stroke: strokeColor }"
          class="circle__progress circle__progress--path"
        ></circle>
        <circle
          :cx="perimeter"
          :cy="perimeter"
          :r="radius"
          :style="fileStyle"
          class="circle__progress circle__progress--fill"
        ></circle>
      </svg>

      <div class="percent">
        <slot>
          <span class="percent__int">{{ int }}</span>
          <span class="dot">.</span>
          <span class="percent__dec">{{ dec }}</span>
          <span class="percent_sign">%</span>
        </slot>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script>
export default {
  name: "Progress",
  props: {
    strokeWidth: {
      type: Number,
      default: 4
    },
    radius: {
      type: Number,
      default: 38
    },
    transitionDuration: {
      type: Number,
      default: 1000
    },
    strokeColor: {
      type: String,
      default: "#aaff00"
    },
    value: {
      validator: function(value) {
        // should be a number and less or equal than 100
        return !Number.isNaN(Number(value)) && Number(value) <= 100;
      },
      default: "0.0"
    }
  },
  data() {
    return {
      offset: "",
      int: 0,
      dec: "00"
    };
  },
  computed: {
    circumference() {
      return this.radius * Math.PI * 2;
    },
    fileStyle() {
      return {
        strokeDashoffset: this.offset,
        "--initialStroke": this.circumference,
        "--transitionDuration": `${this.transitionDuration}ms`,
        "stroke-width": this.strokeWidth,
        stroke: this.strokeColor
      };
    },
    circleSize() {
      return (this.radius + this.strokeWidth) * 2;
    },
    perimeter() {
      return this.circleSize / 2;
    }
  },
  methods: {
    increaseNumber(number, className) {
      if (number == 0) {
        return;
      }
      const innerNum = parseInt(
        this.findClosestNumber(this.transitionDuration / 10, number)
      );
      let interval = this.transitionDuration / innerNum;

      let counter = 0;
      const handlerName = `${className}Interval`;
      this[handlerName] = setInterval(() => {
        const bitDiff = number.toString().length - innerNum.toString().length;
        if (bitDiff == 0) {
          this[className] = counter;
        } else {
          this[className] = counter * 10 * bitDiff;
        }
        if (counter === innerNum) {
          // back to origin precision
          this[className] = number;
          window.clearInterval(this[handlerName]);
        }
        counter++;
      }, interval);
    },
    findClosestNumber(bound, value) {
      if (value <= bound) {
        return value;
      }
      return this.findClosestNumber(bound, value / 10);
    },
    countNumber(v) {
      this.offset = "";

      this.initTimeoutHandler = setTimeout(() => {
        this.offset = (this.circumference * (100 - v)) / 100;
      }, 100);
      if (this.$slots.default) return;
      let [int, dec] = v.toString().split(".");

      // fallback for NaN
      [int, dec] = [Number(int), Number(dec)];
      this.increaseNumber(int, "int");
      this.increaseNumber(Number.isNaN(dec) ? 0 : dec, "dec");
    },
    clearHandlers() {
      if (this.initTimeoutHandler) {
        clearTimeout(this.initTimeoutHandler);
      }
      if (this.intInterval) {
        clearInterval(this.intInterval);
      }
      if (this.decInterval) {
        clearInterval(this.decInterval);
      }
    }
  },
  watch: {
    value: {
      handler: function(v) {
        const n = Number(v);
        if (Number.isNaN(n) || n == 0) {
          return;
        }
        this.clearHandlers();
        this.countNumber(v);
      },
      immediate: true
    }
  },
  beforeDestroy() {
    this.clearHandlers();
  }
};
</script>

<style lang="scss">
$--circular-progress-int-fz: 28px !default;
$--circular-progress-dec-fz: 12px !default;

.vue-circular-progress {
  display: inline-block;
  .circle {
    position: relative;
  }

  .circle__svg {
    transform: rotate(-90deg);
  }

  .circle__progress {
    fill: none;
    stroke-opacity: 0.3;
    stroke-linecap: round;
  }

  .circle__progress--fill {
    --initialStroke: 0;
    --transitionDuration: 0;
    stroke-opacity: 1;
    stroke-dasharray: var(--initialStroke);
    stroke-dashoffset: var(--initialStroke);
    transition: stroke-dashoffset var(--transitionDuration) ease;
  }

  .percent {
    width: 100%;
    top: 50%;
    left: 50%;
    position: absolute;
    font-weight: bold;
    text-align: center;
    line-height: $--circular-progress-int-fz;
    transform: translate(-50%, -50%);
  }

  .percent__int {
    font-size: $--circular-progress-int-fz;
  }
  .percent__dec,
  .percent_sign {
    font-size: $--circular-progress-dec-fz;
  }

  .label {
    font-size: 14px;
    text-transform: uppercase;
    margin-top: 15px;
  }
}
</style>
