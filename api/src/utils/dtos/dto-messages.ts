export class DtoMessages {
  public static isString(field?: string) {
    return `${field ?? 'O Campo'} deve ser um texto`;
  }

  public static IsNotEmpty(field: string) {
    return `${field ?? 'O Campo'} não pode ser vazio`;
  }

  public static isEmail(field: string) {
    return `${field ?? 'E-mail'} deve ser válido`;
  }

  public static isDateString(field: string) {
    return `${field ?? 'Data'} deve ser válido`;
  }

  public static invalid(field: string) {
    return `${field} inválido`;
  }

  public static isObject(field: string) {
    return `${field ?? 'O Campo'} deve ser um objeto`;
  }
}
