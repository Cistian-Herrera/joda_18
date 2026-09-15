const CONFIG={
  nombre:"Cristian",
  fechaISO:"03-10-2026",
  hora:"22:30",
  lugar:"En mi casa",
  whatsapp:"+5493813190816"
};

let current=1;
const screens=document.querySelectorAll(".screen");

function go(n){
  screens.forEach(s=>s.classList.remove("active"));
  document.getElementById("s"+n).classList.add("active");
  current=n;
  document.getElementById("progress").style.width=((n-1)/4*100)+"%";
  window.scrollTo(0,0);
}

const text="Se ha detectado una invitación destinada exclusivamente a vos. ¿Deseás conocer el contenido?";
let ti=0;
(function type(){
  if(ti<text.length){
    document.getElementById("typing").textContent+=text[ti++];
    setTimeout(type,28);
  }
})();

function unlock(el,index){
  const info=el.querySelector(".hiddenInfo");
  info.classList.toggle("show");
  el.classList.add("unlocked");
  el.querySelector("span:last-of-type").textContent=info.classList.contains("show")?"−":"＋";
}

function checkCode(){
  const inputs=[...document.querySelectorAll("#codebox input")];
  const code=inputs.map(x=>x.value).join("");
  const box=document.getElementById("codebox");
  if(code==="18"){
    document.getElementById("testStatus").innerHTML='<span class="success">CÓDIGO ACEPTADO. Identidad verificada.</span>';
    setTimeout(()=>go(4),500);
  }else{
    box.classList.remove("shake");void box.offsetWidth;box.classList.add("shake");
    document.getElementById("testStatus").innerHTML='<span class="red">Código incorrecto. Pista: ¿qué edad estamos celebrando?</span>';
    inputs.forEach(x=>x.value="");inputs[0].focus();
  }
}

document.querySelectorAll("#codebox input").forEach((input,i,arr)=>{
  input.addEventListener("input",()=>{if(input.value && arr[i+1])arr[i+1].focus()});
  input.addEventListener("keydown",e=>{if(e.key==="Backspace"&&!input.value&&arr[i-1])arr[i-1].focus()});
});

function toast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2200);
}

function confirmar(){
  const msg=encodeURIComponent("Hola! Confirmo mi asistencia al cumpleaños de 18 de "+CONFIG.nombre+" :)");
  window.open("https://wa.me/"+CONFIG.whatsapp+"?text="+msg,"_blank");
}

function addCalendar(){
  const start=CONFIG.fechaISO.replaceAll("-","")+"T"+CONFIG.hora.replace(":","")+"00";
  const d=new Date(CONFIG.fechaISO+"T"+CONFIG.hora+":00");
  const end=new Date(d.getTime()+4*60*60*1000);
  const pad=n=>String(n).padStart(2,"0");
  const fmt=x=>x.getFullYear()+pad(x.getMonth()+1)+pad(x.getDate())+"T"+pad(x.getHours())+pad(x.getMinutes())+"00";
  const ics=["BEGIN:VCALENDAR","VERSION:2.0","BEGIN:VEVENT","DTSTART:"+start,"DTEND:"+fmt(end),"SUMMARY:Cumpleaños de 18 — "+CONFIG.nombre,"LOCATION:"+CONFIG.lugar,"DESCRIPTION:Cumpleaños de 18. ¡Nos vemos!","END:VEVENT","END:VCALENDAR"].join("\r\n");
  const blob=new Blob([ics],{type:"text/calendar"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="cumpleanos-18.ics";a.click();URL.revokeObjectURL(a.href);
  toast("Calendario preparado");
}
