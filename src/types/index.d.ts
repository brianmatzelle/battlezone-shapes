import { CSSProperties } from 'react';

export interface StarProps {
  rotationSpeedX?: number;
  rotationSpeedY?: number;
  color?: string;
  size?: number;
  lineWidth?: number;
  twinkle?: boolean;
  style?: CSSProperties;
}

export interface StarfieldProps {
  // Add any props if needed for Starfield component
}

export declare function Star(props: StarProps): JSX.Element;
export declare function Starfield(props: StarfieldProps): JSX.Element;