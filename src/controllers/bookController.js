const Book = require('../models/book');

// Получить список всех книг
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получить книгу по ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Создать новую книгу
exports.createBook = async (req, res) => {
    const { title, author, year } = req.body;
    if (title.length < 2 || author.length < 2 || !year) {
        return res.status(400).json({ message: 'Invalid input' });
    }
    const book = new Book({ title, author, year });
    try {
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Обновить данные книги по ID
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const { title, author, year } = req.body;
        if (title.length < 2 || author.length < 2 || !year) {
            return res.status(400).json({ message: 'Invalid input' });
        }
        book.title = title;
        book.author = author;
        book.year = year;

        await book.save();
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Удалить книгу по ID
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        await book.remove();
        res.status(204).json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
