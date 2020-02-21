const prompt = require('inquirer').createPromptModule();
const mysql = require('mysql2')

const connection = mysql.createConnection(
  {
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: 'admin',
    database: 'greatbay'
  }
)

// Creates an auction
connection.query('INSERT INTO auctions SET ?', {
  item: ,
  category: ,
  starting_bid: ,
  current_bid: 
}, (err) => {
  if (err) { console.log(err) }
  console.log(`You've created an item:${}`)
})

// Finds Item to bid on
connection.query('SELECT * FROM auctions', (err, items) => {
  if(err) { console.log (err) }
  console.log(items)
})

// Makes a bid on an item
connection.query('UPDATE auctions SET ? WHERE ?', [{current_bid: `${}`}, {item: `${}`}], (err) => {
  if(err) { console.log(err) }
  if console.log(`New highest bid is set to ${}.`)
})


connection.end()

quesionsPost = [
  ''
];
questionsBid = [
  ''
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
  .then( (response) => {
    if(response.choice === 'POST AN ITEM'){
      postItem();
    }
    else {
      bidItem();
    }
  })
  .catch(e => console.log(e))
}

function postItem(){
  console.log('ok')
}
function bidItem(){
  console.log('ok boomer')
}

init();
