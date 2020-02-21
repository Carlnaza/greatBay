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
function createAuction(item, cat, starting, current) {
  connection.query('INSERT INTO auctions SET ?', {
    item: item,
    category: cat,
    starting_bid: starting,
    current_bid: current
  }, (err) => {
    if (err) { console.log(err) }
    console.log(`You've created an item:${}`)
  })
}

// Finds Item to bid on
function getAuctions() {
  connection.query('SELECT * FROM auctions', (err, items) => {
    if (err) { console.log(err) }
    console.log(items)
  })
}

// search by keyword
function searchAuctions(search) {
  connection.query(`SELECT * FROM auctions WHERE item LIKE '${search}%'`, (err, items) => {
    if (err) { console.log(err) }
    console.log(items)
  })
}

// Makes a bid on an item
function bid(bid, item) {
  connection.query('UPDATE auctions SET ? WHERE ?', [{ current_bid: `${bid}` }, { item: `${item}` }], (err) => {
    if (err) { console.log(err) }
    if console.log(`New highest bid is set to ${}.`)
  })
}