var txtarea="";
var btnLista;
var link=null;
var n=1;
var t=1;

function creaLista(){
	/*Obtengo los la ubicacion del boton de agregar lista*/
    
	btnLista=document.getElementById("btnLista");
    id_div=btnLista.parentElement.getAttribute("id");
    div_old=btnLista.parentElement;
    section=div_old.parentElement;

	div_new=document.createElement("div");
    div_new.setAttribute("class","lista inline");
    div_new.ondragover=allowDrop;
    div_new.ondrop=drop;
    
	txtarea=document.createElement("textarea");
	btn=document.createElement("button");
    btn.setAttribute("class","btn btn-info");
	btn.appendChild(document.createTextNode("Guardar"));
    

	div_new.appendChild(txtarea);
	div_new.appendChild(btn);
	section.replaceChild(div_new,div_old);
	txtarea.focus();
	btn.addEventListener("click",guardaLista);
}

function guardaLista(e){    
	div_old=e.target.parentElement;
    section=div_old.parentElement;
    div_new = document.createElement("div");
    div_new.setAttribute("class","lista inline");
    div_new.setAttribute("id","lista"+n);
    div_new.ondragover=allowDrop;
    div_new.ondrop=drop;
    
	if(txtarea.value!=null && txtarea.value!=""){
		label=document.createElement("label");
        label.setAttribute("class","well well-sm")
		label.appendChild(document.createTextNode(txtarea.value));
        div_new.appendChild(label);
		section.replaceChild(div_new,div_old);
        div_new.appendChild(crearLink());
        
        div_new2=document.createElement("div");
        div_new2.setAttribute("class","inline");
        div_new2.appendChild(btnLista);
        section.appendChild(div_new2);
	}
    n++;
}

function crearLink(){
    link=document.createElement("a");
    link.setAttribute("href","#");
    link.appendChild(document.createTextNode("Agregar Tarjeta..."));
    link.addEventListener("click",creaTarjeta, false);
    return link;
}

function creaTarjeta(e){
    liga= e.target;
    div_principal=liga.parentElement;
    div_tarjeta=document.createElement("div");
    txt_tarjeta=document.createElement("textarea");
    btn_tarjeta=document.createElement("button");
    btn_tarjeta.appendChild(document.createTextNode("Aceptar"));
    btn_tarjeta.setAttribute("class","btn btn-info");
    btn_tarjeta.addEventListener("click",guardaTarjeta);
   
    div_tarjeta.appendChild(txt_tarjeta);
    div_tarjeta.appendChild(btn_tarjeta);
    
    div_principal.replaceChild(div_tarjeta,liga);
    txt_tarjeta.focus();
}

function guardaTarjeta(e){
    txtArea=e.target.previousSibling;
    div_tarjeta=e.target.parentElement;
    if(txtArea.value!=null && txtArea.value!=""){
        labelTarjeta=document.createElement("label");
        labelTarjeta.setAttribute("id","tar"+t);
        labelTarjeta.setAttribute("class","well")
        labelTarjeta.appendChild(document.createTextNode(txtArea.value));
        labelTarjeta.ondragstart=dragStart;
        labelTarjeta.ondragend=dragEnd;
        labelTarjeta.setAttribute("draggable",true);
        div_tarjeta.parentElement.replaceChild(labelTarjeta,div_tarjeta);
        
        labelTarjeta.parentElement.appendChild(crearLink());
        t++;
    }   
}

function dragStart(e){
    e.dataTransfer.setData("Text",e.target.id);
    e.dataTransfer.setData("otro",e.target.parentElement.id);
    e.target.setAttribute("class","well wellStart");
}
function dragEnd(e){
    e.target.setAttribute("class","well wellEnd");
    console.log(e);
}
function allowDrop(e){

   if(e.target.className=="lista inline"){
         e.preventDefault();
         e.target.style.borderColor="yellow";
    }
    return;
}
function drop(e){
    var data = e.dataTransfer.getData("Text");
    var idOriginal = e.dataTransfer.getData("otro");
    e.target.insertBefore(document.getElementById(data),e.target.childNodes[1]);
    e.preventDefault();
    e.target.style.borderColor="#5bc0de";
    document.getElementById(idOriginal).style.borderColor="#5bc0de";

}