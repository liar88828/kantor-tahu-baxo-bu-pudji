import React from 'react';

export interface InputFormProps {
  tag?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  title: string;
  type: "textarea" | "text" | "number" | "date" | string;
  reg: any;
  value?: string
  min?: string
  defaultValue?: string | number
}
