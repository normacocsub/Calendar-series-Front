<template>
    <div class="container">
        <div>

            <img :src="fondo" alt="" width="800" class="img">
            <div class="imgSuperpuestaContainer">
                <img :src="fondoEspadas" alt="" width="300" class="imgSuperpuesta">
                <div class="footerImage">
                </div>
            </div>
            <div class="imgSuperpuestaContainer">
                <img :src="fondoPaisaje" alt="" width="300" class="imgSuperpuesta">
                <div class="footerImage">

                </div>
            </div>

        </div>
        <div class="registerSection">
            <h1 class="tittle">Registro</h1>

            <stepper-component :currentStep="currentStep" @prevStep="prevStep" @nextStep="nextStep"
                :complete="validateSteps()">
                <!-- Contenido del primer paso -->
                <div v-if="currentStep === 0" class="stepContainer">
                    <div class="file-upload">
                        <label class="file-label" v-if="!imagePreview">
                            <span class="camera-icon">📷</span> <!-- Ícono de cámara -->
                            <input type="file" class="input-file" @change="previewImage" />
                            <span class="file-label-text">Seleccionar archivo</span>
                        </label>
                        <div v-if="imagePreview">
                            <div class="image-container">
                                <img :src="imagePreview" class="imgChange" alt="Previsualización de la imagen" />
                                <button @click="changeImage">Cambiar</button>
                            </div>
                        </div>
                    </div>

                    <div class="inputGroup">
                        <label for="nombre">Nombre</label>
                        <input id="nombre" type="text" class="input" v-model="serie.nombre">
                    </div>
                </div>

                <!-- Contenido del segundo paso -->
                <div v-if="currentStep === 1" class="stepContainer">
                    <div class="switchItem">
                        <div class="switch-container">
                            <label id="check">En Emisión</label>
                            <label class="switch">
                                <input type="checkbox" v-model="serie.emision" id="check">
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>

                    <div class="inputGroup">
                        <label for="total_caps">Total Capitulos</label>
                        <input id="total_caps" type="number" class="input" v-model="serie.capitulos">
                    </div>

                    <div class="inputGroup">
                        <label for="total_caps_views">Total Capitulos Vistos</label>
                        <input id="total_caps_views" type="text" class="input" v-model="serie.capitulos_vistos">
                    </div>
                </div>

                <!-- Contenido del tercer paso -->
                <div v-if="currentStep === 2" class="stepContainer">
                    <div class="inputGroup">
                        <label for="donde_ver">Donde Ver</label>
                        <input id="donde_ver" type="text" class="input" v-model="serie.donde_ver">
                    </div>

                    <div class="inputGroup">
                        <label for="observaciones">Observaciones</label>
                        <input id="observaciones" type="text" class="input" v-model="serie.observaciones">
                    </div>
                </div>
            </stepper-component>



        </div>
    </div>
</template>


<script>
import fondo from "@/assets/img/1330094.png"
import fondoEspadas from "@/assets/img/632051.png"
import fondoPaisaje from "@/assets/img/1330314.png"
import StepperComponent from '../components/SteeperComponent.vue';


export default {
    name: 'RegisterActivity',
    components: {
        StepperComponent,
    },
    methods: {
        prevStep() {
            if (this.currentStep > 0) {
                this.currentStep -= 1;
            }
        },
        nextStep() {
            if (this.currentStep < 2) {
                this.currentStep += 1;
            }
        },
        previewImage(event) {
            // Accede al archivo seleccionado por el usuario
            const file = event.target.files[0];

            if (file) {
                // Crea una URL temporal para la previsualización
                this.imagePreview = URL.createObjectURL(file);
            } else {
                // Limpia la previsualización si no se selecciona un archivo
                this.imagePreview = null;
            }
        },
        changeImage() {
            this.imagePreview = null;
        }, 
        validateSteps () {
            // step 1, imagen y nombre
            const validateStep1 = (this.imagePreview && this.serie.nombre?.length > 3) ?? false;
            const validateStep2 = (this.serie?.capitulos > 0) ?? false;
            const validateStep3 = (this.serie.donde_ver?.length > 3) ?? false;
            
            return [validateStep1, validateStep2, validateStep3]
        }
    },
    data() {
        return {
            fondo,
            fondoEspadas,
            fondoPaisaje,
            currentStep: 0,
            imagePreview: null,
            serie: {
                nombre: null,
                emision: true,
                capitulos: null,
                capitulos_vistos: 0,
                donde_ver: null,
                observaciones: ''
            }
        }
    }
}
</script>


<style>
.container {
    display: flex;
    flex-direction: row;
    border: 1px solid black;
    height: 88vh;
    border-radius: 3px;
}

.img {
    height: 100%;
}

.registerSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    width: 100%;
}

.imgSuperpuestaContainer {
    position: absolute;
    top: 40%;
    left: 6%;
    transform: rotate(-35deg);
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

.imgSuperpuestaContainer:nth-child(2) {
    top: 40%;
    left: 22%;
}

.inputGroup {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 4%;
    gap: 10px;
    font-weight: bold;
}

.input {
    height: 35px;
    border-radius: 6px;
    width: 100%;
    outline-color: gray;
    border: 1px solid gray;
    text-indent: 10px;
}


.footerImage {
    max-width: 85%;
    height: 60px;
    background-color: white;
}

.imgSuperpuesta {
    height: 60%;
    max-width: 90%;
    border-radius: 6px;
    margin-top: 6%;
}

.switch-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked+.slider {
    background-color: #2196F3;
}

input:focus+.slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

.file-upload {
    position: relative;
    display: inline-block;
}

.input-file {
    display: none;
    /* Oculta el input de archivo */
}

.file-label {
    background-color: #f2f2f2;
    padding: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    height: 200px;
    width: 400px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.camera-icon {
    font-size: 36px;
    /* Tamaño del ícono de la cámara */
    margin-bottom: 10px;
    /* Espacio entre el ícono y el texto */
}

.file-label-text {
    font-size: 16px;
}

.image-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.input-file:focus+.file-label {
    border: 2px solid #007BFF;
    outline: none;
}

.input-file:valid+.file-label {
    background-color: #ffffff;
    border: 1px solid #ccc;
}

/* Para mostrar el nombre del archivo seleccionado en el label */
.input-file:valid+.file-label .file-label-text::after {
    content: attr(data-file-name);
}

.imgChange {
    max-height: 200px;
    max-width: 400px;
    border-radius: 6px;
}

.stepContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    align-items: center;
    width: 100%;
    min-width: 400px;
    max-width: 500px;
}
.switchItem {
    width: 100%;
}
</style>