import Mail from '../../lib/Mail';

class UserStoreMail {
  get key() {
    return 'UserStoreMail';
  }

  async handle({ data }) {
    const { username, email } = data;

    await Mail.sendMail({
      to: `${username} <${email}>`,
      subject: 'Welcome to Musicbox',
      template: 'userStore',
      context: {
        username,
      },
    });
  }
}

export default new UserStoreMail();
