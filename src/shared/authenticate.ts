import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import userpool from "../userpool";

export const forgotPassword = (Email: string) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: Email,
      Pool: userpool,
    });

    user.forgotPassword({
      onSuccess: (result) => resolve(result),
      onFailure: (err) => reject(err),
      inputVerificationCode: (data) => resolve(data),
    });
  });
};

export const resendOTP = (Email: string) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: Email,
      Pool: userpool,
    });

    user.resendConfirmationCode((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const confirmOTP = (Email: string, code: string) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: Email,
      Pool: userpool,
    });

    user.confirmRegistration(code, true, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const authenticate = (Email: string, Password: string) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: Email,
      Pool: userpool,
    });

    const authDetails = new AuthenticationDetails({
      Username: Email,
      Password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => resolve(result),
      onFailure: (err) => reject(err),
    });
  });
};

export const logout = () => {
  const user = userpool.getCurrentUser();
  user?.signOut();
  window.location.href = "/";
};
