// settings Box
document.querySelector(".gear i").onclick = function () {
    this.classList.toggle("fa-spin")
    document.querySelector(".setting-box").classList.toggle("active")
}

document.querySelectorAll(".colors ul li").forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
        localStorage.setItem("color",e.target.dataset.color)
        document.querySelectorAll(".colors ul li").forEach((e) => {
            e.classList.remove("active")
        })
        e.target.classList.toggle("active");
    })
})

window.onload = function () {
    if (localStorage.getItem("color")) {
        document.documentElement.style.setProperty("--main-color",localStorage.getItem("color"))
        document.querySelectorAll(".colors ul li").forEach(li => {
            if (li.dataset.color ==  localStorage.getItem("color")) {
                li.classList.add("active")
            }
        })
    }
    if (localStorage.getItem("randomBackground") == "Yes") {
        document.querySelectorAll(".background button")[0].classList.add("active")
        allBackground  = ["background1.jpg","background2.jpg","background3.jpg","background4.jpg"]
        changBackground ()
    } else {
        document.querySelectorAll(".background button")[1].classList.add("active")
    }
    if (localStorage.getItem("showBullets") == "Yes") {
        bullets[0].classList.add("active")
        document.querySelector(".bullets").style.display = "block"
    } else {
        bullets[1].classList.add("active")
        document.querySelector(".bullets").style.display = "none"
    }
}



let allBackground;
function changBackground () {
    
    intervalBackground = setInterval(function () {
        let landingBage = document.querySelector(".landing")
        let randomBackground = Math.floor(Math.random() * allBackground.length)

        landingBage.style.backgroundImage = `url(images/${allBackground[randomBackground]})`;
    },3500)
}
document.querySelectorAll(".background button").forEach(e  => {
    e.addEventListener("click", (e) => {
        e.preventDefault()
        document.querySelectorAll(".background button").forEach(e => {
            e.classList.remove("active")
        })
        e.target.classList.add("active")
        localStorage.setItem("randomBackground",e.target.innerHTML)
        if (e.target.innerHTML === "Yes") {
            allBackground  = ["background1.jpg","background2.jpg","background3.jpg","background4.jpg"]
            changBackground ()
        } else  allBackground  = ["background1.jpg"]

    })
})

let bullets = document.querySelectorAll(".showBullets button");

bullets.forEach(e => {
    e.addEventListener("click", e => {
        bullets.forEach(e => {
            e.classList.remove("active")
        })
        e.target.classList.add("active")
        if (e.currentTarget.innerHTML == "Yes") {
            document.querySelector(".bullets").style.display = "block"
        } else {
            document.querySelector(".bullets").style.display = "none"
        }
        localStorage.setItem("showBullets", e.currentTarget.innerHTML)
    })
})

document.querySelector(".reset").onclick = () => {
    localStorage.clear()
    location.reload()
}

let btnUp = document.querySelector(".up");

btnUp.onclick = () => {
    window.scroll(0,0)
}
btnUp.onmouseover = () => {
    document.querySelector(".up i").classList.toggle("fa-beat")
}   
btnUp.onmouseleave = () => {
    document.querySelector(".up i").classList.remove("fa-beat")
}

let menu = document.querySelector("header .menu");
let navBar = document.querySelector("nav");
let btnClose = document.querySelector(".close") 

menu.onclick = function () {
    menu.style.display = "none"
    navBar.style.right = "0"
    btnClose.style.display = "flex"
}

btnClose.onclick = function () {
    menu.style.display = "block"
    navBar.style.right = "-190px"
    btnClose.style.display = "none"
}

let sectionAbout = document.querySelector(".about");
let skill = document.querySelectorAll(".skill span");
let started = false;

window.onscroll = () => {
    if (window.scrollY >= sectionAbout.offsetTop) {
        if (!started) {
            skill.forEach (s => startCount (s))
        }
        started = true
    }
    if (window.scrollY >= 1000) {
        btnUp.classList.add("show")
    } else {
        btnUp.classList.remove("show")
    }
}

function startCount (el) {
    el.style.width = el.dataset.width

    let count = setInterval (() => {
        el.dataset.progress++
        if (el.dataset.progress == el.dataset.prog) {
            clearInterval(count)
        }
    },10)
}

let gallary = document.querySelectorAll(".gallary .images img");

gallary.forEach((img) => {
    img.addEventListener("click", e => {

        let overLay = document.createElement("div");
        overLay.className = "overLay"
        document.body.append(overLay)

        let popup = document.createElement("div");
        popup.className = "popupBox"

        let imgNum = document.createElement("span");
        imgNum.className = "imgNum"
        imgNum.append(document.createTextNode(img.alt))
        popup.appendChild(imgNum)

        let image = document.createElement("img")
        image.src = img.src
        popup.appendChild(image)
        document.body.append(popup)

        let close = document.createElement("span");
        close.append(document.createTextNode("X"));
        close.className = "btnClose"
        popup.appendChild(close)

        close.onclick = () => {
            overLay.remove()
            popup.remove()
        }
        window.onkeydown = (e) => {
            if (e.key === "Escape") {
                overLay.remove()
                popup.remove()
            }
        }
    })
})