# Person Registration - Frontend

Frontend desenvolvido em Angular para consumo da API de cadastro de pessoas.

A aplicação permite realizar o cadastro de uma pessoa através de uma interface simples e intuitiva, consumindo o backend desenvolvido em Spring Boot.

## Tecnologias utilizadas

* Angular
* TypeScript
* HTML
* CSS
* RxJS

## Funcionalidades

* Cadastro de pessoa
* Integração com API REST
* Exibição de mensagens de sucesso
* Exibição de mensagens de erro
* Exibição do login gerado
* Limpeza automática do formulário após cadastro
* Feedback visual durante processamento

## Como executar o projeto

### Clonar o repositório

```bash
git clone https://github.com/BrunaTaura/person-registration-api-frontend.git
```

### Entrar na pasta

```bash
cd person-registration-api-frontend
```

### Instalar dependências

```bash
npm install
```

### Executar

```bash
ng serve
```

ou

```bash
npm start
```

A aplicação ficará disponível em:

```text
http://localhost:4200
```

## Configuração da API

O frontend está configurado para consumir o backend local:

```text
http://localhost:8080/api/people
```

Caso necessário, a URL pode ser alterada em:

```text
src/app/services/person.service.ts
```

## Fluxo da aplicação

1. Usuário preenche o formulário
2. Frontend realiza validações básicas
3. Requisição é enviada para API
4. Backend processa o cadastro
5. Backend consulta o ViaCEP
6. Backend gera um login único
7. Backend salva o cadastro
8. Frontend exibe o login gerado
9. Formulário é limpo automaticamente

## Exemplo de utilização

Dados informados:

```json
{
  "name": "Maria Silva",
  "cpf": "12345678909",
  "email": "maria@email.com",
  "birthDate": "1990-01-01",
  "zipCode": "01001000",
  "complement": "Apartamento 12"
}
```

Resposta:

```json
{
  "id": 1,
  "name": "Maria Silva",
  "email": "maria@email.com",
  "login": "mariasi"
}
```

Exibição na tela:

```text
Cadastro realizado com sucesso.
Login gerado: mariasi
```

## Estrutura do projeto

models

* Interfaces e modelos de dados

services

* Comunicação com API

app.ts

* Lógica principal da aplicação

app.html

* Estrutura visual

app.css

* Estilização

## Melhorias futuras

* Máscara para CPF e CEP
* Testes unitários
* Responsividade mobile
* Tela de consulta de cadastros
* Deploy em nuvem

## Autor

Bruna Taura Gandolfi
