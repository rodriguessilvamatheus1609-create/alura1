// Configuração do Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ajustar tamanho do canvas
canvas.width = 600;
canvas.height = 800;

// Variáveis para rastreamento do mouse
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

// Cores originais da Mona Lisa
const colors = {
    skin: '#D4A574',
    darkSkin: '#B8885A',
    hair: '#3D2817',
    eye: '#3D2817',
    eyeWhite: '#FFFFFF',
    iris: '#6B4423',
    mouth: '#A0714F',
    dress: '#2D5016',
    darkDress: '#1a3009',
    background: '#8B7355',
    highlight: '#E8D4B8'
};

// Ouvir movimento do mouse
document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

// Ouvir toque para dispositivos móveis
document.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.touches[0].clientX - rect.left;
    mouseY = e.touches[0].clientY - rect.top;
});

// Função para desenhar um círculo
function drawCircle(x, y, radius, fillColor, strokeColor = null, strokeWidth = 0) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    
    if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
    }
}

// Função para desenhar elipse
function drawEllipse(x, y, radiusX, radiusY, fillColor, angle = 0) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, angle, 0, Math.PI * 2);
    ctx.fill();
}

// Função para calcular o ângulo e distância até o mouse
function getEyeDirection(eyeX, eyeY) {
    const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
    return angle;
}

// Função para desenhar olho que segue o mouse
function drawEye(eyeX, eyeY, eyeRadius) {
    // Branco do olho
    drawCircle(eyeX, eyeY, eyeRadius, colors.eyeWhite);
    
    // Calcular posição da íris
    const angle = getEyeDirection(eyeX, eyeY);
    const irisRadius = eyeRadius * 0.5;
    const irisDistance = eyeRadius * 0.5;
    
    const irisX = eyeX + Math.cos(angle) * irisDistance;
    const irisY = eyeY + Math.sin(angle) * irisDistance;
    
    // Desenhar íris
    drawCircle(irisX, irisY, irisRadius * 0.8, colors.iris);
    
    // Desenhar pupila
    drawCircle(irisX, irisY, irisRadius * 0.4, colors.eye);
    
    // Desenhar reflexo de luz
    drawCircle(irisX - irisRadius * 0.2, irisY - irisRadius * 0.2, irisRadius * 0.2, colors.highlight);
}

// Função para desenhar cabelo
function drawHair(x, y, width, height) {
    ctx.fillStyle = colors.hair;
    
    // Cabelo principal
    ctx.beginPath();
    ctx.ellipse(x, y - height * 0.2, width * 0.55, height * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Cabelo lateral esquerdo
    ctx.fillStyle = colors.darkSkin;
    ctx.beginPath();
    ctx.bezierCurveTo(x - width * 0.35, y, x - width * 0.4, y + height * 0.3, x - width * 0.25, y + height * 0.4);
    ctx.bezierCurveTo(x - width * 0.2, y + height * 0.3, x - width * 0.25, y, x - width * 0.35, y);
    ctx.fill();
}

// Função para desenhar rosto
function drawFace(x, y, faceWidth, faceHeight) {
    // Rosto principal - formato de ovo
    ctx.fillStyle = colors.skin;
    ctx.beginPath();
    ctx.ellipse(x, y, faceWidth * 0.45, faceHeight * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Sombras do rosto
    ctx.fillStyle = colors.darkSkin;
    ctx.globalAlpha = 0.3;
    
    // Sombra esquerda
    ctx.beginPath();
    ctx.ellipse(x - faceWidth * 0.25, y, faceWidth * 0.2, faceHeight * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Sombra direita
    ctx.beginPath();
    ctx.ellipse(x + faceWidth * 0.25, y, faceWidth * 0.15, faceHeight * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.globalAlpha = 1;
    ctx.fillStyle = colors.skin;
}

// Função para desenhar olhos
function drawEyes(x, y, faceWidth, faceHeight) {
    const eyeRadius = faceWidth * 0.08;
    const leftEyeX = x - faceWidth * 0.15;
    const rightEyeX = x + faceWidth * 0.15;
    const eyeY = y - faceHeight * 0.15;
    
    drawEye(leftEyeX, eyeY, eyeRadius);
    drawEye(rightEyeX, eyeY, eyeRadius);
}

// Função para desenhar nariz
function drawNose(x, y, faceWidth) {
    ctx.fillStyle = colors.darkSkin;
    ctx.globalAlpha = 0.4;
    
    // Triângulo do nariz
    ctx.beginPath();
    ctx.moveTo(x, y - faceWidth * 0.1);
    ctx.lineTo(x - faceWidth * 0.05, y + faceWidth * 0.1);
    ctx.lineTo(x + faceWidth * 0.02, y + faceWidth * 0.1);
    ctx.closePath();
    ctx.fill();
    
    ctx.globalAlpha = 1;
}

// Função para desenhar boca
function drawMouth(x, y, faceWidth) {
    ctx.strokeStyle = colors.mouth;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.7;
    
    // Sorriso característico da Mona Lisa
    ctx.beginPath();
    ctx.bezierCurveTo(
        x - faceWidth * 0.15, y + faceWidth * 0.15,
        x, y + faceWidth * 0.25,
        x + faceWidth * 0.15, y + faceWidth * 0.15
    );
    ctx.stroke();
    
    ctx.globalAlpha = 1;
}

// Função para desenhar vestido/corpo
function drawDress(x, y, faceWidth, faceHeight) {
    ctx.fillStyle = colors.dress;
    
    // Corpo do vestido
    ctx.beginPath();
    ctx.moveTo(x - faceWidth * 0.5, y + faceHeight * 0.4);
    ctx.bezierCurveTo(
        x - faceWidth * 0.55, y + faceHeight * 0.8,
        x - faceWidth * 0.3, y + faceHeight * 1.2,
        x, y + faceHeight * 1.3
    );
    ctx.bezierCurveTo(
        x + faceWidth * 0.3, y + faceHeight * 1.2,
        x + faceWidth * 0.55, y + faceHeight * 0.8,
        x + faceWidth * 0.5, y + faceHeight * 0.4
    );
    ctx.closePath();
    ctx.fill();
    
    // Sombra do vestido
    ctx.fillStyle = colors.darkDress;
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.moveTo(x - faceWidth * 0.3, y + faceHeight * 0.6);
    ctx.bezierCurveTo(
        x - faceWidth * 0.35, y + faceHeight * 1.0,
        x - faceWidth * 0.2, y + faceHeight * 1.2,
        x, y + faceHeight * 1.3
    );
    ctx.lineTo(x, y + faceHeight * 0.6);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
}

// Função para desenhar paisagem de fundo (Landscape)
function drawBackground() {
    // Céu
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Montanhas ao fundo
    ctx.fillStyle = '#8B7D6B';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.7);
    ctx.bezierCurveTo(150, 300, 300, 200, 600, 350);
    ctx.lineTo(600, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();
}

// Função principal para desenhar tudo
function draw() {
    // Limpar canvas
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Coordenadas base
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const faceWidth = 150;
    const faceHeight = 180;
    
    // Desenhar vestido primeiro (fundo)
    drawDress(centerX, centerY, faceWidth, faceHeight);
    
    // Desenhar cabelo
    drawHair(centerX, centerY - faceHeight * 0.3, faceWidth, faceHeight);
    
    // Desenhar rosto
    drawFace(centerX, centerY, faceWidth, faceHeight);
    
    // Desenhar olhos que seguem o mouse
    drawEyes(centerX, centerY, faceWidth, faceHeight);
    
    // Desenhar nariz
    drawNose(centerX, centerY, faceWidth);
    
    // Desenhar boca (sorriso característico)
    drawMouth(centerX, centerY, faceWidth);
    
    // Solicitar próximo frame
    requestAnimationFrame(draw);
}

// Iniciar animação
draw();