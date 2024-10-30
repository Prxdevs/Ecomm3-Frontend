import axios from "axios";

const baseURL = "http://localhost:5000/api";

const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export async function login(email, password) {
    try {
        const response = await instance.post("/auth/login", {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getAllCategories() {
    try {
        const response = await instance.get("/categories");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getAllProducts(category, color, tags) {
    try {
        const response = await instance.get("/products", {
            params: {
                category: category,
                color: color,
                tags: tags
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Cart API's

export async function getCart() {
    try {
        const response = await instance.get("/cart");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function addToCartt(productId, quantity, selectedColor) {
    try {
        const response = await instance.post("/cart/add", {
            product: productId,
            quantity,
            color: selectedColor
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function removeFromCart(productId, color) {
    try {
        const response = await instance.post(`/cart/remove`, {
            productId: productId,
            color: color,
        });
        return response;
    } catch (error) {
        throw error;
    }
}

// Wishlist API's

export async function getWishlist() {
    try {
        const response = await instance.get("/wishlist");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function addToWishlistt(productId) {
    try {
        const response = await instance.post("/wishlist/add", {
            product: productId
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function removeFromWishlist(productId) {
    try {
        const response = await instance.post(`/wishlist/remove`, {
            productId: productId
        });
        return response;
    } catch (error) {
        throw error;
    }
}