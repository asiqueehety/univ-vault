export interface QuestionBase {
  q_id: number;
  provider_id: number;
  q_type: 'ct' | 'term' | 'others';
  course_id: number;
  q_title: string;
  file_location: string;
  con_points: number;
  c_name: string;
  name: string;
  dept: string;
  batch: string;
  year: number,
}

export interface Question extends QuestionBase {
  // These fields are only present for CT questions, null for others
  t_name: string | null;
  t_designation: string | null;
  t_dept_name: string | null;
}

// For backward compatibility
export interface CTQuestion extends QuestionBase {
  t_name: string;
  t_designation: string;
  t_dept_name: string;
}

export interface TermOrOthersQuestion extends QuestionBase {
  t_name: null;
  t_designation: null;
  t_dept_name: null;
}
