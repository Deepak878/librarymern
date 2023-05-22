import { Navigate } from "react-router-dom"
import { useUser } from "../../context/userContext"

export const WithAdminProtector = ({ children }) => {
    const { isAdmin } = useUser()
    if (isAdmin) {
        return children
    }
    return <Navigate to="/" replace />
}
