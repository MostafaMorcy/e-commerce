export const validation = (Schema) => {
  return (req, res, next) => {
    let inputs = { ...req.body, ...req.query, ...req.params };
    let { error } = Schema.validate(inputs, { abortEarly: false }); // scan the data that sent on body
    console.log(error);
    if (error) {
      let errors = error.details.map((detail) => detail.message);
      res.json(errors);
    } else {
      next();
    }
  };
};
