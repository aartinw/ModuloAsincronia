import axios from "axios";
import { Personaje } from "./personajes-listado.model";

export const obtenerPersonajes = async (): Promise<Personaje[]> => {
  try {
    const { data } = await axios.get("http://localhost:3000/personajes");
    return data;
  } catch (error) {
    throw new Error("Error al obtener los personajes");
  }
};

export const filtrarPersonajesPorNombre = async (
  nombrePersonaje: string
): Promise<Personaje[]> => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/personajes?nombre_like=${nombrePersonaje}`
    );
    return data;
  } catch (error) {
    throw new Error("Error al obtener los personajes");
  }
};
