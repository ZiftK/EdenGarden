const CopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
        .then(() => {
        console.log('Copiado al portapapeles:', text);
        })
        .catch((err) => {
            console.error('Error al copiar:', err);
        });
};

export default CopyToClipboard