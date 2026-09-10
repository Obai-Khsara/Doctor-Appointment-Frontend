import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from "axios"

// GET all doctors
export const useDoctors = () => {
    return useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await axios.get("https://doctor-appointment-backend-umot.onrender.com/doctor")
            return res.data.doctors
        },
    })
}

// GET single doctor by id
export const useDoctor = (id) => {
    return useQuery({
        queryKey: ['doctor', id],
        queryFn: async () => {
            const res = await axios.get(`https://doctor-appointment-backend-umot.onrender.com/doctor/${id}`)
            return res.data.doctor
        },
        enabled: !!id,
    })
}

// GET related doctors by speciality
export const useRelatedDoctors = (speciality, currentId) => {
    return useQuery({
        queryKey: ['doctors', 'byspeciality', speciality],
        queryFn: async () => {
            const res = await axios.get(`https://doctor-appointment-backend-umot.onrender.com/doctor/byspeciality/${speciality}`)
            return res.data.doctors.filter(
                (doc) => doc._id !== currentId && doc.speciality.toLowerCase() === speciality
            )
        },
        enabled: !!speciality,
    })
}

// GET doctors count
export const useDoctorsCount = () => {
    return useQuery({
        queryKey: ['doctors', 'count'],
        queryFn: async () => {
            const res = await axios.get("https://doctor-appointment-backend-umot.onrender.com/doctor/count")
            return res.data.count || 0
        },
    })
}

// POST add doctor (multipart form, needs token manually)
export const useAddDoctor = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (formData) => {
            const token = localStorage.getItem("token")
            const res = await axios.post("https://doctor-appointment-backend-umot.onrender.com/doctor", formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['doctors'] })
        },
    })
}