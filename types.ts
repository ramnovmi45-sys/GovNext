
export interface Job {
  id: string;
  organization: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  applyLink: string;
  isAd?: boolean;
}

export type NewJob = Omit<Job, 'id'>;
