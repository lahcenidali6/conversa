import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"
import { io, Socket } from "socket.io-client"
const baseUrl = import.meta.env.VITE_BASE_URL;



export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLogginIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    checkAuth:async  ()=>{
        try{
            const res= await axiosInstance.get("/auth/check")
            set({authUser:res.data})
            get().connectSocket()
        }catch (err){
            console.log("error in checkAuth: "+err.response.data.message)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async (data)=>{
        set({isSigningUp:true})
        try{
            const res = await axiosInstance.post("/auth/signup", data)
            set({authUser:res.data})
            toast.success("Account created successfully")
            get().connectSocket()
        }catch (err){
            toast.error(err.response.data.message)
        }finally{
            set({isSigningUp:false})
        }
    },
    logout:async ()=>{
        try{
            await axiosInstance.post("auth/logout")
            set({authUser:null})
            toast.success("Logged out successfully")
            get().disconnectSocket()
        }catch (err){
          toast.error(err.response.data.message)  
        }
    },
    login:async (data)=>{
        set({isLogginIn:true})
        try{
            const res= await axiosInstance.post("auth/login",data)
            set({authUser:res.data})
            toast.success("Logged in successfully")
            get().connectSocket()
        }catch (err){
            toast.error(err.response.data.message)
        }finally{
            set({isLogginIn:false})
        }
    },
    updateProfile:async (data)=>{
        set({isUpdatingProfile:true})
        try{
            const res= await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data})
            toast.success("Profile pic has been updated with successfully")
        }catch (err){
            toast.error(err.response.data.message)
        }finally{
            set({isUpdatingProfile:false})
        }
    },
    connectSocket:()=>{
        const {authUser} = get()
        if(!authUser || get.socket?.connected) return 

        const socket= io(baseUrl,{query:{userId:authUser._id}})
        socket.connect()
        set({socket:socket})
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket?.disconnect()
    },


}))