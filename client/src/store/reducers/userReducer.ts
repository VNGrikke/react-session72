import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../interface/index";

// Define thunks
export const getUser = createAsyncThunk<User[], void, {}>(
    "users/getAllUser",
    async () => {
        const response = await axios.get("http://localhost:8080/users");
        return response.data;
    }
);

export const addUser = createAsyncThunk<User, User, {}>(
    "users/addUser",
    async (user: User) => {
        const response = await axios.post("http://localhost:8080/users", user);
        return response.data;
    }
);

export const deleteUser = createAsyncThunk<number, number, {}>(
    "users/deleteUser",
    async (id: number) => {
        await axios.delete(`http://localhost:8080/users/${id}`);
        return id;
    }
);

export const updateUser = createAsyncThunk<User, { id: number; updatedUser: User }, {}>(
    "users/updateUser",
    async ({ id, updatedUser }: { id: number; updatedUser: User }) => {
        const response = await axios.put(`http://localhost:8080/users/${id}`, updatedUser);
        return response.data;
    }
);

const reducerUser = createSlice({
    name: "user",
    initialState: {
        users: [] as User[],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                // trạng thái chờ lấy dữ liệu
            })
            .addCase(getUser.fulfilled, (state, action) => {
                // trạng thái lấy dữ liệu thành côngx`
                state.users = action.payload;
            })
            .addCase(getUser.rejected, (state) => {
                // trạng thái lấy dữ liệu thất bại
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            });
    },
});

export default reducerUser.reducer;
