const images = [
    "https://i.pinimg.com/originals/f3/4e/78/f34e782b0ce5d2cbd3a3e1e8ecfde746.png",
    "https://i.pinimg.com/originals/09/84/77/098477b2d82af335427fcd3da1b8aaa0.png",
    "https://i.pinimg.com/originals/b2/3c/2a/b23c2ae3e421dc7a5eb07882bb1b45f3.png",
    "http://clipart-library.com/data_images/149301.png",
    "https://images.vexels.com/media/users/3/143409/isolated/preview/660b9f099fff3269ede645377bc511bf-ice-cream-cartoon-by-vexels.png",
    "https://us.123rf.com/450wm/mochipet/mochipet1706/mochipet170600087/80439828-vector-illustration-in-cartoon-style-deep-fried-chicken-leg-unhealthy-food-decoration-for-patches-pr.jpg?ver=6",
    "https://cdn1.vectorstock.com/i/1000x1000/03/45/french-potato-pack-box-cartoon-fastfood-fry-vector-26830345.jpg",
    "https://cdn5.vectorstock.com/i/1000x1000/31/34/bread-toast-icon-cartoon-style-vector-28103134.jpg",
    "https://cdn1.vectorstock.com/i/1000x1000/82/50/a-cartoon-red-candy-vector-21368250.jpg",
    "https://previews.123rf.com/images/ylivdesign/ylivdesign1705/ylivdesign170502176/77834831-candy-icon-cartoon-style.jpg",
    "https://st.depositphotos.com/1742172/1629/v/950/depositphotos_16296647-stock-illustration-empty-bag-of-potato-chips.jpg",
    "https://media.istockphoto.com/vectors/cookies-with-chocolate-vector-id1028679756?k=6&m=1028679756&s=612x612&w=0&h=9LjtAOENOl2_O_CQhFsH1_bAun_aa_TBNSxoQDFGEqI="
]

const allfoods = document.getElementsByClassName("all-foods")[0]
const sequence = document.getElementsByClassName("sequence")[0]
let sequenceImages = []

sequence.addEventListener('dragover', handleDragOver)
sequence.addEventListener('drop', handleDrop)

let indicies = []
function getIndicies(){
    indicies = []
    for (let i = 0; i < images.length; i++){
        indicies.push(i)
    }
}

getIndicies()

function getRandomImages(){
    if (indicies.length < 4){
        getIndicies()
    }

    for (let i = 0; i < 4; i++){
        let randomNum = Math.floor(Math.random()*indicies.length)
        let randomInd = indicies[randomNum]
        sequenceImages.push(images[randomInd])
        indicies.splice(randomNum, 1)
    }

    showSequence()

}

function showSequence(){
    clearSequence()
    for (let i = 0; i < sequenceImages.length; i++){
        const randomImg = document.createElement('img')
        randomImg.style.width = randomImg.style.height = '120px'
        randomImg.style.margin = '5px'
        randomImg.src= sequenceImages[i]
        randomImg.setAttribute('class', 'food')
        randomImg.setAttribute('draggable', true)
        randomImg.addEventListener('dragstart', handleDragStart)
        randomImg.setAttribute('id', i)
        sequence.append(randomImg)
    }
}

function clearSequence(){
    while (sequence.firstChild){
        sequence.removeChild(sequence.firstChild)
    }
}

function removeRandomImages(){
    sequenceImages = []
    clearSequence()
}

getRandomImages()
setTimeout(removeRandomImages, 4000)

for (let i = 0; i < images.length ; i++){
    const eachFood = document.createElement('img')
    eachFood.style.width = eachFood.style.height = '120px'
    eachFood.src = images[i]
    eachFood.style.margin = '5px'
    eachFood.setAttribute('draggable', true)
    eachFood.setAttribute('id', i)
    eachFood.addEventListener('dragstart', handleDragStart)
    allfoods.append(eachFood)
}

function handleDragStart(e){
    e.dataTransfer.setData('imageId', e.target.id )
}

function handleDragOver(e){
    e.preventDefault()
}

function handleDrop(e){
    e.preventDefault()
    const draggedImageId = parseInt(e.dataTransfer.getData('imageId'))
    if (e.target.className === "sequence"){
        sequenceImages.push(images[draggedImageId])
    } else if (e.target.className === "food"){
        const droppedImageId = parseInt(e.target.id)
        sequenceImages[droppedImageId] = sequenceImages[draggedImageId]
        sequenceImages[draggedImageId] = e.target.src
    }
    showSequence()
}