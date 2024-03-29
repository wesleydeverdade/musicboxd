const Yup = require('yup');

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      review_id: Yup.number().required(),
    });

    await schema.validate(req.params, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Validation failure',
      error: err.inner,
    });
  }
};
