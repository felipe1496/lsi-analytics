export type TextQueryFieldOperator = 'contains' | 'startsWith' | 'endsWith';

export type TextQueryFieldValue = {
  operator: TextQueryFieldOperator | null;
  text: string | null;
};
