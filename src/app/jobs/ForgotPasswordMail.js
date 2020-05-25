import Mail from '../../lib/Mail';

class ForgotPasswordMail {
  get key() {
    return 'ForgotPasswordMail';
  }

  async handle({ data }) {
    const { token, username, email } = data;

    await Mail.sendMail({
      to: `${username} <${email}>`,
      subject: 'Forgot Password',
      template: 'forgotPassword',
      context: {
        token,
      },
    });
  }
}

export default new ForgotPasswordMail();
