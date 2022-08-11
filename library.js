let library = [];
let container = document.querySelector('#container');
let buttonAdd = document.querySelector('#add-button');
let displayingBookForm = false;
let buttonSumbit = document.querySelector('#submit-button');
let titleField = document.getElementById('book-title');
let authorField = document.getElementById('book-author');
let pagesField = document.getElementById('book-pages');
resetFields();

buttonAdd.addEventListener('click', () => {
    console.log("displaying");
    displayBookForm();
});

buttonSumbit.addEventListener('click', () => {
    let read = document.getElementById('read').checked ? true : false;
    addBook(titleField.value, authorField.value, pagesField.value, read);
    displayBookForm();
});


class Book {
    constructor(title, author, pagenum, read) {
        this.title = title;
        this.author = author;
        this.pagenum = pagenum;
        this.read = read;
    }
    info() {
        let haveRead = this.read ? "already read." : "not read yet.";
        return '"' + this.title + '"' + " by " + this.author + ", " + this.pagenum.toString() + " pages, " + haveRead;
    }
}

/*
function Book(title, author, pagenum, read) {
    this.title = title;
    this.author = author;
    this.pagenum = pagenum;
    this.read = read;
    this.info = function () {
        let haveRead = this.read ? "already read." : "not read yet." 
        return '"' + this.title + '"' + " by " + this.author + ", " + this.pagenum.toString() + " pages, " + haveRead;
    }
}
*/

function displayBookForm() {
    let bookForm = document.querySelector('.add-form');
    if (displayingBookForm) {
        bookForm.style.display = 'none';
        displayingBookForm = false;
        buttonAdd.textContent = 'Add book >';
        resetFields();
    } else {
        bookForm.style.display = 'block';
        displayingBookForm = true;
        buttonAdd.textContent = 'Add book <';
    }
}

function resetFields() {
    titleField.value = "";
    authorField.value = "";
    pagesField.value = "";
}


function addBook(title, author, pagenum, read) {
    let book = new Book(title, author, pagenum, read);
    let card = createCard(book);

    library.push(book);
    container.appendChild(card);
}

function createCard(book) {
    let card = document.createElement('div');
    let cardText = document.createElement('p')
    let options = document.createElement('div');
    let btn = document.createElement('button');
    let readField = document.createElement('div');
    let readCheck = document.createElement('input');
    let readLabel = document.createElement('label');

    let index = library.length;

    // setup elements
    card.classList.add('card');
    card.id =  'card' + index.toString();
    
    cardText.textContent = book.info();
    
    options.classList.add('card-options');
    
    btn.classList.add('delete-button');
    btn.id = 'btn' + index.toString();
    btn.textContent = 'del';
    btn.addEventListener('click', () => {
        let i = index;
        let c = card;
        library.splice(i, 1);
        c.remove()
    });
    
    readCheck.type = 'checkbox';
    readCheck.id = 'read-check';
    readCheck.checked = book.read;
    readLabel.for = 'read-check';
    readLabel.textContent = 'read';
    readCheck.addEventListener('click', () => {
        let book = library[index];
        book.read = readCheck.checked;
        cardText.textContent = book.info();
    });
    
    // append elements
    readField.appendChild(readCheck);
    readField.appendChild(readLabel);
    options.appendChild(readField);
    options.appendChild(btn);
    card.appendChild(cardText);
    card.appendChild(options);

    return card;
}

addBook("Cruddy", "Lynda Barry", 306, true);
addBook("Three novels: Molloy, Malone Dies, The Unnamable", "Samuel Beckett", 407, true);
addBook("The Trial", "Franz Kafka", 229, true);
addBook("Gravity's Rainbow", "Thomas Pynchon", 775, false);
