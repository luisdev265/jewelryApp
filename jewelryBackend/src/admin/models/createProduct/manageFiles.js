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
    // 2) Si aún no existe, inicializamos el contador en 0
    if (typeof req.fileIndex === "undefined") {
      req.fileIndex = 0;
    }
    // 3) Lo incrementamos por cada archivo
    req.fileIndex += 1;

    // 4) Construimos el nombre: name-del-formulario + guión + índice + extensión
    const { name } = req.body;
    const ext = path.extname(file.originalname);
    const fileName = `${name}-${req.fileIndex}${ext}`;

    // Ruta completa del archivo
    const filePath = path.join(__dirname, "uploads", fileName);

    // Si ya existe un archivo con ese nombre, lo eliminamos
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

export default upload;
