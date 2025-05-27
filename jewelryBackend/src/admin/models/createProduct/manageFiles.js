import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Para poder usar __dirname en módulos ES (como import/export)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Crear la carpeta con nombre 'name-id' dentro de 'uploads'
    const dir = path.join(__dirname, "uploads" /*, `${name}`*/);

    // Verificar si la carpeta existe, si no, crearla
    fs.mkdirSync(dir, { recursive: true });

    // Especificar la carpeta de destino para el archivo
    cb(null, dir);
  },
  filename: (req, file, cb) => {
  if (typeof req.fileIndex === "undefined") {
    req.fileIndex = 0;
  }
  req.fileIndex += 1;

  const { name } = req.body;
  const { nameImage } = req.query;

  const validName = !name ? nameImage : name;
  const ext = path.extname(file.originalname);
  const baseName = `${validName}-${req.fileIndex}`; // sin extensión

  const dir = path.join(__dirname, "uploads");
  
  // 👇 Leer todos los archivos en la carpeta
  const allFiles = fs.readdirSync(dir);

  // 👇 Borrar los que empiecen con el mismo nombre base (sin importar extensión)
  allFiles.forEach((existingFile) => {
    if (existingFile.startsWith(baseName)) {
      const fullPath = path.join(dir, existingFile);
      fs.unlinkSync(fullPath);
    }
  });

  const finalFileName = `${baseName}${ext}`;
  cb(null, finalFileName);
}
});

const upload = multer({ storage: storage });

export default upload;
