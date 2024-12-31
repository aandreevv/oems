export interface UserConnection {
  id: string,
  type: UserConnectionsType,
  url: string,
}

export enum UserConnectionsType {
  LINKED_IN = 'LINKED_IN',
  INSTAGRAM = 'INSTAGRAM',
  TELEGRAM = 'TELEGRAM',
  FACEBOOK = 'FACEBOOK',
  X = 'X',
}

export interface UserConnectionUIModel {
  name: UserConnectionsType;
  value: string;
  newValue: string;
}

export interface UserInterest {
  id: string;
  type: UserInterestsType;
}

export enum UserInterestsType {
  SPRINT_PLANNING = 'SPRINT_PLANNING',
  DAILY_MEETING = 'DAILY_MEETING',
  SPRINT_REVIEW = 'SPRINT_REVIEW',
  SPRINT_RETROSPECTIVE = 'SPRINT_RETROSPECTIVE',
  BACKLOG_REFINEMENT = 'BACKLOG_REFINEMENT',
  RELEASE_PLANNING = 'RELEASE_PLANNING',
  SPRINT_MIDPOINT_CHECK_IN = 'SPRINT_MIDPOINT_CHECK_IN',
  STAKEHOLDER_FEEDBACK_SESSION = 'STAKEHOLDER_FEEDBACK_SESSION',
  PRODUCT_DISCOVERY_WORKSHOP = 'PRODUCT_DISCOVERY_WORKSHOP',
  TEAM_BUILDING = 'TEAM_BUILDING',
  STORY_MAPPING_SESSION = 'STORY_MAPPING_SESSION',
  TEAM_SESSION = 'TEAM_SESSION',
  DOR_REVIEW = 'DOR_REVIEW',
  CROSS_TEAM_SYNC = 'CROSS_TEAM_SYNC',
  TRANSITION_MEETING = 'TRANSITION_MEETING',
  PLANNING_POKER_SESSION = 'PLANNING_POKER_SESSION',
  PROGRESS_REVIEW = 'PROGRESS_REVIEW',
  RISK_REVIEW = 'RISK_REVIEW',
  DEMO_SESSION = 'DEMO_SESSION',
  ONE_TO_ONE_MEETING = 'ONE_TO_ONE_MEETING',
  ONBOARDING_MEETING = 'ONBOARDING_MEETING',
}

export const userInterestsArray: UserInterestsBadges[] = [
  { value: UserInterestsType.SPRINT_PLANNING, label: 'Sprint Planning', shortName: 'Sprint Planning', styles: { color: '#ffffff', backgroundColor: '#ff5733' } },
  { value: UserInterestsType.DAILY_MEETING, label: 'Daily Meeting', shortName: 'Daily Meeting', styles: { color: '#ffffff', backgroundColor: '#ffcc29' } },
  { value: UserInterestsType.SPRINT_REVIEW, label: 'Sprint Review', shortName: 'Sprint Review', styles: { color: '#ffffff', backgroundColor: '#4caf50' } },
  { value: UserInterestsType.SPRINT_RETROSPECTIVE, label: 'Sprint Retrospective', shortName: 'Retrospective', styles: { color: '#ffffff', backgroundColor: '#2196f3' } },
  { value: UserInterestsType.BACKLOG_REFINEMENT, label: 'Backlog Refinement', shortName: 'Grooming', styles: { color: '#ffffff', backgroundColor: '#e91e63' } },
  { value: UserInterestsType.RELEASE_PLANNING, label: 'Release Planning', shortName: 'Release Planning', styles: { color: '#ffffff', backgroundColor: '#9c27b0' } },
  { value: UserInterestsType.SPRINT_MIDPOINT_CHECK_IN, label: 'Sprint Midpoint Check-In', shortName: 'Midpoint Check-In', styles: { color: '#ffffff', backgroundColor: '#ffc107' } },
  { value: UserInterestsType.STAKEHOLDER_FEEDBACK_SESSION, label: 'Stakeholder Feedback', shortName: 'Stakeholder Feedback', styles: { color: '#ffffff', backgroundColor: '#03a9f4' } },
  { value: UserInterestsType.PRODUCT_DISCOVERY_WORKSHOP, label: 'Product Discovery', shortName: 'Product Discovery', styles: { color: '#ffffff', backgroundColor: '#795548' } },
  { value: UserInterestsType.TEAM_BUILDING, label: 'Team Building', shortName: 'Team Building', styles: { color: '#ffffff', backgroundColor: '#607d8b' } },
  { value: UserInterestsType.STORY_MAPPING_SESSION, label: 'Story Mapping Session', shortName: 'Story Mapping', styles: { color: '#ffffff', backgroundColor: '#ff9800' } },
  { value: UserInterestsType.TEAM_SESSION, label: 'Team Session', shortName: 'Team Session', styles: { color: '#ffffff', backgroundColor: '#009688' } },
  { value: UserInterestsType.DOR_REVIEW, label: 'Definition of Ready Review', shortName: 'DoR Review', styles: { color: '#ffffff', backgroundColor: '#795548' } },
  { value: UserInterestsType.CROSS_TEAM_SYNC, label: 'Cross-Team Sync', shortName: 'Cross-Team Sync', styles: { color: '#ffffff', backgroundColor: '#ff5722' } },
  { value: UserInterestsType.TRANSITION_MEETING, label: 'Transition Meeting', shortName: 'Transition Meeting', styles: { color: '#ffffff', backgroundColor: '#2196f3' } },
  { value: UserInterestsType.PLANNING_POKER_SESSION, label: 'Planning Poker Session', shortName: 'Planning Poker', styles: { color: '#ffffff', backgroundColor: '#4caf50' } },
  { value: UserInterestsType.PROGRESS_REVIEW, label: 'Progress Review', shortName: 'Progress Review', styles: { color: '#ffffff', backgroundColor: '#f44336' } },
  { value: UserInterestsType.RISK_REVIEW, label: 'Risk Review', shortName: 'Risk Review', styles: { color: '#ffffff', backgroundColor: '#9c27b0' } },
  { value: UserInterestsType.DEMO_SESSION, label: 'Demo Session', shortName: 'Demo', styles: { color: '#ffffff', backgroundColor: '#8bc34a' } },
  { value: UserInterestsType.ONE_TO_ONE_MEETING, label: 'One-To-One Meeting', shortName: 'One-To-One', styles: { color: '#ffffff', backgroundColor: '#607d8b' } },
  { value: UserInterestsType.ONBOARDING_MEETING, label: 'Onboarding Meeting', shortName: 'Onboarding', styles: { color: '#ffffff', backgroundColor: '#795548' } }
];

export interface UserInterestsBadges {
  value: UserInterestsType;
  label: string;
  shortName: string;
  styles: {
    color: string;
    backgroundColor: string;
  }
}
