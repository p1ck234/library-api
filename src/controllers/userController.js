const User = require('../models/user');

// Получить список всех пользователей
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Получить пользователя по ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Создать нового пользователя
exports.createUser = async (req, res) => {
    const { firstName, lastName, username } = req.body;
    if (firstName.length < 2 || lastName.length < 2 || username.length < 5) {
        return res.status(400).json({ message: 'Invalid input' });
    }
    const user = new User({ firstName, lastName, username });
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Обновить данные пользователя по ID
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { firstName, lastName, username } = req.body;
        if (firstName.length < 2 || lastName.length < 2 || username.length < 5) {
            return res.status(400).json({ message: 'Invalid input' });
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Удалить пользователя по ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.remove();
        res.status(204).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
