import axios from 'axios';
import apiPathsRoot from '../ServicePaths';

const apiPaths = apiPathsRoot.children;

// ============= Auth ====================
const doLogin = data =>
  axios.post(`${apiPaths.login.path}`, { data: JSON.stringify(data) });

const doRegister = (data) =>
  axios.post(`${apiPaths.signup.path}`, { data: JSON.stringify(data) });

const logoutRequest = () =>
  axios.get(`${apiPaths.logout.path}`);

const doResetPassword = data =>
  axios.post(`${apiPaths.sendPasswordReset.path}`, { ...data });

const resendActionationEmail = email =>
  axios.post(`${apiPaths}`, { email: JSON.stringify(email) });

const recoverPassword = identifier =>
  axios.post(`${apiPaths}`, { identifier });

const changePassword = (oldPassword, newPassword) =>
  axios.patch(`${apiPaths}`, { oldPassword, newPassword });

const deleteAccount = () =>
  axios.delete(`${apiPaths}`);

export {
  doLogin,
  doRegister,
  loginCompletionRequest,
  logoutRequest,
  doResetPassword,
  resendActionationEmail,
  recoverPassword,
  changePassword,
  deleteAccount,
};
