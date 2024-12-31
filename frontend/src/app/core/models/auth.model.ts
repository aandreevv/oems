export interface AuthResponseModel {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUserDataModel {
  email: string;
  password: string;
}

export interface TokenResponseModel {
  token: string;
  expiresOn: string;
  identityId: string;
}

export interface VideoRoomModel {
  id: string;
  roomId: string;
  createdAt: string;
  validFrom: string;
  validUntil: string;
  ownerId: string;
}
