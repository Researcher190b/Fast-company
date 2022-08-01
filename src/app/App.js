import React, { useState, useEffect } from "react"; // React
import Users from "./component/users"; // скелет (каркас)
import api from "./api"; //  визуальная часть

function App() {
    // Объявление новой переменной состояния "users"
    // const [users, setUsers] = useState(api.users.fetchAll());
    const [users, setUsers] = useState();
    const handleDelete = (userId) => {
        console.log(userId);
        setUsers(users.filter((user) => user._id !== userId));
    }; // удаление

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []); // проверка users

    return (
        <div>
            {users && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                />
            )}
        </div>
    );
}

export default App;
