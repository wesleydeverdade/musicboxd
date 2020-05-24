import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      content: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    const params = Yup.object().shape({
      comment_id: Yup.number().required(),
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
