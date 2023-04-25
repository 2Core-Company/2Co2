import { createContext } from "react";
import { DataUser } from "../../types/interface";

const UserContext = createContext<AllContextType>({
    dataUser:{
        id:'',
        name:'',
        email:'',
        photo_profile:'',
        provider_token:''
    },
    setDataUser: () => {}
  })

interface AllContextType{
    dataUser: DataUser,
    setDataUser:(dataUser: DataUser) => void;
  }

export default UserContext
