import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({ children }) {

    const [data, setData] = useState({})

    async function signIn({ email, password }) {

        try {
            const response = await api.post('/sessions', { email, password })
            const { user, token } = response.data

            sessionStorage.setItem('@rocketnotes:user', JSON.stringify(user))
            sessionStorage.setItem('@rocketnotes:token', token)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({ user, token })

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message)
            } else {
                console.log(error)
                alert("Não foi possível iniciar a sessão")
            }
        }
    }

    async function signOut() {
        sessionStorage.removeItem('@rocketnotes:token')
        sessionStorage.removeItem('@rocketnotes:user')

        setData({})
    }

    async function updateUser({ user, avatarFile }) {

        if (avatarFile) {
            const fileUploadForm = new FormData()
            fileUploadForm.append('avatar', avatarFile)

            const response = await api.patch('users/avatar', fileUploadForm)
            user.avatar = response.data.avatar
        }

        try {
            await api.put('/users', user)
            sessionStorage.setItem('@rocketnotes:user', JSON.stringify(user))

            setData({ user, token: data.token })
            alert('Perfil atualizado.')

        } catch (error) {
            if (error.response) {
                return alert(error.response.data.message)
            } else {
                console.log(error)
                return alert("Não foi possível iniciar a sessão")
            }
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem('@rocketnotes:token')
        const user = sessionStorage.getItem('@rocketnotes:user')

        if (token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({ user: JSON.parse(user), token })
        }

    }, [])

    return (
        <AuthContext.Provider value={{ signIn, signOut, user: data.user, updateUser }}>
            {children}
        </AuthContext.Provider>
    )

}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }