interface AuthRequest extends Request {
  user: {
    email: string;
    sub: string;
    refreshToken: string;
    id: string;
  };
}
export default AuthRequest;
