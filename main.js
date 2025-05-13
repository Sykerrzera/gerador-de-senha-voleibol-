const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

// Funções para diminuir ou aumentar o tamanho da senha
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// Atualiza a senha sempre que um checkbox for marcado ou desmarcado
for (i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Gera a senha conforme os critérios
geraSenha();

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }
    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }
    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }
    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }
    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

// Classifica a força da senha com base na entropia e dá um toque de voleibol
function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    
    // Força do bloqueio (tema de voleibol)
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
        forcaSenha.textContent = "Bloqueio Imbatível: Forte!";
    } else if (entropia > 35 && entropia <= 57) {
        forcaSenha.classList.add('media');
        forcaSenha.textContent = "Defesa Sólida: Média!";
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
        forcaSenha.textContent = "Bloqueio Fraco: Fraca!";
    }

    // Exibe o tempo estimado para quebrar a senha (metáfora de um time adversário)
    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Um time adversário pode levar até " + Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)) + " dias para quebrar esse bloqueio!";
}
