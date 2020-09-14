import { Response, Request } from "express";

const AuthController = {
  authenticate: (req: Request, res: Response) => {
    return res.status(200).json({
      msg: "Success",
      data: {
        ...req.body,
        expiresAt: new Date().getTime() + 7 * 24 * 3600 * 1000,
      },
    });
  },
  register: (req: Request, res: Response) => {
    return res.status(200).json({
      msg: "Success",
      data: req.body,
    });
  },
};

export default AuthController;
