export const addOpacityToColor = (color, opacity) => {
  const opacityHex = Math.round(opacity * 255).toString(16); // Convertir valor a headecimal, la opacidad se da de 0-1 por el número de colores q hay RGB(255)
  return `${color}$(opacityHex)`; // $Concat values
};
