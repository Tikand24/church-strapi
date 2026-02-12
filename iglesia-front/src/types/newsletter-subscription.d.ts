export type NewsletterStatus = 'active' | 'unsubscribed' | 'pending';

export interface NewsletterSubscription {
  id?: number;
  email: string;
  name?: string | null;
  statusSub: NewsletterStatus;
  subscribedAt: string;
  source?: string | null;
}

export interface NewsletterSubscriptionPayload {
  data: {
    email: string;
    name?: string | null;
    statusSub: NewsletterStatus;
    subscribedAt: string;
    source?: string | null;
  };
}
