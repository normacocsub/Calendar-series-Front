<template>
  <div>
    <div class="stepper">
      <div v-for="(step, index) in steps" :key="index" class="step-container">
        <div :class="{ 'active': index === currentStep, 'step': !complete[index], 'step-finish': complete[index] }">
          <font-awesome-icon :icon="faCheck" v-if="complete[index]" />
        </div>
        <span :class="{ 'active': index === currentStep }" class="step-number">{{ step }}</span>
      </div>
    </div>
    <div class="step-content">

      <slot></slot>
    </div>
    <div class="controls">
      <button @click="prevStep" :disabled="currentStep === 0">Anterior</button>
      <button @click="nextStep" :disabled="currentStep === steps.length - 1" v-if="!completeSteps() || currentStep < (steps.length -1)">Siguiente</button>
      <button v-if="completeSteps() && currentStep === (steps.length -1)">Guardar</button>
    </div>
  </div>
</template>
  
<script>
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
export default {
  props: {
    currentStep: Number,
    complete: []
  },
  data() {
    return {
      steps: ['1', '2', '3'],
      faCheck,
      faClock
    };
  },
  methods: {
    prevStep() {
      if (this.currentStep > 0) {
        this.$emit('prevStep');
      }
    },
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.$emit('nextStep');
      }
    },
    completeSteps() {
      let complete_steps = false;
      for (const item of this.complete) {
        complete_steps = item;
        if (!item) {
          break;
        }
      }
      return complete_steps;
    }
  },
};
</script>
  
<style>
.stepper {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.step-finish {
  background-color: green;
  color: #fff;
  padding: 10px 12px;
  margin: 0 10px;
  border-radius: 50%;
}

.step {
  background-color: #ccc;
  color: #fff;
  padding: 10px 12px;
  margin: 0 10px;
  height: 20px;
  width: 15px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

.step::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 2px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform-origin: left center;
  animation: rotateHand 3s linear infinite;
}

@keyframes rotateHand {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.step.active {
  background-color: #007BFF;
}

.step-number {
  font-weight: bold;
  transition: color 0.3s ease;
}

.step-number.active {
  color: #007BFF;
  transform: scale(1.2); 
  animation: flash 3s infinite;
}

@keyframes flash {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}


.controls {
  display: flex;
  flex-direction: row;
  gap: 20px;
  text-align: center;
  position: absolute;
  bottom: 30px;
  left: 73%;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

button:first-child {
  background-color: #964B00;
}

button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
  