let imgData1 = null;
let imgData2 = null;

function processarImagem(inputId, canvasId) {
    const input = document.getElementById(inputId);
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    input.addEventListener('change', (e) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                const pixels = imageData.data;

                // Criando matriz de pixels
                let matriz = [];
                for (let y = 0; y < img.height; y++) {
                    let linha = [];
                    for (let x = 0; x < img.width; x++) {
                        let i = (y * img.width + x) * 4;
                        linha.push({
                            r: pixels[i],
                            g: pixels[i+1],
                            b: pixels[i+2],
                            a: pixels[i+3]
                        });
                    }
                    matriz.push(linha);
                }

                console.log(`Matriz da ${inputId} carregada!`, matriz);
                console.log(`Dimensões: ${img.width}x${img.height}`);

                if(inputId === 'input1') imgData1 = imageData;
                else imgData2 = imageData;
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    });
}

function mostrarResultado(imageData){
    const canvas = document.getElementById("canvasResultado");
    const ctx = canvas.getContext("2d");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
}

function somarImagens(){
    if(!imgData1 || !imgData2){
        alert("Carregue as duas imagens");
        return;
    }
    let resultado = new ImageData(imgData1.width, imgData1.height);
    for(let i=0; i<imgData1.data.length; i+=4){
        resultado.data[i]   = Math.min(imgData1.data[i]   + imgData2.data[i], 255);
        resultado.data[i+1] = Math.min(imgData1.data[i+1] + imgData2.data[i+1], 255);
        resultado.data[i+2] = Math.min(imgData1.data[i+2] + imgData2.data[i+2], 255);
        resultado.data[i+3] = 255;
    }
    mostrarResultado(resultado);
}

function subtrairImagens(){
    if(!imgData1 || !imgData2){
        alert("Carregue as duas imagens");
        return;
    }
    let resultado = new ImageData(imgData1.width, imgData1.height);
    for(let i=0; i<imgData1.data.length; i+=4){
        resultado.data[i]   = Math.max(imgData1.data[i]   - imgData2.data[i], 0);
        resultado.data[i+1] = Math.max(imgData1.data[i+1] - imgData2.data[i+1], 0);
        resultado.data[i+2] = Math.max(imgData1.data[i+2] - imgData2.data[i+2], 0);
        resultado.data[i+3] = 255;
    }
    mostrarResultado(resultado);
}

function aumentarBrilho(){
    if(!imgData1){
        alert("Carregue a imagem 1");
        return;
    }
    let valor = 50;
    let resultado = new ImageData(imgData1.width, imgData1.height);
    for(let i=0; i<imgData1.data.length; i+=4){
        resultado.data[i]   = Math.min(imgData1.data[i]   + valor, 255);
        resultado.data[i+1] = Math.min(imgData1.data[i+1] + valor, 255);
        resultado.data[i+2] = Math.min(imgData1.data[i+2] + valor, 255);
        resultado.data[i+3] = 255;
    }
    mostrarResultado(resultado);
}

function diminuirBrilho(){
    if(!imgData1){
        alert("Carregue a imagem 1");
        return;
    }
    let valor = 50;
    let resultado = new ImageData(imgData1.width, imgData1.height);
    for(let i=0; i<imgData1.data.length; i+=4){
        resultado.data[i]   = Math.max(imgData1.data[i]   - valor, 0);
        resultado.data[i+1] = Math.max(imgData1.data[i+1] - valor, 0);
        resultado.data[i+2] = Math.max(imgData1.data[i+2] - valor, 0);
        resultado.data[i+3] = 255;
    }
    mostrarResultado(resultado);
}

function multiplicarContraste(){
    if(!imgData1){
        alert("Carregue a imagem 1");
        return;
    }
    let fator = 1.2; // multiplica os pixels para aumentar contraste
    let resultado = new ImageData(imgData1.width, imgData1.height);
    for(let i=0;i<imgData1.data.length;i+=4){
        resultado.data[i]   = Math.min(Math.max(imgData1.data[i]*fator,0),255);
        resultado.data[i+1] = Math.min(Math.max(imgData1.data[i+1]*fator,0),255);
        resultado.data[i+2] = Math.min(Math.max(imgData1.data[i+2]*fator,0),255);
        resultado.data[i+3] = 255;
    }
    mostrarResultado(resultado);
}

function dividirContraste(){
    if(!imgData1){
        alert("Carregue a imagem 1");
        return;
    }
    let fator = 1.2; // divide os pixels para diminuir contraste
    let resultado = new ImageData(imgData1.width, imgData1.height);
    for(let i=0;i<imgData1.data.length;i+=4){
        resultado.data[i]   = Math.min(Math.max(imgData1.data[i]/fator,0),255);
        resultado.data[i+1] = Math.min(Math.max(imgData1.data[i+1]/fator,0),255);
        resultado.data[i+2] = Math.min(Math.max(imgData1.data[i+2]/fator,0),255);
        resultado.data[i+3] = 255;
    }
    mostrarResultado(resultado);
}

// Inicializa os inputs
processarImagem('input1', 'canvas1');
processarImagem('input2', 'canvas2');