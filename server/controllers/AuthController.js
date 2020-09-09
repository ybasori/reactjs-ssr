const AuthController = {
  authenticate: (req, res) => {
    return res.status(200).json({
      msg: "Success",
      data: { ...req.body, expiresAt: new Date().getTime() + 60 * 1000 },
    });
  },
};

export default AuthController;
