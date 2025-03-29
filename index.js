const fs = require('fs');
const path = require('path');

// Configuración inicial
const downloadsDir = 'C:\\Users\\nicop\\Downloads'; // Ruta fija a la carpeta Downloads

function convertFile(inputPath) {
  try {
    const inputFile = inputPath;
    const outputFile = path.join(downloadsDir, `${path.basename(inputFile)}.txt`);

    // Leer el contenido del archivo
    const content = fs.readFileSync(inputFile, 'utf-8');

    // Escribir en el archivo .txt
    fs.writeFileSync(outputFile, content);

    console.log(`Archivo convertido exitosamente: ${outputFile}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function main() {
  // Pedir la ruta del archivo al usuario
  process.stdin.on('data', (input) => {
    const inputFile = input.toString().trim();

    // Verificar si el archivo existe
    if (!fs.existsSync(inputFile)) {
      console.error('El archivo no existe');
      return;
    }

    // Verificar si es uno de los tipos permitidos
    const ext = path.extname(inputFile).toLowerCase();
    if (ext !== '.ts' && ext !== '.css' && ext !== '.html') {
      console.error('Tipo de archivo no permitido. Sólo se admiten .ts, .css o .html.');
      return;
    }

    convertFile(inputFile);
  });
}

console.log('Ingrese la ruta del archivo que desea convertir:');
main();
