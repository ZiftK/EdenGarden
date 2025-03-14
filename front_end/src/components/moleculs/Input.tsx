import { Box } from "@raul_yael/cleangui";
import { useId, useState } from "react";

export interface InputProps {
    variant: 'outlined' | 'filled' | 'default'; 
    sxText?: number; 
    sxMn?: [number, number, number, number] | number
    sxPd?: [number, number, number, number] | number
    colorNoFocus?: string
    color?: string
    bg?: string;
    lightnessFactor?: number
    sx?: 'small' | 'medium' | 'large';
    label?: string; 
    value?: string; 
    statusError?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    id?: string;
    $width?: string;
    style?: React.CSSProperties
  }

export interface InputState {
    value: string;
    idInput: string;
}

import styled, { css } from "styled-components";

export const theme = {
  colors: {
    error: 'var(--error-color)',
    success: 'var(--success-color)',
    label: 'var(--text-label)',
    background: 'var(--background)',
    outlined: 'var(--outlined-color)',
    text: 'var(--text-color)',
    transparent: 'var(--background-transparent)',
    errorBackground: 'transparent',
  },
  sizes: {
    small: css`
      padding: 6px 10px;
      font-size: 12px;
    `,
    medium: css`
      padding: 13px 16px;
      font-size: 14px;
    `,
    large: css`
      padding: 12px 24px;
      font-size: 16px;
    `,
  },
};

const hexToRgba = (hex: string, percent: number = 20): string => {
  hex = hex.replace(/^#/, "");

  let r: number, g: number, b: number;

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    throw new Error("Formato de color no válido");
  }

  // Calcular el aclaramiento hacia el blanco
  const white = 255;
  r = Math.round(r + (white - r) * (percent / 100));
  g = Math.round(g + (white - g) * (percent / 100));
  b = Math.round(b + (white - b) * (percent / 100));

  // Asegurar que los valores no excedan 255
  r = Math.min(r, 255);
  g = Math.min(g, 255);
  b = Math.min(b, 255);

  // Convertir de vuelta a hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};



export const StyledInput = styled.input<Pick<InputProps,"bg"|"lightnessFactor" |"color" |"colorNoFocus"| "sxText" |'sx' | "sxMn" | "sxPd" | "variant" | "statusError">>`
  transition: border 200ms, color 200ms, background-color 200ms;
  padding: ${({ sxPd }) =>
    Array.isArray(sxPd)
      ? `${sxPd[0]}px ${sxPd[1]}px ${sxPd[2]}px ${sxPd[3]}px`
      : `${sxPd}px`};
  width: 100%;
  outline: none;
  ${({ sxText }) => sxText && `font-size: ${sxText}rem;`}
  ${({ sxMn }) => sxMn && `margin: ${sxMn}px;`}


  ${({ variant, statusError, color, colorNoFocus,lightnessFactor,bg }) => {
    const errorColor = theme.colors.error;
    const errorBackground = theme.colors.errorBackground;
    const successColor = theme.colors.success;
    const textColor = color && hexToRgba(color, -70)
    const bgColor = bg 
      ? `#${bg}`
      : color && hexToRgba(color, lightnessFactor);
    const bgColorNoFocus = colorNoFocus && hexToRgba(colorNoFocus, lightnessFactor)

    switch (variant) {
      case 'default':
        return css`
          background-color: ${bgColorNoFocus || theme.colors.transparent};
          border: none;
          color: ${statusError 
            ? errorColor 
            : color 
            ? textColor
            : theme.colors.text};
          border-bottom: 1px solid ${statusError 
            ? errorColor 
            : color
            ? colorNoFocus
            : theme.colors.text};
          &:focus, &:not([value=""]) {
              border-bottom: 1px solid ${statusError 
                ? errorColor 
                : color
                ? color
                : successColor
                };
              color: ${statusError 
                ? errorColor 
                : color 
                ? textColor
                : theme.colors.text};
              background-color: ${bgColor || theme.colors.transparent};
          }
        `;
      case 'outlined':
        return css`
          background-color: ${theme.colors.background};
          border: 1px solid ${statusError 
            ? errorColor 
            : color
            ? colorNoFocus
            : theme.colors.outlined
            };
          border-radius: 10px;
          color: ${statusError
            ? errorColor 
            : color
            ? color
            : theme.colors.outlined
            };
          &:focus, &:not([value=""]) {
            border-color: ${statusError 
              ? errorColor 
              : color
              ? color
              : successColor
              };
            color: ${statusError             
              ? errorColor 
              : color
              ? color
              : successColor
            }`;
      case 'filled':
        return css`
          background-color: ${statusError 
            ? errorBackground 
            : color
            ? bgColor
            : theme.colors.transparent
            };
          border: none;
          border-bottom: 1px solid ${statusError 
            ? errorColor 
            : color 
            ? colorNoFocus
            : theme.colors.text};
          color: ${statusError 
            ? errorColor 
            : color 
            ? color
            : theme.colors.text};
          &:focus, &:not([value=""]){
            border-color: ${statusError 
              ? errorColor 
              : color
              ? color
              : successColor
            };

          }
        `;
      default:
        return '';
    }
  }}

  &:not([value=""]) + span,
  &:focus + span {
    color: ${({ statusError, color }) => (statusError 
      ? 'var(--error-color)' 
      : color
      ? color
      : 'var(--success-color)'
    )};
  transform: ${({ sxText, sxPd }) => {
    const paddingTop = Array.isArray(sxPd) ? sxPd[0] : sxPd || 0;
    const textSize = sxText || 14;
    
    return `translateY(-${(paddingTop + textSize) / 10}rem)`;
  }};
  font-size: ${({ sxText }) => sxText ? `${sxText * 0.6}rem` : '1rem'};
  }

  &:disabled {
    background-color: ${theme.colors.background};
    cursor: not-allowed;
  }
`;

export const StyledLabel = styled.span<{
  sxPd : [number, number, number, number] | number
  sxText : number
  sx : 'small' | 'medium' | 'large'
  statusError: boolean
  variant: 'outlined' | 'filled' | 'default'
  color?: string
  colorNoFocus?: string
  lightnessFactor?: number
  bg?: string
}>`
  font-size: ${({ sxText }) => sxText ? `${sxText}rem` : '1rem'};
  position: absolute;
  pointer-events: none;
  left: ${({ sxPd }) => {
  const paddingLeft = Array.isArray(sxPd) ? sxPd[3] : 20; 
  return `${paddingLeft}px`;
  }};
  top: ${({ sxPd, sxText }) => {
    const paddingTop = Array.isArray(sxPd) ? sxPd[0] : sxPd || 0;
    const textSize = sxText || 1; 

    return `${paddingTop + textSize * 0}px`; 
  }};
  border-radius: 5px;
  transition: all 200ms;
  background-color: ${({ variant, statusError, color, lightnessFactor, bg}) => {
    const bgColor = bg 
      ? `#${bg}`
      : color && hexToRgba(color, lightnessFactor);
    if (variant === 'filled') {
      return statusError 
        ? "transparent" 
        : color
        ? bgColor
        : "var(--background-transparent)";
    }
    if (variant === "outlined") {
      return "var(--background)";
    }
    return "transparent";
  }};
  color: ${({ statusError,color }) => (statusError 
    ? theme.colors.error 
    : color && hexToRgba (color, -50))};
  padding: 0px 5px;

  ${({ variant, sxPd, sxText, color}) => {
    if (variant === 'outlined') return css`
      input:not(:placeholder-shown) + &,
      input:focus + & {
      transform: translateY(-${() => {
        const paddingTop = Array.isArray(sxPd) ? sxPd[0] : sxPd || 0;
        const textSize = sxText || 14;
        return `${(paddingTop + textSize) / 2}px`; 
      }});
      font-size: ${() => sxText ? `${sxText * 0.6}rem` : '1rem'};
      color: ${() => color};
      }`
    }}

  ${({variant, color, lightnessFactor, bg}) => {
    const bgColor = bg
      ?`#${bg}`
      : color && hexToRgba(color, lightnessFactor);
    if(variant === 'default') return css `
      input:not(:placeholder-shown) + &,
      input:focus + & {
        background-color: ${bgColor};
      }
    `
  }}
`;

export default function Input({ 
    sx = 'small', 
    sxMn = [4, 7, 4, 7],
    sxPd = [10, 15, 10, 15],
    sxText = 14, 
    variant = 'outlined', 
    lightnessFactor = 60,
    label, 
    color,
    colorNoFocus = '#727272',
    statusError = false, 
    value = "",
    bg,
    $width,
    onChange,
    ...rest
}: InputProps) {
    const [val, setValue] = useState<string>(value || "");
    const idInput = useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <Box
            type="span"   
            size={sx}
            style={{
                position: "relative",
                display: "block",
                width: $width,
                background: 'transparent',
                border: 'none',
                padding: 0
            }} 
        >
            <StyledInput
                sx = {sx}
                sxText={sxText}
                sxMn={sxMn}
                sxPd={sxPd}
                onChange={handleChange}
                variant={variant}
                value={val}
                color={color}
                placeholder=" "
                colorNoFocus={colorNoFocus}
                id={idInput}
                bg = {bg}
                lightnessFactor={lightnessFactor}
                {...rest}
            />
            {label && (
                <StyledLabel 
                    sx={sx} 
                    sxText={sxText}
                    sxPd={sxPd}
                    variant={variant} 
                    statusError={statusError}
                    lightnessFactor={lightnessFactor}
                    color={color}
                    bg = {bg}
                >
                    {label}
                </StyledLabel>
            )}
        </Box>
    );
}