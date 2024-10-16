export type CounterDetail = {
  id:number;
  name: string;
  code: string;
  created_by:number;
  created_by_name:string|null;
  department:number;
  department_name:string;
  is_active:Boolean;
};

export type CounterPayload = {
  id: null | number;
  name: string;
  code: string;
  department:number;
  is_active:Boolean;

};
