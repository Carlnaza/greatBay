const prompt = require('inquirer').createPromptModule();
const mysql = require('mysql2')

questionsPost = [
  'What is the name of the item?',
  'What is the category of the item?',
  'What is the starting bid?'
];
questionsBid = [
  'How much would you like to bid?'
];

function init() {
  prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['POST AN ITEM', 'BID ON AN ITEM']
    }
  ])
    .then((response) => {
      if (response.choice === 'POST AN ITEM') {
        postItem();
      }
      else {
        bidItem();
      }
    })
    .catch(e => console.log(e))
}

function postItem() {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: questionsPost[0]
    },
    {
      type: 'input',
      name: 'category',
      message: questionsPost[1]
    },
    {
      type: 'number',
      name: 'starting_price',
      message: questionsPost[2]
    }
  ])
  .then((response) =>{
    console.log(response);
  })
  .catch(e => console.log(e));
}
function bidItem() {
  prompt([
    {
      type: 'number',
      name: 'bid',
      message: questionsBid[0]
   }
])
.then((response)=>{
  console.log(response.bid)
})
.catch(e => console.log(e));
  
 
}

init();


// const connection = mysql.createConnection(
//   {
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'spikey11',
//     database: 'greatbay'
//   }
// )

// Creates an auction

// Finds Item to bid on
// connection.query('SELECT * FROM auctions', (err, items) => {
//   if (err) { console.log(err) }
//   console.log(items)
// })

// Makes a bid on an item
// connection.query('UPDATE auctions SET ? WHERE ?', [{ current_bid: `${}` }, { item: `${}` }], (err) => {
//   if (err) { console.log(err) }
//   if console.log(`New highest bid is set to ${}.`)
// })


// connection.end()
