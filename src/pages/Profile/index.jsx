import { useState } from 'react'
import { Container, Form, Avatar } from './styles'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/auth'

import { api } from '../../services/api'

import avatarPlaceholder from '../../assets/avatar_placeholder.svg'

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

export function Profile() {

    const navigate = useNavigate()

    const { user, updateUser } = useAuth()

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [passwordOld, setPasswordOld] = useState()
    const [passwordNew, setPasswordNew] = useState()

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder

    const [avatar, setAvatar] = useState(avatarUrl)
    const [avatarFile, setAvatarFile] = useState(null)

    async function handleUpdate() {
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }

        const userUpdated = Object.assign(user, updated)

        await updateUser({ user: userUpdated, avatarFile })
    }

    async function handleChangeAvatar(event) {
        const file = event.target.files[0]
        setAvatarFile(file)

        const imagePreview = URL.createObjectURL(file)
        setAvatar(imagePreview)
    }

    function handleBack() {
        navigate(-1)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleUpdate()
        }
    }

    return (
        <Container>
            <header>
                <button type='button' onClick={handleBack} to="/">
                    <FiArrowLeft />
                </button>
            </header>
            <Form onKeyDown={handleKeyDown}>
                <Avatar>
                    <img src={avatar}
                        alt={`Foto de ${user.name}`}
                    />

                    <label htmlFor="avatar"><FiCamera />
                        <input
                            id='avatar'
                            type='file'
                            onChange={handleChangeAvatar}
                        />
                    </label>
                </Avatar>

                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Input
                    placeholder="Email"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}
                />

                <Input
                    placeholder="Nova Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordNew(e.target.value)}
                />

                <Button title="Salvar" onClick={handleUpdate} />

            </Form>

        </Container>
    )
}