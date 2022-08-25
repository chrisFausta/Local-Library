
const { findAuthorById } = require("./books");
/**
 * Finds the total #'s of books in an array
 * @param {*} books - array of book objects
 * @returns the total #'s of books or 0 if array is empty
 */
const getTotalBooksCount = books => {
  const bookCount = books.reduce((total)=> {
    total++;
    return total;
  }, 0)
  return bookCount;
}
/**
 * Find the total #'s of accounts in an array
 * @param {*} accounts - array of account object 
 * @returns the total #'s of accounts in an array
 */
const getTotalAccountsCount = accounts => {
  let totalAccounts = 0;
  accounts.forEach(account => totalAccounts++);
  return totalAccounts;
}
/**
 * @param {*} books - an array of book objects
 * @returns should return the total number of books that are currently borrowed
 */
const getBooksBorrowedCount = books => {
  let borrowedCount = 0;
  books.forEach(book => book.borrows.forEach(borrow => {
    if (!borrow.returned) borrowedCount++;
  }));
  return borrowedCount;
}
/**
 * @param {*} books - an array of book objects
 * @returns It returns an array containing five objects or fewer that represents 
 * the most common occurring genres, ordered from most common to least.

 */
const getMostCommonGenres = books => {
  let commonGenres = {};
  const genreList = [];
  books.forEach(book => {
    let total = 0;
    for (let b of books) {
      if (b.genre === book.genre) total++
    }
    commonGenres[book.genre] = total;
  })
  for (let genre in commonGenres) {
    genreList.push({name: genre, count: commonGenres[genre]})
  }
  return genreList.sort((a,b) =>  a.count < b.count ? 1 : -1).slice(0,5);
}

/**
 * @param {*} books - an array of book objects
 * @returns It returns an array containing five objects or fewer that represents the most popular books in the library. 
 * Popularity is represented by the number of times a book has been borrowed.
 * 
 * Each object in the returned array has two keys:
- The `name` key which represents the title of the book.
- The `count` key which represents the number of times the book has been borrowed.
 */
const getMostPopularBooks = books => {
  let popularBooks = {};
  const bookList = [];
  books.forEach(book => {
    let total = 0;
    for (let b of books) {
      if (b.borrows === book.borrows) total += book.borrows.length;
    }
    popularBooks[book.title] = total;
  })
  for (let title in popularBooks) {
    bookList.push({name: title, count: popularBooks[title]});
  }
  return bookList.sort((a,b) =>  a.count < b.count ? 1 : -1).slice(0,5);
}
/**
 * @param {*} authors - array of author objects
 * @param {*} idNumber - num that searches for author's id
 * @returns an author's object that matches the idNumber parameter
 */
const extractAuthorsInfo = (authors, idNumber) => {
  const author = findAuthorById(authors, idNumber);
  return author;
}
/**
 * @param {*} books -an array of book objects
 * @param {*} authors - an array of author objects
 * @returns It returns an array containing five objects or fewer that represents the most popular authors whose books have been checked out the most. 
 * Popularity is represented by finding all of the books written by the author and then adding up the number of times those books have been borrowed.
 * 
 * Each object in the returned array has two keys:
- The `name` key which represents the first and last name of the author.
- The `count` key which represents the number of times the author's books have been borrowed.
 */
const getMostPopularAuthors = (books, authors) => {

  const result = []; // array to push 
  const mostPopularBookTitles = getMostPopularBooks(books).map(title => title.name);
  books.forEach(book => {
    const authorsInfo = extractAuthorsInfo(authors, book.authorId);
    const {name, id} = authorsInfo;
    const {first, last} = name;
    const newObj = {name: `${first} ${last}` , count: 0}; // build the object
    if (book.authorId === id) {
      newObj.count += book.borrows.length; // count key increments by the length of the borrows array
    }
    result.push(newObj);
  })
  return result.sort((a,b) => b.count - a.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
