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
        var divizq = document.getElementById('divizq');
        
        let nombrejug = document.getElementById(100+i);

        let divnomjug = document.createElement('div');
        divnomjug.id="n"+i;
        let nom = document.createTextNode(nombrejug.value);
        divnomjug.appendChild(nom);
        divizq.appendChild(divnomjug);

        var divcarton = document.createElement('div');
        divcarton.className="containers";
        divcarton.id="divr";
        
        var divfila1 = document.createElement('div');
        divfila1.className="row justify-content-start";
        
        var divfila2 = document.createElement('div');
        divfila2.className="row justify-content-start";
        
        for(let j=0; j<18; j++){

            if(j%2){
                var divn2 = document.createElement('div')
                divn2.id="c"+i+""+j;
                divn2.className="col-1";
                var numeroscart = document.createTextNode(cartones[i][j])
                divn2.appendChild(numeroscart)
                divfila2.appendChild(divn2);
            }
            else{
                var divn1 = document.createElement('div')
                divn1.id="c"+i+""+j;
                divn1.className="col-1";
                var numeroscart = document.createTextNode(cartones[i][j])
                divn1.appendChild(numeroscart)
                divfila1.appendChild(divn1);
            }

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
    
//Grilla con los numeros
function DarNumero(){    
    
    let numerols;

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
    HayGanador();

}

function HayGanador(){

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



function CrearCarton(){

    var carton=[];

    carton.push(getRandom0());
    carton.push(getRandom1a7(0));
    carton.push(getRandom1a7(10));
    carton.push(getRandom1a7(20));
    carton.push(getRandom1a7(30));
    carton.push(getRandom1a7(40));
    carton.push(getRandom1a7(50));
    carton.push(getRandom1a7(60));
    carton.push(getRandom8());

    var cartonf=[];
    for(i=0; i<9; i++){
        cartonf.push(carton[i][0])
        cartonf.push(carton[i][1])
    }
    return cartonf;
}

function getRandom0(){

    var elementos=[1,2,3,4,5,6,7,8,9];
     
    // posición aleatoria del elemento que va a ser elegido
    var posicion1 = Math.floor(Math.random() * elementos.length);

    // captura del elemento de la posición seleccionada
    var num1 = elementos[posicion1];

    // Eliminar elemento del conjunto para no repetirlo
    var elem = [];
    for(let i=0; i<9; i++){

        if(elementos[i]!=num1) {elem.push(elementos[i]);}

    }
    // posición aleatoria del elemento 2 que va a ser elegido
    var posicion2 = Math.floor(Math.random() * elem.length);
    // captura del elemento 2 de la posición seleccionada
    var num2 = elem[posicion2];

    var carton1 = [];

    carton1.push(num1,num2);

    return carton1;
}

function getRandom1a7(nu){

    var elementos=[10,11,12,13,14,15,16,17,18,19];
 
    var posicion1 = Math.floor(Math.random() * elementos.length);

    var num1 = nu + elementos[posicion1];

    var aux = elementos[posicion1];

    var elem = [];
    for(let i=0; i<10; i++){

        if(elementos[i]!=aux){

            elem.push(elementos[i]);
        }

    }
    
    var posicion2 = Math.floor(Math.random() * elem.length);
   
    var num2 = nu + elem[posicion2];

    var carton1 = [];

    carton1.push(num1,num2);

    return carton1;
}

function getRandom8(){

    var elementos=[80,81,82,83,84,85,86,87,88,89,90]; 
    
    var posicion1 = Math.floor(Math.random() * elementos.length);

    var num1 = elementos[posicion1];

    var elem = [];
    for(let i=0; i<11; i++){

        if(elementos[i]!=num1){

            elem.push(elementos[i]);
        }
    }
    
    var posicion2 = Math.floor(Math.random() * elem.length);
   
    var num2 = elem[posicion2];

    var carton1 = [];

    carton1.push(num1,num2);

    return carton1;
  }


function Ordennumeros(numscarts, cant){

    let numant = 0;
    let numerosconcat = [];
    let numsrepetidos = [];
    let numerossinrep = [];
    let elementos  = [];

    for(let i=0; i<cant; i++){
        numerosconcat = numerosconcat.concat(numscarts[i])
    }

    numerosconcat.sort();
   
    for(let j=0; j<numerosconcat.length; j++){
        if(numerosconcat[j]==numant){
            if(numsrepetidos.includes(numant)!=true){
                numsrepetidos.push(numant)
            }
        }
        numant = numerosconcat[j]    
    }
    

    for(let i=1; i<91; i++){
       
            if(numsrepetidos.includes(i)!=true){
                numerossinrep.push(i);
            }
    }
    numsrepetidos = numsrepetidos.sort(function(){return Math.random()-0.5});
    numerossinrep = numerossinrep.sort(function(){return Math.random()-0.5});

    elementos = numsrepetidos.concat(numerossinrep);

   return elementos;
}
