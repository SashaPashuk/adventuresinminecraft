const addToastNotification=({message:t,duration:i=1500})=>{const e=document.querySelector(".toast-container");t=`
      <div>
        <p>${t}</p>
      </div>
    `;e.classList.remove("hidden"),e.innerHTML=t,setTimeout(()=>{e.classList.add("hidden"),e.innerHTML=""},i)};export{addToastNotification};