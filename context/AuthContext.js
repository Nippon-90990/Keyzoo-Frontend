// context/AuthContext.js
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [jwt, setJwt] = useState(null);

//     useEffect(() => {
//         // Load from localStorage when the app starts
//         const storedUser = localStorage.getItem("user");
//         const storedJwt = localStorage.getItem("jwt");
//         if (storedUser && storedJwt) {
//             setUser(JSON.parse(storedUser));
//             setJwt(storedJwt);
//         }
//     }, []);

//     const login = (userData, token) => {
//         localStorage.setItem("user", JSON.stringify(userData));
//         localStorage.setItem("jwt", token);
//         setUser(userData);
//         setJwt(token);
//     };

//     const logout = () => {
//         localStorage.removeItem("user");
//         localStorage.removeItem("jwt");
//         setUser(null);
//         setJwt(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, jwt, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);



// context/AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedJwt = localStorage.getItem("jwt");
        if (savedUser && savedJwt) {
            setUser(JSON.parse(savedUser));
            setJwt(savedJwt);
        }
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        setJwt(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("jwt", token);
    };

    const logout = () => {
        setUser(null);
        setJwt(null);
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
    };

    return (
        <AuthContext.Provider value={{ user, jwt, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
