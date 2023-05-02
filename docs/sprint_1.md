# Sprint 1

Nessa primeira sprint as histórias definidas para ela podem ser acessadas pelo link abaixo:

 * [O backlog da sprint 1](https://github.com/users/userhv/projects/4)

 Para desenvolver essas histórias, utilizamos as modelagens já feitas anteriormente, assim temos uma estrutura do projeto composta por:

 ```mermaid
    sequenceDiagram
    activate APP
    APP->>MEDIADOR: requisição de um tipo de dado para o mediador
    activate MEDIADOR
    MEDIADOR->>API: o dado está na API?
    activate API
    API-->>MEDIADOR: resposta da requisição
    deactivate API
    MEDIADOR-->>APP: retorna o dado para o app
    deactivate MEDIADOR
    APP->>MEDIADOR: requisição de um tipo de dado para o mediador
    activate MEDIADOR  
    MEDIADOR->>SERVIDOR: o dado está no servidor?
    activate SERVIDOR
    SERVIDOR->>BD: requisição dos dados
    activate BD
    BD-->>SERVIDOR: resposta com os dados do banco
    deactivate BD
    SERVIDOR-->>MEDIADOR: resposta com os dados
    deactivate SERVIDOR
    MEDIADOR-->>APP: retorna o dado para o app
    deactivate MEDIADOR
	deactivate APP
```