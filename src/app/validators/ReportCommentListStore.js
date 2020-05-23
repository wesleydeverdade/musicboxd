import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      content: Yup.string(),
      reason: Yup.number()
        .required()
        .test(
          'testError',
          'reason must be a number more or equal than 0 e less than 4.',
          (value) => value >= 0 && value <= 3 && value % 1 === 0
        ),
    });

    await schema.validate(req.body, { abortEarly: false });
    const params = Yup.object().shape({
      report_list_comment_id: Yup.number().required(),
    });

    await params.validate(req.params, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Falha de validação',
      error: err.inner,
    });
  }
};
