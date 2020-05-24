import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      content: Yup.string(),
      liked: Yup.boolean().required(),
      note: Yup.number()
        .required()
        .test(
          'testError',
          'note must be a number more than 0 e less than 5, divisible by 0.5',
          (value) => value > 0 && value <= 5 && value % 0.5 === 0
        ),
      tags: Yup.array(),
    });

    await schema.validate(req.body, { abortEarly: false });

    const params = Yup.object().shape({
      review_id: Yup.number().required(),
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
