const Yup = require('yup');

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      page: Yup.number(),
    });

    await schema.validate(req.query, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Validation failure',
      error: err.inner,
    });
  }
};
