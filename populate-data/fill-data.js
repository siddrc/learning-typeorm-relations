const { connect } = require("../app-data-source")
const pizzaEntity = require("../pizzas/pizzas.entity")

const sizes = ["Small","Medium","Large"]
const prices = [10, 12, 13,14,10,17,18,20,25,10,12,15,16]
const pizzaNames = ["Bianca Pizza",
"Cheese Pizza",
"Pizza, Margherita",
"Pizza, Mushroom",
"Pizza, Puttenesca"]
const fs = require('fs');
const imagesFolder  = `/home/siddrc/5.WBS/github.com/nodejs-apps/images`

async function execute(){
  const pizzas = []
  const images = []
  fs.readdirSync(imagesFolder).forEach(file => {
        images.push(file)
  });
  pizzaNames.forEach((pizzaName,index)=>{
    const image = images[Math.floor(Math.random()*images.length)]
    const pizza = {
        
        name:pizzaName,
        image,
        pricesAndSizes:[{
          
          size:sizes[0],
          price:prices[Math.floor(Math.random()*prices.length)]
        },{
          
          size:sizes[1],
          price:prices[Math.floor(Math.random()*prices.length)]
        },{
          
          size:sizes[2],
          price:prices[Math.floor(Math.random()*prices.length)]
        }
      ]
    }
      pizzas.push(pizza)
  })
  try{
    const connection = await connect()
    connection.getRepository(pizzaEntity).save(pizzas)
  }catch(e){
    console.error(`[ERROR]:: ${e.message}-${e.stack}`)
  }
}

module.exports = {
    execute
}

