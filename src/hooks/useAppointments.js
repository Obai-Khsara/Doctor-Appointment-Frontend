import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from "axios"

// GET my appointments
export const useMyAppointments = () => {
    return useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            const token = localStorage.getItem("token")
            const res = await axios.get("https://doctor-appointment-backend-umot.onrender.com/appointment", {
                headers: { Authorization: `Bearer ${token}` }
            })
            return res.data.appointments
        },
    })
}

// POST add appointment
export const useAddAppointment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (form) => {
            const token = localStorage.getItem("token")
            const res = await axios.post("https://doctor-appointment-backend-umot.onrender.com/appointment", form, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments'] })
        },
    })
}

// DELETE cancel appointment
export const useCancelAppointment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id) => {
            const token = localStorage.getItem("token")
            const res = await axios.delete(`https://doctor-appointment-backend-umot.onrender.com/appointment/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return res.data
        },
        onSuccess: (_data, id) => {
            queryClient.setQueryData(['appointments'], (old) =>
                old ? old.filter((app) => app._id !== id) : old
            )
        },
    })
}