# Gerenciador de Projetos

Este é um sistema de gerenciamento de projetos desenvolvido em Angular. O objetivo é permitir a criação, edição e organização de projetos e tarefas de forma intuitiva e eficiente.

## Tecnologias Utilizadas

- **Angular**: Framework principal para o desenvolvimento do frontend.
- **Angular Material**: Para estilização e componentes modernos.
- **Local Storage**: Persistência de dados sem necessidade de backend.
- **TypeScript**: Para um código mais seguro e tipado.

## Funcionalidades

- Criar, editar e excluir projetos.
- Criar e excluir tarefas.
- Definir status dos projetos: _Planejado, Em andamento, Concluído_.
- Cada projeto pode conter múltiplas tarefas.
- Validações para garantir integridade dos dados.
- Armazenamento local via LocalStorage.

## Como Rodar o Projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/angular-agile-projects.git
   cd angular-agile-projects
   ```
2. **Instale as dependências:**

   ```sh
   npm install
   ```
3. **Inicie o servidor de desenvolvimento:**
   ```sh
   ng serve
   ```

4. **Acesse a aplicação no navegador:**
   ```
   http://localhost:4200
   ```

## Melhorias Futuras
- Implementação de backend para sincronização dos dados.

- Autenticação de usuários.

- Melhorias na usabilidade e acessibilidade.

- Testes unitários.