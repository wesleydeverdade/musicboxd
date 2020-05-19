import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      page: Yup.number(),
      user_id: Yup.number(),
      spotify_id: Yup.string(),
    });

    await schema.validate(req.query, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Falha de validação',
      error: err.inner,
    });
  }
};