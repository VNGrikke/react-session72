import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, addUser, deleteUser, updateUser } from "../../store/reducers/userReducer";
import { User } from "../../interface";
import { AppDispatch } from "../../store/store"; 

export default function Admin() {
    const users = useSelector((state: any) => state.user.users);
    const dispatch = useDispatch<AppDispatch>(); 

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const [editUser, setEditUser] = useState<User | null>(null);

    
    const addNewUser = () => {
        const newUser = {
            name: "thảo phương1234"
        };
        dispatch(addUser(newUser));
    };

    // hàm đi xóa user
    const handleDeleteUser = (id: number) => {
        dispatch(deleteUser(id));
    };

    // hàm đi cập nhật user
    const handleUpdateUser = (user: User) => {
        setEditUser(user);
    };

    const handleSaveUser = () => {
        if (editUser) {
            dispatch(updateUser({ id: editUser.id, updatedUser: editUser }));
            setEditUser(null);
        }
    };

    return (
        <div>
            <h1>Admin</h1>
            <ul>
                {users.map((user: User) => (
                    <li key={user.id}>
                        {user.name}
                        <button onClick={() => handleDeleteUser(user.id)}>xóa</button>
                        <button onClick={() => handleUpdateUser(user)}>cập nhật</button>
                    </li>
                ))}
            </ul>
            <button onClick={addNewUser}>add User</button>

            {editUser && (
                <div>
                    <h2>Edit User</h2>
                    <input
                        type="text"
                        value={editUser.name}
                        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                    />
                    <button onClick={handleSaveUser}>Save</button>
                </div>
            )}
        </div>
    );
}
