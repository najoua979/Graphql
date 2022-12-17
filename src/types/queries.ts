export type Query<N extends string, T> = { data: { [K in N]: T[] } };

export type LaunchPast = {
  mission_name: string;
  launch_date_local: string;
  launch_site: {
    site_name_long: string;
  };
  links: {
    article_link: string;
    video_link: string;
  };
};

export type LaunchPad = {
  attempted_launches: number;
  details: string;
  name: string;
  status: string;
  successful_launches: number;
};

export type Mission = {
  description: string;
  name: string;
  twitter: string;
  website: string;
};

export type Dragon = {
  crew_capacity: number;
  description: string;
  diameter: {
    meters: number;
  };
  name: string;
};
