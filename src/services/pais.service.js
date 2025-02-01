import { getPaisByDominio } from "../repositories/pais.dao.js";

export const verificationPais = async (email) => {
  const domain = email.split("@")[1]; 
  if (!domain) {
    throw new Error("Correo electrónico inválido.");
  }

  const countryDomain = domain.slice(-3); 
  return countryDomain;
};

export const getCountryByDomain = async (email) => {
  try {
    const domain = await verificationPais(email);
    const pais = await getPaisByDominio(domain);
    return pais;
  } catch (error) {
    console.error("Error al consultar pais:", error);
    throw error;
  }
}