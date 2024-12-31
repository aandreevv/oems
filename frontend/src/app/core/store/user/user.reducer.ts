import {UserModel} from "../../models/user.model";
import { UserActions, UserActionTypes } from "./user.actions";

export const INITIAL_USER_STATE: UserModel = {
  user: null,
  isLoggedIn: null,
  isLoading: false,
  errorMessage: '',
  connections: {
    connections: [],
    isLoading: false,
  },
  interests: {
    interests: [],
    isLoading: false,
  },
  followers: {
    followers: [],
    isLoading: false,
  },
  followings: {
    followings: [],
    isLoading: false,
  },
};

export function UserReducer(state: UserModel = INITIAL_USER_STATE, action: UserActions): UserModel {
  switch (action.type) {
    case UserActionTypes.LoginFetch: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UserActionTypes.LoginFetched: {
      return {
        ...state,
        isLoggedIn: true,
      };
    }

    case UserActionTypes.LoginFailed: {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        errorMessage: action.payload,
      }
    }

    case UserActionTypes.UserDataFetch: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case UserActionTypes.UserDataFetched: {
      const { id, email } = action.payload;

      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        errorMessage: '',
        user: {
          id,
          email,
          ...state.user,
          ...action.payload.profile,
          ...action.payload.profile?.data,
        },
      };
    }

    case UserActionTypes.UserDataFailed: {
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
      }
    }

    case UserActionTypes.Logout: {
      return {
        ...INITIAL_USER_STATE,
        isLoggedIn: false,
      };
    }

    case UserActionTypes.SetUpProfileFetched: {
      const { id, email } = action.payload;

      return {
        ...state,
        user: {
          id,
          email,
          ...action.payload.profile,
          ...action.payload.profile.data,
        },
      }
    }

    case UserActionTypes.ConnectionsFetch: {
      return {
        ...state,
        connections: {
          ...state.connections,
          isLoading: true,
        }
      }
    }

    case UserActionTypes.ConnectionsFetched: {
      return {
        ...state,
        connections: {
          connections: action.payload,
          isLoading: false,
        },
      }
    }

    case UserActionTypes.InterestsFetch: {
      return {
        ...state,
        interests: {
          ...state.interests,
          isLoading: true,
        }
      }
    }

    case UserActionTypes.InterestsFetched: {
      return {
        ...state,
        interests: {
          interests: action.payload,
          isLoading: false,
        },
      }
    }

    case UserActionTypes.FollowersFetch: {
      return {
        ...state,
        followers: {
          ...state.followers,
          isLoading: true,
        }
      }
    }

    case UserActionTypes.FollowersFetched: {
      const followers = action.payload.map(follower => {
        return {
          id: follower.id,
          email: follower.email,
          ...follower.profile,
          ...follower.profile.data,
        }
      });

      return {
        ...state,
        followers: {
          followers,
          isLoading: false,
        },
      }
    }

    case UserActionTypes.FollowingsFetch: {
      return {
        ...state,
        followings: {
          ...state.followings,
          isLoading: true,
        }
      }
    }

    case UserActionTypes.FollowingsFetched: {
      const followings = action.payload.map(followings => {
        return {
          id: followings.id,
          email: followings.email,
          ...followings.profile,
          ...followings.profile.data,
        }
      });

      return {
        ...state,
        followings: {
          followings,
          isLoading: false,
        },
      }
    }

    default:
      return state;
  }
}
