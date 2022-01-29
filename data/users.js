import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Admin User",
        email: "admin@email.io",
        password: bcrypt.hashSync("blablabla", 12),
        isAdmin: true,
    },
    {
        name: "John Doe",
        email: bcrypt.hashSync("blablabla", 12),
        password: "blablabla",
    },
    {
        name: "Barzack Gladstone",
        email: bcrypt.hashSync("blablabla", 12),
        password: "blablabla",
    },
];

export default users