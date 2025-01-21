import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus, FiSearch } from 'react-icons/fi'

import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { api } from '../../services/api'

import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { Note } from '../../components/Note'

export function Home() {
    const [tags, setTags] = useState([])
    const [tagsSelected, setTagsSelected] = useState([])

    const [notes, setNotes] = useState([])

    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    function handleTagsSelected(tagName) {

        if (tagName === "all") {
            return setTagsSelected([])
        }

        const alreadySelected = tagsSelected.includes(tagName)

        if (alreadySelected) {
            setTagsSelected(prevTags => prevTags.filter(tag => tag !== tagName))
        } else {
            setTagsSelected(prevTags => [...prevTags, tagName])
        }

    }

    function handleDetails(noteId) {
        navigate(`/details/${noteId}`)
    }

    useEffect(() => {
        async function fetchTags() {
            const response = await api.get('/tags')
            setTags(response.data)
        }

        fetchTags()
    }, [])

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
            setNotes(response.data)
        }

        fetchNotes()
    }, [tagsSelected, search])

    return (
        <Container>
            <Header />

            <Brand><h1>Rocketnotes</h1></Brand>

            <Menu>
                <li><ButtonText
                    title="Todos"
                    onClick={() => { handleTagsSelected("all") }}
                    isActive={tagsSelected.length === 0}
                /></li>
                {
                    tags && tags.map(tag =>
                        <li key={String(tag.id)}><ButtonText

                            title={tag.name}
                            onClick={() => { handleTagsSelected(tag.name) }}
                            isActive={tagsSelected.includes(tag.name)}
                        />
                        </li>
                    )
                }
            </Menu>

            <Search>
                <Input
                    placeholder="Pesquisar pelo título"
                    icon={FiSearch}
                    onChange={e => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note => (
                            <Note
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleDetails(note.id)}
                            />
                        ))
                    }
                </Section>

            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar Nota

            </NewNote>

        </Container>
    )
}