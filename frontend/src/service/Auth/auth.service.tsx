import { envs } from "../../config/envs";

const WEBSERVICE_URL = envs.API_BASE_URL;

export class AuthService {
  private navigate: (path: string) => void;

  constructor(navigate: (path: string) => void) {
    this.navigate = navigate;
  }

  async loginUser(body: { [key: string]: any }) {
    console.log('Se ingreso');
    try {
      const response = await fetch(`${WEBSERVICE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network error: ${response.status} - ${errorText}`);
      }

      this.navigate('/home');

      return await response.json();
    } catch (error) {
      throw new Error(`Fetch failed: ${error}`);
    }
  }

  async registerUser(body: { [key: string]: any }) {
    console.log('Se registro');
    try {
      const response = await fetch(`${WEBSERVICE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network error: ${response.status} - ${errorText}`);
      }

      window.location.reload(); // Esto recarga la página, volviendo al login
      return await response.json();
    } catch (error) {
      throw new Error(`Fetch failed: ${error}`);
    }
  }
}

