import { getPaisByDominio } from "../repositories/pais.dao.js";

// Función para verificar el dominio del país a partir de un correo electrónico
export const verificationPais = async (email) => {
  // Extraer el dominio del correo electrónico
  const domain = email.split("@")[1]; 
  if (!domain) {
    throw new Error("Correo electrónico inválido."); // Lanzar un error si el correo no tiene un dominio válido
  }

  // Obtener los últimos 3 caracteres del dominio para identificar el país
  const countryDomain = domain.slice(-3); 
  return countryDomain;
};

// Función para obtener el país a partir del dominio del correo electrónico
export const getCountryByDomain = async (email) => {
  try {
    // Verificar y obtener el dominio del país
    const domain = await verificationPais(email);
    
    // Consultar la base de datos o servicio para obtener la información del país
    const pais = await getPaisByDominio(domain);
    
    return pais;
  } catch (error) {
    console.error("Error al consultar pais:", error); // Manejo de errores
    throw error;
  }
}