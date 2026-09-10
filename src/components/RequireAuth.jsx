import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext.jsx"

const RequireAuth = ({ children, roles }) => {
    const { user, isLoading, isLoggingOut } = useContext(AuthContext)

    if (isLoading) return null
    if (isLoggingOut) return null

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" />
    }

    return children
}

export default RequireAuth