import {
  obtenerPersonajes,
  filtrarPersonajesPorNombre,
} from "./personajes-listado.api";
import { Personaje } from "./personajes-listado.model";

const inputBuscar = document.querySelector<HTMLInputElement>("#filtrar");
const botonFiltrar =
  document.querySelector<HTMLButtonElement>("#boton-filtrar");
const listadoPersonajes = document.querySelector<HTMLDivElement>(
  "#listado-personajes"
);

let personajes: Personaje[] = [];

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
  if (!listadoPersonajes) return;

  listadoPersonajes.innerHTML = "";

  lista.forEach((personaje) => {
    const contenedorPersonaje = crearContenedorPersonaje(personaje);
    listadoPersonajes.appendChild(contenedorPersonaje);
  });
};

const filtrarPersonajes = async () => {
  if (!inputBuscar) return;

  const textoBusqueda = inputBuscar.value.trim();

  const personajesFiltrados = await filtrarPersonajesPorNombre(textoBusqueda);
  console.log(personajesFiltrados);

  pintarPersonajes(personajesFiltrados);
};

const cargarPersonajes = async (): Promise<void> => {
  personajes = await obtenerPersonajes();
  console.log("Personajes cargados:", personajes);
  pintarPersonajes(personajes);
};

document.addEventListener("DOMContentLoaded", cargarPersonajes);
botonFiltrar?.addEventListener("click", filtrarPersonajes);
