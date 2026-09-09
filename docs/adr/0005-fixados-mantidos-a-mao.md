# Os repositórios fixados são mantidos à mão, não buscados

A vitrine da § 03 destaca os mesmos repositórios que estão fixados no perfil do GitHub. O
GitHub só expõe essa lista pela API GraphQL **autenticada** — a REST pública não tem o
recurso. Havia aqui uma chamada a um serviço de terceiros que espelhava os pins; ele passou a
responder 404 e a vitrine caiu, em silêncio, para a lista de reserva do config, que estava
desatualizada. Resultado: exercícios antigos de CSS ocupando o topo do portfólio.

Trocamos por uma lista escrita à mão em `config/site.ts`, que agora é a fonte da verdade da
ordem e do selo "fixado".

## Considerado e descartado

- **GraphQL do GitHub com token.** Funciona, mas amarra a seção a um segredo de ambiente:
  sem `GITHUB_TOKEN` a vitrine perderia a ordenação. Hoje o token é opcional e só amplia o
  limite de requisições — o site funciona inteiro sem ele, e vale manter assim.
- **Outro serviço espelho.** Trocaria um terceiro que morreu por outro que pode morrer, com o
  mesmo modo de falha silencioso.

## Consequências

Fixar um repositório novo no GitHub exige editar o config — são seis nomes e muda raramente.
Em troca, a ordem da vitrine não depende de rede nem de terceiro, e um nome fora do lugar é
pego por teste em vez de virar degradação invisível.
