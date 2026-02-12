export interface ScheduleItem {
  time?: string;
  description?: string;
  icon?: string;
}
export interface ScheduleGroup {
  Title: string;
  Item?: ScheduleItem[];
}
export interface Schedule{
  Title: string;
  description: string;
  ScheduleTab?: ScheduleGroup[];
}
export interface TimeRange{
  TimeStart?: string;
  TimeEnd?: string;
}
export interface ScheduleRangeItem{
  description?: string;
  icon?: string;
  TimeRange?: Array<TimeRange>;
}
export interface ScheduleProps{
  Title: string;
  description: string;
  ScheduleTab?: ScheduleGroup[];
}