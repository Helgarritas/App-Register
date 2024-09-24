import { envs } from "../../config/envs";

const { API_BASE_URL } = envs;
const tokenStorage = localStorage.getItem('authToken');
const token = tokenStorage; 

export async function httpService(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', 
  body: null | {[key: string]: any} | {[key: string]: any}[] 
): Promise<any> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` 
  };
  
  const options: RequestInit = {
    method,
    headers
  };
  
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, options);
    if (!response.ok) {
      // Lanza un error si la respuesta no es ok
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    } 
    return await response.json(); // Si todo va bien, devuelve la respuesta en JSON
  } catch (error) {
    console.error('Error en httpService:', error);
    throw error; // Asegúrate de propagar el error al llamador
  }
}
