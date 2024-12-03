import React, { HTMLInputTypeAttribute } from 'react';
import { DeepRequired, FieldErrorsImpl, GlobalError } from 'react-hook-form';

export interface InputFormProps {
  tag?: keyof IntrinsicElements | React.ComponentType<any>;
  title: string;
  type: HTMLInputTypeAttribute;
  reg: any;
  value?: string
  min?: number | string
  max?: number | string
  defaultValue?: string | number,
  errors: Partial<FieldErrorsImpl<DeepRequired<any>>> & { root?: Record<string, GlobalError> & GlobalError }
}
