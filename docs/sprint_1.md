# Sprint 1

Nessa primeira sprint as histórias definidas para ela podem ser acessadas pelo link abaixo:

 * [O backlog da sprint 1](https://github.com/users/userhv/projects/4)

 Para desenvolver essas histórias, utilizamos as modelagens já feitas anteriormente, assim temos uma estrutura do projeto composta por:

 ```mermaid
    sequenceDiagram
    activate APP
    APP->>MEDIADOR: requisição de um tipo de dado para o mediador
    activate MEDIADOR
    MEDIADOR->>API: coleta notícias da API
    activate API
    API-->>MEDIADOR: resposta da requisição
    deactivate API
    MEDIADOR-->>APP: retorna as notícias formatadas para o APP
    deactivate MEDIADOR
    APP->>Realm: inserção e remoção das notícias marcadas para serem lidas
    activate Realm  
    Realm-->>APP: confirmação da transação
    deactivate Realm
	deactivate APP
```

Para essa primeira etapa, a modelagem do sistema em específico ficou determinada dessa forma. Note que utilizamos o banco local Realm para armazenar alguns dados no próprio celular do usuário, assim podemos poupar consultas.

Além disso, estamos utilizando uma visualização com **WebView** o que garante que o usuário se mantenha no aplicativo para consumir os conteúdos presentes no mesmo.