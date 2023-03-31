export interface DataUser{
    name?:string
    email?:string
    photo_profile:string
}

export interface ContextUser{
    dataUser:DataUser | undefined,
    setDataUser:(x:DataUser) => void
  }