import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      list_id: Yup.number().required(),
      allowed_replies: Yup.number()
        .required()
        .test(
          'testError',
          'replies must be a number more than 0 e less than 2.',
          (value) => value === 0 || value === 1 || value === 2
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
