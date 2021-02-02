alert(`Candidatos disponíveis para voto: ${etapas[0].titulo}\n ->Candidato: ${etapas[0].candidatos[0].nome} \n-> Partido: ${etapas[0].candidatos[0].partido}\n-> Numero: ${etapas[0].candidatos[0].numero}\n
-> Candidato: ${etapas[0].candidatos[1].nome}\n->  Partido: ${etapas[0].candidatos[1].partido}\n-> Numero: ${etapas[0].candidatos[1].numero}\n`);
//variaveis de controle de informações
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

//variaveis de ambiente
let etapaAtual = 0;
var numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = ' ';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numero; i++) {
        if (i === 0) {
            numeroHtml += '<div class = "numero pisca"></div>';
        } else {
            numeroHtml += '<div class = "numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';

        for (i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="assets/images/${candidato.fotos[i].url}" alt="Foto do candidato ${candidato.nome}" />${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-image"><img src="assets/images/${candidato.fotos[i].url}" alt="Foto do candidato ${candidato.nome}" />${candidato.fotos[i].legenda}</div>`;
            }
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO<div/>';

    }

}

//função dos botoões
function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero != null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling != null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }

    }
}

function branco() {
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO<div/>';
        lateral.innerHTML = '';
    } else {
        alert("!Para votar em branco certifique-se de que não há nenhum numero digitado!");
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length == etapa.numero) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
            alert(`Candidatos disponíveis para voto: ${etapas[1].titulo}\n-> Candidato: ${etapas[1].candidatos[0].nome} | Vice: ${etapas[1].candidatos[0].vice} \n-> Partido: ${etapas[1].candidatos[0].partido}\n-> Numero: ${etapas[1].candidatos[0].numero}\n
-> Candidato: ${etapas[1].candidatos[1].nome} | Vice: ${etapas[1].candidatos[1].vice}\n->  Partido: ${etapas[1].candidatos[1].partido}\n-> Numero: ${etapas[1].candidatos[1].numero}`);

        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM<br/><span>Feito com ❤ por Ernane Ferreira.</span><div/>';
            console.log(votos);
        }
    }
}

comecarEtapa();