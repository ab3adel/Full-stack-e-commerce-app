



export function getAuth(){
    let auth =sessionStorage.getItem('auth')? JSON.parse(sessionStorage.getItem('auth')as string):null
    console.log(auth)
    if (auth && auth.username) {
        return auth
    }
    else {
        return null
    }

}