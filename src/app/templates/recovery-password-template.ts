export const recoveryPasswordTemplate = (link: string) =>
  `Prezado(a) usuário(a),

Esperamos que este e-mail o encontre bem. Notamos que você solicitou a redefinição da sua senha.

Por favor, clique no link abaixo para iniciar o processo de recuperação de senha:
<a href="${link}">${link}</a>

Se você não solicitou essa redefinição ou não reconhece essa atividade, por favor, entre em contato conosco imediatamente.

Agradecemos pela sua atenção.

Atenciosamente,
Equipe de Suporte`;
