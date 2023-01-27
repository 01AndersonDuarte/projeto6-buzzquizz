let titulo, url, qntNiveis, qntPerguntas;//Variáveis globais usadas para construir o formulário do Quizz
//let objetoCriacaoQuizz;
function criarQuizz(){
    document.querySelector('main').classList.add('escondido');
    document.querySelector('.criarQuizz').classList.remove('escondido');
}
function validarUrl(texto) {
    try{
     let url = new URL(texto);
     return url;
    }catch(err){
       return 0;
   }
}
function inserirInformacoesQuizz(){
    
    const containerPerguntas = document.querySelector(".container-perguntas");
    containerPerguntas.innerHTML="";
    for(let i=0; i<qntPerguntas; i++){
        const questDeFormacaoQuizz = `<div onclick="inserirPergunta(this)">
    <span>
        <div class="numPergunta">
            <h2>Pergunta ${i+1}</h2>
            <ion-icon name="create-outline"></ion-icon>
        </div>
    </span>
    <span class="escondido">
        <div class="dadosPerguntas">
            <div class="blocoPergunta">
                <h2>Pergunta ${i+1}</h2>
                <input class="textoPergunta${i}" type="text" placeholder="Texto da pergunta">
                <input class="corFundo${i}" type="text" placeholder="Cor de fundo da pergunta">
            </div>
            <div class="blocoRCorreta">
                <h2>Resposta correta</h2>
                <input class="respostaCerta${i}" type="text" placeholder="Resposta correta">
                <input class="urlCerta${i}" type="text" placeholder="URL da imagem">
            </div>
            <div class="blocoRIncorreta">
                <h2>Respostas incorretas</h2>
                <input name="respostaErrada${i}" type="text" placeholder="Resposta incorreta 1">
                <input name="urlErrada${i}" type="text" placeholder="URL da imagem">
                <input name="respostaErrada${i}" type="text" placeholder="Resposta incorreta 2">
                <input name="urlErrada${i}" type="text" placeholder="URL da imagem">
                <input name="respostaErrada${i}" type="text" placeholder="Resposta incorreta 3">
                <input name="urlErrada${i}"  type="text" placeholder="URL da imagem">
            </div>
        </div>
    </span>
    
</div>`;
        containerPerguntas.innerHTML+=questDeFormacaoQuizz; 
    }
}
function verificaCamposVazios(valor, input){
    if(valor===""){
        input.classList.add('inputAlerta');
        setTimeout(()=>{
            input.classList.remove('inputAlerta');
        }, 1000);
        return 0;
    }
    return 1;
}
function irParaCriarPerguntas(){
    let contador=0;

    for(let i=0; i<4; i++){
        let input = document.getElementsByName("criacaoQuizz")[i];
        let valor = input.value;
        if(verificaCamposVazios(valor, input)===0){
            return;
        }
    }
    for(let i=0; i<4; i++){
        let input = document.getElementsByName("criacaoQuizz")[i];
        let valor = input.value;
            
        if(i===0 && (valor.length>19 && valor.length<66)){
            contador++;
            titulo = valor;
        }else if(i===1 && validarUrl(valor)){
            contador++;
            url = valor;
        }else if(i===2 && valor>2){
            contador++;
            qntPerguntas = valor; //quantidade de perguntas
        }else if(i===3 && valor>1){
            contador++;
            qntNiveis = valor; //quantidade de níveis
        }else{
            alert("Uma ou mais informações estão inválidas, digite novamente!");
        }

    }
    if(contador===4){
        document.querySelector('.telaUm').classList.add('escondido');
        document.querySelector('.telaDois').classList.remove('escondido');
        //Chamar a função de incrementar as informações na tela
        inserirInformacoesQuizz();
    }
}

function inserirPergunta(pergunta){
    pergunta.querySelector('.numPergunta').parentNode.classList.add('escondido');
    pergunta.querySelector('.dadosPerguntas').parentNode.classList.remove('escondido');
}
function ehHexadecimal(hexadecimalCor){
    const arrayLetras = ['A', 'B',  'C',  'D',  'E',  'F'];
    const arrayNumeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let contador=0;

    if((hexadecimalCor.length===7) && (hexadecimalCor[0]==="#")){
        for(let i=1; i<7; i++){
            for(let j=0; j<6; j++){
                if(hexadecimalCor[i]===arrayLetras[j]){
                    contador++;
                }
            }
            for(let j=0; j<10; j++){
                if(hexadecimalCor[i]==arrayNumeros[j]){
                    contador++;
                }
            }
           
        }
        if(contador===6){
            return true;
        } 
    }
    return false;
}
function verificaRespostasErradas(arrayErradasRespostas, arrayErradasUrl){
    for(let i=0; i<3; i++){
        const resposta = arrayErradasRespostas[i].value;
        const url = arrayErradasUrl[i].value;
        if(resposta!=="" && validarUrl(url)){
            return true;
        }
    }
    return false;
}
function irParaCriarNiveis(){
    let contador=0;

    for(let i=0; i<qntPerguntas; i++){
        
        const textoPergunta = document.querySelector(`.textoPergunta${i}`).value;
        const corFundo = document.querySelector(`.corFundo${i}`).value;
        let hexadecimalCor = corFundo.replaceAll(" ", "");

        const respostaCerta = document.querySelector(`.respostaCerta${i}`).value;
        const urlCerta = document.querySelector(`.urlCerta${i}`).value;

        const respostaErrada = document.getElementsByName(`respostaErrada${i}`);
        const urlErrada = document.getElementsByName(`urlErrada${i}`);
        
        if(textoPergunta.length>19 && ehHexadecimal(hexadecimalCor)){
            if(respostaCerta!=="" && validarUrl(urlCerta) && verificaRespostasErradas(respostaErrada, urlErrada)){
                contador++;
            }
        }
    }
   
    if(contador==qntPerguntas){
        alert("Abrir próxima tela");
    }else{
        alert("Uma ou mais informações estão inválidas.");
    }
    
}