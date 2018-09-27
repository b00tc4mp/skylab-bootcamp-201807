function emailValidate(req, res, next) {
  try {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(req.body.email)){
        next()
    } else {
        throw new Error('Invalid Email')
    }
  } catch ({message}) {
    res.status(401).json({message})
  }
}

module.exports = emailValidate