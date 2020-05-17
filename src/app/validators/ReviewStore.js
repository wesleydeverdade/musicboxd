import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      spotify_id: Yup.string().required(),
      content: Yup.string(),
      liked: Yup.boolean().required(),
      note: Yup.number()
        .required()
        .test(
          'testError',
          'note must be a number more than 0 e less than 5, divisible by 0.5.',
          (value) => value > 0 && value <= 5 && value % 0.5 === 0
        ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Falha de validação',
      error: err.inner,
    });
  }
};
