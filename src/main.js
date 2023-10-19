import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import StepperComponent from './components/SteeperComponent.vue'




library.add(faArrowLeft);
library.add(faArrowRight);
library.add(fas);


localStorage.setItem('series', JSON.stringify([{
    dia: "Lunes", fecha: "10/10/2023", items: [{
      name: "hola"
    }, {
      name: "hola2"
    },
    {
      name: "hola2"
    },
    {
      name: "hola2"
    },
    {
      name: "hola2"
    },
    {
      name: "hola3"
    }]
  },
  {
    dia: "Martes", fecha: "03/10/2023", items: [
      {
        name: "Kimetsu no yaiba"
      }
    ]
  },
  { dia: "Miercoles", fecha: "04/10/2023", items: [] },
  { dia: "Jueves", fecha: "05/10/2023", items: [] },
  { dia: "Viernes", fecha: "06/10/2023", items: [] },
  { dia: "Sabado", fecha: "07/10/2023", items: [] },
  { dia: "Domingo", fecha: "08/10/2023", items: [] },
  { dia: "Lunes", fecha: "09/10/2023", items: [] }]))
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('stepper-component', StepperComponent);
app.use(router)

app.mount('#app')
