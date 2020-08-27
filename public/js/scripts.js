const Mask = {
    apply(input, func) {
        setTimeout(function () {
            input.value = Mask[func](input.value);
        }, 1);
    },
    // Validação do campo valor para aceitar apenas números
    formatBRL(value) {
        // Limpa o campo
        value = value.replace(/\D/g, '');

        // Adiciona R$
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100);
    },
    cpfCnpj(value) {
        // Limpa o campo
        value = value.replace(/\D/g, '');

        if (value.length > 14) {
            // Se digitar mais de 14 número, tira a última posição
            value = value.slice(0, -1);
        }

        // Checa se é CNPJ - 11.222.333/0001-11
        if (value.length > 11) {
            // 11222333444455
            value = value.replace(/(\d{2})(\d)/, '$1.$2');
            // 11.222333444455
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            // 11.222.333444455
            value = value.replace(/(\d{3})(\d)/, '$1/$2');
            // 11.222.333/444455
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
            // 11.222.333/4444-55
        } else {
            // Checa se é CPF - 111.222.333-44
            // 11122233344
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            // 111.22233344
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            // 111.222.33344
            value = value.replace(/(\d{3})(\d)/, '$1-$2');
            // 111.222.333-44
        }

        return value;
    },
    cep(value) {
        // Limpa o campo
        value = value.replace(/\D/g, '');

        if (value.length > 8) {
            // Se digitar mais de 8 número, tira a última posição
            value = value.slice(0, -1);
        }

        // 11111222
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        // 11111-222

        return value;
    }
};

// Upload das fotos
const PhotosUpload = {
    input: '',
    preview: document.querySelector('#photos-preview'),
    // Número de fotos que pode ser enviadas
    uploadLimit: 6,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target;
        PhotosUpload.input = event.target;

        if (PhotosUpload.hasLimit(event)) {
            PhotosUpload.updateInputFiles();
            return;
        }

        Array.from(fileList).forEach(file => {
            PhotosUpload.files.push(file);

            const reader = new FileReader();

            reader.onload = () => {
                const image = new Image();
                image.src = String(reader.result);

                const div = PhotosUpload.getContainer(image);
                PhotosUpload.preview.appendChild(div);
            }

            reader.readAsDataURL(file);
        });

        PhotosUpload.updateInputFiles();
    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload;
        const { files: fileList } = input;

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos.`);
            // Bloqueia o evento de enviar os arquivos
            event.preventDefault();
            return true;
        }

        const photosDiv = [];
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == 'photo') {
                photosDiv.push(item);
            }
        });

        const totalPhotos = fileList.length + photosDiv.length;
        if (totalPhotos > uploadLimit) {
            alert('Você atingiu o limite máximo de fotos.');
            event.preventDefault();
            return true;
        }

        return false;
    },
    getAllFiles() {
        // Para Firefox -> new ClipboardEvent('').clipboardData
        // Para Chrome -> new DataTransfer()
        const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file));

        return dataTransfer.files;
    },
    getContainer(image) {
        const div = document.createElement('div');
        div.classList.add('photo');

        div.onclick = PhotosUpload.removePhoto;

        div.appendChild(image);

        div.appendChild(PhotosUpload.getRemoveButton());

        return div;
    },
    getRemoveButton() {
        const button = document.createElement('i');
        button.classList.add('material-icons');
        button.innerHTML = 'close';
        return button;
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode; // <div class="photos">

        const newFiles = Array.from(PhotosUpload.preview.children).filter(function (file) {
            if (file.classList.contains('photo') && !file.getAttribute('id')) {
                return true;
            }
        });
        const index = newFiles.indexOf(photoDiv);
        PhotosUpload.files.splice(index, 1);

        PhotosUpload.updateInputFiles();

        photoDiv.remove();
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode;

        if (photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"]');
            if (removedFiles) {
                removedFiles.value += `${photoDiv.id},`;
            }
        }

        photoDiv.remove();
    },
    updateInputFiles() {
        PhotosUpload.input.files = PhotosUpload.getAllFiles();
    }
};

const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(e) {
        const { target } = e;

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'));
        target.classList.add('active');

        ImageGallery.highlight.src = target.src;
        Lightbox.image.src = target.src;
    }
};

const Lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
    open() {
        Lightbox.target.style.opacity = 1;
        Lightbox.target.style.top = 0;
        Lightbox.target.style.bottom = 0;
        Lightbox.closeButton.style.top = 0;
    },
    close() {
        Lightbox.target.style.opacity = 0;
        Lightbox.target.style.top = "-100%";
        Lightbox.target.style.bottom = "initial";
        Lightbox.closeButton.style.top = "-80px";
    },
};

const Validate = {
    apply(input, func) {
        Validate.clearErrors(input);

        let results = Validate[func](input.value);
        input.value = results.value;

        if (results.error) {
            Validate.displayError(input, results.error);
        }
    },
    displayError(input, error) {
        const div = document.createElement('div');
        div.classList.add('error');
        div.innerHTML = error;
        input.parentNode.appendChild(div);
        input.focus();
    },
    clearErrors(input) {
        const errorDiv = input.parentNode.querySelector('.error');

        if (errorDiv) {
            errorDiv.remove();
        }
    },
    isEmail(value) {
        let error = null;

        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!value.match(mailFormat)) {
            error = 'E-mail inválido.';
        }

        return {
            error,
            value
        }
    },
    isCpfCnpj(value) {
        let error = null;

        const cleanValues = value.replace(/\D/g, '');

        if (cleanValues.length > 11 && cleanValues.length !== 14) {
            error = 'CNPJ inválido';
        } else if (cleanValues.length < 12 && cleanValues.length !== 11) {
            error = 'CPF inválido';
        }

        return {
            error,
            value
        }
    },
    isCep(value) {
        let error = null;

        const cleanValues = value.replace(/\D/g, '');

        if (cleanValues.length !== 8) {
            error = 'CEP inválido';
        }

        return {
            error,
            value
        }
    }
};