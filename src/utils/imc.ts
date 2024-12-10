export const calculateIMC = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(2));
};

export const getIMCCategory = (imc: number): string => {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 24.9) return 'Peso normal';
  if (imc < 29.9) return 'Sobrepeso';
  if (imc < 34.9) return 'Obesidade grau 1';
  if (imc < 39.9) return 'Obesidade grau 2';
  return 'Obesidade grau 3';
};