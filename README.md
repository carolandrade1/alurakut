<h1 align="center">Imersão React - Alurakut</h1>
<h3 align="center">A Imersão React é gratuita e é voltada para profissionais, estudantes e para todo mundo que quer aprender mais sobre front-end. Nesta imersão vamos mergulhar no passado e dominar o futuro com o Alurakut! </h3>

<h3 align="center"> 

[Clique aqui para ver como está o andamento do projeto!](https://alurakut-carol.vercel.app/) 

</h3>

## 📚 Desafios
  - Aula 01
    - Pegar os dados da API do GitHub e listar seus seguidores
    - Adicionar quão confiável, legal e sexy você é
    - Usar Strategy ao invés de vários ifs no css
    - Separar e organizar o seu código
    - Publicar o seu projeto
    - Deixar o seu projeto com a sua cara
  - Aula 02
  - Aula 03
  - Aula 04
  - Aula 05


## 💻 Linguagens e tecnologias utilizadas
<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.figma.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a> </p>


## 📂 Referencias
  <details>
    <summary>Aula 01</summary>
      - <a href="https://pt-br.reactjs.org/docs/create-a-new-react-app.html#recommended-toolchains">React</a> <br>
      - <a href="https://www.youtube.com/watch?v=S-jqd6WZ7M0">Mario Souto - Strategy Pattern</a> <br>
      - <a href="https://www.youtube.com/watch?v=85vJXFpXLQw">Mario Souto - Pegando dados de uma API com React</a> <br>
      - <a href="https://www.youtube.com/watch?v=-kVnp3fg-v4">Mario Souto - O sistema de rotas do NextJS, principais dúvidas</a> <br>
      - <a href="https://www.youtube.com/watch?v=yMRSDdifGW8">Mario Souto - Linter</a> <br>
      - <a href="https://www.youtube.com/watch?v=Cu-HP-gvggg">Mario Souto - Centralizar conteúdo na tela</a> <br>
      - <a href="https://cssgridgarden.com/">CSS Grid Garden</a> <br>
      - <a href="https://www.youtube.com/watch?v=UBAX-13g8OM">Rafaella Ballerini - Como usar git e github na prática</a> <br>
  </details>
  <details>
    <summary>Aula 02</summary>
  </details>
  <details>
    <summary>Aula 03</summary>
  </details>
  <details>
    <summary>Aula 04</summary>
  </details>
  <details>
    <summary>Aula 05</summary>
  </details>

## Example app with styled-components

This example features how you use a different styling solution than [styled-jsx](https://github.com/vercel/styled-jsx) that also supports universal styles. That means we can serve the required styles for the first render within the HTML and then load the rest in the client. In this case we are using [styled-components](https://github.com/styled-components/styled-components).

For this purpose we are extending the `<Document />` and injecting the server side rendered styles into the `<head>`, and also adding the `babel-plugin-styled-components` (which is required for server side rendering). Additionally we set up a global [theme](https://www.styled-components.com/docs/advanced#theming) for styled-components using NextJS custom [`<App>`](https://nextjs.org/docs/advanced-features/custom-app) component.

### Preview

Preview the example live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-styled-components)

### Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-styled-components&project-name=with-styled-components&repository-name=with-styled-components)

### How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-styled-components with-styled-components-app
# or
yarn create next-app --example with-styled-components with-styled-components-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

#### Try it on CodeSandbox

[Open this example on CodeSandbox](https://codesandbox.io/s/github/vercel/next.js/tree/canary/examples/with-styled-components)

#### Notes

When wrapping a [Link](https://nextjs.org/docs/api-reference/next/link) from `next/link` within a styled-component, the [as](https://styled-components.com/docs/api#as-polymorphic-prop) prop provided by `styled` will collide with the Link's `as` prop and cause styled-components to throw an `Invalid tag` error. To avoid this, you can either use the recommended [forwardedAs](https://styled-components.com/docs/api#forwardedas-prop) prop from styled-components or use a different named prop to pass to a `styled` Link.

<details>
<summary>Click to expand workaround example</summary>
<br />

**components/StyledLink.js**

```javascript
import Link from 'next/link'
import styled from 'styled-components'

const StyledLink = ({ as, children, className, href }) => (
  <Link href={href} as={as} passHref>
    <a className={className}>{children}</a>
  </Link>
)

export default styled(StyledLink)`
  color: #0075e0;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #40a9ff;
  }

  &:focus {
    color: #40a9ff;
    outline: none;
    border: 0;
  }
`
```

**pages/index.js**

```javascript
import StyledLink from '../components/StyledLink'

export default () => (
  <StyledLink href="/post/[pid]" forwardedAs="/post/abc">
    First post
  </StyledLink>
)
```

</details>
