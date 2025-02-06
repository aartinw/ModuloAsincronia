import {
  obtenerPersonajes,
  filtrarPersonajesPorNombre,
} from "./personajes-listado.api";
import { Personaje } from "./personajes-listado.model";

const inputBuscar = document.querySelector<HTMLInputElement>("#filtrar");
const listadoPersonajes = document.querySelector<HTMLDivElement>(
  "#listado-personajes"
);

const crearElementoImagen = (imagen: string): HTMLImageElement => {
  const fotoPersonaje = document.createElement("img");
  fotoPersonaje.src = `http://localhost:3000/${imagen}`;
  fotoPersonaje.alt = "Imagen del personaje";
  return fotoPersonaje;
};

const crearElementoParrafo = (
  texto: string,
  etiqueta: string
): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.textContent = `${etiqueta}: ${texto}`;
  return parrafo;
};

const crearContenedorPersonaje = (personaje: Personaje): HTMLDivElement => {
  const elementoPersonaje = document.createElement("div");
  elementoPersonaje.classList.add("personaje-contenedor");

  const imagen = crearElementoImagen(personaje.imagen);
  elementoPersonaje.appendChild(imagen);

  const nombre = crearElementoParrafo(personaje.nombre, "Nombre");
  elementoPersonaje.appendChild(nombre);

  const especialidad = crearElementoParrafo(
    personaje.especialidad,
    "Especialidad"
  );
  elementoPersonaje.appendChild(especialidad);

  const habilidades = crearElementoParrafo(
    personaje.habilidades,
    "Habilidades"
  );
  elementoPersonaje.appendChild(habilidades);

  return elementoPersonaje;
};

const pintarPersonajes = (lista: Personaje[]): void => {
  if (listadoPersonajes && listadoPersonajes instanceof HTMLDivElement) {
    listadoPersonajes.innerHTML = "";

    lista.forEach((personaje) => {
      const contenedorPersonaje = crearContenedorPersonaje(personaje);
      listadoPersonajes.appendChild(contenedorPersonaje);
    });
  }
};

const filtrarPersonajes = async (evento: Event) => {
  evento.preventDefault();
  if (inputBuscar && inputBuscar instanceof HTMLInputElement) {
    const textoBusqueda = inputBuscar.value.trim();

    const personajesFiltrados = await filtrarPersonajesPorNombre(textoBusqueda);
    console.log(personajesFiltrados);

    pintarPersonajes(personajesFiltrados);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const personajes = await obtenerPersonajes();
  const formulario = document.querySelector(".contenedor-formulario");
  if (formulario && formulario instanceof HTMLFormElement) {
    formulario.addEventListener("submit", filtrarPersonajes);
  }
  pintarPersonajes(personajes);
});
