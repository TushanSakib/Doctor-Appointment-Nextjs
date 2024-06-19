const { default: axios } = require("axios")


const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY

if (!API_KEY) {
    throw new Error("NEXT_PUBLIC_STRAPI_API_KEY is not set. Please check your environment variables.");
  }

const axiosClient = axios.create({
    baseURL:'http://localhost:1337/api',
    headers:{
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
    }
})


const getCategory = ()=> axiosClient.get('/categories?populate=*')

const getDoctorList = ()=> axiosClient.get('/doctors?populate=*')

const getDoctorByCategory = (category)=> axiosClient.get(`/doctors?filters[category][Name][$eq]=${category}&populate=*`)


const getDoctorById = (id)=>axiosClient.get(`/doctors/${id}?populate=*`)

// GlobalAPI.js
const bookAppointment = (data)=>axiosClient.post('/appointments',data)

  
export default{
    getCategory,
    getDoctorList,
    getDoctorByCategory,
    getDoctorById,
    bookAppointment
}