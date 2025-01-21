import { Container, Form } from "./styles";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { ButtonText } from '../../components/ButtonText'
import { NoteItem } from '../../components/NoteItem'
import { Textarea } from '../../components/Textarea'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'

import { api } from "../../services/api";

export function New() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [links, setLinks] = useState([])
    const [newLink, setNewLink] = useState("")

    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState("")

    const navigate = useNavigate()

    function handleAddLink() {
        setLinks(prevLinks => [...prevLinks, newLink.trim()])
        setNewLink("")
    }

    function handleDeleteLink(deleted) {
        setLinks(prevLinks => prevLinks.filter(link => link !== deleted))
    }

    function handleAddTag() {
        setTags(prevTags => [...prevTags, newTag.trim()])
        setNewTag("")
    }

    function handleDeleteTag(deleted) {
        setTags(prevTags => prevTags.filter(tag => tag !== deleted))
    }

    function handleBack() {
        navigate(-1)
    }

    async function handleNewNote() {

        if (!title) {
            return alert("Título é obrigatório!")
        }
        if (!description) {
            return alert("Descrição é obrigatória!")
        }
        if (newLink) {
            return alert("Você deixou um link no campo para adidionar, adicione ou limpe o campo")
        }
        if (newTag) {
            return alert("Você deixou um link no campo para adidionar, adicione ou limpe o campo")
        }

        await api.post('/notes', {
            title,
            description,
            links,
            tags
        })

        alert("Nota criada com sucesso!")
        navigate(-1)
    }

    return (
        <Container>
            <Header></Header>
            <main>
                <Form>
                    <header>
                        <h1>Criar Nota</h1>
                        <ButtonText
                            title="voltar"
                            onClick={handleBack}
                        />
                    </header>
                    <Input
                        placeholder="Título"
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                    />
                    <Textarea
                        placeholder="Observações"
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Section title="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem
                                    key={String(index)}
                                    value={link}
                                    onClick={() => { handleDeleteLink(link) }}
                                />
                            ))
                        }
                        <NoteItem
                            isNew
                            placeholder="Novo link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags" >
                            {
                                tags.map((tag, index) => (

                                    <NoteItem
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => { handleDeleteTag(tag) }}
                                    />
                                ))
                            }
                            <NoteItem
                                isNew
                                placeholder="Nova tag"
                                onChange={e => setNewTag(e.target.value)}
                                value={newTag}
                                onClick={handleAddTag}
                            />
                        </div>
                    </Section>

                    <Button
                        title="Salvar"
                        onClick={handleNewNote}
                    />
                </Form>
            </main>
        </Container>
    )
}