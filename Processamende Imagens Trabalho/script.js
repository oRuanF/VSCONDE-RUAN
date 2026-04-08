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
    let fator = 1.2; 
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
    let fator = 1.2; 
    let resultado = new ImageData(imgData1.width, imgData1.height);
    for(let i=0;i<imgData1.data.length;i+=4){
        resultado.data[i]   = Math.min(Math.max(imgData1.data[i]/fator,0),255);
        resultado.data[i+1] = Math.min(Math.max(imgData1.data[i+1]/fator,0),255);
        resultado.data[i+2] = Math.min(Math.max(imgData1.data[i+2]/fator,0),255);
        resultado.data[i+3] = 255;
    }
    mostrarResultado(resultado);
}

function salvarImagem(){
    const canvas = document.getElementById("canvasResultado");

    if(canvas.width === 0){
        alert("Nenhuma imagem para salvar!");
        return;
    }
    const link = document.createElement("a");
    link.download = "imagem_resultado.png";
    link.href = canvas.toDataURL("image/png");

    link.click();
}

function converterParaCinza(){
    if(!imgData1){
        alert("Carregue a imagem 1");
        return;
    }

    let resultado = new ImageData(imgData1.width, imgData1.height);

    for(let i = 0; i < imgData1.data.length; i += 4){
        let r = imgData1.data[i];
        let g = imgData1.data[i+1];
        let b = imgData1.data[i+2];

        let cinza = 0.299 * r + 0.587 * g + 0.114 * b;

        resultado.data[i]   = cinza;
        resultado.data[i+1] = cinza;
        resultado.data[i+2] = cinza;
        resultado.data[i+3] = 255;
    }

    mostrarResultado(resultado);
}

function inverterImagem() {
    const canvas = document.getElementById("canvas1");
    const ctxRes = document.getElementById("canvasResultado").getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    const canvasRes = document.getElementById("canvasResultado");
    canvasRes.width = width;
    canvasRes.height = height;

    // Espelha horizontalmente
    ctxRes.save();
    ctxRes.scale(-1, 1); // inverte no eixo X
    ctxRes.drawImage(canvas, -width, 0);
    ctxRes.restore();
}
function inverterVertical() {
    const c = document.getElementById("canvas1");
    const r = document.getElementById("canvasResultado");

    r.width = c.width;
    r.height = c.height;

    const ctx = r.getContext("2d");

    ctx.scale(1, -1);
    ctx.drawImage(c, 0, -c.height);
}
processarImagem('input1', 'canvas1');
processarImagem('input2', 'canvas2');