import { useQuery } from '@tanstack/react-query'
import axios from "axios"

export const useDepartments = () => {
    return useQuery({
        queryKey: ['departments'],
        queryFn: async () => {
            const res = await axios.get("https://doctor-appointment-backend-umot.onrender.com/department")
            return res.data
        },
    })
}

export const useDepartmentsCount = () => {
    return useQuery({
        queryKey: ['departments', 'count'],
        queryFn: async () => {
            const res = await axios.get("https://doctor-appointment-backend-umot.onrender.com/department/count")
            return res.data.count || 0
        },
    })
}