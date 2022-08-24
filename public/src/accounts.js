/**
 * @param {*} accounts - an array of account objects
 * @param {*} id - a string that refers the value of the id key in an account object
 * @returns the account object when given a particular ID
 */
const findAccountById = (accounts, id) => accounts.find(account => account.id === id);

/**
 * @param {*} accounts - an array of account objects
 * @returns the list of accounts ordered by last name
 */
const sortAccountsByLastName = accounts => {
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1: -1);
}

/**
 * 
 * @param {*} account - an account object
 * @param {*} books - an array of book objects
 * @returns should return the number of times an account has created a 'borrow' record
 */
const getTotalNumberOfBorrows = ({id}, books) => {

  let burrowCount = 0; // a counter variable for the for loop
  books.forEach(book => book.borrows.forEach(borrow => {
    if (borrow.id === id) burrowCount++;
  }))

  return burrowCount;
}

/**
 * 
 * @param {*} account - an account object 
 * @param {*} books - an array of book objects
 * @param {*} authors - an array of author objects
 * @returns should return all of the books taken out by an account with the author embedded
 */
const getBooksPossessedByAccount = ({id}, books, authors) => {
  const booksPossessed = []; // create an empty array that will store the books taken out by an account and the author embedded
  books.forEach(book => book.author = authors.filter(author => author.id === book.authorId).shift());
  books.forEach(book => book.borrows.forEach(borrow => {
    if (borrow.id === id && !borrow.returned) booksPossessed.push(book);
  }))
  return booksPossessed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
