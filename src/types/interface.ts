export interface DataUser{
    id:string
    name:string
    email:string
    photo_profile:string
    provider_token:string
}

export interface ContextUser{
    dataUser:DataUser | undefined,
    setDataUser:(x:DataUser) => void
}

export interface Repositeries{
    id:string
    owner:Owner
    name:string
    private:boolean
}

export interface Owner {
    avatar_url:string
}

export interface Project{
    id:string
    name:string
    url:string
    status:string
    avatar:string
    created_at:string
}