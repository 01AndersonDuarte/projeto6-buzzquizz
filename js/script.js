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
function irParaCriarPerguntas(){
    let contador=0;
    for(let i=0; i<4; i++){
        let input = document.getElementsByName("criacaoQuizz")[i];
        let valor = input.value;
        if(valor===""){
            input.classList.add('inputAlerta');
            setTimeout(()=>{
                input.classList.remove('inputAlerta');
            }, 1000);
            return;
        }
    }
    for(let i=0; i<4; i++){
        
        let input = document.getElementsByName("criacaoQuizz")[i];
        let valor = input.value;
        
        if(i===0 && (valor.length>19 && valor.length<66)){
            contador++;
        }else if(i===1 && validarUrl(valor)){
            contador++;
        }else if(i===2 && valor>2){
            contador++;
        }else if(i===3 && valor>1){
            contador++;
        }else{
            alert("Uma ou mais informações estão inválidas, digite novamente!");
        }

    }
    if(contador===4){
        alert("Sucesso, informações válidas!");
    }
}