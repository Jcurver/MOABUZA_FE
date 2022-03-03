import { css } from 'styled-components'

export const whiteOpacity = (degree: number) => css`
  color: rgba(248, 248, 248, ${degree});
`

export const loginBtnStyle = (colorType: string) => css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 45px;
  background-color: var(--color-${colorType});
  border-radius: var(--border-radius-checkBtn);
  cursor: pointer;
  font-size: var(--font-s);
`

export const disappearScrollbar = () => css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export interface ISetFontStyles {
  color: string
  customColor: string
  fontSize: string
  customFontSize: string
  fontWeight: string
  lineHeight: string
}

export const setFontStyles = ({
  color,
  customColor,
  fontSize,
  customFontSize,
  fontWeight,
  lineHeight,
}: ISetFontStyles) => css`
  ${color && { color: `var(--color-${color})` }}
  ${customColor && { color: customColor }}
  ${fontSize && { fontSize: `var(--font-${fontSize})` }}
  ${customFontSize && { fontSize: customFontSize }}
  ${fontWeight && { fontWeight: `var(--weight-${fontWeight})` }}
  ${lineHeight && { lineHeight }}
`

export interface ISetFlexStyles
{
  display: string
  alignItems: string
  justifyContent: string
  flexDirection?: "row" | "-moz-initial" | "inherit" | "initial" | "revert" | "unset" | "column" | "column-reverse" | "row-reverse"
}
export const setFlexStyles = ({
  display,
  alignItems,
  justifyContent,
  flexDirection,
}: ISetFlexStyles) => css`
  ${display && { display }}
  ${alignItems && { alignItems }}
  ${justifyContent && { justifyContent }}
  ${flexDirection && { flexDirection }}
`
