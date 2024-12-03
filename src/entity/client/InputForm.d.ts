import React, { ReactElement } from 'react';

export interface InputFormProps {
  tag?: keyof ReactElement | React.ComponentType<any>;
  title: string;
  type: "textarea" | "text" | "time" | "number" | "date" | "tel";
  reg: any;
  value?: string
  min?: string | number
  max?: string | number
  defaultValue?: string | number,
}
