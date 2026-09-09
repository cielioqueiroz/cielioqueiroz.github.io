# Buscar os repositórios no servidor, com revalidação horária

A vitrine de repositórios chamava a API do GitHub direto do navegador do visitante. Sem
autenticação o limite é 60 requisições por hora POR IP: um recrutador atrás do NAT de uma
empresa grande abria o site e encontrava a seção vazia. Além disso os repositórios ficavam
fora do HTML — invisíveis para buscador — e a seção piscava um esqueleto de carregamento em
toda visita.

Agora a busca acontece no servidor e o resultado é revalidado de hora em hora. Com token no
ambiente o limite sobe para 5.000/h; sem token continua funcionando, só que o limite passa a
ser compartilhado por todos os visitantes em vez de um por IP.

## Consequências

- A vitrine não é "tempo real" e o texto do site não pode prometer isso: uma alteração no
  GitHub leva até uma hora para aparecer.
- Se a API falhar, quem vê o erro é o build/servidor, não o visitante.
