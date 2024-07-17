# Sistema de Agendamento de Vacinação contra COVID-19

## Descrição
Este projeto consiste em um sistema para realizar agendamentos de vacinação contra COVID-19. O sistema permite que os usuários agendem um horário específico para receber a vacina, além de consultar os agendamentos feitos por dia e hora.

## Regras de Uso
- Agendamento realizado através de um formulário na página.
- Disponibilidade de 20 vagas por dia.
- Máximo de 2 agendamentos por horário.
- Pagina para consultar os agendamentos
- Agrupamento dos agendamentos por dia e hora.
- Intervalo de tempo entre agendamentos é de 1 hora.

## Regras de Negócio
- Paciente informa nome, data de nascimento, dia e horário desejado para agendamento.
- Checagem de preenchimento do formulário.
- Armazenamento em memoria dos dados.
- Mensagem de confirmação exibida em modal/popup.
- Persistência dos dados ao recarregar a página.
-• Dentro da página para consultar os agendamentos deve ser possível visualizar a
listagem de agendamentos feitos e informar se o agendamento foi realizado ou
não, e qual a conclusão do atendimento (se foi realizado)

## Regras de execução:
- Portal escrito em React, utilizar o react-datepicker para o gerenciamento de
datas.
- Construir uma API em Node.js para receber os dados do portal.
- Axios como client HTTP
- Utilizar o Formik(com Yup) ou React Hook Forms (ZOD) para criação de validação
do formulário
- Utilizar ContextAPI para exibir o Modal/Popup

## Tecnologias Utilizadas
- React
- Chakra UI
- React Datepicker
- Zod
- Axios
- TypeScript

## Como Executar
1. Clone o repositorio:
    ```bash
    git clone https://github.com/Gominho01/pitang-frontend.git
    ```
2. Va para a pasta pitang frontend:
    ```bash
    cd pitang-frontend
    ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Execute o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
5. Acesse o aplicativo em `http://localhost:5173`
