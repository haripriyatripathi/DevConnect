export type DeveloperRole = 'Frontend' | 'Backend' | 'Full-Stack';

export interface Developer {
  id: string;
  name: string;
  role: DeveloperRole;
  tech_stack: string[];
  experience: number;
  created_at: string;
}

export interface DeveloperFormData {
  name: string;
  role: DeveloperRole;
  techStack: string;
  experience: number;
}
