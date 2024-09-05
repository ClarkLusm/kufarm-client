type ReferralUser = {
  id: string;
  email: string;
  referredUser: {
    btco2Value: number;
    level: number;
  };
};
