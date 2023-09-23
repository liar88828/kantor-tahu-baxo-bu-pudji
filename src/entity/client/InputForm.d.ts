import React from 'react';

export interface InputFormProps {
  tag?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  title: string;
  type: "textarea" | "text" | "time" | "number" | "date" | "tel";
  reg: any;
  value?: string
  min?: string | number
  max?: string | number
  defaultValue?: string | number,

}
