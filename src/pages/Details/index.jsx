import { Container, Links, Content } from './styles'

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'
import { ButtonText } from '../../components/ButtonText'

export function Details() {

  return (
    <Container>
      <Header />

      <main>
        <Content>
          <ButtonText title="Excluir Nota" />

          <h1>Introdução ao React</h1>

          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Corrupti voluptates rem aliquid alias temporibus excepturi,
            inventore, consectetur dolore ducimus voluptate qui commodi
            porro officiis aspernatur. Saepe debitis nostrum id tempora!
          </p>

          <Section title="Links úteis">
            <Links>
              <li><a href="#">Testando link</a></li>
              <li><a href="#">Testando link</a></li>
            </Links>
          </Section>

          <Section title="Marcadores">
            <Tag title="Express"></Tag>
            <Tag title="Node"></Tag>
          </Section>

          <Button title="Voltar"></Button>

        </Content>
      </main>
    </Container>
  )
}