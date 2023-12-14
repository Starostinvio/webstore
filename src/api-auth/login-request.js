import { AuthService } from "./auth-service";

async function loginRequest(login, password) {
  try {
    const result = await AuthService.login(login, password);
  } catch (e) {
  } finally {
  }

  return;
}

export { loginRequest };
