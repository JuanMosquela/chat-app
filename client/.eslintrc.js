module.exports = {
  // Otras opciones de configuración aquí
  overrides: [
    {
      files: ["src/components/GoogleLoginButton.tsx"], // Archivos específicos que quieres configurar
      globals: {
        google: "readonly", // Indica que "google" es una variable global de solo lectura
      },
    },
  ],
};
