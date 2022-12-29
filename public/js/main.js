const items = document.querySelectorAll("#slide > ul")
const prevBtn = document.querySelector(".prev_btn > button")
const nextBtn = document.querySelector(".next_btn > button")

let intervalId = 0
let count = 0



    function findIndex() {
        for (let i = 0; i < items.length; i++) {
            if (items[i].getAttribute("class") === "on") return i
        }
    }

    function slide() {
        let prev = count === 0 ? (items.length - 1) : (count - 1)
        items[count].className = "on"
        items[prev].className = "off"

        for (let i = 0; i < items.length; i++) {
            if (count !== i && prev !== i) { 
                items[i].className = "out"
            }
        }

        if (++count === 3) count = 0
    }
    slide()



    function prevHandler(e) {
        const current = findIndex()
        const index = current === 0 ? (items.length - 1) : (current - 1)
        items[current].className = "out"
        items[index].className = "on"

        for (let i = 0; i < items.length; i++) {
            if (current !== i && index !== i) {
                items[i].className = "off"
                const slide = document.querySelector("slide")
            count = index
            }
        }
    }

    function nextHandler(e) {
        const current = findIndex()
        const index = current === items.length - 1 ? 0 : current + 1
        items[current].className = "off"
        items[index].className = "on"

        for (let i = 0; i < items.length; i++) {
            if (current !== i && index !== i) { 
                items[i].className = "out"
            }
        count = index
        }
    }



    prevBtn.addEventListener("click", prevHandler)
    nextBtn.addEventListener("click", nextHandler)