'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CSSProperties, ElementType, ComponentPropsWithoutRef } from 'react';

/**
 * Replaces the canvas runtime's `style-hover` / `style-focus` attributes.
 *
 * The source markup carries declarative hover and focus styles that the
 * Claude-Design runtime merged over the base `style` attribute. This does
 * exactly that, so the rendered result is identical.
 *
 *   <Hx as="button" style={base} hoverStyle={{ borderColor: 'var(--brand)' }}>
 *   <Hx link href="/pricing" style={base} hoverStyle={{ color: 'var(--brand)' }}>
 *
 * `link` renders a next/link. It is a boolean rather than `as={Link}` because a
 * component function cannot be handed from a server component across the RSC
 * boundary — Hx has to resolve Link on its own side.
 */
type StyleProps = {
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
  focusStyle?: CSSProperties;
};

type TagProps<T extends ElementType> = StyleProps & {
  as?: T;
  link?: false;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'style'>;

type LinkProps = StyleProps & {
  link: true;
  as?: never;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'style'>;

export default function Hx<T extends ElementType = 'div'>(props: TagProps<T> | LinkProps) {
  const { as, link, style, hoverStyle, focusStyle, ...rest } = props as TagProps<T> & { link?: boolean };
  const Tag = (link ? Link : as || 'div') as ElementType;
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);

  return (
    <Tag
      {...rest}
      style={{ ...style, ...(hover && hoverStyle), ...(focus && focusStyle) }}
      onMouseEnter={() => hoverStyle && setHover(true)}
      onMouseLeave={() => hoverStyle && setHover(false)}
      onFocus={() => focusStyle && setFocus(true)}
      onBlur={() => focusStyle && setFocus(false)}
    />
  );
}
