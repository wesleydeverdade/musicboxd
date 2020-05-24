import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const params = Yup.object().shape({
      block_user_id: Yup.number().required(),
    });

    await params.validate(req.params, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Validation failure',
      error: err.inner,
    });
  }
};
