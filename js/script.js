let titulo, url, qntNiveis, qntPerguntas;//Variáveis globais usadas para construir o formulário do Quizz
//let objetoCriacaoQuizz;
let arrayObjQuestoes=[];
let respostasErradas=[];

let arrayObjNiveis=[];

function inicio(){
    let telaBotao = document.querySelector("main div");

    if(localStorage.length !== 0){
        telaBotao.innerHTML += `<div class="seusQuizzes">
                    <a>Seus Quizzes</a>
                    <ion-icon onclick="criarQuizz()" name="add-circle-sharp"></ion-icon>
                </div>
                <div class="meusQuizzes">
                    
                </div>`;
        telaBotao = document.querySelector("main div .meusQuizzes");
        for(let i=0; i<localStorage.length; i++){
            const itens = localStorage.getItem(localStorage.key(i));
            const itens2 = JSON.parse(itens);
            console.log(itens2.title);
            telaBotao.innerHTML += `<div class="imagensMeusQuizzes">
                        <img id="${itens2.id}" onclick="irParaOQuizz(this)" src="${itens2.image}">
                        <a id="${itens2.id}" onclick="irParaOQuizz(this)">${itens2.title}</a>
                    </div>`;

        }  
    }else{
        telaBotao.innerHTML=`<div class="botaoInicial">
        <p>Você não criou nenhum quizz ainda :(</p>
        <button onclick="criarQuizz()">Criar Quizz</button>
    </div>`;
    }
}
inicio();

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
    let contador=0;
    respostasErradas=[];
    for(let i=0; i<3; i++){
        const resposta = arrayErradasRespostas[i].value;
        const url = arrayErradasUrl[i].value;
        if(resposta!=="" && validarUrl(url)){
            respostasErradas[i]={text: resposta, image: url, isCorrectAnswer: false};
            contador++;
        }
    }
    if(contador!=0){
        return true;
    }
    return false;
}
function inserirNivel(nivel){
    nivel.querySelector('.numNivel').parentNode.classList.add('escondido');
    nivel.querySelector('.dadosNiveis').parentNode.classList.remove('escondido');
}
function inserirInformacoesNiveis(){

    const containerNiveis = document.querySelector(".container-niveis");
    containerNiveis.innerHTML="";
    for(let i=0; i<qntNiveis; i++){
        const questDeFormacaoQuizz = `<div onclick="inserirNivel(this)">
        <span>
            <div class="numNivel">
                <h2>Nível ${i+1}</h2>
                <ion-icon name="create-outline"></ion-icon>
            </div>
        </span>
        <span class="escondido">
            <div class="dadosNiveis">
                <h2>Nível ${i+1}</h2>
                <input name="tituloNivel" type="text" placeholder="Título do nível">
                <input name="porcentagemNivel" type="text" placeholder="% de acerto mínima">
                <input name="urlNivel" type="text" placeholder="URL da imagem do nível">
                <input name="descricaoNivel" type="text" placeholder="Descrição do nível">
            </div>
        </span> 
    </div>`;
        containerNiveis.innerHTML+=questDeFormacaoQuizz; 
    }
}
function criarArrayDeObjQuestoes(textoPergunta, hexadecimalCor, respostaCerta, urlCerta, i){
    let respostas=[{text: respostaCerta, image: urlCerta, isCorrectAnswer: true}];
    for(let j=1; j<=respostasErradas.length; j++){
        respostas[j] = respostasErradas[j-1];  
    }
    arrayObjQuestoes[i] = {title: textoPergunta, color: hexadecimalCor, answers: respostas};
    for(let j=0; j<qntPerguntas; j++){
        console.log(arrayObjQuestoes[j]);
    }
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
                criarArrayDeObjQuestoes(textoPergunta, hexadecimalCor, respostaCerta, urlCerta, i);
                contador++;
            }
        }
    }
   
    if(contador==qntPerguntas){
        document.querySelector('.telaDois').classList.add('escondido');
        document.querySelector('.telaTres').classList.remove('escondido');
        inserirInformacoesNiveis();
    }else{
        alert("Uma ou mais informações estão inválidas.");
    }
    
}
function irParaOQuizz(clicado){
    const quizz = JSON.parse(localStorage.getItem(`${clicado.id}`));

    alert(clicado.id);
    if(clicado.id==quizz.id){
        alert("Meu quizz"+quizz.id);
    }
}
function voltarParaHome(){
    window.location.reload(true);
}
function inserirTelaQuatro(idQuizz){

    const quizz = JSON.parse(localStorage.getItem(`${idQuizz}`)); 

    const telaQuatro = document.querySelector(".telaQuatro");

    telaQuatro.innerHTML=`<h1>Seu quizz está pronto!</h1>
            <div class="imagemDoQuizz">
                <img id="${idQuizz}" onclick="irParaOQuizz(this)" src="${quizz.image}">
                <a id="${idQuizz}" onclick="irParaOQuizz(this)">${quizz.title}</a>
            </div>
            <div class="botoesFimQuizz">    
                <button id="${idQuizz}" onclick="irParaOQuizz(this)">Acessar Quizz</button>
                <a onclick="voltarParaHome()">Voltar pra home</a>
            </div>`;

    /*for(let i=0; i<meusQuizzes.length; i++){
        if(meusQuizzes[i].id===idQuizz){
            telaQuatro.innerHTML=`<h1>Seu quizz está pronto!</h1>
            <div class="imagemDoQuizz">
                <img id="${idQuizz}" onclick="irParaOQuizz(this)" src="${meusQuizzes[i].image}">
                <a id="${idQuizz}" onclick="irParaOQuizz(this)">${meusQuizzes[i].title}</a>
            </div>
            <div class="botoesFimQuizz">    
                <button id="${idQuizz}" onclick="irParaOQuizz(this)">Acessar Quizz</button>
                <a onclick="voltarParaHome()">Voltar pra home</a>
            </div>`;
            return;
        }
    } */
    
}
function enviarQuizzParaOServidor(){
    const quizzParaOServidor = {title: titulo, image: url, questions: arrayObjQuestoes, levels:arrayObjNiveis};

    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes', quizzParaOServidor);
    
    promessa.then((resposta)=>{
        document.querySelector('.telaTres').classList.add('escondido');
        document.querySelector('.telaQuatro').classList.remove('escondido');

        localStorage.setItem(resposta.data.id, JSON.stringify(resposta.data))

        /*aqui deve ter uma função que jogará o quizz para storage 
        com a chave sendo o id único gerado pelo servidor*/
        inserirTelaQuatro(resposta.data.id);
        /*devo mandar o id único do quizz para esta função, de lá eu acesso os quizzes em storage
        e implemento na tela o html do quizz com esse id, para que com ele consigamos abrir o quizz certo*/
        
    });
    promessa.catch((resposta)=>{

        alert("DEU RUIM");
    });
}
function finalizarCriacao(){
    let contador=0;
    let contador1=0;

    const tituloNivel = document.getElementsByName('tituloNivel');
    const porcentagemNivel = document.getElementsByName('porcentagemNivel'); 
    const urlNivel = document.getElementsByName('urlNivel'); 
    const descricaoNivel = document.getElementsByName('descricaoNivel');

    
    for(let i=0; i<qntNiveis; i++){
        if(porcentagemNivel[i].value==0){
            contador1=1;
        }
    }
    if(contador1==1){
        for(let i=0; i<qntNiveis; i++){
            if(tituloNivel[i].value.length>9 && 
                (porcentagemNivel[i].value>=0 && porcentagemNivel[i].value<=100) && validarUrl(urlNivel[i].value)
                && descricaoNivel[i].value.length>29){
                
                arrayObjNiveis[i] = {title: tituloNivel[i].value, image: urlNivel[i].value, 
                    text: descricaoNivel[i].value, minValue: porcentagemNivel[i].value};

                contador++;
            }
        }
    }
    if(contador==qntNiveis){
        enviarQuizzParaOServidor();
    }else{
        alert("Um ou mais campos estão incorretos");
    }
}