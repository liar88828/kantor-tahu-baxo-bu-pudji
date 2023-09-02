import React from 'react';

export interface InputFormProps {
  tag?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  title: string;
  type: "textarea" | "text" | "time" | "number" | "date" | "tel";
  reg: any;
  value?: string
  min?: string
  max?: string
  defaultValue?: string | number,

}
