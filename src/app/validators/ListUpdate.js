import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      public_list: Yup.boolean().required(),
      ranked_list: Yup.boolean().required(),
      albums: Yup.array().required(),
      tags: Yup.array(),
    });

    await schema.validate(req.body, { abortEarly: false });

    const params = Yup.object().shape({
      list_id: Yup.number().required(),
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
