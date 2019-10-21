import Mail from '../../lib/Mail';

class RegisterMail {
  get key() {
    return 'RegisterMail';
  }

  async handle({ data }) {
    const { user } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Seja Bem-Vindo ao Quiz Enade!',
      template: 'register',
      context: {
        user: user.name,
      },
    });
  }
}

export default new RegisterMail();
