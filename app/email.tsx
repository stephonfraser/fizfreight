import * as React from 'react';
import { Html, Button, Heading } from "@react-email/components";

export function Email(props: any) {
  const { url, title } = props;

  return (
    <Html lang="en">
      <Heading as='h1'>{title}</Heading>
      <Button href={url}>Click me</Button>
    </Html>
  );
}
