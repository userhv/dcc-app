# Modelagem

A princípio o sistema pode parecer difícil, complexo e cheio de nuances. A modelagem do sistema tenta atenuar isso. Nela, utilizamos técnicas visuais como o **Diagrama de Classes** para representar como possivelmente será a estrutura do nosso sistema.

## O App do DCC

Apesar de ainda não começarmos de fato com a sprint, já temos ciência de alguns pontos que foram acordados nos requisitos, usando como base nosso backlog, assim, utilizando desse conhecimento podemos definir uma estrutura base para o aplicativo.

### A estrutura do app

```mermaid
    sequenceDiagram
        activate app
        app->>api GET/
        activate api
        api->>server: coleta_informaçoes
        activate server
        server->>data_base
        activate data_base
        data_base->> server
        deactivate data_base
        server->> api
        deactivate server
        api->>app
        deactivate api
        deactivate app
```	