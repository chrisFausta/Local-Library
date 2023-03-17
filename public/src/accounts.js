/**
 * @param {*} accounts - an array of account objects
 * @param {*} id - a string that refers the value of the id key in an account object
 * @returns the account object when given a particular ID
 */
function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

/**
 * @param {*} accounts - an array of account objects
 * @returns the list of accounts ordered by last name
 */
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1: -1);
}

/**
 * 
 * @param {*} account - an account object
 * @param {*} books - an array of book objects
 * @returns should return the number of times an account has created a 'borrow' record
 */
function getTotalNumberOfBorrows({id}, books) {
  let burrowCount = 0; // a counter variable for the for loop
  books.forEach(book => {
    const result = matchingIds(book.borrows, id);
    if (result) burrowCount++;
  });
  return burrowCount;
}
/**
 * 
 * @param {\} borrows - an array of borrow objects
 * @param {*} id - a string that refers the value of the id key in an account object
 * @returns an Boolean value if a borrow object has an id property with a value equal to the id parameter
 */
function matchingIds(borrows, id) {
  let result = false;
  borrows.forEach(borrow => {
    if (borrow.id === id) result = true;
  });
  return result;

}

/**
 * 
 * @param {*} account - an account object 
 * @param {*} books - an array of book objects
 * @param {*} authors - an array of author objects
 * @returns should return all of the books taken out by an account with the author embedded
 */
function getBooksPossessedByAccount({id}, books, authors) {
  const booksPossessed = []; // create an empty array that will store the books taken out by an account and the author embedded
  books.forEach(book => {
    book.author = authors.filter(author => author.id === book.authorId).shift();
    const idResult = matchingIds(book.borrows, id);
    const returnedResult = returnStatus(book.borrows, id);
    if (idResult && !returnedResult) booksPossessed.push(book);
  })
  console.log("line 56:", booksPossessed)

  return booksPossessed;
}

/**
 * 
 * @param {\} borrows - an array of borrow objects
 * @param {*} id - a string that refers the value of the id key in an account object
 * @returns an Boolean value based on a borrow objects returned property
 */
function returnStatus(borrows, id) {
  let result = false;
  borrows.forEach(borrow => {
    if (borrow.id === id) {
      if (borrow.returned) result = true;
    }
  })
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
