import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const decode = jwtDecode(token)
            setUser(decode)
        }
        setIsLoading(false)
    }, [])

    const login = (token) => {
        localStorage.setItem("token", token)
        const decode = jwtDecode(token)
        setUser(decode)
    }

    const logout = () => {
        setIsLoggingOut(true)
        localStorage.removeItem("token")
        setUser(null)
        navigate("/", { replace: true })
    }

    // clear the flag shortly after, once the route change has settled
    useEffect(() => {
        if (isLoggingOut) {
            const timer = setTimeout(() => setIsLoggingOut(false), 0)
            return () => clearTimeout(timer)
        }
    }, [isLoggingOut])

    return (
        <AuthContext.Provider value={{ user, login, logout, isMenuOpen, setIsMenuOpen, isLoading, isLoggingOut }}>
            {children}
        </AuthContext.Provider>
    )
}