/**
 * @param {*} authors - an array of author objects
 * @param {*} id - string that refers to the value of the id's key in an author object
 * @returns the author object when given a particular ID
 */
const findAuthorById = (authors, id) => authors.find(author => author.id === id);
/**
 * 
 * @param {*} books - an array of book objects
 * @param {*} id - string that refers to the value of the id's key in a book object
 * @returns the book object when given a particular ID
 */
const findBookById = (books, id) => books.find(book => book.id === id);

/**
 * @param {*} books an array of book objects
 * @returns an array with two arrays: borrowed books and returned books
 */
const partitionBooksByBorrowedStatus = books => {
  const borrowedStatus = []; // create an empty array that will store the two arrays
  const returnedBooks = books.filter(book => book.borrows[0].returned); // create an array that filters the book objects that have been returned 
  const borrowedBooks = books.filter(book => !book.borrows[0].returned); // create an array that filters the book objects that haven't been returned 
  borrowedStatus.push(borrowedBooks, returnedBooks); // push the filtered arrays into the empty array
  return borrowedStatus;
}

/**
 * 
 * @param {*} book - a book object
 * @param {*} accounts - an array of account objects
 * @returns  an array for a book of all borrowers with their information and return status, that also limits the list to ten borrowers.
 */
const getBorrowersForBook = ({borrows}, accounts) => {
  const borrowersAccount = [];
  accounts.forEach(account => {
    borrows.forEach(borrow => {
      if (borrow.id === account.id) {
        let borrowedBooks = {...borrow, ...account};      
        borrowersAccount.push(borrowedBooks);
      }
    })
  })
  return borrowersAccount.slice(0, 10);
}
module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};