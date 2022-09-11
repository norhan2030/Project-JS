let backgroundOption=true;
let backinterval;
let backgroundlocalitem=localStorage.getItem("background_Option")
if(backgroundlocalitem!==null){
    //console.log(typeof(backgroundlocalitem))
    if(backgroundlocalitem==="true"){
        backgroundOption=true;
    }else{
        backgroundOption=false; 
    }
    document.querySelectorAll(".random-backgrounds span").forEach(el=>{
        el.classList.remove("active")
    });
    if(backgroundlocalitem==="true"){
        document.querySelector(".random-backgrounds .yes").classList.add("active")
    }else{
        document.querySelector(".random-backgrounds .no").classList.add("active")
    }
}



document.querySelector(".toggle-settings i").onclick=function(){
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
};



let maincolor=localStorage.getItem("color-option");
if(maincolor !==null){
    // console.log("not null");
    // console.log(localStorage.getItem("color-option"))
    document.documentElement.style.setProperty('--main--color',localStorage.getItem("color-option"))
    //الحتة دي عشان لما بعمل ريفرش كلاس الاكتف بيكون علي اول عنصر في الليست و احنا عايزينه يكون علي العنصر الللي موجود في اللوكل استورج
    document.querySelectorAll(".colors-list li").forEach(element=>{
        element.classList.remove("active"); 
        if(element.dataset.color===maincolor){
            element.classList.add("active")
        }
       
    })
}
let lists=document.querySelectorAll(".colors-list li")
lists.forEach(li =>{
    li.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty('--main--color',e.target.dataset.color)
        localStorage.setItem("color-option",e.target.dataset.color);
        e.target.parentElement.querySelectorAll(".active").forEach(element=>{
            element.classList.remove("active"); 
           
        })
        e.target.classList.add("active")
    });
});
// const colorli = document.querySelectorAll(".colors-list li");
// colorli.forEach((li) => {
//   li.addEventListener("click", (e) => {
//     document.documentElement.style.setProperty(
//       "--main--color",
//       e.target.getAttribute("data-color")
//     );
//   });
// });





//دا لية علاقة random background options
let randomBackgrounds=document.querySelectorAll(".random-backgrounds span")
randomBackgrounds.forEach(sp =>{
    sp.addEventListener("click",(e)=>{
        e.target.parentElement.querySelectorAll(".active").forEach(element=>{
            element.classList.remove("active"); 
           
        })
        e.target.classList.add("active")
        if(e.target.dataset.back==="yes"){
            backgroundOption=true
            randomizeImgs();
            localStorage.setItem("background_Option",true)
        }else{
            backgroundOption=false;
            clearInterval(backinterval)
            localStorage.setItem("background_Option",false)
        }

    });
});


let landind=document.querySelector('.landing-page')
let images=["1.jfif","2.jfif","3.jpg","4.jfif","5.jpg"]

function randomizeImgs(){
    if(backgroundOption===true){
        backinterval=setInterval(()=>{
            let random=Math.floor(Math.random() * images.length);
            landind.style.backgroundImage='url("image/' + images[random] + '")';
        },1000)
    }
}


randomizeImgs()




//select skills selector
let ourskills=document.querySelector(".skills")
window.onscroll=function(){
    let skillsoffsettop=ourskills.offsetTop;//height of top part of skills
    let skillsOuterHeight=ourskills.offsetHeight;//height of skills part
    let windowHeight=this.innerHeight;//height of window
    let windowscrolltop=this.pageYOffset;//height of window

    if(windowscrolltop>(skillsoffsettop+skillsOuterHeight-windowHeight)){
        let allSpanSkills=document.querySelectorAll(".skills .skill-box .skill-progress span")
        allSpanSkills.forEach(spanskill=>{
            spanskill.style.width=spanskill.dataset.progress;
            // let num = spanskill.parentElement.getAttribute("data-progress");
            // spanskill.style.cssText = `width:${num}`;
        })
    }
};


//create opoup

let Gallary=document.querySelectorAll(".gallery img")
Gallary.forEach(img=>{
    img.addEventListener('click',(e)=>{
        let overlaydiv=document.createElement("div")
        overlaydiv.className="popup"
        document.body.appendChild(overlaydiv);

        let popupbox=document.createElement("div")
        popupbox.className="popup-box"
        
        if(img.alt!==null){
            let imgHeading=document.createElement("h4")
            let imgtext=document.createTextNode(img.alt)
            imgHeading.appendChild(imgtext)
            popupbox.appendChild(imgHeading)
        }

        let popupimg=document.createElement("img")
        popupimg.src=img.src;
        popupbox.appendChild(popupimg)
        document.body.appendChild(popupbox)

        //create close button
        let closeButton=document.createElement("span")
        let closeButtontext=document.createTextNode("x")
        closeButton.appendChild(closeButtontext)
        closeButton.className="close-button"
        popupbox.appendChild(closeButton);

   
    })
})

//close popup 
document.addEventListener("click",function(e){
    if(e.target.className=="close-button"){
        e.target.parentNode.remove();
        document.querySelector(".popup").remove()
    }
})


//bullets
let allBullets=document.querySelectorAll(".nav-bullets .bullet")
allBullets.forEach(bullet=>{
    bullet.addEventListener("click",(e)=>{
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior:"smooth"
        })
    })

})

let alllinks=document.querySelectorAll(".links a");
alllinks.forEach(link=>{
    link.addEventListener("click",(e)=>{
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior:"smooth"
        })
    })

})

// function scroll(elements){
//     elements.forEach(ele=>{
//         ele.addEventListener("click",(e)=>{

//             e.preventDefult();
//             document.querySelector(e.target.dataset.section).scrollIntoView({
//                 behavior:"smooth"
//             })
//         })
    
//     })
// }

// scroll(allBullets);
// scroll(alllinks);


let bulletspan=document.querySelectorAll(".bullets-option span")
let boulletcontainer=document.querySelector(".nav-bullets")
let bulletlocalstorage=localStorage.getItem("bullets-option")


if(bulletlocalstorage!==null){
    bulletspan.forEach(span=>{
        span.classList.remove('active')

    })
    if(bulletlocalstorage==="block"){
        boulletcontainer.style.display="block"
        document.querySelector(".bullets-option .yes").classList.add("active")

    }else{
        boulletcontainer.style.display="none"
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}
bulletspan.forEach(s=>{
    s.addEventListener("click",(e)=>{
        if(s.dataset.display==='show'){
            boulletcontainer.style.display="block"
            localStorage.setItem("bullets-option","block")
        }else{
            boulletcontainer.style.display="none"
            localStorage.setItem("bullets-option","none")
        }
        e.target.parentElement.querySelectorAll(".active").forEach(element=>{
            element.classList.remove("active"); 
           
        })
        e.target.classList.add("active")
    })
})



//reset buttom
document.querySelector(".reset-option").onclick=function(){
    localStorage.clear();//دى هتمسح اللي في اللومل استورج كلوهم
    // localStorage.removeItem("background_Option")
    // localStorage.removeItem("color-option")     //استخدم دى لما يكون في حاجات تاني في اللوكل استورج مش عايزة احذفها
    // localStorage.removeItem("bullets-option")
    window.location.reload();
}



//toggle menu
let toggleBtn=document.querySelector(".toggle-menu")
let tLinks=document.querySelector(".links")

toggleBtn.onclick=function(){
    // e.stopPropagation();
    this.classList.toggle("menu-active")
    tLinks.classList.toggle("open")
}

//click anywhere outside menu
document.addEventListener("click",e=>{
    if(e.target!==toggleBtn&&e.target!==tLinks){
        //check if menu is open
        if(tLinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active")
            tLinks.classList.toggle("open")
        }
    }
})


//stop propagation onn menu
// tLinks.onclick=function(e){
//     e.stopPropagation();

// }