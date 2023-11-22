export class Config {
  public static get getBaseURL() {
    const baseURL = import.meta.env.VITE_BASE_URL;

    if (!baseURL) {
      throw new Error('Variável de ambiente BASE_URL não definida');
    }

    return baseURL;
  }
}
