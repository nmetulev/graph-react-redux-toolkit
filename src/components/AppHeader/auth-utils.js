import { UserAgentApplication } from "msal";

export const requiresInteraction = errorMessage => {
  if (!errorMessage || !errorMessage.length) {
    return false;
  }

  return (
    errorMessage.indexOf("consent_required") > -1 ||
    errorMessage.indexOf("interaction_required") > -1 ||
    errorMessage.indexOf("login_required") > -1
  );
};

export const fetchMsGraph = async (url, accessToken) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.json();
};

export const isIE = () => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ") > -1;
  const msie11 = ua.indexOf("Trident/") > -1;

  // If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
  // const isEdge = ua.indexOf("Edge/") > -1;

  return msie || msie11;
};

export const GRAPH_SCOPES = {
  OPENID: "openid",
  PROFILE: "profile",
  USER_READ: "User.Read",
  USER_READ_ALL: "User.Read.All",
  USER_READWRITE_ALL: "User.ReadWrite.All"
};

export const GRAPH_ENDPOINTS = {
  ME: "https://graph.microsoft.com/v1.0/me",
  MAIL: "https://graph.microsoft.com/v1.0/me/messages"
};

export const GRAPH_REQUESTS = {
  LOGIN: {
    scopes: [
      "User.Read",
      "User.ReadWrite",
      "User.ReadBasic.All",
      "User.Read.All",
      "User.ReadWrite.All",
      "Directory.Read.All",
      "Directory.ReadWrite.All",
      "Directory.AccessAsUser.All",
      "Group.Read.All",
      "Group.ReadWrite.All"
    ]
  },
  EMAIL: {
    scopes: [GRAPH_SCOPES.MAIL_READ]
  }
};

export const msalApp = new UserAgentApplication({
  auth: {
    clientId: "958845a3-6c6d-4e10-9ebd-cf6f415a89c6",
    authority: "https://login.microsoftonline.com/common",
    validateAuthority: true,
    postLogoutRedirectUri: "http://localhost:3000",
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: isIE()
  },
  system: {
    navigateFrameWait: 0
  }
});
