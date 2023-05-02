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

## O react-native-rss-parser e a dependência

Um problema que enfrentamos nessa primeira sprint foi que o pacote que utilizamos para realizar o parser de tipos **Atom** e **RSS** tinha sido descontinuado, com isso durante o desenvolvimento detectamos que uma de suas dependências (xmldom) possuia uma vulnerabilidade crítica na versão que estava sendo usado, sendo assim criamos um fork desse pacote e alteramos, atualizando a versão da suas dependências e adicionando uma funcionalidade de coletar o **media:content** um atributo utilizado para coletar imagens do tipo jpeg que são providas pela API de notícias. 

* Você pode verificar a implementação [aqui](/src/dependencies/react-native-rss-parser/).

Com isso, basicamente agora temos o poder de controlar o parser dos arquivos da forma que for necessária para o projeto, se livrando de um vínculo com algum pacote externo que futuramente possa ficar obsoleto por falta de atualização dos mantenedores.

