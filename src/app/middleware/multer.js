// Multer permite enviar arquivos
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images');
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now().toString()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, callback) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
        .find(acceptedFormat => acceptedFormat == file.mimetype);

    if (isAccepted) {
        return callback(null, true);
    }

    return callback(null, false);
};

// Salvar o arquivo em disco
module.exports = multer({
    storage,
    // Configuração antes de salvar o arquivo
    fileFilter
});