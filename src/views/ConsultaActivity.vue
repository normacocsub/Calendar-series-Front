<template>
  <div class="calendarContainer">
    <div><font-awesome-icon @click="lastItem" size="small" icon="arrow-left" :style="{ 'font-size': '24px' }" /></div>
    <div v-for="(item, index) in days.slice(startList, finishList)" :key="index" class="itemCalendar">
      <div class="titleSection">
        <span>
          {{ item.dia }}
        </span>
        <span>
          {{ item.fecha }}
        </span>
      </div>
      <div class="subItemContainer">
        <div v-for="(item2, index) in item.items" :key="index" class="subItemCalendar">
          <div class="imageContainer">
            <img :src="externalImage" alt="Mi Imagen Externa" class="imgItem" />
            <div class="textOverImage">{{ item2.name }}</div>
          </div>
        </div>
      </div>

    </div>
    <div><font-awesome-icon @click="nextItem" size="small" icon="arrow-right" :style="{ 'font-size': '24px' }" /></div>
  </div>
</template>

<script>
import externalImage from "@/assets/img/shadow.jpg";
export default {
  name: 'RegisterActivity',
  props: {
    msg: String
  },
  data() {
    return {
      days: [],
      externalImage,
      startList: 0,
      finishList: 7
    }
  },
  mounted() {
    this.generarListaFechas();
  },
  methods: {
    nextItem() {
      const listLength = this.days.length;
      if ((this.finishList) < listLength) {
        this.startList += 1;
        this.finishList += 1;
      }

    },
    lastItem() {
      if ((this.startList) > 0) {
        this.startList -= 1;
        this.finishList -= 1;
      }
    },
    generarListaFechas() {
      const fechaActual = new Date();
      const series = JSON.parse(localStorage.getItem('series'))
      for (let i = 0; i < 14; i++) { // Generar datos para al menos 2 semanas (14 días)
        const diaSemana = fechaActual.toLocaleDateString('es-ES', { weekday: 'long' });
        const fecha = fechaActual.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        this.days.push({ dia: diaSemana, fecha: fecha, items: [] });
        // Avanzar un día
        fechaActual.setDate(fechaActual.getDate() + 1);

        for (let j = 0; j < series.length; j++) {
          if (fecha ===  series[j].fecha) {
            this.days[i].items =  series[j].items
          }
        }
      }
    }
  },
}
</script>

<style>
.calendarContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 92.5vh;
}

.titleSection {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  border-bottom: 1px solid black;
}

.itemCalendar {
  display: flex;
  flex-direction: column;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  width: 300px;

  align-items: center;
  row-gap: 20px;

}

.itemCalendar:first-child {
  border-left: none;
}

.itemCalendar:nth-child(8) {
  border-right: none;
}

.imgItem {
  width: 150px;
  height: 200px;
}

.imageContainer {
  position: relative;
  display: inline-block;
}

.textOverImage {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.7);
  padding: 10px;
  font-size: 16px;
  color: #000;
  font-weight: bold;
}

.subItemContainer {
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.subItemContainer::-webkit-scrollbar {
  width: 0.5em;
}

.subItemContainer::-webkit-scrollbar-track {
  background: transparent;
}


.subItemCalendar {
  width: 150px;
  min-height: 200px;
}
</style>