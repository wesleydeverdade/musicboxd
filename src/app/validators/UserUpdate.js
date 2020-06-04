const Yup = require('yup');

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      username: Yup.string().required().min(4),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      first_name: Yup.string(),
      last_name: Yup.string(),
      location: Yup.string(),
      website: Yup.string(),
      bio: Yup.string(),
      people_section: Yup.boolean(),
      first_favorite_album: Yup.string(),
      second_favorite_album: Yup.string(),
      third_favorite_album: Yup.string(),
      fourth_favorite_album: Yup.string(),
      fifth_favorite_album: Yup.string(),
      replies: Yup.number()
        .required()
        .test(
          'testError',
          'replies must be a number more than 0 e less than 2',
          (value) => value === 0 || value === 1 || value === 2
        ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Validation failure',
      error: err.inner,
    });
  }
};
