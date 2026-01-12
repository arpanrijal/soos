// const path = require('path')
// function handlefilepreview(value){
//     const reader = new FileReader()
//     reader.onload = (e)=>{
//         const img = new Image()
//         img.onload = ()=>{
//             canvas.width = img.width
//             canvas.height = img.height
//             createContext.drawImage(img,0,0)
//         }
//     }
//     const filepath = path.join(__dirname,"..","public","data","uploads",value)
//     img.src = `${filepath}`
//     reader.readAsDataURL(e.target.files[0])
// }
// module.exports = handlefilepreview