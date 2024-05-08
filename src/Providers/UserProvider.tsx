
export function signIn(token: string) {
  localStorage.setItem("session_token", token);
}

export function setUserImage(url: string) {
  localStorage.setItem("img_url", url);
}
