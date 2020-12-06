
function CantJugadores(){

    let residuosi = document.getElementById("divizq");
    
    while (residuosi.firstChild) {
       residuosi.removeChild(residuosi.firstChild);}

    let residuosd = document.getElementById("divder");

    while (residuosd.firstChild) {
        residuosd.removeChild(residuosd.firstChild);}

    let dialognom = document.createElement('dialog');
    dialognom.id="dialogn"

    let labeld = document.createElement('label');
    let ingnom = document.createTextNode("Ingrese los nombres de los juagdores");
    labeld.appendChild(ingnom);
    dialognom.appendChild(labeld);

    let divd = document.createElement('divd');
    divd.className="form-group";
    let canjug = document.getElementById("CantCartones");

    for(let i=0; i<parseInt(canjug.value); i++){

        var inpJug = document.createElement('input')
        inpJug.type = "Text";
        inpJug.className="form-control";
        inpJug.id = 100+i;
        dialognom.appendChild(inpJug);
    }
    var btnNom = document.createElement('input');
    btnNom.onclick=function(){dialognom.close(), CrearCartones()};
    btnNom.type = "submit";
    btnNom.value="CrearCartones";
    dialognom.appendChild(btnNom);
    
    let di = document.getElementById('divizq');
    di.appendChild(dialognom)
    
    dialognom.showModal()
}
//Esta funcion crea los cartones llamando a otras funciones
//y despues los muestra en pantalla
function CrearCartones(){

    var num = document.getElementById("CantCartones");
    localStorage.setItem("cantidadcartones",num.value);
    //Crea los arreglos con los numeros de los cartones
    var cartones = [];
    for(let i=0;i<parseInt(num.value);i++){

        cartones.push(CrearCarton());
    }
    //Imprime en pantalla cada carton->
    for(let i=0; i<cartones.length; i++)
    {
        let divizq = document.getElementById('divizq');
        
        let nombrejug = document.getElementById(100+i);

        let divnomjug = document.createElement('div');
        divnomjug.id="n"+i;

        let nom = document.createTextNode(nombrejug.value);
        divnomjug.appendChild(nom);
        divizq.appendChild(divnomjug);

        var divcarton = document.createElement('div');
        divcarton.className="table";
        //divcarton.id="divr";
        
        var divfila1 = document.createElement('div');
        divfila1.className="row justify-content-start";
        
        var divfila2 = document.createElement('div');
        divfila2.className="row justify-content-start";
        
        for(let j=0; j<18; j++){

            var divn = document.createElement('div')
            divn.id="c"+i+""+j;
            divn.className="col-1";
            var numeroscart = document.createTextNode(cartones[i][j])
            divn.appendChild(numeroscart)
            
            if(j%2){
                divfila2.appendChild(divn);}
            else{
                divfila1.appendChild(divn); }
        }

        divcarton.appendChild(divfila1);
        divcarton.appendChild(divfila2);
        divizq.appendChild(divcarton)

        var br = document.createElement('br')
        divizq.appendChild(br)
        var br2 = document.createElement('br')

    }
    //Genera el arreglo con los 90 numeros random
    var numeros = Ordennumeros(cartones, num.value);
    for(let i=0; i<90; i++){
        
            localStorage.setItem(i,numeros[i]) 
    }
    //Crea la grilla donde se iran colocando los numeros del sorteo
    let divgrilla= document.createElement("div")
    divgrilla.className="containers"
    for(let i=0; i<9; i++){
        let divgrillafila = document.createElement('div')
        divgrillafila.className="row justify-content-start";
        for(let j=0; j<10; j++){

            let divgrillanum = document.createElement('div')
            divgrillanum.className="col-1"
            divgrillanum.id=j+(i*10);
            divgrillafila.appendChild(divgrillanum);
            
        }
        divgrilla.appendChild(divgrillafila)
    }
    let grilla = document.getElementById("divder")
    grilla.appendChild(divgrilla)
}   
    
//Esta funcion va completando la grilla con los numeros guardados en localstorage
//y pinta de rojo el numeros si se encuentra en algun carton
function DarNumero(){  
    
    let numerols;
    //Aqui busca el siguiente numero en ls, lo imprime y lo borra de ls
    for(let i=0; i<90; i++){

        numerols= localStorage.getItem(i)
        if(numerols!=""){
            let div = document.getElementById(i)
            let nro = document.createTextNode(numerols)
            div.appendChild(nro);
            localStorage.setItem(i,"")

            i=90;
        }
    }
    //Aqui se pintan de rojo los numeros que coinciden con el que ha salido
    let nc = localStorage.getItem("cantidadcartones");
    for(let i=0; i<nc; i++){
        for(let j=0; j<18; j++){
            let id = "c"+i+""+j;
            let nn = document.getElementById(id);
            if(nn.innerHTML==numerols){
                nn.className="col-1 text-danger";
            }
        }
    }
    BuscarGanador();
}
//Aqui busca si algun carton completo todos los numeros
function BuscarGanador(){
    //Comprueba que el carton haya completado los 18 numeros y entonces se obtiene su nombre
    let nc = localStorage.getItem("cantidadcartones");
    let g = 0;
    for(let i=0; i<nc; i++){
        for(let j=0; j<18; j++){
            let id = "c"+i+""+j;
            let nn = document.getElementById(id);
            if(nn.className=="col-1 text-danger"){
                g++;
            }        
        }
        if(g==18){
            let nombreganador = "n"+i;
            let ganador = document.getElementById(nombreganador)
            alert("Gano "+ganador.innerHTML + ", Felicitaciones! ");
        }
        g=0;
    }
}
//Crea el carton con los numeros obtenidos de acuerdo a la decena que corresponda
function CrearCarton(){

    var carton=[];

    carton.push(NroRandom0());
    carton.push(NroRandom1a7(0));
    carton.push(NroRandom1a7(10));
    carton.push(NroRandom1a7(20));
    carton.push(NroRandom1a7(30));
    carton.push(NroRandom1a7(40));
    carton.push(NroRandom1a7(50));
    carton.push(NroRandom1a7(60));
    carton.push(NroRandom8());

    //Coloca los numeros en orden
    var cartonf=[];
    for(i=0; i<9; i++){
        cartonf.push(carton[i][0])
        cartonf.push(carton[i][1])
    }
    return cartonf;
}
//Estas funciones devuelven 2 numeros random de cada decena de los cartones
function NroRandom0(){

    var elementos=[1,2,3,4,5,6,7,8,9];
    //Mezcla los numeros
    elementos = elementos.sort(function() {return Math.random() - 0.5});
    //Obtiene el primer y segundo numero
    let carton = [];
    carton[0] = elementos.shift();
    carton[1] = elementos.shift();

    return carton;
}

function NroRandom1a7(nu){

    var elementos=[10,11,12,13,14,15,16,17,18,19];
 
    elementos = elementos.sort(function() {return Math.random() - 0.5});

    let carton = [];
    carton[0] = elementos.shift() + nu;
    carton[1] = elementos.shift() + nu;

    return carton;
}

function NroRandom8(){

    var elementos=[80,81,82,83,84,85,86,87,88,89,90]; 
    
    elementos = elementos.sort(function() {return Math.random() - 0.5});

    let carton = [];
    carton[0] = elementos.shift();
    carton[1] = elementos.shift();

    return carton;
  }

//En esta funcion se crea el array con los numeros que iran saliendo en el sorteo,
//primero elije los que se repiten entre los cartones para que salgan al principio
//y asi se reducen las posibilidades de empate
function Ordennumeros(numscarts, cant){

    let numant = 0;
    let numerosconcat = [];
    let numsrepetidos = [];
    let numerossinrep = [];
    let elementos  = [];

    //Junta todos los numeros de los cartones
    for(let i=0; i<cant; i++){
        numerosconcat = numerosconcat.concat(numscarts[i])
    }
    //Los ordena
    numerosconcat.sort();
    //Crea un array con los numeros repetidos
    for(let j=0; j<numerosconcat.length; j++){
        if(numerosconcat[j]==numant){
            if(numsrepetidos.includes(numant)!=true){
                numsrepetidos.push(numant)
            }
        }
        numant = numerosconcat[j]    
    }
    //Crea un array con los numeros no repetidos
    for(let i=1; i<91; i++){
       
            if(numsrepetidos.includes(i)!=true){
                numerossinrep.push(i);
            }
    }
    //Mezcla ambos arrays
    numsrepetidos = numsrepetidos.sort(function(){return Math.random()-0.5});
    numerossinrep = numerossinrep.sort(function(){return Math.random()-0.5});
    //Concatena poniendo primero los repetidos
    elementos = numsrepetidos.concat(numerossinrep);

   return elementos;
}
